import { Tipo } from "../Otros/Tipos";

export class Simbolo{

    constructor(public LetoConst:boolean, public id: string, public tipo:Tipo, public pos:number, 
        public sheap:boolean = false, public global:boolean){

    }
}