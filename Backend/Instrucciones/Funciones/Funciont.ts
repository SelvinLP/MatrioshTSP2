import { Instruccion } from "../../Abstracto/Instruccion";
import { Entorno } from "../../Entorno/Entorno";
import { N_Ast } from "../../Ast/Ast";
import { Paramfunc } from "./Parametrosfunc";
import { Tipo, Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";
import { Generador } from "../../Generador/Generador";

export class Funciont extends Instruccion{

    private primerapasada: boolean;
    constructor(public id: string, public parametros : Array<Paramfunc>, public tiporetorno:Tipo, public codigo: Instruccion, linea : number, columna : number){
        super(linea, columna);
        this.primerapasada = true;  //se debe pasar una vez
    }

    public ejecutar(entorno : Entorno) {
        if(this.primerapasada){
            //guardamos la funcion
            entorno.guardarfunc(this.id, this, this.linea,this.columna);
            this.primerapasada = false;
        }

        const nfuncion = entorno.obtenerfunc(this.id);
        if(nfuncion == undefined){
            throw new N_Error('Semantico','La funcion no existe: ' + this.id,'', this.linea,this.columna);
        }
        const generador = Generador.getInstancia();
        const newwnt = new Entorno(entorno);
        const Etiqreturn = generador.newEtiq();
        const tempStorage = generador.gettempstorage();

        newwnt.setentfunc(nfuncion,Etiqreturn);
        for(let nparam of this.parametros){
            newwnt.guardarvar(true, nparam.id, nparam.tipo, false, this.linea, this.columna);
        }

        generador.clearTempStorage();
        generador.sfunc = '\t';
        generador.addinifunc(nfuncion.id);
        this.codigo.ejecutar(newwnt);
        //guardamos para las variables
        
        generador.addEtiq(Etiqreturn);
        generador.addfinfunc();
        generador.sfunc = '';
        generador.setTempStorage(tempStorage);

    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Funcion: "+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let retorno = {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        //Seccion de items de array
        retorno = this.codigo.ejecutarast(retorno);
        return retorno;
    }
}