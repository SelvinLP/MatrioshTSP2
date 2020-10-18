import { Expresion } from "../../Abstracto/Expresion";
import { Retorno } from "../../Abstracto/Retorno";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Generador } from "../../Generador/Generador";

export class Mast extends Expresion{
    constructor(private izq: Expresion, public der:Expresion, linea: number, columna: number){
        super(linea,columna);
    }
    public ejecutar(entorno:Entorno): Retorno{
        const nizq = this.izq.ejecutar(entorno);
        const nder = this.der.ejecutar(entorno);
        const generador = Generador.getInstancia();
        const ntem = generador.newTem();
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
}