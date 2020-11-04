import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { N_Error } from "../../Errores/N_Error";
import { N_Ast } from "../../Ast/Ast";

export class AsigId extends Expresion {
    constructor(private id: string, private anterior: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): Retorno {
        const generador = Generador.getInstancia();
        if (this.anterior == null) {
            const nvalor = entorno.obtenervar(this.id);
            if (nvalor == null){
                throw new N_Error('Semantico','La variable '+this.id+" no existe",'', this.linea, this.columna);
            } 

            if (nvalor.global) {
                return new Retorno(nvalor.pos + '', nvalor.tipo, false, nvalor);
            }
            else {
                const temp = generador.newTem();
                generador.addExp(temp, 'p', nvalor.pos, '+');
                return new Retorno(temp, nvalor.tipo, true, nvalor);
            }
        }else{
            //temporal
            throw new N_Error('Semantico','La variable '+this.id+" no existe",'', this.linea, this.columna);

        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Id\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result;
    }
}