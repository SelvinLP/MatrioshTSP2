import { InstruccionOp } from "./Abstracto/InstruccionOp";

export class InstrucionesOp extends InstruccionOp{
    constructor(private inst:InstruccionOp[], linea:number){
        super(linea);
    }

    public ejecutar():void {
        for(let ninst of this.inst){
            ninst.ejecutar();
        }
    }
}
