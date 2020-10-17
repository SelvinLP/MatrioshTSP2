export class Simbolo{

    LetoConst: boolean;
    id: string;
    global: boolean;

    constructor(LetoConst:boolean, id: string, global:boolean){
        this.LetoConst = LetoConst;
        this.id = id;
        this.global = global;
    }
}