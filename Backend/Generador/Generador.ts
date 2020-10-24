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
    public addGoto(etiq: string){
        const cadtem = this.sfunc + "goto " + etiq + ";";
        this.codigo.push(cadtem);
    }

    //Cadena agregar expresion
    public addExp(etiquet:string, nizq: any, nder:any = "", operador: string = ''){
        const cadtem = this.sfunc + etiquet + " = " + nizq + " " + operador + " " + nder + ";";
        this.codigo.push(cadtem);
    }

    //Cadena agregar etiqueta
    public addEtiq(etiq: string){
        const cadtem = this.sfunc + etiq + ":";
        this.codigo.push(cadtem);
    }

    //Cadena agregar if
    public addIf(nizq: any, nder: any, operador: string, etiq: string){
        const cadtem = this.sfunc + "if (" +  nizq + operador + nder + ") goto " +etiq + ";";
        this.codigo.push(cadtem);
    }

    //Cadena imprimir
    public addImpr(tipoprint:string, valor:any){
        const cadtem = this.sfunc + "printf(\"%" + tipoprint + "\", " + valor + ");";
        this.codigo.push(cadtem);
    }

    //Guardamos en el stack
    public setstack(pos: any, valor : any){
        const cadtem = this.sfunc + "stack[(int)" + pos + "] = " + valor + ";";
        this.codigo.push(cadtem);
    }

    //Obtener de stack
    public getstack(etiq : any, pos: any){
        const cadtem = this.sfunc + etiq + " = stack[(int)" + pos + "];";
        this.codigo.push(cadtem);
    }

    //Limpia todo
    public limpiartodo(){
        this.codigo = new Array();
        this.temporal = 0;
        this.etiqueta = 0;
    }

    //Asignar a heap
    public setHeap(pos:any, valor:any){
        const cadtem = this.sfunc + "heap[(int)" + pos + "] = " + valor + ";";
        this.codigo.push(cadtem);
    }

    //Obtener heap
    public getHeap(etiq : any, pos: any){
        const cadtem = this.sfunc + etiq + "= Heap[(int)" + pos + "];";
        this.codigo.push(cadtem);
    }

    //Proximo heap
    public sigHeap(){
        const cadtem = this.sfunc + 'h = h + 1;'
        this.codigo.push(cadtem);
    }

    //Cambio de entorno
    public sigEnt(pos: number){
        const cadtem = this.sfunc + "p = p + "+ pos +";"
        this.codigo.push(cadtem);
    }

    //Regreso de Entorno
    public regEnt(pos: number){
        const cadtem = this.sfunc + "p = p - "+ pos +";"
        this.codigo.push(cadtem);
    }

    //Comentario
    public addComentario(cad:any){
        const cadtem = this.sfunc + "/**** " + cad + "****/";
        this.codigo.push(cadtem);
    }

    //Llamar funcion 
    public llamarfunc(cad:string){
        const cadtem = this.sfunc + cad +"();";
        this.codigo.push(cadtem);
    }
}