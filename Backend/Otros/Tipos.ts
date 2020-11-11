export class Tipo{

    constructor(public tipo: Tipos, public idtipo: string = '', public dimension: number = 0){
    }

}

//Tipos de variables
export enum Tipos{
    NUMBER = "number",
    STRING = "string",
    BOOLEAN = "boolean",
    NULL = "null",
    ARRAY = "array",
    TYPE = "type"
}

//Tipo de dato
export enum TipoDato{
    LET = "let",
    CONST = "const",
    NADA = " "
}

export enum TipoRelacional{
    MAYORQUE = ">",
    MENORQUE = "<",
    MAYORIGUAL = ">=",
    MENORIGUAL = "<=",
    IGUAL = "==",
    DIFERENCIA = "!="
}