export class Tipo{

    constructor(public tipo: Tipos, public idtipo: string = '', public struct: null = null){
    }

}

//Tipos de variables
export enum Tipos{
    NUMBER = "number",
    STRING = "string",
    BOOLEAN = "boolean",
    NULL = "null",
    VOID = "void",
    ARRAY = "array",
    TYPE = "type"
}
