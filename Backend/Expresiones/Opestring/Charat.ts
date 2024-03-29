import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipo, Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class CharAt extends Expresion{
    constructor(public valor: Expresion, public pos:Expresion, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const generador = Generador.getInstancia();
        const nvalor = this.valor.ejecutar(entorno);
        const npos = this.pos.ejecutar(entorno);
        const naux =  generador.newTem();
        const ntem =  generador.newTem();
        const ntemvalor =  generador.newTem();
        if(nvalor.tipo.tipo == Tipos.STRING){
            generador.addExp(naux,nvalor.valor,npos.valor, "+");
            generador.getHeap(ntemvalor,naux);
            generador.addExp(ntem,"h");            
            generador.setHeap('h', ntemvalor);
            generador.sigHeap();
            generador.setHeap('h', '-1');
            generador.sigHeap();
            //llamamos
            const retorn = new Retorno(ntem, new Tipo(Tipos.STRING), true);
            return retorn;
        }else{
            throw new N_Error('Semantico','Tipo no compatible para charat()','', this.linea, this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        let result:N_Ast = {posant:ast.posant, posdes:ast.posdes+1,cadena:Cadena};
        result.cadena += result.posdes +" [label =\"CharAt\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = {posant:ast.posdes, posdes:result.posdes+1, cadena:result.cadena};
        result=this.valor.ejecutarast(result);
        return result;
    }
}