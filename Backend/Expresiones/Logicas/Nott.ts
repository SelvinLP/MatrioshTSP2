import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class Nott extends Expresion{
    constructor(private izq: Expresion, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const generador = Generador.getInstancia();
        let nizq = this.izq.ejecutar(entorno);
        this.Ltrue = nizq.Lfalse;
        this.Lfalse = nizq.Ltrue;
        nizq.valor = nizq.valor == "1" ? "0" : "1"; 
        
        if(nizq.tipo.tipo == Tipos.BOOLEAN){
            const retorno = new Retorno('',nizq.tipo,false);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            return retorno;
        }else{
            throw new N_Error('Semantico','No se puede traducir !' + nizq.valor ,'', this.linea,this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
    
}