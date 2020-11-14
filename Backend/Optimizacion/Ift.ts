import { InstruccionOp } from "./Abstracto/InstruccionOp";
import { Codigonuevo, L_Optimizacion, N_Optim } from "./Noptimizacion";
import { InstrucionesOp } from "./Instrucciones";

export class IfOp extends InstruccionOp {
    constructor(private izq:string|number,private ope:string, private der:string|number, private goto1:InstruccionOp
        , private goto2:InstruccionOp, private etiq:InstrucionesOp, linea:number){
        super(linea);
    }
    
    public ejecutar(){
        //Regla 3 y 4
        let acceso = false;
        let bandera =false;
        let cadtem = "";
        if(typeof this.izq == 'string' && typeof this.der == 'string'){
            if(this.izq == this.der){
                if(this.ope == "=="){
                    L_Optimizacion.push(new N_Optim("Mirilla", "No. 3: Eliminacion de codigo muerto", 
                    "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
                    ,this.goto1.onlycad()+"",this.linea));
                    cadtem += this.goto1.onlycad()+"";
                    Codigonuevo.push(cadtem);
                    cadtem = this.etiq.onlycad() +"";
                    Codigonuevo.push(cadtem);
                    return;
                }else if(this.ope == "!="){
                    L_Optimizacion.push(new N_Optim("Mirilla", "No. 4: Eliminacion de codigo muerto", 
                    "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
                    ,this.goto2.onlycad()+"",this.linea));
                    cadtem += this.goto2.onlycad()+"";
                    Codigonuevo.push(cadtem);
                    cadtem = this.etiq.onlycad() +"";
                    Codigonuevo.push(cadtem);
                    return;
                }
            }
        }else if(typeof this.izq == 'number' && typeof this.der == 'number'){
            if(this.ope == "=="){
                if(this.izq == this.der){
                    console.log("s")
                    acceso = true;
                    bandera = true;
                }else{
                    acceso = true;
                    bandera = false;
                }
            }else if(this.ope == "!="){
                if(this.izq != this.der){
                    acceso = true;
                    bandera = true;
                }else{
                    acceso = true;
                    bandera = false;
                }
            }else if(this.ope == ">="){
                if(this.izq >= this.der){
                    acceso = true;
                    bandera = true;
                }else{
                    acceso = true;
                    bandera = false;
                }
            }else if(this.ope == "<="){
                if(this.izq <= this.der){
                    acceso = true;
                    bandera = true;
                }else{
                    acceso = true;
                    bandera = false;
                }
            }else if(this.ope == ">"){
                if(this.izq > this.der){
                    acceso = true;
                    bandera = true;
                }else{
                    acceso = true;
                    bandera = false;
                }
            }else if(this.ope == "<"){
                if(this.izq < this.der){
                    acceso = true;
                    bandera = true;
                }else{
                    acceso = true;
                    bandera = false;
                }
            }
        }
        if(acceso){
            if(bandera){
                L_Optimizacion.push(new N_Optim("Mirilla", "No. 3: Eliminacion de codigo muerto", 
                "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
                ,this.goto1.onlycad()+"",this.linea));
                cadtem += this.goto1.onlycad()+"";
                Codigonuevo.push(cadtem);
                cadtem = this.etiq.onlycad() +"";
                Codigonuevo.push(cadtem);
            }else{
                L_Optimizacion.push(new N_Optim("Mirilla", "No. 4: Eliminacion de codigo muerto", 
                "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
                ,this.goto2.onlycad()+"",this.linea));
                cadtem += this.goto2.onlycad()+"";
                Codigonuevo.push(cadtem);
                cadtem = this.etiq.onlycad() +"";
                Codigonuevo.push(cadtem);
            }
            return;
        }
        //Regla 2
        if(this.ope == "=="){
            L_Optimizacion.push(new N_Optim("Mirilla", "No. 2: Eliminacion de codigo muerto", 
            "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
            ,"if( "+this.izq+" != "+this.der+")"+ this.goto2.onlycad(),this.linea));
            cadtem += "if( "+this.izq+" != "+this.der+")"+ this.goto2.onlycad()
            Codigonuevo.push(cadtem);
            return;
        }else if(this.ope == "!="){
            L_Optimizacion.push(new N_Optim("Mirilla", "No. 2: Eliminacion de codigo muerto", 
            "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
            ,"if( "+this.izq+" == "+this.der+")"+ this.goto2.onlycad(),this.linea));
            cadtem += "if( "+this.izq+" == "+this.der+")"+ this.goto2.onlycad()
            Codigonuevo.push(cadtem);
            return;
        }else if(this.ope == ">="){
            L_Optimizacion.push(new N_Optim("Mirilla", "No. 2: Eliminacion de codigo muerto", 
            "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
            ,"if( "+this.izq+" < "+this.der+")"+ this.goto2.onlycad(),this.linea));
            cadtem += "if( "+this.izq+" < "+this.der+")"+ this.goto2.onlycad()
            Codigonuevo.push(cadtem);
            return;
        }else if(this.ope == "<="){
            L_Optimizacion.push(new N_Optim("Mirilla", "No. 2: Eliminacion de codigo muerto", 
            "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
            ,"if( "+this.izq+" > "+this.der+")"+ this.goto2.onlycad(),this.linea));
            cadtem += "if( "+this.izq+" > "+this.der+")"+ this.goto2.onlycad()
            Codigonuevo.push(cadtem);
            return;
        }else if(this.ope == ">"){
            L_Optimizacion.push(new N_Optim("Mirilla", "No. 2: Eliminacion de codigo muerto", 
            "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
            ,"if( "+this.izq+" <= "+this.der+")"+ this.goto2.onlycad(),this.linea));
            cadtem += "if( "+this.izq+" <= "+this.der+")"+ this.goto2.onlycad()
            Codigonuevo.push(cadtem);
            return;
        }else if(this.ope == "<"){
            L_Optimizacion.push(new N_Optim("Mirilla", "No. 2: Eliminacion de codigo muerto", 
            "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() + this.goto2.onlycad()
            ,"if( "+this.izq+" >= "+this.der+")"+ this.goto2.onlycad(),this.linea));
            cadtem += "if( "+this.izq+" >= "+this.der+")"+ this.goto2.onlycad()
            Codigonuevo.push(cadtem);
            return;
        }

        cadtem += "if( "+this.izq+" "+this.ope+" "+this.der+")"+this.goto1.onlycad() +"\n"+ this.goto2.onlycad();
        Codigonuevo.push(cadtem);
        cadtem = this.etiq.onlycad() +"";
        Codigonuevo.push(cadtem);
    }
}