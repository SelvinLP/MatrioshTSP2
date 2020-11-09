import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";


export class Llamarfuncion extends Instruccion{

    constructor(private id: Expresion, linea : number, columna : number){
        super(linea, columna);
    }

    public ejecutar(entorno : Entorno) {
        this.id.ejecutar(entorno);
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Call\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let retorno={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};

        return retorno;
    }
}