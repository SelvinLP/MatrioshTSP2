import { Simbolo } from "./Simbolo";
import { Tipo, Tipos } from "../Otros/Tipos";
import { N_Error } from "../Errores/N_Error";
import { L_Simbs, N_Simbolo } from "../Otros/L_Simb";

export class Entorno{
    
    private variables : Map<string,Simbolo>;
    size:number;
    actualFunc :any/*: SymbolFunction | null;*/;
    break: string | null;
    continue: string | null;
    constructor(public anterior : Entorno | null = null){
        this.variables = new Map();
        this.size = anterior?.size || 0;
        this.actualFunc = anterior?.actualFunc || null;
        this.break = anterior?.break || null;
        this.continue = anterior?.continue || null;
    }

    public guardarvar(letoconst: boolean,id: string, tipo: Tipo, sref: boolean, linea: number, columna: number){
        let env : Entorno | null = this;
        if(env.variables.has(id)){
            if(tipo.tipo == Tipos.ARRAY){
                throw new N_Error('Semantico','El array ya existe: '+id,'', linea, columna);  
            }else{
                throw new N_Error('Semantico','La variable ya existe: '+id,'', linea, columna);  
            }
        }
        this.variables.set(id, new Simbolo(letoconst, id, tipo, this.size++, sref, this.anterior == null));
        //tabla de simbolos
        let tipodevariable = letoconst ? "let" : "const";
        let cadgobal = this.anterior == null ? "Global" : "Funcion";
        L_Simbs.push(new N_Simbolo(tipodevariable,id,tipo.tipo,"", cadgobal));
    }

    public obtenervar(id: string) : Simbolo | undefined | null{
        let env : Entorno | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    } 
    
}