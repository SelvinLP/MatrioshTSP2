import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class Modt extends Expresion{
    constructor(private izq: Expresion, public der:Expresion, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const nizq = this.izq.ejecutar(entorno);
        const nder = this.der.ejecutar(entorno);
        const generador = Generador.getInstancia();
        const ntem = generador.newTem();
        if(nizq.tipo.tipo == Tipos.NUMBER && nder.tipo.tipo == Tipos.NUMBER){

            generador.addExp(ntem, "fmod( "+ nizq.valor +", "+ nder.valor +" )");
            const retorn = new Retorno(ntem, nizq.tipo, true);
            return retorn;
        }else{
            throw new N_Error('Semantico','No se puede traducir ' + nizq.valor + "%" + nder.valor,'', this.linea,this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }
}