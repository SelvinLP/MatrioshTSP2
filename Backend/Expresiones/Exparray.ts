import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Retorno } from "../Abstracto/Retorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { Tipos, Tipo } from "../Otros/Tipos";

export class Exparray extends Expresion {

    constructor(private valores: Expresion[], linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): Retorno {
        const generador = Generador.getInstancia();
        const tem = generador.newTem();
        const temaux = generador.newTem();
        let dimension = 0;
        let tipo = Tipos.NULL;
        generador.addExp(tem,'h');
        generador.addExp(temaux,tem,'1','+');
        generador.setHeap('h', this.valores.length);
        generador.addExp('h','h',this.valores.length + 1 ,'+');
        this.valores.forEach((value, index) => {
            const result = value.ejecutar(entorno);
            dimension = result.tipo.dimension + 1;
            generador.setHeap(temaux, result.valor);
            if(index != this.valores.length - 1){
                generador.addExp(temaux, temaux, '1', '+');
            }
            tipo = result.tipo.tipo;
        });
       return new Retorno(tem, new Tipo(tipo,'',dimension), true);
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Dimension\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let retorno = {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        for(let nodo of this.valores){
            retorno.posant =ast.posdes
            retorno = nodo.ejecutarast(retorno);
        }
         
        return retorno;
    }
}