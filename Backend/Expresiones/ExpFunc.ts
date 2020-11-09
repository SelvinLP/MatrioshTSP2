import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Retorno } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Generador } from "../Generador/Generador";
import { Tipos } from "../Otros/Tipos";
import { N_Ast } from "../Ast/Ast";

export class ExpFunc extends Expresion{

    constructor(public id: string, public params: Array<Expresion>, public anterior: Expresion | null,line : number, column: number){
        super(line,column);
    }

    public ejecutar(entorno: Entorno) : Retorno{
        if(this.anterior == null){
            const funcactual = entorno.buscarfunc(this.id);
            if(funcactual == null){
                throw new N_Error('Semantico','La funcion no existe: ' + this.id,'', this.linea,this.columna);
            }
                
            const paramsValues = new Array<Retorno>();
            const generator = Generador.getInstancia();

            const size = generator.guardartems(entorno); //Guardo temporales
            this.params.forEach((param)=>{
                paramsValues.push(param.ejecutar(entorno));
            })
            //TODO comprobar parametros correctos
            const temp = generator.newTem();
            //Paso de parametros en cambio simulado
            if(paramsValues.length != 0){
                generator.addExp(temp,'p',entorno.size + 1,'+'); //+1 porque la posicion 0 es para el retorno;
                paramsValues.forEach((value,index)=>{
                    //TODO paso de parametros booleanos
                    generator.setstack(temp,value.valor);
                    if(index != paramsValues.length - 1)
                        generator.addExp(temp,temp,'1','+');
                });    
            }

            generator.sigEnt(entorno.size);
            generator.llamarfunc(funcactual.id);
            generator.getstack(temp,'p');
            generator.regEnt(entorno.size);
            generator.recoverTemps(entorno,size);
            generator.addTemp(temp);

            if (funcactual.tipo.tipo != Tipos.BOOLEAN){
                return new Retorno(temp,funcactual.tipo,true);
            } 

            const retorno = new Retorno('', funcactual.tipo, false);
            this.Ltrue = this.Ltrue == '' ? generator.newEtiq() : this.Ltrue;
            this.Lfalse = this.Lfalse == '' ? generator.newEtiq() : this.Lfalse;
            generator.addIf(temp, '1', '==', this.Ltrue);
            generator.addGoto(this.Lfalse);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            return retorno;
        }else{
            throw new N_Error('Semantico','La funcion no existe: ' + this.id,'', this.linea,this.columna);
        }

    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Llamar funcion: "+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let retorno={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};

        return retorno;
    }
}