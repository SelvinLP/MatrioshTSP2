import { InstruccionOp } from "./Abstracto/InstruccionOp";
import { Codigonuevo } from "./Noptimizacion";

export class RetornoOp extends InstruccionOp {
    constructor(private cuerpo:string, linea:number){
        super(linea);
    }

    public ejecutar(){
        let cadtem =  "  return " + this.cuerpo + ";"
        Codigonuevo.push(cadtem);
    }
}