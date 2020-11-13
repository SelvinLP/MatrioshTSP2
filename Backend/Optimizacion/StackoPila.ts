import { InstruccionOp } from "./Abstracto/InstruccionOp";
import { Codigonuevo } from "./Noptimizacion";

export class CadenaOtro extends InstruccionOp {
    constructor(private result:string, private operador:string = " = ", private cont:string, linea:number){
        super(linea);
    }
    
    public ejecutar(){
        let cadtem =  "  "+ this.result + " " + this.operador + " " + this.cont;
        cadtem += this.puntoycoma ? ";" : "";
        Codigonuevo.push(cadtem);
    }

    public onlycad(){
        let cadtem =  "  "+ this.result + " " + this.operador + " " + this.cont;
        cadtem += this.puntoycoma ? ";" : "";
        return cadtem;
    }
}