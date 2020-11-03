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
exports.Break = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Generador_1 = require("../Generador/Generador");
var N_Error_1 = require("../Errores/N_Error");
var Break = /** @class */ (function (_super) {
    __extends(Break, _super);
    function Break(linea, columna) {
        return _super.call(this, linea, columna) || this;
    }
    Break.prototype.ejecutar = function (entorno) {
        if (entorno.break != null) {
            var generador = Generador_1.Generador.getInstancia();
            generador.addGoto(entorno.break);
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'Break en ambito incorrecto', '', this.linea, this.columna);
        }
    };
    Break.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Break\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return Break;
}(Instruccion_1.Instruccion));
exports.Break = Break;
