import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { N_Error } from "../../Errores/N_Error";
import { Tipos } from "../../Otros/Tipos";
import { N_Ast } from "../../Ast/Ast";
import { Instruccion } from "../../Abstracto/Instruccion";

export class Inct extends Instruccion {
    constructor(private id: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): Retorno {
        const nid = this.id.ejecutar(entorno);
        const simbolo = nid.simbol;
        const generador = Generador.getInstancia();
        if(simbolo == null){
            throw new N_Error('Semantico','No se puede operar decremento (++)','', this.linea,this.columna);
        } 
        if(nid.tipo.tipo = Tipos.NUMBER){
            generador.addComentario('INCREMENTO');
            const temp = generador.newTem();
            const tempaux = generador.newTem(); 
            if(simbolo.global){
                generador.getstack(temp,simbolo.pos);
                generador.addExp(tempaux,temp,'1','+');
                generador.setstack(simbolo.pos,tempaux);
            }
            else if(simbolo.sheap){
                generador.getHeap(temp,nid.valor);
                generador.addExp(tempaux,temp,'1','+');
                generador.setHeap(nid.valor,tempaux);
            }
            else{
                generador.getstack(temp,nid.valor);
                generador.addExp(tempaux,temp,'1','+');
                generador.setstack(nid.valor,tempaux);
            }
            generador.addComentario('FIN INCREMENTO');
        }else{
            throw new N_Error('Semantico','No se puede operar decremento (++)','', this.linea,this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\" Incremento id\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result;
    }
}