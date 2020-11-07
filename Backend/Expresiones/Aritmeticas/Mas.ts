import { Expresion } from "../../Abstracto/Expresion";
import { Retorno } from "../../Abstracto/Retorno";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Generador } from "../../Generador/Generador";
import { Tipos,Tipo } from "../../Otros/Tipos";
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
            }else if(nder.tipo.tipo == Tipos.BOOLEAN){
                nder.valor = nder.valor ? 1 : 0 ;
                generador.addExp(ntem, nizq.valor, nder.valor, '+');
                const retorn = new Retorno(ntem, nizq.tipo, true);
                return retorn;
            }else if(nder.tipo.tipo == Tipos.STRING){
                generador.addExp("T15",nizq.valor);
                generador.sigEnt(entorno.size);
                generador.llamarfunc('number_tostring');
                generador.addExp(ntem,"T16");
                generador.regEnt(entorno.size);
                //concatenar string
                generador.addExp("T3",ntem);
                generador.addExp("T5",nder.valor);
                //llamamos
                generador.sigEnt(entorno.size);
                generador.llamarfunc('concat_string_string');
                generador.addExp(ntem,"T2");
                generador.regEnt(entorno.size);

                const retorn = new Retorno(ntem, new Tipo(Tipos.STRING), true);
                return retorn;
            }else{
                throw new N_Error('Semantico','No se puede traducir ' + nizq.valor + "+" + nder.valor,'', this.linea,this.columna);
            }
        }else if(nizq.tipo.tipo == Tipos.BOOLEAN){
            if(nder.tipo.tipo == Tipos.STRING){
                const nuevotem = generador.newTem(); 
                generador.addExp(nuevotem,"h");
                if(nizq.valor){
                    generador.setHeap('h', 't'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'r'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'u'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'e'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', '-1');
                    generador.sigHeap();
                }else{
                    generador.setHeap('h', 'f'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'a'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'l'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 's'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'e'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', '-1');
                    generador.sigHeap();
                }
                // para concatenar
                generador.addExp("T3",nuevotem);
                generador.addExp("T5",nder.valor);
                //llamamos
                generador.sigEnt(entorno.size);
                generador.llamarfunc('concat_string_string');
                generador.addExp(ntem,"T2");
                generador.regEnt(entorno.size);
                const retorn = new Retorno(ntem, new Tipo(Tipos.STRING), true);
                return retorn;
            }else if(nder.tipo.tipo == Tipos.NUMBER){
                nizq.valor = nizq.valor ? 1 : 0 ;
                generador.addExp(ntem, nizq.valor, nder.valor, '+');
                const retorn = new Retorno(ntem, nder.tipo, true);
                return retorn;
            }else{
                throw new N_Error('Semantico','No se puede traducir ' + nizq.valor + "+" + nder.valor,'', this.linea,this.columna);
            }
        }else if(nizq.tipo.tipo == Tipos.STRING){
            if(nder.tipo.tipo == Tipos.NUMBER){
                generador.addExp("T15",nder.valor);
                generador.sigEnt(entorno.size);
                generador.llamarfunc('number_tostring');
                generador.addExp(ntem,"T16");
                generador.regEnt(entorno.size);
                //concatenar string
                generador.addExp("T5",ntem);
                generador.addExp("T3",nizq.valor);
                //llamamos
                generador.sigEnt(entorno.size);
                generador.llamarfunc('concat_string_string');
                generador.addExp(ntem,"T2");
                generador.regEnt(entorno.size);

                const retorn = new Retorno(ntem, new Tipo(Tipos.STRING), true);
                return retorn;
            }else if(nder.tipo.tipo == Tipos.STRING){
                // para concatenar
                generador.addExp("T3",nizq.valor);
                generador.addExp("T5",nder.valor);
                //llamamos
                generador.sigEnt(entorno.size);
                generador.llamarfunc('concat_string_string');
                generador.addExp(ntem,"T2");
                generador.regEnt(entorno.size);
                const retorn = new Retorno(ntem, new Tipo(Tipos.STRING), true);
                return retorn;
            }else if(nder.tipo.tipo == Tipos.BOOLEAN){
                const nuevotem = generador.newTem(); 
                generador.addExp(nuevotem,"h");
                if(nder.valor){
                    generador.setHeap('h', 't'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'r'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'u'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'e'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', '-1');
                    generador.sigHeap();
                }else{
                    generador.setHeap('h', 'f'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'a'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'l'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 's'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'e'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', '-1');
                    generador.sigHeap();
                }
                // para concatenar
                generador.addExp("T3",nizq.valor);
                generador.addExp("T5",nuevotem);
                //llamamos
                generador.sigEnt(entorno.size);
                generador.llamarfunc('concat_string_string');
                generador.addExp(ntem,"T2");
                generador.regEnt(entorno.size);
                const retorn = new Retorno(ntem, new Tipo(Tipos.STRING), true);
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
        Cadena += ast.posdes+" [label =\"+\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        result=this.izq.ejecutarast(result);
        result.posant = ast.posdes;
        result=this.der.ejecutarast(result);
        return result;
    }
}