import { InstruccionOp } from "./Abstracto/InstruccionOp";
import { L_Optimizacion, N_Optim, Codigonuevo } from "./Noptimizacion";

export class Opearitmetica extends InstruccionOp {
    constructor(private temresult:string, private opei:string | number, private operador:string, 
        private oped:string | number, linea:number){
        super(linea);
    }
    
    public ejecutar(){
        let cadtem = "  ";
        if(this.temresult == this.opei.toString() || this.temresult == this.oped.toString() ){
            if(this.operador == '+' || this.operador == '-'){
                let number = this.operador == '+' ? "6" : "7";
                if(typeof this.opei == 'number'){
                    if(this.opei == 0 && this.operador == '+' ){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Eliminacion algebraica", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";","",this.linea));
                        return;
                    }
                }else if(typeof this.oped == 'number'){
                    if(this.oped == 0){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Eliminacion algebraica", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";","",this.linea));
                        return;
                    }
                }
            }else if(this.operador == '*' || this.operador == '/'){
                let number = this.operador == '*' ? "8" : "9";
                if(typeof this.opei == 'number'){
                    if(this.opei == 1){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Eliminacion algebraica", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";","",this.linea));
                        return;
                    }else if(this.opei == 2 && this.operador == '*' ){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. 14: Reduccion por la fuerza", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = "+this.oped+" + "+this.oped+";",this.linea));
                        cadtem += this.temresult+" = "+this.oped+" + "+this.oped+";";
                        Codigonuevo.push(cadtem);
                        return;
                    }else if(this.opei == 0 ){
                        let number = this.operador == '*' ? "15" : "16";
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Reduccion por la fuerza", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = 0;",this.linea));
                        cadtem += this.temresult+" = 0;";
                        Codigonuevo.push(cadtem);
                        return;
                    }
                }else if(typeof this.oped == 'number'){
                    if(this.oped == 1){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Eliminacion algebraica ", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";","",this.linea));
                        return;
                    }else if(this.oped == 2 && this.operador == '*'){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. 14: Reduccion por la fuerza",  
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = "+this.opei+" + "+this.opei+";",this.linea));
                        cadtem += this.temresult+" = "+this.opei+" + "+this.opei+";";
                        Codigonuevo.push(cadtem);
                        return;
                    }else if(this.oped == 0){
                        let number = this.operador == '*' ? "15" : "16";
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Reduccion por la fuerza",  
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = 0;",this.linea));
                        cadtem += this.temresult+" = 0;";
                        Codigonuevo.push(cadtem);
                        return;
                    }
                }
            }
        }else{
            if(this.operador == '+' || this.operador == '-'){
                let number = this.operador == '+' ? "10" : "11";
                if(typeof this.opei == 'number'){
                    if(this.opei == 0 && this.operador == '+' ){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Simplificación algebraica", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = "+this.oped+";",this.linea));
                        cadtem += this.temresult+" = "+this.oped+";";
                        Codigonuevo.push(cadtem);
                        return;
                    }
                }else if(typeof this.oped == 'number'){
                    if(this.oped == 0){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Simplificación algebraica", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = "+this.opei+";",this.linea));
                        cadtem += this.temresult+" = "+this.opei+";";
                        Codigonuevo.push(cadtem);
                        return;
                    }
                }
            }else if(this.operador == '*' || this.operador == '/'){
                let number = this.operador == '*' ? "12" : "13";
                if(typeof this.opei == 'number'){
                    if(this.opei == 1){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Simplificación algebraica", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = "+this.oped+";",this.linea));
                        cadtem += this.temresult+" = "+this.oped+";";
                        Codigonuevo.push(cadtem);
                        return;
                    }else if(this.opei == 2 && this.operador == '*' ){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. 14: Reduccion por la fuerza", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = "+this.oped+" + "+this.oped+";",this.linea));
                        cadtem += this.temresult+" = "+this.oped+" + "+this.oped+";";
                        Codigonuevo.push(cadtem);
                        return;
                    }else if(this.opei == 0 ){
                        let number = this.operador == '*' ? "15" : "16";
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Reduccion por la fuerza",  
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = 0;",this.linea));
                        cadtem += this.temresult+" = 0;";
                        Codigonuevo.push(cadtem);
                        return;
                    }
                }else if(typeof this.oped == 'number'){
                    if(this.oped == 1){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Simplificación algebraica", 
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = "+this.opei+";",this.linea));
                        cadtem += this.temresult+" = "+this.opei+";";
                        Codigonuevo.push(cadtem);
                        return;
                    }else if(this.oped == 2 && this.operador == '*'){
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. 14: Reduccion por la fuerza",  
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = "+this.opei+" + "+this.opei+";",this.linea));
                        cadtem += this.temresult+" = "+this.opei+" + "+this.opei+";";
                        Codigonuevo.push(cadtem);
                        return;
                    }else if(this.oped == 0){
                        let number = this.operador == '*' ? "15" : "16";
                        L_Optimizacion.push(new N_Optim("Mirilla", "No. "+number+": Reduccion por la fuerza",  
                        this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";",this.temresult+" = 0;",this.linea));
                        cadtem += this.temresult+" = 0;";
                        Codigonuevo.push(cadtem);
                        return;
                    }
                }
            }
        }
        
        cadtem += this.temresult+" = "+this.opei+" "+this.operador+" "+this.oped+";";
        Codigonuevo.push(cadtem);
    }
}