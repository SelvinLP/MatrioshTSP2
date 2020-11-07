import { Generador } from "./Generador";

export class Func_native{
    constructor(){
    }

    public getImprimircad(): string{
        const generador = Generador.getInstancia();
        const etiq0 = generador.newEtiq();   
        const etiq1 = generador.newEtiq();   
        const etiq2 = generador.newEtiq();   
        const tem0 = generador.newTem();    
        const tem1 = generador.newTem();    
        let retorn:string = "";
        retorn += 'void native_imprimir() {\n';
        retorn += "  " + etiq0 +":\n";
        retorn += "  " + tem1 + " =  heap[(int)" + tem0 +"];\n";
        retorn += "  " + tem0 + " = " + tem0 + " + 1;\n";
        retorn += "  if (" + tem1 +  " != -1) goto " + etiq1 + ";\n";
        retorn += "  goto " + etiq2 + ';\n';
        retorn += "  " + etiq1 + ":\n";
        retorn += "  printf(\"%c\", (int)"+ tem1 + ");\n";
        retorn += "  goto " + etiq0 + ';\n';
        retorn += "  " + etiq2 + ":\n";
        retorn += "  return;\n";
        retorn += '}\n';
        return retorn;
    }

    public concat_string_string(): string{
        const generador = Generador.getInstancia();
        const etiq3 = generador.newEtiq();   
        const etiq4 = generador.newEtiq();  
        const etiq5 = generador.newEtiq();   
        const etiq6 = generador.newEtiq();  
        const etiq7 = generador.newEtiq();  
        const tem2 = generador.newTem();    
        const tem3 = generador.newTem();    
        const tem4 = generador.newTem();
        const tem5 = generador.newTem(); 
        const tem6 = generador.newTem();     
        let retorn:string = "";
        retorn += 'void concat_string_string() {\n';
        retorn += "  " + tem2 + " = h;\n" 
        retorn += "  " + etiq3 +":\n";
        retorn += "  " + tem4 + " = heap[(int)" + tem3 +"];\n";
        retorn += "  " + tem3 + " = " + tem3 + " + 1;\n";
        retorn += "  if (" + tem4 +  " != -1) goto " + etiq4 + ";\n";
        retorn += "  goto " + etiq5 + ';\n';
        retorn += "  " + etiq4 +":\n";
        retorn += "  heap[(int)h] = " +tem4 + ";\n"
        retorn += "  h = h + 1;\n";
        retorn += "  goto " + etiq3 + ';\n';
        retorn += "  " + etiq5 +":\n";
        retorn += "  " + tem6 + "= heap[(int)" + tem5 + "];\n";
        retorn += "  " + tem5 + " = " + tem5 + " + 1;\n";
        retorn += "  if (" + tem6 +  " != -1) goto " + etiq6 + ";\n";
        retorn += "  goto " + etiq7 + ';\n';
        retorn += "  " + etiq6 +":\n";
        retorn += "  heap[(int)h] = " +tem6 + ";\n"
        retorn += "  h = h + 1;\n";
        retorn += "  goto " + etiq5 + ';\n';
        retorn += "  " + etiq7 +":\n";
        retorn += "  heap[(int)h] = -1;\n"
        retorn += "  h = h + 1;\n";
        retorn += "  return;\n";
        retorn += '}\n';
        return retorn;
    }

    public compare_str_str():string {
        const generador = Generador.getInstancia();
        const etiq8 = generador.newEtiq();   
        const etiq9 = generador.newEtiq();   
        const etiq10 = generador.newEtiq();
        const etiq11 = generador.newEtiq();   
        const etiq12 = generador.newEtiq();
        const etiq13 = generador.newEtiq();
        const tem7 = generador.newTem();    
        const tem8 = generador.newTem();
        const tem9 = generador.newTem();
        const tem10 = generador.newTem();
        const tem11 = generador.newTem();         
        let retorn:string = "";
        retorn += 'void native_cmp_str() {\n';
        retorn += "  " + etiq8 +":\n";
        retorn += "  " + tem9 + " =  heap[(int)" + tem7 +"];\n";
        retorn += "  " + tem10 + " =  heap[(int)" + tem8 +"];\n";
        retorn += "  " + tem7 + " = " + tem7 + " + 1;\n";
        retorn += "  " + tem8 + " = " + tem8 + " + 1;\n";
        retorn += "  if (" + tem9 +  " == "+ tem10 +") goto " + etiq9 + ";\n";
        retorn += "  goto " + etiq10 + ';\n';
        retorn += "  " + etiq9 + ":\n";

        retorn += "  if (" + tem9 +  " == -1) goto " + etiq11 + ";\n";
        retorn += "  goto " + etiq8 + ';\n';
        retorn += "  " + etiq11 + ":\n";

        retorn += "  if (" + tem10 +  " == -1) goto " + etiq12 + ";\n";
        retorn += "  goto " + etiq8 + ';\n';
        retorn += "  " + etiq12 + ":\n";
        retorn += "  " + tem11 + " = 1;\n";
        retorn += "  goto " + etiq13 + ';\n';
        retorn += "  " + etiq10 + ":\n";
        retorn += "  " + tem11 + " = 0;\n";
        retorn += "  goto " + etiq13 + ';\n';
        retorn += "  " + etiq13 + ":\n";
        retorn += "  return;\n";
        retorn += '}\n';
        return retorn;
    }

    public getpot(): string{
        const generador = Generador.getInstancia();
        const etiq14 = generador.newEtiq();   
        const etiq15 = generador.newEtiq();   
        const etiq16 = generador.newEtiq(); 
        const etiq17 = generador.newEtiq(); 
        const etiq18 = generador.newEtiq(); 
        const tem12 = generador.newTem();    
        const tem13 = generador.newTem();
        const tem14 = generador.newTem();     
        let retorn:string = "";
        retorn += 'void native_pot() {\n';
        retorn += "  " + tem12 + " = 1;\n";
        retorn += "  if (" + tem14 +  " > 0) goto " + etiq14 + ";\n";
        retorn += "  goto " + etiq15 + ';\n';
        retorn += "  " + etiq14 + ":\n";

        retorn += "  if (" + tem14 +  " > 0) goto " + etiq16 + ";\n";
        retorn += "  goto " + etiq17 + ';\n';
        retorn += "  " + etiq16 + ":\n";

        retorn += "  " + tem12 + " = " + tem12 + " * " + tem13 + ";\n";
        retorn += "  " + tem14 + " = " + tem14 + " - 1;\n";
        retorn += "  goto " + etiq14 + ';\n';

        retorn += "  " + etiq15 + ":\n";
        retorn += "  if (" + tem14 +  " < 0) goto " + etiq18 + ";\n";
        retorn += "  goto " + etiq17 + ';\n';
        retorn += "  " + etiq18 + ":\n";

        retorn += "  " + tem12 + " = " + tem12 + " / " + tem13 + ";\n";
        retorn += "  " + tem14 + " = " + tem14 + " + 1;\n";
        retorn += "  goto " + etiq15 + ';\n';
        retorn += "  " + etiq17 + ":\n";
        retorn += "  return;\n";
        retorn += '}\n';
        return retorn;
    }

    public number_tostring(): string{
        const generador = Generador.getInstancia();
        const etiq19 = generador.newEtiq(); 
        const etiq20 = generador.newEtiq(); 
        const etiq21 = generador.newEtiq(); 
        const etiq22 = generador.newEtiq(); 
        const etiq23 = generador.newEtiq(); 
        const etiq24 = generador.newEtiq(); 
        const etiq25 = generador.newEtiq();   //etiqueta del signo 
        const etiq26 = generador.newEtiq();
        const tem15 = generador.newTem();   //entrada
        const tem16 = generador.newTem();   // retorno h
        const tem17 = generador.newTem();   
        const tem18 = generador.newTem();   // temporal
        const tem19 = generador.newTem();   // contador
        const tem20 = generador.newTem();   // temporal
        const tem21 = generador.newTem();   // contador 2
        
        let retorn:string = "";
        retorn += 'void number_tostring() {\n';
        retorn += "  " + tem16 + " = h;\n";
        retorn += "  if (" + tem15 +  " < 0) goto " + etiq25 + ";\n";
        retorn += "  goto " + etiq26 + ';\n';
        retorn += "  " + etiq25 + ":\n"
        retorn += "  " + tem15 + " = " + tem15 + " * -1;\n";
        retorn += "  heap[(int)h] = 45;\n";
        retorn += "  h = h + 1;\n";
        retorn += "  goto " + etiq26 + ';\n';

        retorn += "  " + etiq26 + ":\n"
        retorn += "  " + tem17 + " = fmod(" + tem15 + ",1);\n";
        retorn += "  " + tem15 + " = " + tem15 + " - " + tem17 + ";\n";
        retorn += "  " + tem18 + " = " + tem15 + ";\n";
        retorn += "  " + tem19 + " = -1;\n";
        retorn += "  " + tem20 + " = 0;\n";

        retorn += "  " + etiq19 + ":\n"
        retorn += "  " + tem19 + " = " + tem19 + " + 1;\n";
        retorn += "  " + tem21 + " = " + tem19 + ";\n";
        retorn += "  " + tem18 + " = " + tem18 + " / 10;\n";
        retorn += "  " + tem20 + " = fmod(" + tem18 + ",1);\n";
        retorn += "  " + tem18 + " = " + tem18 + " - " + tem20 + ";\n";
        retorn += "  if (" + tem18 +  " > 0) goto " + etiq19 + ";\n";
        retorn += "  goto " + etiq20 + ';\n';


        retorn += "  " + etiq20 + ":\n";
        retorn += "  " + tem15 + " = " + tem15 + " / 10;\n";
        retorn += "  " + tem18 + " = fmod(" + tem15 + ",1);\n";
        retorn += "  " + tem15 + " = " + tem15 + " - " + tem18 + ";\n";
        retorn += "  " + tem18 + " = " + tem18 + " * 10;\n";
        retorn += "  " + tem18 + " = " + tem18 + " + 48;\n";
        retorn += "  h = h + " + tem19 + ";\n"; 
        retorn += "  heap[(int)h] = (int)" +tem18 + ";\n";
        retorn += "  h = h - " + tem19 + ";\n"; 
        retorn += "  " + tem19 + " = " + tem19 + " - 1;\n";
        retorn += "  if (" + tem15 +  " > 0.1) goto " + etiq20 + ";\n";
        retorn += "  goto " + etiq21 + ';\n';   

        retorn += "  " + etiq21 + ":\n"  
        retorn += "  h = h + " + tem21 + ";\n";
        retorn += "  h = h + 1;\n";    
        retorn += "  if (" + tem17 +  " > 0) goto " + etiq22 + ";\n";
        retorn += "  goto " + etiq23 + ';\n';   

        retorn += "  " + etiq22 + ":\n"
        retorn += "  heap[(int)h] = 46;\n";
        retorn += "  h = h + 1;\n";
        retorn += "  goto " + etiq24 + ';\n'; 

        retorn += "  " + etiq24 + ":\n"
        retorn += "  " + tem17 + " = " + tem17 + " * 10;\n";
        retorn += "  " + tem20 + " = fmod(" + tem17 + ",1);\n";
        retorn += "  " + tem17 + " = " + tem17 + " - " + tem20 + ";\n";
        retorn += "  " + tem17 + " = " + tem17 + " + 48;\n";
        retorn += "  heap[(int)h] = " + tem17 + ";\n";
        retorn += "  h = h + 1;\n";
        retorn += "  " + tem17 + " = "+ tem20 + ";\n";
        retorn += "  if (" + tem17 +  " > 0.001) goto " + etiq24 + ";\n";
        retorn += "  goto " + etiq23 + ';\n'; 

        retorn += "  " + etiq23 + ":\n"
        retorn += "  heap[(int)h] = -1;\n";
        retorn += "  h = h + 1;\n";

        retorn += "  return;\n";
        retorn += '}\n';
        return retorn;
    }

    public tolowercase_str(): string{
        const generador = Generador.getInstancia();
        const etiq27 = generador.newEtiq();     
        const etiq28 = generador.newEtiq();   
        const etiq29 = generador.newEtiq(); 
        const etiq30 = generador.newEtiq();
        const etiq31 = generador.newEtiq();      
        const tem22 = generador.newTem();       // Entrada por de h
        const tem23 = generador.newTem();    
        let retorn:string = "";
        retorn += 'void tolowercase_str() {\n';
        retorn += "  " + etiq27 + ":\n";
        retorn += "  " + tem23 + " =  heap[(int)" + tem22 +"];\n";
        retorn += "  " + tem22 + " = " + tem22 + " + 1;\n";
        retorn += "  if (" + tem23 +  " != -1) goto " + etiq28 + ";\n";
        retorn += "  goto " + etiq29 + ';\n';

        retorn += "  " + etiq28 + ":\n";
        retorn += "  if (" + tem23 +  " >= 65) goto " + etiq30 + ";\n";
        retorn += "  goto " + etiq27 + ';\n';

        retorn += "  " + etiq30 + ":\n";
        retorn += "  if (" + tem23 +  " <= 90) goto " + etiq31 + ";\n";
        retorn += "  goto " + etiq27 + ';\n';
        retorn += "  " + etiq31 + ":\n";
        retorn += "  " + tem23 +  " = " + tem23 + " + 32;\n";
        retorn += "  " + tem22 + " = " + tem22 + " - 1;\n";
        retorn += "  heap[(int)" + tem22 +"] = " + tem23 + ";\n";
        retorn += "  " + tem22 + " = " + tem22 + " + 1;\n";
        retorn += "  goto " + etiq27 + ';\n';

        retorn += "  " + etiq29 + ":\n";
        retorn += "  return;\n";
        retorn += '}\n';
        return retorn;
    }

    public touppercase_str(): string{
        const generador = Generador.getInstancia();
        const etiq32 = generador.newEtiq();     
        const etiq33 = generador.newEtiq();   
        const etiq34 = generador.newEtiq(); 
        const etiq35 = generador.newEtiq();
        const etiq36 = generador.newEtiq();      
        const tem24 = generador.newTem();       // Entrada por de h
        const tem25 = generador.newTem();    
        let retorn:string = "";
        retorn += 'void touppercase_str() {\n';
        retorn += "  " + etiq32 + ":\n";
        retorn += "  " + tem25 + " =  heap[(int)" + tem24 +"];\n";
        retorn += "  " + tem24 + " = " + tem24 + " + 1;\n";
        retorn += "  if (" + tem25 +  " != -1) goto " + etiq33 + ";\n";
        retorn += "  goto " + etiq34 + ';\n';

        retorn += "  " + etiq33 + ":\n";
        retorn += "  if (" + tem25 +  " >= 97) goto " + etiq35 + ";\n";
        retorn += "  goto " + etiq32 + ';\n';

        retorn += "  " + etiq35 + ":\n";
        retorn += "  if (" + tem25 +  " <= 122) goto " + etiq36 + ";\n";
        retorn += "  goto " + etiq32 + ';\n';
        retorn += "  " + etiq36 + ":\n";
        retorn += "  " + tem25 +  " = " + tem25 + " - 32;\n";
        retorn += "  " + tem24 + " = " + tem24 + " - 1;\n";
        retorn += "  heap[(int)" + tem24 +"] = " + tem25 + ";\n";
        retorn += "  " + tem24 + " = " + tem24 + " + 1;\n";
        retorn += "  goto " + etiq32 + ';\n';

        retorn += "  " + etiq34 + ":\n";
        retorn += "  return;\n";
        retorn += '}\n';
        return retorn;
    }

    public getlength_str(): string{
        const generador = Generador.getInstancia();
        const etiq37 = generador.newEtiq();     
        const tem26 = generador.newTem();       // Entrada por de h
        const tem27 = generador.newTem();       // Contador  
        const tem28 = generador.newTem();       // Temporal
        let retorn:string = "";
        retorn += 'void length_str() {\n';
        retorn += "  " + tem27 + " = -1;\n";

        retorn += "  " + etiq37 + ":\n"
        retorn += "  " + tem27 + " = " + tem27 + " + 1;\n";
        retorn += "  " + tem28 + " =  heap[(int)" + tem26 +"];\n";
        retorn += "  " + tem26 + " = " + tem26 + " + 1;\n";
        retorn += "  if (" + tem28 +  " != -1) goto " + etiq37 + ";\n";
        retorn += "  return;\n";
        retorn += '}\n';
        return retorn;
    }
    public getImprimirctrue(): string{
        let retorn:string = "";
        retorn += 'void native_imprimir_true() {\n';
        retorn += "  printf(\"%c\", " + 't'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'r'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'u'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'e'.charCodeAt(0) + ");\n";
        retorn += '}\n';
        return retorn;
    }

    public getImprimircfalse(): string{
        let retorn:string = "";
        retorn += 'void native_imprimir_false() {\n';
        retorn += "  printf(\"%c\", " + 'f'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'a'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'l'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 's'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'e'.charCodeAt(0) + ");\n";
        retorn += '}\n';
        return retorn;
    }

    public getImprimircnull(): string{
        let retorn:string = "";
        retorn += 'void native_imprimir_null() {\n';
        retorn += "  printf(\"%c\", " + 'n'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'u'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'l'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'l'.charCodeAt(0) + ");\n";
        retorn += '}\n';
        return retorn;
    }

}