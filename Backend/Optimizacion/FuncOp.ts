import { InstruccionOp } from "./Abstracto/InstruccionOp";
import { Codigonuevo } from "./Noptimizacion";

export class FuncOp extends InstruccionOp {
    constructor(private tipo:string ,private id:string, private cuerpo:InstruccionOp, linea:number){
        super(linea);
    }
    
    public ejecutar(){
        let cadtem = this.tipo + " " + this.id + " (){"
        Codigonuevo.push(cadtem);
        this.cuerpo.ejecutar();
        
        cadtem = "}";
        Codigonuevo.push(cadtem);

    }
}