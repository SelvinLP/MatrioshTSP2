import { Instruccion } from "../Abstracto/Instruccion";
import { Declaracion } from "./Declaracion";
import { Expresion } from "../Abstracto/Expresion";
import { N_Ast } from "../Ast/Ast";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";

export class For extends Instruccion{

    constructor(private declaracion:Declaracion, private condicion:Expresion, private incydec:Expresion, 
        private codigo:Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
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