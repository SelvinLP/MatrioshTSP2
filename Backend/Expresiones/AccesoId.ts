import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Retorno } from "../Abstracto/Retorno";
import { N_Ast } from "../Ast/Ast";
import { Generador } from "../Generador/Generador";
import { N_Error } from "../Errores/N_Error";
import { Tipos, Tipo } from "../Otros/Tipos";

export class AccesoId extends Expresion {

    constructor(private id: string, private anterior: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): Retorno {
        const generador = Generador.getInstancia();
        if (this.anterior == null) {
            let simbolo = entorno.obtenervar(this.id);
            if (simbolo == null) {
                throw new N_Error('Semantico','La variable '+this.id+" no existe",'', this.linea, this.columna);
            }
            const temp = generador.newTem();
            if (simbolo.global) {
                generador.getstack(temp,simbolo.pos);
                if (simbolo.tipo.tipo != Tipos.BOOLEAN){
                    return new Retorno(temp,simbolo.tipo, true, simbolo);
                } 

                const retorno = new Retorno('', simbolo.tipo, false, simbolo);
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                
                generador.addIf(temp, '1', '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }
            else {
                const tempAux = generador.newTem(); 
                generador.addExp(tempAux, 'p', simbolo.pos, '+');
                generador.getstack(temp, tempAux);
                if (simbolo.tipo.tipo != Tipos.BOOLEAN){
                    return new Retorno(temp,simbolo.tipo, true, simbolo);
                } 

                const retorno = new Retorno('', simbolo.tipo,false);
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;

                generador.addIf(temp, '1', '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }
        }else{
            //Temporal
            throw new N_Error('Semantico','La variable '+this.id+" no existe",'', this.linea, this.columna);
        }
    }
    
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\""+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";

        return {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
    }
}