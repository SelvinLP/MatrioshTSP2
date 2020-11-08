import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { N_Error } from "../Errores/N_Error";
import { Tipos } from "../Otros/Tipos";
import { Igualt } from "../Expresiones/Relacionales/Igual";

export class Case {
    constructor(public id:Expresion, public cuerpo:Array<Instruccion>){}
}
export class SwitchCase extends Instruccion{

    constructor(private condicion : Expresion, private casos : Array<Case>, private vdefault:Array<Instruccion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        const generator = Generador.getInstancia();
        generator.addComentario('SWITCH');
        let banderadefault = generator.newTem();
        let salida = generator.newTem(); // Salida
        generator.addExp(banderadefault,"0");
        let numerocase = 1;
        for(const nodovalor of this.casos){
            generator.addComentario('Case no.' + numerocase);
            let comparacion = new Igualt(this.condicion,nodovalor.id,this.linea,this.columna).ejecutar(entorno);
            generator.addEtiq(comparacion.Ltrue);
            //Lista de Instruciones
            const newent = new Entorno(entorno);
            newent.break = salida;
            generator.addExp(banderadefault,"1");
            for(const cuerpocaso of nodovalor.cuerpo){
                cuerpocaso.ejecutar(newent);
            }
            generator.addEtiq(comparacion.Lfalse);
            //solo para comemntario de que numero de case es 
            numerocase++;
        }
        
        if(this.vdefault != null){
            generator.addComentario('Default');
            let defaulttrue = generator.newEtiq();
            generator.addIf(banderadefault, "0", "==",defaulttrue);
            generator.addGoto(salida);
            generator.addEtiq(defaulttrue);

            const newent = new Entorno(entorno);
            for(const cuerpocaso of this.vdefault){
                cuerpocaso.ejecutar(newent);
            }

        }
        generator.addEtiq(salida);
        generator.addComentario('FIN SWITCH');
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Switch\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Seccion Condicion
        Cadena += (ast.posdes+1)+" [label =\"Condicion\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        result=this.condicion.ejecutarast({posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena});
        //Seccion Codigo
        result={posant:ast.posdes, posdes:result.posdes,cadena:result.cadena};
        for(const nodovalor of this.casos){
            result.cadena += result.posdes+" [label =\"Case\"];\n";
            result.cadena += result.posant+" -> "+result.posdes+";\n";
            let result2={posant:result.posant, posdes:result.posdes+1,cadena:result.cadena}
            //Expresion
            result=nodovalor.id.ejecutarast({posant:result.posant, posdes:result.posdes+1,cadena:result.cadena});

            //Instrucciones
            result.cadena += result.posdes+" [label =\"Instrucciones\"];\n";
            result.cadena += result2.posant+" -> "+result.posdes+";\n";
            result={posant:result.posdes, posdes:result.posdes+1,cadena:result.cadena}
            //Seccion de items de array
            for(const instr of nodovalor.cuerpo){
                let temresult = instr.ejecutarast(result);
                result.posdes=temresult.posdes;
                result.cadena=temresult.cadena;
            }
            result.cadena += result.posdes+" [label =\"Mas Casos\"];\n";
            result.cadena += result2.posant+" -> "+result.posdes+";\n";
            result={posant:result.posdes, posdes:result.posdes+1,cadena:result.cadena}
        }
        
        if(this.vdefault!=null){
            result.cadena += result.posdes+" [label =\"Default\"];\n";
            result.cadena += result.posant+" -> "+result.posdes+";\n";
            result={posant:result.posant, posdes:result.posdes+1,cadena:result.cadena}
            //Seccion de items de array
            for(const instr of this.vdefault){
                let temresult = instr.ejecutarast(result);
                result.posdes=temresult.posdes;
                result.cadena=temresult.cadena;
            }
        }

        return result;
    }
}