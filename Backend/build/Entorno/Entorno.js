"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {
        if (anterior === void 0) { anterior = null; }
        this.anterior = anterior;
        this.variables = new Map();
    }
    Entorno.prototype.setvariable = function () {
    };
    return Entorno;
}());
exports.Entorno = Entorno;
