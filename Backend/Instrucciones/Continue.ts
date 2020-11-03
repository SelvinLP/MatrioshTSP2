import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Generador } from "../Generador/Generador";
import { N_Error } from "../Errores/N_Error";
import { N_Ast } from "../Ast/Ast";

export class Continue extends Instruccion{

    constructor(linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno: Entorno){
        if(entorno.continue != null){ 
            const generador = Generador.getInstancia();
            generador.addGoto(entorno.continue);
        }else{
            throw new N_Error('Semantico','Continue en ambito incorrecto','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Continue\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result;
    }
}