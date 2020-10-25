import { Generador } from "./Generador";

export class Func_native{
    constructor(){
    }

    public getImprimircad(): string{
        const generador = Generador.getInstancia();
        const etiq0 = generador.newEtiq();   //L0
        const etiq1 = generador.newEtiq();   //L1
        const etiq2 = generador.newEtiq();   //L2
        const tem0 = generador.newTem();    //t0
        const tem1 = generador.newTem();    //t1
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
        /*
            L0:
            T1 =  heap[(int)T0];
            T0 = T0 + 1;  
            if (T1 != -1) goto L1;
            goto L2;
            L1:
            printf("%c", (int)T1);
            goto L0;
            L2:
            return;

        */
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
        /*
            T2 = h;
            L3:
            T4 =  heap[(int)T3];
            T3 = T3 + 1;  
            if (T4 != -1) goto L4;
            goto L5;
            L4:
            heap[(int)T2] = T4
            t2 = t2 + 1
            goto L3;
            L5:
            T6 =  heap[(int)T5];
            T5 = T5 + 1;  
            if (T6 != -1) goto L6;
            goto L7;
            L6:
            heap[(int)T2] = T6
            t2 = t2 + 1 
            goto L5;
            L7:
            return;

        */
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