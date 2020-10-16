//Tipos de variables
export enum Tipo{
    NUMBER = "number",
    STRING = "string",
    BOOLEAN = "boolean",
    NULL = "null",
    ARRAY = "array",
    TYPE = "type"
}


//Variables de retorno
export type Retorno ={
    valor : any,
    tipo : Tipo
}

//Tipos de operaciones Aritmeticas
export enum TipoAritmetico{
    MAS,
    MENOS,
    MULT,
    DIV,
    POT,
    MOD,
    INC,
    DEC,
    UMENOS,
    UMAS
}

//Tipos de operaciones logicas
export enum TipoRelacional{
    MAYORQUE,
    MENORQUE,
    MAYORIGUAL,
    MENORIGUAL,
    IGUAL,
    DIFERENCIA
}

//Tipos de operaciones logicas
export enum TipoLogica{
    AND,
    OR,
    NOT 
}

//Tipo de dato
export enum TipoDato{
    LET ="let",
    CONST = "const",
    NADA =""
}