import { Tipo } from "../Otros/Tipos";

export class Simbolo{

    LetoConst: boolean;
    id: string;
    tipo: Tipo;
    posh: number;
    sheap: boolean;
    global: boolean;

    constructor(LetoConst:boolean, id: string, tipo:Tipo, posh:number, sheap:boolean = false, global:boolean){
        this.LetoConst = LetoConst;
        this.id = id;
        this.tipo = tipo,
        this.posh = posh;
        this.sheap = sheap;
        this.global = global;
    }
}