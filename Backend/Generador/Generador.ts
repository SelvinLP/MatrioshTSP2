import { Entorno } from "../Entorno/Entorno";

export class Generador{
    private static generator: Generador;
    private temporal : number;
    private etiqueta : number;
    private codigo : string[];
    private tempstorage : Set<string>;
    sfunc = "";

    private constructor(){
        this.temporal = 0;
        this.etiqueta = 0;
        this.codigo = new Array();
        this.tempstorage = new Set();
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
        const cadtem = this.sfunc + "if (" +  nizq +" "+ operador +" "+ nder + ") goto " +etiq + ";";
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
        const cadtem = this.sfunc + etiq + " = heap[(int)" + pos + "];";
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
        const cadtem = this.sfunc + "/**** " + cad + " ****/";
        this.codigo.push(cadtem);
    }

    //Llamar funcion 
    public llamarfunc(cad:string){
        const cadtem = this.sfunc + cad +"();";
        this.codigo.push(cadtem);
    }

    //Para temporales en funciones
    public gettempstorage(){
        return this.tempstorage;
    }

    public clearTempStorage(){
        this.tempstorage.clear();
    }

    public setTempStorage(tempSt: Set<string>){
        this.tempstorage = tempSt;
    }

    //funciones
    public addinifunc(id: string){
        const cadtem = "\nint " + id +"(){";
        this.codigo.push(cadtem);
    }

    public addfinfunc(){
        const cadtem = "}";
        this.codigo.push(cadtem);
    }

    public addTemp(temp: string){
        if(!this.tempstorage.has(temp))
            this.tempstorage.add(temp);
    }

    //guardar temporales en funciones
    public guardartems(entorno: Entorno) : number{
        if(this.tempstorage.size > 0){
            const temp = this.newTem(); 
            let size = 0;

            this.addComentario('Guardando temporales');
            this.addExp(temp,'p',entorno.size,'+');
            this.tempstorage.forEach((value)=>{
                size++;
                this.setstack(temp,value);
                if(size !=  this.tempstorage.size)
                    this.addExp(temp,temp,'1','+');
            });
            this.addComentario('Fin Guardando temporales');
        }
        let ptr = entorno.size;
        entorno.size = ptr + this.tempstorage.size;
        return ptr;
    }

    public recoverTemps(entorno: Entorno, pos: number){
        if(this.tempstorage.size > 0){
            const temp = this.newTem(); 
            let size = 0;

            this.addComentario('Obteniendo temporales');
            this.addExp(temp,'p',pos,'+');
            this.tempstorage.forEach((value)=>{
                size++;
                this.getstack(value,temp);
                if(size !=  this.tempstorage.size)
                    this.addExp(temp,temp,'1','+');
            });
            this.addComentario('Fin Obteniendo temporales');
            entorno.size = pos;
        }
    }
}