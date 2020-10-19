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
    //Cadena Expresion
    Generador.prototype.addExp = function (nizq, nder, operador, etiquet) {
        if (operador === void 0) { operador = ''; }
        if (etiquet === void 0) { etiquet = ""; }
        var cadtem = this.sfunc + etiquet + nizq + operador + nder + ";";
        this.codigo.push(cadtem);
    };
    return Generador;
}());
exports.Generador = Generador;
