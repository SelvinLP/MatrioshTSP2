//Definimos y exportamos el array
export let L_Optimizacion: Array<N_Optim> = new Array();

export class N_Optim {
    constructor(private tipo:string, private regla:string, private codigoeli:string, private codigoagr:string,
        private line:number){
    }
}

export let Codigonuevo: Array<String> = new Array();
