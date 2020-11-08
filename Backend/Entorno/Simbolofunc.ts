import { Tipo } from "../Otros/Tipos";
import { Funciont } from "../Instrucciones/Funciones/Funciont";
import { Paramfunc } from "../Instrucciones/Funciones/Parametrosfunc";

export class SimboloFunc {
    tipo: Tipo;
    id: string;
    size: number;
    params: Array<Paramfunc>;

    constructor(funcion: Funciont) {
        this.tipo = funcion.tiporetorno;
        this.id = funcion.id;
        this.size = funcion.parametros.length;
        this.params = funcion.parametros;
    }
}