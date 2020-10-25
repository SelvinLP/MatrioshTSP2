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
        var cadtem = this.sfunc + "goto " + etiq + ";";
        this.codigo.push(cadtem);
    };
    //Cadena agregar expresion
    Generador.prototype.addExp = function (etiquet, nizq, nder, operador) {
        if (nder === void 0) { nder = ""; }
        if (operador === void 0) { operador = ''; }
        var cadtem = this.sfunc + etiquet + " = " + nizq + " " + operador + " " + nder + ";";
        this.codigo.push(cadtem);
    };
    //Cadena agregar etiqueta
    Generador.prototype.addEtiq = function (etiq) {
        var cadtem = this.sfunc + etiq + ":";
        this.codigo.push(cadtem);
    };
    //Cadena agregar if
    Generador.prototype.addIf = function (nizq, nder, operador, etiq) {
        var cadtem = this.sfunc + "if (" + nizq + " " + operador + " " + nder + ") goto " + etiq + ";";
        this.codigo.push(cadtem);
    };
    //Cadena imprimir
    Generador.prototype.addImpr = function (tipoprint, valor) {
        var cadtem = this.sfunc + "printf(\"%" + tipoprint + "\", " + valor + ");";
        this.codigo.push(cadtem);
    };
    //Guardamos en el stack
    Generador.prototype.setstack = function (pos, valor) {
        var cadtem = this.sfunc + "stack[(int)" + pos + "] = " + valor + ";";
        this.codigo.push(cadtem);
    };
    //Obtener de stack
    Generador.prototype.getstack = function (etiq, pos) {
        var cadtem = this.sfunc + etiq + " = stack[(int)" + pos + "];";
        this.codigo.push(cadtem);
    };
    //Limpia todo
    Generador.prototype.limpiartodo = function () {
        this.codigo = new Array();
        this.temporal = 0;
        this.etiqueta = 0;
    };
    //Asignar a heap
    Generador.prototype.setHeap = function (pos, valor) {
        var cadtem = this.sfunc + "heap[(int)" + pos + "] = " + valor + ";";
        this.codigo.push(cadtem);
    };
    //Obtener heap
    Generador.prototype.getHeap = function (etiq, pos) {
        var cadtem = this.sfunc + etiq + "= Heap[(int)" + pos + "];";
        this.codigo.push(cadtem);
    };
    //Proximo heap
    Generador.prototype.sigHeap = function () {
        var cadtem = this.sfunc + 'h = h + 1;';
        this.codigo.push(cadtem);
    };
    //Cambio de entorno
    Generador.prototype.sigEnt = function (pos) {
        var cadtem = this.sfunc + "p = p + " + pos + ";";
        this.codigo.push(cadtem);
    };
    //Regreso de Entorno
    Generador.prototype.regEnt = function (pos) {
        var cadtem = this.sfunc + "p = p - " + pos + ";";
        this.codigo.push(cadtem);
    };
    //Comentario
    Generador.prototype.addComentario = function (cad) {
        var cadtem = this.sfunc + "/**** " + cad + "****/";
        this.codigo.push(cadtem);
    };
    //Llamar funcion 
    Generador.prototype.llamarfunc = function (cad) {
        var cadtem = this.sfunc + cad + "();";
        this.codigo.push(cadtem);
    };
    return Generador;
}());
exports.Generador = Generador;
