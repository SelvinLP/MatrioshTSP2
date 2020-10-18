"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipos = exports.Tipo = void 0;
var Tipo = /** @class */ (function () {
    function Tipo(tipo, idtipo, struct) {
        if (idtipo === void 0) { idtipo = ''; }
        if (struct === void 0) { struct = null; }
        this.tipo = tipo;
        this.idtipo = idtipo;
        this.struct = struct;
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
    Tipos["VOID"] = "void";
    Tipos["ARRAY"] = "array";
    Tipos["TYPE"] = "type";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
