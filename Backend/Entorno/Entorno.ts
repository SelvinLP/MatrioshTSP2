import { Simbolo } from "./Simbolo";
import { Tipo, Tipos } from "../Otros/Tipos";
import { N_Error } from "../Errores/N_Error";
import { L_Simbs, N_Simbolo } from "../Otros/L_Simb";
import { SimboloFunc } from "./Simbolofunc";
import { Funciont } from "../Instrucciones/Funciones/Funciont";

export class Entorno{
    
    private variables : Map<string,Simbolo>;
    private funciones: Map<string, SimboloFunc>;
    size:number;
    actualFunc :any| SimboloFunc | null;
    break: string | null;
    continue: string | null;
    return: string | null;
    constructor(public anterior : Entorno | null = null){
        this.variables = new Map();
        this.funciones = new Map();
        this.size = anterior?.size || 0;
        this.actualFunc = anterior?.actualFunc || null;
        this.break = anterior?.break || null;
        this.continue = anterior?.continue || null;
        this.return = anterior?.return || null;

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
    
    public guardarfunc(id: string, newfunc : Funciont, linea: number, columna: number){
        let env : Entorno | null = this;
        if(env.funciones.has(id)){
            throw new N_Error('Semantico','La funcion ya existe: '+id,'', linea, columna); 
        }
        this.funciones.set(id,new SimboloFunc(newfunc));
    }

    public obtenerfunc(id: string) : SimboloFunc | undefined{
        let retorno = this.funciones.get(id);
        return retorno;
    }
}