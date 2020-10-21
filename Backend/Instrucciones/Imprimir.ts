import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { Expresion } from "../Abstracto/Expresion";
import { Tipos } from "../Otros/Tipos";
import { N_Error } from "../Errores/N_Error";

export class Imprimirt extends Instruccion{
    constructor(private valor : Array<Expresion>, linea: number, columna: number){
        super(linea,columna);
    }
    public ejecutar(entorno:Entorno){
        const generador = Generador.getInstancia();
        for(let nexp of this.valor){
            let nvalor = nexp.ejecutar(entorno);
            if(nvalor.tipo.tipo == Tipos.NUMBER){
                generador.addImpr("f",nvalor.valor);
            }else if(nvalor.tipo.tipo == Tipos.BOOLEAN){
                const newtem = generador.newEtiq();
                generador.addEtiq(nvalor.Ltrue);
                generador.ImpriTrue();
                generador.addEtiq(newtem);
                generador.addEtiq(nvalor.Lfalse);
                generador.ImpriFalse();
                generador.addEtiq(newtem);
            }else if(nvalor.tipo.tipo == Tipos.NULL){
                generador.ImpriNull();
            }else if(nvalor.tipo.tipo == Tipos.STRING){
                //generador.addNextEnv(enviorement.size);
                //generador.addSetStack('p', value.getValue());
                //generador.addCall('native_print_str');
                //generador.addAntEnv(enviorement.size);
            }else{
                throw new N_Error('Semantico','No se puede Imprimir ' + nvalor.tipo.tipo,'', this.linea,this.columna);
            }
            generador.addImpr('c',10);
        }
        
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Console.log\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result
    }
}
