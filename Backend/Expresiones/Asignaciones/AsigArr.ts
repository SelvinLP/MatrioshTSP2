import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { N_Error } from "../../Errores/N_Error";
import { N_Ast } from "../../Ast/Ast";
import { Tipos, Tipo } from "../../Otros/Tipos";

export class AsigArr extends Expresion {
    constructor(private posicion: Expresion, private anterior: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): Retorno {
        const generador = Generador.getInstancia();
        const nanterior = this.anterior.ejecutar(entorno);
        const index = this.posicion.ejecutar(entorno);
        if(nanterior.tipo.dimension == 0){
            throw new N_Error('Semantico','La variable no es un arreglo','', this.linea, this.columna);
        }else if ( index.tipo.dimension != 0 ||  index.tipo.tipo != Tipos.NUMBER ){
            throw new N_Error('Semantico','La posicion no es un entero','', this.linea, this.columna);
        }
        const temaux = generador.newTem();
        const temp = generador.newTem();
        if(nanterior.simbol != null ){
            generador.getstack(temaux,nanterior.valor);
        }else{
            generador.getHeap(temaux,nanterior.valor);
        }
        generador.addExp(temp,temaux,index.valor,'+');
        generador.addExp(temp,temp,'1','+');
        return new Retorno(temp,new Tipo(nanterior.tipo.tipo,nanterior.tipo.idtipo,nanterior.tipo.dimension - 1),true);
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Id\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result;
    }
}