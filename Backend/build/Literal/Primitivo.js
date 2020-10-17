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
exports.LPrimitivo = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Tipos_1 = require("../Otros/Tipos");
var N_Error_1 = require("../Errores/N_Error");
var LPrimitivo = /** @class */ (function (_super) {
    __extends(LPrimitivo, _super);
    function LPrimitivo(valor, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.tipo = tipo;
        return _this;
    }
    LPrimitivo.prototype.ejecutar = function () {
        if (this.tipo == Tipos_1.Tipo.NUMBER) {
        }
        else if (this.tipo == Tipos_1.Tipo.STRING) {
        }
        else if (this.tipo == Tipos_1.Tipo.BOOLEAN) {
        }
        else if (this.tipo == Tipos_1.Tipo.NULL) {
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'El tipo no existe', '', this.linea, this.columna);
        }
    };
    LPrimitivo.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        return { posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena };
    };
    return LPrimitivo;
}(Expresion_1.Expresion));
exports.LPrimitivo = LPrimitivo;
