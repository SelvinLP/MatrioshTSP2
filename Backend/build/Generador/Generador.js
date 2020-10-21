"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generador = void 0;
var Generador = /** @class */ (function () {
    function Generador() {
        this.sfunc = "";
        this.temporal = 0;
        this.etiqueta = 0;
        this.codigo = new Array();
    }
    //Obtenemos la instancia
    Generador.getInstancia = function () {
        return this.generator || (this.generator = new this());
    };
    //Genarar temporal
    Generador.prototype.newTem = function () {
        var cadtem = 'T' + this.temporal;
        this.temporal++;
        return cadtem;
    };
    //Generar Etiqueta
    Generador.prototype.newEtiq = function () {
        var cadtem = 'L' + this.etiqueta;
        this.etiqueta++;
        return cadtem;
    };
    //Cadena agregar goto
    Generador.prototype.addGoto = function (etiq) {
        var cadtem = this.sfunc + "goto" + etiq + ";";
        this.codigo.push(cadtem);
    };
    //Cadena agregar expresion
    Generador.prototype.addExp = function (etiquet, nizq, nder, operador) {
        if (nder === void 0) { nder = ""; }
        if (operador === void 0) { operador = ''; }
        var cadtem = this.sfunc + etiquet + "=" + nizq + operador + nder + ";";
        this.codigo.push(cadtem);
    };
    //Cadena agregar etiqueta
    Generador.prototype.addEtiq = function (etiq) {
        var cadtem = this.sfunc + etiq + ":";
        this.codigo.push(cadtem);
    };
    //Cadena agregar if
    Generador.prototype.addIf = function (nizq, nder, operador, etiq) {
        var cadtem = this.sfunc + "if (" + nizq + operador + nder + ") goto " + etiq + ";";
        this.codigo.push(cadtem);
    };
    //Cadena imprimir
    Generador.prototype.addImpr = function (tipoprint, valor) {
        var cadtem = this.sfunc + "printf(\"%" + tipoprint + "\", " + valor + ");";
        this.codigo.push(cadtem);
    };
    //Guardamos en el stack
    Generador.prototype.setstack = function (pos, valor) {
        var cadtem = this.sfunc + "stack[" + pos + "] = " + valor + ";";
        this.codigo.push(cadtem);
    };
    //Limpia todo
    Generador.prototype.limpiartodo = function () {
        this.codigo = new Array();
        this.temporal = 0;
        this.etiqueta = 0;
    };
    //Imprime la cadena true
    Generador.prototype.ImpriTrue = function () {
        this.addImpr('c', 't'.charCodeAt(0));
        this.addImpr('c', 'r'.charCodeAt(0));
        this.addImpr('c', 'u'.charCodeAt(0));
        this.addImpr('c', 'e'.charCodeAt(0));
    };
    //Imprime la cadena false
    Generador.prototype.ImpriFalse = function () {
        this.addImpr('c', 'f'.charCodeAt(0));
        this.addImpr('c', 'a'.charCodeAt(0));
        this.addImpr('c', 'l'.charCodeAt(0));
        this.addImpr('c', 's'.charCodeAt(0));
        this.addImpr('c', 'e'.charCodeAt(0));
    };
    //Imprime la cadena null
    Generador.prototype.ImpriNull = function () {
        this.addImpr('c', 'n'.charCodeAt(0));
        this.addImpr('c', 'u'.charCodeAt(0));
        this.addImpr('c', 'l'.charCodeAt(0));
        this.addImpr('c', 'l'.charCodeAt(0));
    };
    //Asignar a heap
    Generador.prototype.setHeap = function (pos, valor) {
        var cadtem = this.sfunc + "heap[" + pos + "] = " + valor + ";";
        this.codigo.push(cadtem);
    };
    //Proximo heap
    Generador.prototype.sigHeap = function () {
        var cadtem = this.sfunc + 'h = h + 1;';
        this.codigo.push(cadtem);
    };
    return Generador;
}());
exports.Generador = Generador;
