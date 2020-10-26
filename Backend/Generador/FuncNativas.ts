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

    public concat_num_str(): string {
        const generador = Generador.getInstancia();
        const etiq0 = generador.newEtiq();   
        const etiq1 = generador.newEtiq();   
        const etiq2 = generador.newEtiq();   
        const tem0 = generador.newTem();    
        const tem1 = generador.newTem();    
        let retorn:string = "";
        retorn += 'void native_concat_num_str() {\n';
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