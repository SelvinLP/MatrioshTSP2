import { Simbolo } from "./Simbolo";

export class Entorno{
    
    private variables : Map<string,Simbolo>;

    constructor(public anterior : Entorno | null){
        this.variables = new Map();
    }

}