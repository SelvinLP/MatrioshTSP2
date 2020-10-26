import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class Andt extends Expresion{
    constructor(private izq: Expresion, private der:Expresion, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const generador = Generador.getInstancia();
        let nizq = this.izq.ejecutar(entorno);
        let nder = this.der.ejecutar(entorno);
        if(nizq.tipo.tipo == Tipos.BOOLEAN && nder.tipo.tipo == Tipos.BOOLEAN){
            this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
            this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
            let petiq = generador.newEtiq();
            generador.addIf(nizq.valor,"1","==",petiq);
            generador.addGoto(this.Lfalse);
            generador.addEtiq(petiq);
            generador.addIf(nder.valor,"1","==",this.Ltrue);
            generador.addGoto(this.Lfalse);

            if(nizq.valor == "1" && nder.valor == "1"){
                nizq.valor = "1";
            }else { 
                nizq.valor = "0"; 
            }
            nizq.Ltrue = this.Ltrue;
            nizq.Lfalse = this.Lfalse;
            const retorno = new Retorno(nizq.valor,nizq.tipo,false);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            return retorno;
        }else{
            throw new N_Error('Semantico','No se puede traducir' + nizq.valor +" && "+ nder.valor,'', this.linea,this.columna);
        }

    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
    
}