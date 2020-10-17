import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export abstract class Instruccion {
    
    constructor(public linea: number, public columna: number) {
    }

    public abstract ejecutar(entorno:Entorno) : any;

    public abstract ejecutarast(ast:N_Ast):N_Ast;
}