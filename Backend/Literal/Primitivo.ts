import { Expresion } from "../Abstracto/Expresion";
import { N_Ast } from "../Ast/Ast";
import { Retorno } from "../Abstracto/Retorno";
import { Tipo } from "../Otros/Tipos";
import { N_Error } from "../Errores/N_Error";

export class LPrimitivo extends Expresion{
    constructor(public valor: any, public tipo:Tipo,linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(): Retorno{
        if(this.tipo == Tipo.NUMBER){
        }else if(this.tipo == Tipo.STRING){
        }else if(this.tipo == Tipo.BOOLEAN){
        }else if(this.tipo == Tipo.NULL){
        }else{
            throw new N_Error('Semantico','El tipo no existe','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";

        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
}