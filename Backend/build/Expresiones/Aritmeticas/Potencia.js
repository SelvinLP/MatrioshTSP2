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
exports.Pott = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var Pott = /** @class */ (function (_super) {
    __extends(Pott, _super);
    function Pott(izq, der, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        return _this;
    }
    Pott.prototype.ejecutar = function (entorno) {
        var nizq = this.izq.ejecutar(entorno);
        var nder = this.der.ejecutar(entorno);
        var generador = Generador_1.Generador.getInstancia();
        var ntem = generador.newTem();
        if (nizq.tipo.tipo == Tipos_1.Tipos.NUMBER && nder.tipo.tipo == Tipos_1.Tipos.NUMBER) {
            generador.addExp("T13", nizq.valor);
            generador.addExp("T14", nder.valor);
            generador.llamarfunc('native_pot');
            generador.addExp(ntem, "T12");
            var retorn = new Retorno_1.Retorno(ntem, nizq.tipo, true);
            return retorn;
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'No se puede traducir ' + nizq.valor + "**" + nder.valor, '', this.linea, this.columna);
        }
    };
    Pott.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"**\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        result = this.izq.ejecutarast(result);
        result.posant = ast.posdes;
        result = this.der.ejecutarast(result);
        return result;
    };
    return Pott;
}(Expresion_1.Expresion));
exports.Pott = Pott;
