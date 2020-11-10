import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipo, Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class Concat extends Expresion{
    constructor(public izq: Expresion, public der: Array<Expresion>, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const nizq = this.izq.ejecutar(entorno);
        const generador = Generador.getInstancia();
        const ntem = generador.newTem();
        for(const nder of this.der){
            const nderv = nder.ejecutar(entorno);
            if(nizq.tipo.tipo == Tipos.STRING && nderv.tipo.tipo == Tipos.STRING){
                // para concatenar
                generador.addExp("T3",nizq.valor);
                generador.addExp("T5",nderv.valor);
                //llamamos
                generador.llamarfunc('concat_string_string');
                generador.addExp(nizq.valor,"T2");
            }else{
                throw new N_Error('Semantico','Tipos no compatibles en concat()','', this.linea, this.columna);
            }
        }
        generador.addExp(ntem,nizq.valor);
        return new Retorno(ntem, new Tipo(Tipos.STRING),true);
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        let result:N_Ast = {posant:ast.posant, posdes:ast.posdes+1,cadena:Cadena};
        result.cadena += result.posdes +" [label =\"Concat\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = {posant:ast.posdes, posdes:result.posdes+1, cadena:result.cadena};
        result=this.izq.ejecutarast(result);
        return result;
    }
}