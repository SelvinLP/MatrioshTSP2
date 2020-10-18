"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retorno = void 0;
var Retorno = /** @class */ (function () {
    function Retorno(valor, tipo, stemp, simbol) {
        if (simbol === void 0) { simbol = null; }
        this.valor = valor;
        this.tipo = tipo;
        this.stemp = stemp;
        this.simbol = simbol;
        this.Ltrue = "";
        this.Lfalse = "";
    }
    return Retorno;
}());
exports.Retorno = Retorno;
