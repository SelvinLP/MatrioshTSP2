export abstract class InstruccionOp {
    
    puntoycoma: boolean;
    constructor(public linea: number) {
        this.puntoycoma = true;
    }

    public abstract ejecutar() : any;
    public onlycad(){}
}