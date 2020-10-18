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
        if(this.tipo == Tipos.BOOLEAN){
            const generator = Generador.getInstancia();
            //Comprobacion de banderas
            if(this.Ltrue == ""){
                this.Ltrue = generator.newEtiq();
            }
            if(this.Lfalse == ""){
                this.Lfalse = generator.newEtiq();
            }
            if(this.valor){
                generator.addGoto(this.Ltrue)
            }else{
                generator.addGoto(this.Lfalse);
            }
            const retorn = new Retorno('',new Tipo(this.tipo),false);
            retorn.Ltrue = this.Ltrue;
            retorn.Lfalse = this.Lfalse;
    
            return retorn;

        }else if(this.tipo == Tipos.NULL){
            return new Retorno('', new Tipo(this.tipo), false);
        }else{
            throw new N_Error('Semantico','El tipo de dato no existe','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";

        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
}