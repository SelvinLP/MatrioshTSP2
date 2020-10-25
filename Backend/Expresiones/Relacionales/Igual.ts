import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipos, Tipo } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";
import { N_Ast } from "../../Ast/Ast";

export class Igualt extends Expresion{
    constructor(private izq: Expresion, public der:Expresion, linea: number, columna: number){
        super(linea,columna);
    }
 
    public ejecutar(entorno:Entorno): Retorno{
        let nizq = this.izq.ejecutar(entorno);
        let nder = this.der.ejecutar(entorno);
        const generador = Generador.getInstancia();
        if(nizq.tipo.tipo == Tipos.NUMBER){
            if(nder.tipo.tipo == Tipos.NUMBER){
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                generador.addIf(nizq.valor, nder.valor, '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                const retorno = new Retorno('',new Tipo(Tipos.BOOLEAN),false);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }else{
                throw new N_Error('Semantico','No se puede traducir' + nizq.valor +" == "+ nder.valor,'', this.linea,this.columna);
            }
        }else if(nizq.tipo.tipo == Tipos.BOOLEAN){
            
            const lbtrue = generador.newEtiq();
            const lbfalse = generador.newEtiq();
            generador.addEtiq(nizq.Ltrue);
            this.der.Ltrue = lbtrue;
            this.der.Lfalse = lbfalse;
            nder = this.der.ejecutar(entorno);                

            generador.addEtiq(nizq.Lfalse);
            this.der.Ltrue = lbfalse;
            this.der.Lfalse = lbtrue;
            nder = this.der.ejecutar(entorno);
            if(nder.tipo.tipo = Tipos.BOOLEAN){
                const retorno = new Retorno('',nizq.tipo,false);
                retorno.Ltrue = lbtrue;
                retorno.Lfalse = lbfalse;
                return retorno;
            }else{
                throw new N_Error('Semantico','No se puede traducir' + nizq.valor +" == "+ nder.valor,'', this.linea,this.columna);
            }
        }else if(nizq.tipo.tipo == Tipos.NULL){
            if(nder.tipo.tipo == Tipos.STRING || nder.tipo.tipo == Tipos.NULL){
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse; 
                generador.addIf(nizq.valor, nder.valor, '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                const retorno = new Retorno('',new Tipo(Tipos.NULL),false);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }else{
                throw new N_Error('Semantico','No se puede traducir' + nizq.valor +" == "+ nder.valor,'', this.linea,this.columna);
            }
        }else if(nizq.tipo.tipo == Tipos.STRING){
            if(nder.tipo.tipo == Tipos.NULL){
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse; 
                generador.addIf(nizq.valor, nder.valor, '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                const retorno = new Retorno('',new Tipo(Tipos.BOOLEAN),false);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }else if(nder.tipo.tipo == Tipos.STRING){
                const temp = generador.newTem();
                generador.sigEnt(entorno.size);
                generador.addExp("T7",nizq.valor);
                generador.addExp("T8",nder.valor);
                generador.llamarfunc('native_cmp_str');
                generador.addExp(temp,"T11");
                generador.regEnt(entorno.size);

                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                generador.addIf(temp, '1', '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                const retorno = new Retorno('',new Tipo(Tipos.BOOLEAN),false);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }else{
                throw new N_Error('Semantico','No se puede traducir' + nizq.valor +" == "+ nder.valor,'', this.linea,this.columna);
            }
        }else{
            throw new N_Error('Semantico','No se puede traducir' + nizq.valor +" == "+ nder.valor,'', this.linea,this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
}