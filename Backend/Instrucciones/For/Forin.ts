import { Instruccion } from "../../Abstracto/Instruccion";
import { TipoDato, Tipo, Tipos } from "../../Otros/Tipos";
import { Entorno } from "../../Entorno/Entorno";
import { N_Ast } from "../../Ast/Ast";
import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";

export class Forin extends Instruccion{

    constructor(private letoconst:TipoDato, private id:string, private iddireccion:Expresion,private codigo:Instruccion,
         line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        const generador = Generador.getInstancia();
        const newentorno = new Entorno(entorno);
        const temarray = this.iddireccion.ejecutar(entorno);
        const etiqshile = generador.newEtiq();
        const etiqsalida = generador.newEtiq();
        const etiqverd = generador.newEtiq();
        generador.addComentario('FOR IN');
        //declaracion
        newentorno.guardarvar(true, this.id, new Tipo(Tipos.NUMBER), false, this.linea, this.columna); 
        let variable = newentorno.obtenervar(this.id);

        if(variable?.global){
            generador.setstack(variable.pos,'0');
        }else{
            const temnueva = generador.newTem(); 
            generador.addExp(temnueva, 'p', variable?.pos,'+');
            generador.setstack(temnueva,'0');
        }
        //cuerpo
        const temnueva = generador.newTem(); 
        const temnuevaheap = generador.newTem(); 
        generador.getHeap(temnuevaheap,temarray.valor);
        generador.getstack(temnueva, variable?.pos);
        generador.addEtiq(etiqshile);
        generador.addIf(temnueva,temnuevaheap,"<", etiqverd);
        generador.addGoto(etiqsalida);
        generador.addEtiq(etiqverd);
        //cuerpo verdadero
        let ncuerpo = this.codigo.ejecutar(newentorno);
        generador.addExp(temnueva,temnueva,"1","+");
        generador.setstack(variable?.pos,temnueva)
        generador.addGoto(etiqshile);

        generador.addEtiq(etiqsalida);
        generador.addComentario('FIN FOR IN');
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"For in\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};

        result.cadena += result.posdes+" [label =\"Id: "+this.id+"\"];\n";
        result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        result={posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena};
        
        result.cadena += result.posdes+" [label =\"Array\"];\n";
        result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        //Seccion Codigo
        result =this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena});
        return result;
    }
}