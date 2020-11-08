import { Instruccion } from "../../Abstracto/Instruccion";
import { Entorno } from "../../Entorno/Entorno";
import { N_Ast } from "../../Ast/Ast";
import { Paramfunc } from "./Parametrosfunc";
import { Tipo } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";
import { Generador } from "../../Generador/Generador";

export class Funciont extends Instruccion{

    constructor(public id: string, public parametros : Array<Paramfunc>, public tiporetorno:Tipo, public codigo: Array<Instruccion>, linea : number, columna : number){
        super(linea, columna);
    }

    public ejecutar(entorno : Entorno) {
        //guardamos la funcion
        entorno.guardarfunc(this.id, this, this.linea,this.columna);
        const nfuncion = entorno.obtenerfunc(this.id);
        if(nfuncion == undefined){
            throw new N_Error('Semantico','La funcion no existe: ' + this.id,'', this.linea,this.columna);
        }
        const generador = Generador.getInstancia();
        const newent = new Entorno(entorno);
        const returnLbl = generador.newEtiq();

    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Funcion: "+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let retorno = {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        //Instrucciones
        retorno.cadena += retorno.posdes+" [label =\"Instrucciones\"];\n";
        retorno.cadena += retorno.posant+" -> "+retorno.posdes+";\n";
        //Seccion de items de array
        retorno= {posant:retorno.posdes, posdes:retorno.posdes+1,cadena:retorno.cadena};
        for(const instr of this.codigo){
            let temresult = instr.ejecutarast(retorno);
            retorno.posdes=temresult.posdes;
            retorno.cadena=temresult.cadena;
        }
        return retorno;
    }
}