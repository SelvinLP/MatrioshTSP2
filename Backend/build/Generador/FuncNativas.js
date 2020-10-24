"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Func_native = void 0;
var Generador_1 = require("./Generador");
var Func_native = /** @class */ (function () {
    function Func_native() {
    }
    Func_native.prototype.getImprimircad = function () {
        var generador = Generador_1.Generador.getInstancia();
        var etiq0 = generador.newEtiq(); //L0
        var etiq1 = generador.newEtiq(); //L1
        var etiq2 = generador.newEtiq(); //L2
        var tem0 = generador.newTem(); //t0
        var tem1 = generador.newTem(); //t1
        var retorn = "";
        retorn += 'void native_imprimir() {\n';
        retorn += "  " + etiq0 + ":\n";
        retorn += "  " + tem1 + " =  heap[(int)" + tem0 + "];\n";
        retorn += "  " + tem0 + " = " + tem0 + " + 1;\n";
        retorn += "  if (" + tem1 + " != -1) goto " + etiq1 + ";\n";
        retorn += "  goto " + etiq2 + ';\n';
        retorn += "  " + etiq1 + ":\n";
        retorn += "  printf(\"%c\", (int)" + tem1 + ");\n";
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
    };
    Func_native.prototype.concat_string_string = function () {
        var generador = Generador_1.Generador.getInstancia();
        var etiq3 = generador.newEtiq();
        var etiq4 = generador.newEtiq();
        var etiq5 = generador.newEtiq();
        var etiq6 = generador.newEtiq();
        var etiq7 = generador.newEtiq();
        var tem2 = generador.newTem();
        var tem3 = generador.newTem();
        var tem4 = generador.newTem();
        var tem5 = generador.newTem();
        var tem6 = generador.newTem();
        var retorn = "";
        retorn += 'void concat_string_string() {\n';
        retorn += "  " + tem2 + " = h;\n";
        retorn += "  " + etiq3 + ":\n";
        retorn += "  " + tem4 + " = heap[(int)" + tem3 + "];\n";
        retorn += "  " + tem3 + " = " + tem3 + " + 1;\n";
        retorn += "  if (" + tem4 + " != -1) goto " + etiq4 + ";\n";
        retorn += "  goto " + etiq5 + ';\n';
        retorn += "  " + etiq4 + ":\n";
        retorn += "  heap[(int)h] = " + tem4 + ";\n";
        retorn += "  h = h + 1;\n";
        retorn += "  goto " + etiq3 + ';\n';
        retorn += "  " + etiq5 + ":\n";
        retorn += "  " + tem6 + "= heap[(int)" + tem5 + "];\n";
        retorn += "  " + tem5 + " = " + tem5 + " + 1;\n";
        retorn += "  if (" + tem6 + " != -1) goto " + etiq6 + ";\n";
        retorn += "  goto " + etiq7 + ';\n';
        retorn += "  " + etiq6 + ":\n";
        retorn += "  heap[(int)h] = " + tem6 + ";\n";
        retorn += "  h = h + 1;\n";
        retorn += "  goto " + etiq5 + ';\n';
        retorn += "  " + etiq7 + ":\n";
        retorn += "  heap[(int)h] = -1;\n";
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
    };
    Func_native.prototype.getImprimirctrue = function () {
        var retorn = "";
        retorn += 'void native_imprimir_true() {\n';
        retorn += "  printf(\"%c\", " + 't'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'r'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'u'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'e'.charCodeAt(0) + ");\n";
        retorn += '}\n';
        return retorn;
    };
    Func_native.prototype.getImprimircfalse = function () {
        var retorn = "";
        retorn += 'void native_imprimir_false() {\n';
        retorn += "  printf(\"%c\", " + 'f'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'a'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'l'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 's'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'e'.charCodeAt(0) + ");\n";
        retorn += '}\n';
        return retorn;
    };
    Func_native.prototype.getImprimircnull = function () {
        var retorn = "";
        retorn += 'void native_imprimir_null() {\n';
        retorn += "  printf(\"%c\", " + 'n'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'u'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'l'.charCodeAt(0) + ");\n";
        retorn += "  printf(\"%c\", " + 'l'.charCodeAt(0) + ");\n";
        retorn += '}\n';
        return retorn;
    };
    return Func_native;
}());
exports.Func_native = Func_native;
