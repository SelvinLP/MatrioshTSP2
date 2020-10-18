import { Simbolo } from "../Entorno/Simbolo";
import { Tipo } from "../Otros/Tipos";

export class Retorno{

    Ltrue: string;
    Lfalse: string;
    constructor(public valor: any, public tipo:Tipo, public stemp: boolean, public simbol: Simbolo | null = null){
        this.Ltrue = "";
        this.Lfalse = "";
    }
    
}