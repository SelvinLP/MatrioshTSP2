import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Expresion } from "../Abstracto/Expresion";
import { Retorno } from "../Abstracto/Retorno";
import { Tipo, Tipos } from "../Otros/Tipos";
import { Generador } from "../Generador/Generador";
import { N_Error } from "../Errores/N_Error";

export class Returnt extends Instruccion{

    constructor(public valoraretorn:Expresion,line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        const nvalor = this.valoraretorn?.ejecutar(entorno) || new Retorno('0',new Tipo(Tipos.NULL), false);
        const actfunc = entorno.actualFunc;
        const generador = Generador.getInstancia();

        if (actfunc == null){
            throw new N_Error('Semantico','Return fuera de una funcion','', this.linea,this.columna);
        }
        generador.addComentario("RETORNO");
        if(actfunc.tipo.tipo == Tipos.BOOLEAN){
            const templabel = generador.newEtiq();
            generador.addEtiq(nvalor.Ltrue);
            generador.setstack('p', '1');
            generador.addGoto(templabel);
            generador.addEtiq(nvalor.Lfalse);
            generador.setstack('p', '0');
            generador.addEtiq(templabel);
        }else if(actfunc.tipo.tipo != Tipos.NULL){
            generador.setstack('p', nvalor.valor);
        }

        generador.addGoto(entorno.return || '');
        generador.addComentario("FIN RETORNO");
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\" Return \"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result;
    }
}