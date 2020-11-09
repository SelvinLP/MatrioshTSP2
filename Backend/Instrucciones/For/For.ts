import { Instruccion } from "../../Abstracto/Instruccion";
import { Declaracion } from "../Declaracion";
import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { N_Error } from "../../Errores/N_Error";
import { Entorno } from "../../Entorno/Entorno";
import { Generador } from "../../Generador/Generador";
import { Tipos } from "../../Otros/Tipos";

export class For extends Instruccion{

    constructor(private declaracion:Declaracion, private condicion:Expresion, private incydec:Expresion, 
        private codigo:Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        const generador = Generador.getInstancia();
        const newentorno = new Entorno(entorno);
        const etiqshile = generador.newEtiq();
        generador.addComentario('FOR');
        this.declaracion.ejecutar(newentorno);
        generador.addEtiq(etiqshile);
        const condicion = this.condicion.ejecutar(newentorno);
        if(condicion.tipo.tipo == Tipos.BOOLEAN){
            newentorno.break = condicion.Lfalse;
            newentorno.continue = etiqshile;
            
            generador.addEtiq(condicion.Ltrue);
            this.codigo.ejecutar(newentorno);
            this.incydec.ejecutar(newentorno);
            generador.addGoto(etiqshile);
            generador.addEtiq(condicion.Lfalse);
            generador.addComentario('FIN FOR');
            return;
        }else{
            throw new N_Error('Semantico','La condicion no es booleana en el for','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"For\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Seccion Declaracion
        result =this.declaracion.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        //Seccion Condicion
        result =this.condicion.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        //Seccion Asignacion
        result =this.incydec.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        //Seccion Codigo
        result =this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        return result;
    }
}