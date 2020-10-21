import { Expresion } from "../Abstracto/Expresion";
import { N_Ast } from "../Ast/Ast";
import { Entorno } from "../Entorno/Entorno";
import { Retorno } from "../Abstracto/Retorno";
import { Tipos, Tipo } from "../Otros/Tipos";
import { Generador } from "../Generador/Generador";

export class Cadenat extends Expresion{
    constructor(public valor: any, public tipo:Tipos, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const generador = Generador.getInstancia();
        const nuevatem = generador.newTem();
        generador.addExp(nuevatem, 'h');
        for (let pos = 0; pos < this.valor.length; pos++) {
            let vascii = this.valor.charCodeAt(pos);
            generador.setHeap('h', vascii);
            generador.sigHeap();
        }
        generador.setHeap('h', '-1');
        generador.sigHeap();
        return new Retorno(nuevatem, new Tipo(this.tipo),true);
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Expresion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        Cadena += (ast.posdes+1)+" [label =\""+this.valor+"\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";

        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
}