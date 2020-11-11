"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRelacional = exports.TipoDato = exports.Tipos = exports.Tipo = void 0;
var Tipo = /** @class */ (function () {
    function Tipo(tipo, idtipo, dimension) {
        if (idtipo === void 0) { idtipo = ''; }
        if (dimension === void 0) { dimension = 0; }
        this.tipo = tipo;
        this.idtipo = idtipo;
        this.dimension = dimension;
    }
    return Tipo;
}());
exports.Tipo = Tipo;
//Tipos de variables
var Tipos;
(function (Tipos) {
    Tipos["NUMBER"] = "number";
    Tipos["STRING"] = "string";
    Tipos["BOOLEAN"] = "boolean";
    Tipos["NULL"] = "null";
    Tipos["ARRAY"] = "array";
    Tipos["TYPE"] = "type";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
//Tipo de dato
var TipoDato;
(function (TipoDato) {
    TipoDato["LET"] = "let";
    TipoDato["CONST"] = "const";
    TipoDato["NADA"] = " ";
})(TipoDato = exports.TipoDato || (exports.TipoDato = {}));
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional["MAYORQUE"] = ">";
    TipoRelacional["MENORQUE"] = "<";
    TipoRelacional["MAYORIGUAL"] = ">=";
    TipoRelacional["MENORIGUAL"] = "<=";
    TipoRelacional["IGUAL"] = "==";
    TipoRelacional["DIFERENCIA"] = "!=";
})(TipoRelacional = exports.TipoRelacional || (exports.TipoRelacional = {}));
