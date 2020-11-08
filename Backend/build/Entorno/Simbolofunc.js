"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimboloFunc = void 0;
var SimboloFunc = /** @class */ (function () {
    function SimboloFunc(funcion) {
        this.tipo = funcion.tiporetorno;
        this.id = funcion.id;
        this.size = funcion.parametros.length;
        this.params = funcion.parametros;
    }
    return SimboloFunc;
}());
exports.SimboloFunc = SimboloFunc;
