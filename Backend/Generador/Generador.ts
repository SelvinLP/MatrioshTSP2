export class Generador{
    private static generator: Generador;
    private temporal : number;
    private etiqueta : number;
    private codigo : string[];
    sfunc = "";

    private constructor(){
        this.temporal = 0;
        this.etiqueta = 0;
        this.codigo = new Array();
    }

    //Obtenemos la instancia
    public static getInstancia(){
        return this.generator || (this.generator = new this());
    }

    //Genarar temporal
    public newTem(){
        const cadtem = 'T' + this.temporal;
        this.temporal++;
        return cadtem;
    }

    //Generar Etiqueta
    public newEtiq(){
        const cadtem = 'L' + this.etiqueta;
        this.etiqueta++;
        return cadtem;
    }

    //Cadena agregar goto
    public addGoto(etiq : string){
        const cadtem = this.sfunc + "goto" + etiq + ";";
        this.codigo.push(cadtem);
    }

    //Cadena Expresion
    public addExp(nizq: string, nder:string, operador: string = '', etiquet:string = ""){
        const cadtem = this.sfunc + etiquet + nizq + operador + nder + ";";
        this.codigo.push(cadtem);
    }
}