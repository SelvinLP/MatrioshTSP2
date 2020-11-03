import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { Tipos } from "../Otros/Tipos";

export class Dowhile extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        const generador = Generador.getInstancia();
        const newentorno = new Entorno(entorno);
        generador.addComentario('DOWHILE');
        newentorno.continue = this.condicion.Ltrue = generador.newEtiq();
        newentorno.break = this.condicion.Lfalse = generador.newEtiq();
        generador.addEtiq(this.condicion.Ltrue);
        this.codigo.ejecutar(newentorno);
        const condicion = this.condicion.ejecutar(entorno);
        if(condicion.tipo.tipo == Tipos.BOOLEAN){
            generador.addEtiq(condicion.Lfalse);
            generador.addComentario('FIN DOWHILE');
            return;
        }else{
            throw new N_Error('Semantico','La condicion no es booleana en el dowhile','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Do while\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Seccion Codigo
        result=this.codigo.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        //Seccion Condicion
        result=this.condicion.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});

        return result;
    }
    
}