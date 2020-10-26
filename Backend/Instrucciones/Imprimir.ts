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
                generador.addComentario("IMPRIMIR");
                generador.addImpr("f",nvalor.valor);
            }else if(nvalor.tipo.tipo == Tipos.BOOLEAN){
                generador.addComentario("IMPRIMIR");
                const newtem = generador.newEtiq();
                //let tetiq= nvalor.valor == "1" ? nvalor.Ltrue : nvalor.Lfalse;
                //generador.addGoto(tetiq);
                generador.addEtiq(nvalor.Ltrue);
                generador.llamarfunc('native_imprimir_true');
                generador.addGoto(newtem);
                generador.addEtiq(nvalor.Lfalse);
                generador.llamarfunc('native_imprimir_false');
                generador.addEtiq(newtem);
            }else if(nvalor.tipo.tipo == Tipos.NULL){
                generador.addComentario("IMPRIMIR");
                generador.llamarfunc('native_imprimir_null');
            }else if(nvalor.tipo.tipo == Tipos.STRING){
                generador.addComentario("IMPRIMIR");
                generador.sigEnt(entorno.size);
                generador.setstack('p', nvalor.valor);
                generador.addExp("T0",nvalor.valor);
                generador.llamarfunc('native_imprimir');
                generador.regEnt(entorno.size);
            }else{
                throw new N_Error('Semantico','No se puede Imprimir ' + nvalor.tipo.tipo,'', this.linea,this.columna);
            }
            generador.addImpr('c',10);
            generador.addComentario("FIN IMPRIMIR");
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
