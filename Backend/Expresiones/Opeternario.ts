import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { N_Ast } from "../Ast/Ast";
import { Retorno } from "../Abstracto/Retorno";
import { Generador } from "../Generador/Generador";
import { Tipo, Tipos } from "../Otros/Tipos";

export class Opeternario extends Expresion{

    constructor(private condicion: Expresion, private valortrue:Expresion, private valorfalse:Expresion,
         linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): Retorno {
        const generator = Generador.getInstancia();
        generator.addComentario('TERNARIO');
        const condicion = this.condicion?.ejecutar(entorno);
        const newwntorno = new Entorno(entorno);
        const salidatrue = generator.newEtiq();
        if(condicion.tipo.tipo == Tipos.BOOLEAN){
            //valores verdaderos
            generator.addEtiq(condicion.Ltrue);
            let condtrue = this.valortrue.ejecutar(newwntorno);
            generator.addGoto(salidatrue);
            //valores falsos
            generator.addEtiq(condicion.Lfalse);
            let condfalse = this.valorfalse.ejecutar(newwntorno);

            generator.addComentario('FIN TERNARIO');
            let retorno = condtrue;
            return retorno;
            
        }else{
            throw new N_Error('Semantico','La condicion no es booleana:' + condicion.tipo.tipo ,'', this.linea,this.columna);
        }
        
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Operador Terneario\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let resultado={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        resultado=this.condicion.ejecutarast({posant:ast.posdes, posdes:resultado.posdes,cadena:resultado.cadena});
        resultado=this.valortrue.ejecutarast({posant:ast.posdes, posdes:resultado.posdes,cadena:resultado.cadena});
        resultado=this.valorfalse.ejecutarast({posant:ast.posdes, posdes:resultado.posdes,cadena:resultado.cadena});
        return resultado;
    }

}