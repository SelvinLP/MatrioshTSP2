import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { Tipos, Tipo } from "../Otros/Tipos";
import { N_Error } from "../Errores/N_Error";
import { Instruccion } from "../Abstracto/Instruccion";

export class Declaracionarr extends Instruccion {

    constructor(private tipo: Tipo, private id:string, private valor:Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno){
        const generador = Generador.getInstancia();
        generador.addComentario("DECLARACION ARRAY");
        const nvalor = this.valor.ejecutar(entorno);
        entorno.guardarvar(true, this.id, this.tipo, false, this.linea, this.columna);
        let variable=entorno.obtenervar(this.id);
        if(nvalor.tipo.tipo ==  Tipos.ARRAY){   //viene un new array
            const tem = generador.newTem();
            const etq1 = generador.newEtiq();
            const etq2 = generador.newEtiq();
            generador.addExp(tem, nvalor.valor, '1', '+');
            generador.addEtiq(etq1);
            generador.addIf(tem, 'h', '==', etq2);
            if(this.tipo.dimension == nvalor.tipo.dimension){ //llenar valores por defecto
                this.tipo.tipo != Tipos.STRING && this.tipo.tipo != Tipos.TYPE ? generador.setHeap(tem, '0'):  generador.setHeap(tem, '-1');
            }else{
                generador.setHeap(tem, '-1');
            }
            generador.addExp(tem, tem, '1', '+');
            generador.addGoto(etq1);
            generador.addEtiq(etq2);
        }else if(this.tipo.dimension != nvalor.tipo.dimension || this.tipo.tipo != nvalor.tipo.tipo){
            throw new N_Error('Semantico','Tipos de datos incorrectos en el array','', this.linea, this.columna);
        }
        
        if(variable?.global){
            generador.setstack(variable.pos,nvalor.valor);
        }else{
            const tem = generador.newTem();
            generador.addExp(tem, 'p', variable?.pos, '+');
            generador.setstack(tem, nvalor.valor);
        }
        generador.addComentario("FIN DECLARACION ARRAY");
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Declaracion Array\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";

        return {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
    }
}