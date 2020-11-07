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
exports.StrLength = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var StrLength = /** @class */ (function (_super) {
    __extends(StrLength, _super);
    function StrLength(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    StrLength.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var nuevatem = generador.newTem();
        return new Retorno_1.Retorno(nuevatem, new Tipos_1.Tipo(Tipos_1.Tipos.STRING), true);
    };
    StrLength.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posant, posdes: ast.posdes + 1, cadena: Cadena };
        result.cadena += result.posdes + " [label =\"Length\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = { posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena };
        result = this.valor.ejecutarast(result);
        return result;
    };
    return StrLength;
}(Expresion_1.Expresion));
exports.StrLength = StrLength;
