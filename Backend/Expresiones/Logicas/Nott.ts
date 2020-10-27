import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class Nott extends Expresion{
    constructor(private izq: Expresion, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const generador = Generador.getInstancia();
        this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
        this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;

        this.izq.Ltrue = this.Lfalse;
        this.izq.Lfalse = this.Ltrue;
        let nizq = this.izq.ejecutar(entorno);
        
        if(nizq.tipo.tipo == Tipos.BOOLEAN){
            const retorno = new Retorno('',nizq.tipo,false);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            return retorno;
        }else{
            throw new N_Error('Semantico','No se puede traducir !' + nizq.valor ,'', this.linea,this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        let result:N_Ast = {posant:ast.posant, posdes:ast.posdes+1,cadena:Cadena};
        result.cadena += result.posdes +" [label =\"!\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = {posant:ast.posdes, posdes:result.posdes+1, cadena:result.cadena};
        if(this.izq != null){
            result=this.izq.ejecutarast(result);
        }
        return result;
    }
    
}