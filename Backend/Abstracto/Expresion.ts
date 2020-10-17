import { Retorno} from "./Retorno";
import { N_Ast } from "../Ast/Ast";
import { Entorno } from "../Entorno/Entorno";

export abstract class Expresion {

    Ltrue: string;
    Lfalse: string;
    constructor(public linea: number, public columna: number) {
        this.Ltrue = "";
        this.Lfalse = "";
    }

    public abstract ejecutar(entorno: Entorno) : Retorno;

    public abstract ejecutarast(ast:N_Ast):N_Ast;
}