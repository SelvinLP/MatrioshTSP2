import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Generador } from "../Generador/Generador";
import { N_Error } from "../Errores/N_Error";
import { N_Ast } from "../Ast/Ast";

export class Break extends Instruccion{

    constructor(linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno: Entorno){
        if(entorno.break != null){ 
            const generador = Generador.getInstancia();
            generador.addGoto(entorno.break);
        }else{
            throw new N_Error('Semantico','Break en ambito incorrecto','', this.linea,this.columna);
        }
        
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Break\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result;
    }
}