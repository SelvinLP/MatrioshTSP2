import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Retorno } from "../Abstracto/Retorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { Tipos, Tipo } from "../Otros/Tipos";
import { N_Error } from "../Errores/N_Error";

export class Newarray extends Expresion {

    constructor(private tamanio: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): Retorno {
        const generador = Generador.getInstancia();
        const nsize = this.tamanio.ejecutar(entorno);
        //error que no ingreso el tamanio correcto
        if(nsize.tipo.tipo != Tipos.NUMBER){
            throw new N_Error('Semantico','Tamanio de array no es number','', this.linea, this.columna);
        }
        const ntem = generador.newTem();
        generador.addExp(ntem,'h');
        generador.setHeap('h',nsize.valor);
        generador.addExp('h','h',nsize.valor,'+');
        generador.sigHeap();
        return new Retorno(ntem,new Tipo(Tipos.ARRAY,'',1),true);
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"New Array()\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let retorn = this.tamanio.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        return retorn;
    }
}