import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { Tipos } from "../Otros/Tipos";

export class While extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        const generador = Generador.getInstancia();
        const newentorno = new Entorno(entorno);
        const etiqshile = generador.newEtiq();
        generador.addComentario('WHILE');
        generador.addEtiq(etiqshile);
        const condicion = this.condicion.ejecutar(entorno);
        if(condicion.tipo.tipo == Tipos.BOOLEAN){
            while(condicion.valor == true){
                newentorno.break = condicion.Lfalse;
                newentorno.continue = etiqshile;
                generador.addEtiq(condicion.Ltrue);
                this.codigo.ejecutar(newentorno);
                generador.addGoto(etiqshile);
                generador.addEtiq(condicion.Lfalse);
                generador.addComentario('FIN WHILE');
                return;
            }
        }else{
            throw new N_Error('Semantico','La condicion no es booleana en el while','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"While\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Seccion Expresion
        result=this.condicion.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        //Seccion Codigo
        result=this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        return result;
    }
}