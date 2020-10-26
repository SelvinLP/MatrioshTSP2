import { Expresion } from "../Abstracto/Expresion";
import { N_Ast } from "../Ast/Ast";
import { Retorno } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { Tipos, Tipo } from "../Otros/Tipos";
import { Generador } from "../Generador/Generador";

export class LPrimitivo extends Expresion{
    constructor(public valor: any, public tipo:Tipos, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        if(this.tipo == Tipos.NUMBER){
            return new Retorno(this.valor, new Tipo(this.tipo), false);
        }else if(this.tipo == Tipos.BOOLEAN){
            const generador = Generador.getInstancia();
            //Comprobacion de banderas
            this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
            this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
            this.valor = this.valor == "true" ? "1" : "0";
            const retorn = new Retorno(this.valor,new Tipo(this.tipo),false);
            retorn.Ltrue = this.Ltrue;
            retorn.Lfalse = this.Lfalse;
            return retorn;

        }else if(this.tipo == Tipos.NULL){
            return new Retorno('-1', new Tipo(this.tipo), false);
        }else{
            throw new N_Error('Semantico','El tipo de dato no existe','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Expresion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        Cadena += (ast.posdes+1)+" [label =\""+this.valor+"\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";

        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
}