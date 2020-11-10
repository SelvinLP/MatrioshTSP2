import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipo, Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class Tolower extends Expresion{
    constructor(public valor: Expresion, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const generador = Generador.getInstancia();
        const nvalor = this.valor.ejecutar(entorno);
        const ntem = generador.newTem();
        if(nvalor.tipo.tipo == Tipos.STRING){
            generador.addExp("T22",nvalor.valor);
            //llamamos
            generador.sigEnt(entorno.size);
            generador.llamarfunc('tolowercase_str');
            generador.addExp(ntem,"T29");
            generador.regEnt(entorno.size);

            const retorn = new Retorno(ntem, new Tipo(Tipos.STRING), true);
            return retorn;
        }else{
            throw new N_Error('Semantico','Tipo no compatible para toLowerCase()','', this.linea, this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        let result:N_Ast = {posant:ast.posant, posdes:ast.posdes+1,cadena:Cadena};
        result.cadena += result.posdes +" [label =\"ToLowerCase\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = {posant:ast.posdes, posdes:result.posdes+1, cadena:result.cadena};
        result=this.valor.ejecutarast(result);
        return result;
    }
}