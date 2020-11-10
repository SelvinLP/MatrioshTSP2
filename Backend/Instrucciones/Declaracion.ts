import { Instruccion } from "../Abstracto/Instruccion"
import { N_Ast } from "../Ast/Ast";
import { Tipo, TipoDato, Tipos } from "../Otros/Tipos";
import { Expresion } from "../Abstracto/Expresion";
import { Generador } from "../Generador/Generador";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";

export class Declaracion extends Instruccion{
    constructor(private letoconst:TipoDato, private id:string, private tipo:Tipo, private posiblearr:[], private valor:Expresion, 
        linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(entorno:Entorno){
        if(this.posiblearr == null){
            if(this.valor == null){
                //Validaciones de const
                if(this.letoconst == TipoDato.CONST){
                    throw new N_Error('Semantico','La variable '+this.id+" tipo const no tiene definido un valor",'', this.linea, this.columna);
                }else{
                    if(this.tipo == null){
                        this.tipo = new Tipo(Tipos.NULL);
                    }
                    entorno.guardarvar(true, this.id, this.tipo, false, this.linea, this.columna); 
                    //validaciones de codigo intermedio
                    this.codigointermedio(entorno, null);
                }
            }else{
                let resp=this.valor.ejecutar(entorno);
                //Definicion de tipo sino tiene
                if( this.tipo == null){
                    this.tipo=resp.tipo
                }else if(this.tipo.tipo != resp.tipo.tipo){
                    throw new N_Error('Semantico','La variable '+this.id+" no es de tipo compatible con la expresion",'', this.linea, this.columna);
                }
                if(this.letoconst == TipoDato.CONST){ //const es false porque no se puede editar
                    entorno.guardarvar(false, this.id, this.tipo, false, this.linea, this.columna);
                }else{
                    entorno.guardarvar(true, this.id, this.tipo, false, this.linea, this.columna);
                }
                
                //validaciones codigo intermedio
                this.codigointermedio(entorno,resp);
            }
        }else{

        }
    }

    public codigointermedio(entorno:Entorno, nvalor:any){
        const generator = Generador.getInstancia();
        let variable=entorno.obtenervar(this.id);
        if(variable?.global){
            generator.addComentario("DECLARACION");
            if(this.tipo.tipo == Tipos.BOOLEAN){
                
                const etiqnueva = generator.newEtiq();
                generator.addEtiq(nvalor.Ltrue);
                generator.setstack(variable.pos,'1');
                generator.addGoto(etiqnueva);
                generator.addEtiq(nvalor.Lfalse);
                generator.setstack(variable.pos,'0');
                generator.addEtiq(etiqnueva);
                
            }else{
                generator.setstack(variable.pos,nvalor.valor);
            }
            generator.addComentario("FIN DECLARACION");
        }else{
            generator.addComentario("DECLARACION EN FUNCION");
            const temnueva = generator.newTem(); 
            //generator.freeTemp(temp);
            generator.addExp(temnueva, 'p', variable?.pos,'+');
            if(this.tipo.tipo == Tipos.BOOLEAN){
                const tempetiq = generator.newEtiq();
                generator.addEtiq(nvalor.Ltrue);
                generator.setstack(temnueva,'1');
                generator.addGoto(tempetiq);
                generator.addEtiq(nvalor.Lfalse);
                generator.setstack(temnueva,'0');
                generator.addEtiq(tempetiq);
            }else{
                generator.setstack(temnueva,nvalor.valor);
            }
            generator.addComentario("FIN DECLARACION");
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Declaracion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Id
        if(this.letoconst == TipoDato.CONST){
            Cadena += (ast.posdes+1)+" [label =\"const\"];\n";
            Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        }else{
            Cadena += (ast.posdes+1)+" [label =\"let\"];\n";
            Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        }
        Cadena += (ast.posdes+2)+" [label =\""+this.id+"\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+2)+";\n";
        result={posant:ast.posdes+2, posdes:ast.posdes+3,cadena:Cadena};
        //si es array
        if(this.posiblearr != null){
            result.cadena += (result.posdes)+" [label =\"[]\"];\n";
            result.cadena += ast.posdes+" -> "+(result.posdes)+";\n";
            result={posant:result.posdes, posdes:result.posdes+1,cadena:result.cadena};
        }
        if(this.valor !=null){
            //=
            result.cadena += (result.posdes)+" [label =\"=\"];\n";
            result.cadena += ast.posdes+" -> "+(result.posdes)+";\n";
            //Expresion
            result=this.valor.ejecutarast({posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena});
        }
        return result;
    }
}