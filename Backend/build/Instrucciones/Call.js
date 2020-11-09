"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamarfuncion = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Llamarfuncion = /** @class */ (function (_super) {
    __extends(Llamarfuncion, _super);
    function Llamarfuncion(id, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        return _this;
    }
    Llamarfuncion.prototype.ejecutar = function (entorno) {
        this.id.ejecutar(entorno);
    };
    Llamarfuncion.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Call\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var retorno = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return retorno;
    };
    return Llamarfuncion;
}(Instruccion_1.Instruccion));
exports.Llamarfuncion = Llamarfuncion;
