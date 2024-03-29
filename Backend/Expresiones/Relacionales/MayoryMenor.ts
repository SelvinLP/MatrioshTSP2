import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipos, TipoRelacional, Tipo } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class MayoryMenort extends Expresion{
    constructor(private izq: Expresion, public der:Expresion ,public Tipor:TipoRelacional, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const nizq = this.izq.ejecutar(entorno);
        const nder = this.der.ejecutar(entorno);
        const generador = Generador.getInstancia();
        if (nizq.tipo.tipo == Tipos.NUMBER && nder.tipo.tipo == Tipos.NUMBER) {
            this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
            this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
            if(this.Tipor == TipoRelacional.MAYORQUE){
                generador.addIf(nizq.valor,nder.valor,'>',this.Ltrue);
            }else if(this.Tipor == TipoRelacional.MAYORIGUAL){
                generador.addIf(nizq.valor,nder.valor,'>=',this.Ltrue);
            }else if(this.Tipor == TipoRelacional.MENORQUE){
                generador.addIf(nizq.valor,nder.valor,'<',this.Ltrue);
            }else{
                generador.addIf(nizq.valor,nder.valor,'<=',this.Ltrue);
            }
            generador.addGoto(this.Lfalse);
            const retorno = new Retorno('',new Tipo(Tipos.BOOLEAN),false);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            return retorno;
        }else{
            throw new N_Error('Semantico','No se puede traducir' + nizq.valor +" "+ this.Tipor +" "+ nder.valor,'', this.linea,this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        if(this.Tipor == TipoRelacional.MAYORIGUAL){
            Cadena += ast.posdes+" [label =\"MAYOR IGUAL\"];\n";
            Cadena += ast.posant+" -> "+ast.posdes+";\n";
        }else if(this.Tipor == TipoRelacional.MAYORQUE){
            Cadena += ast.posdes+" [label =\"MAYOR QUE\"];\n";
            Cadena += ast.posant+" -> "+ast.posdes+";\n";
        }else if(this.Tipor == TipoRelacional.MENORIGUAL){
            Cadena += ast.posdes+" [label =\"MENOR IGUAL\"];\n";
            Cadena += ast.posant+" -> "+ast.posdes+";\n";
        }else if(this.Tipor == TipoRelacional.MENORQUE){
            Cadena += ast.posdes+" [label =\"MENOR QUE\"];\n";
            Cadena += ast.posant+" -> "+ast.posdes+";\n";
        }
        
        
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        result=this.izq.ejecutarast(result);
        result.posant = ast.posdes;
        result=this.der.ejecutarast(result);
        return result;
    }
}