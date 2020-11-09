import { Instruccion } from "../../Abstracto/Instruccion";
import { TipoDato } from "../../Otros/Tipos";
import { Entorno } from "../../Entorno/Entorno";
import { N_Ast } from "../../Ast/Ast";

export class Forin extends Instruccion{

    constructor(private letoconst:TipoDato, private id:string, private iddireccion:string,private codigo:Instruccion,
         line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
                
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"For in\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};

        result.cadena += result.posdes+" [label =\"Id: "+this.id+"\"];\n";
        result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        result={posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena};
        
        result.cadena += result.posdes+" [label =\"Array: "+this.iddireccion+"\"];\n";
        result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        //Seccion Codigo
        result =this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena});
        return result;
    }
}