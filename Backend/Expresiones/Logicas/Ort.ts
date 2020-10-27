import { Expresion } from "../../Abstracto/Expresion";
import { N_Ast } from "../../Ast/Ast";
import { Entorno } from "../../Entorno/Entorno";
import { Retorno } from "../../Abstracto/Retorno";
import { Generador } from "../../Generador/Generador";
import { Tipos } from "../../Otros/Tipos";
import { N_Error } from "../../Errores/N_Error";

export class Ort extends Expresion{
    constructor(private izq: Expresion, public der:Expresion, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno): Retorno{
        const generador = Generador.getInstancia();
        this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
        this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;

        this.izq.Ltrue = this.der.Ltrue = this.Ltrue;
        this.izq.Lfalse = generador.newEtiq();
        this.der.Lfalse = this.Lfalse;

        const nizq = this.izq.ejecutar(entorno);
        generador.addEtiq(this.izq.Lfalse);
        const nder = this.der.ejecutar(entorno);

        if(nizq.tipo.tipo == Tipos.BOOLEAN && nder.tipo.tipo == Tipos.BOOLEAN){
            const retorno = new Retorno('',nizq.tipo,false);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.der.Lfalse;
            return retorno;
        }else{
            throw new N_Error('Semantico','No se puede traducir' + nizq.valor +" && "+ nder.valor,'', this.linea,this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Or\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        result=this.izq.ejecutarast(result);
        result.posant = ast.posdes;
        result=this.der.ejecutarast(result);
        return result;
    }
    
}