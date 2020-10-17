import { Simbolo } from "../Entorno/Simbolo";

export class Retorno{
    
    Ltrue: string;
    Lfalse: string;
    simbol : Simbolo | null;
    constructor(simbol: Simbolo | null = null){
        this.Ltrue = "";
        this.Lfalse = "";
        this.simbol = simbol;
    }
    
}