export abstract class InstruccionOp {
    
    constructor(public linea: number) {
    }

    public abstract ejecutar() : any;
}