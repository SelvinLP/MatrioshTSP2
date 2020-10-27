import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { Tipos } from "../Otros/Tipos";

export class Ifelse extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, private elsest : Instruccion | null,
        linea : number, columna : number){
        super(linea, columna);
    }

    public ejecutar(entorno:Entorno) {
        const generator = Generador.getInstancia();
        generator.addComentario('IF');
        const cond = this.condicion?.ejecutar(entorno);
        const newent = new Entorno(entorno);

        if(cond.tipo.tipo == Tipos.BOOLEAN){
            generator.addEtiq(cond.Ltrue);
            this.codigo.ejecutar(newent);

            if(this.elsest != null){
                const newetq = generator.newEtiq();
                generator.addGoto(newetq);
                generator.addEtiq(cond.Lfalse);
                this.elsest.ejecutar(entorno);
                generator.addEtiq(newetq);
            }
            else{
                generator.addEtiq(cond.Lfalse);
            }
        }else{
            throw new N_Error('Semantico','La condicion no es booleana:' + cond.tipo.tipo ,'', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"If\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast ;
        //Seccion Condicion
        result=this.condicion.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        //Seccion Codigo
        result=this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        //Seccion Else
        if(this.elsest != null){
            let Cadena:string=result.cadena+"\n";
            Cadena += result.posdes+" [label =\"Else\"];\n";
            Cadena += ast.posdes+" -> "+result.posdes+";\n";
            result =this.elsest.ejecutarast({posant:result.posdes, posdes:result.posdes+1,cadena:Cadena});
        }
        return result;
    }
    
}