import { Expresion } from "../../Abstracto/Expresion";
import { Retorno } from "../../Abstracto/Retorno";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Generador } from "../../Generador/Generador";
import { Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class Mast extends Expresion{
    constructor(private izq: Expresion, public der:Expresion, linea: number, columna: number){
        super(linea,columna);
    }
    public ejecutar(entorno:Entorno): Retorno{
        const nizq = this.izq.ejecutar(entorno);
        const nder = this.der.ejecutar(entorno);
        const generador = Generador.getInstancia();
        const ntem = generador.newTem();
        if(nizq.tipo.tipo == Tipos.NUMBER){
            if(nder.tipo.tipo == Tipos.NUMBER){
                generador.addExp(ntem, nizq.valor, nder.valor, '+');
                const retorn = new Retorno(ntem, nizq.tipo, true);
                return retorn;
            }else{
                throw new N_Error('Semantico','No se puede traducir ' + nizq.valor + "+" + nder.valor,'', this.linea,this.columna);
            }
        }else if(nizq.tipo.tipo == Tipos.BOOLEAN){
            if(nder.tipo.tipo == Tipos.STRING){
                const nuevotem = generador.newTem(); 
                const nuevaetiq = generador.newEtiq();
                generador.addExp(nuevotem,'p',entorno.size + 1, '+');
                generador.addEtiq(nizq.Ltrue);
                generador.setstack(nuevotem,'1');
                generador.addGoto(nuevaetiq);
                generador.addEtiq(nizq.Lfalse);

                generador.setstack(nuevotem,'0');
                generador.addEtiq(nuevaetiq);
                generador.addExp(nuevotem,nuevotem,'1','+');
                generador.setstack(nuevotem,nder.valor);
                
                //generador.addNextEnv(entorno.size);
                //generator.addCall('native_concat_bol_str');
                //generator.addGetStack(temp,'p');
                //generator.addAntEnv(enviorement.size);
                //const retorn = new Retorno(ntem, nizq.tipo, true);
                return retorn;
            }else{
                throw new N_Error('Semantico','No se puede traducir ' + nizq.valor + "+" + nder.valor,'', this.linea,this.columna);
            }
        }else{
            throw new N_Error('Semantico','No se puede traducir ' + nizq.valor + "+" + nder.valor,'', this.linea,this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
}