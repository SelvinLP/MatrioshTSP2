import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { Tipos } from "../Otros/Tipos";

export class Asignacion extends Instruccion{

    constructor(private id: Expresion, private value : Expresion, linea : number, columna: number){
        super(linea, columna);
    }

    public ejecutar(entorno:Entorno){
        const value = this.value.ejecutar(entorno);
        const nid = this.id.ejecutar(entorno);

        const generador = Generador.getInstancia();
        const simbolo = nid.simbol;

        if(value.tipo.tipo == Tipos.ARRAY){
            const temp = generador.newTem();
            const etiq1 = generador.newEtiq();
            const etiq2 = generador.newEtiq();
            generador.addExp(temp, value.valor, '1', '+');
            generador.addEtiq(etiq1);
            generador.addIf(temp, 'h', '==', etiq2);
            if(nid.tipo.dimension == value.tipo.dimension){//para llenar posiciones por defecto
                nid.tipo.tipo != Tipos.STRING && nid.tipo.tipo != Tipos.TYPE ? generador.setHeap(temp, '0'):  generador.setHeap(temp, '-1');
            }else{
                generador.setHeap(temp,'-1');
            }
            generador.addExp(temp, temp, '1', '+');
            generador.addGoto(etiq1);
            generador.addEtiq(etiq2);
        }

        if (simbolo?.global) {
            if (nid.tipo.tipo == Tipos.BOOLEAN) {
                const templabel = generador.newEtiq();
                generador.addEtiq(value.Ltrue);
                generador.setstack(simbolo.pos, '1');
                generador.addGoto(templabel);
                generador.addEtiq(value.Lfalse);
                generador.setstack(simbolo.pos, '0');
                generador.addEtiq(templabel);
            }
            else {
                generador.setstack(simbolo.pos, value.valor);
            }
        }
        else if (simbolo?.sheap) {
            if (nid.tipo.tipo == Tipos.BOOLEAN) {
                const templabel = generador.newEtiq();
                generador.addEtiq(value.Ltrue);
                generador.setstack(simbolo.pos, '1');
                generador.addGoto(templabel);
                generador.addEtiq(value.Lfalse);
                generador.setstack(simbolo.pos, '0');
                generador.addEtiq(templabel);
            }
            else {
                generador.setHeap(nid.valor, value.valor);
            }
        }
        else {
            if (nid.tipo.tipo == Tipos.BOOLEAN) {
                const templabel = generador.newEtiq();
                generador.addEtiq(value.Ltrue);
                generador.setstack(nid.valor, '1');
                generador.addGoto(templabel);
                generador.addEtiq(value.Lfalse);
                generador.setstack(nid.valor, '0');
                generador.addEtiq(templabel);
            }
            else {
                generador.setstack(nid.valor, value.valor);
            }
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Asignacion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let resultado:N_Ast;
        //Id
        Cadena += (ast.posdes+1)+" [label =\"id\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        
        Cadena += (ast.posdes+2)+" [label =\"=\"];\n";
        Cadena += (ast.posdes)+" -> "+(ast.posdes+2)+";\n";
        //Expresion
        resultado= this.value.ejecutarast({posant:ast.posdes, posdes:ast.posdes+3,cadena:Cadena});
        
        return resultado;
    }
}