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
exports.Mast = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var Mast = /** @class */ (function (_super) {
    __extends(Mast, _super);
    function Mast(izq, der, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        return _this;
    }
    Mast.prototype.ejecutar = function (entorno) {
        var nizq = this.izq.ejecutar(entorno);
        var nder = this.der.ejecutar(entorno);
        var generador = Generador_1.Generador.getInstancia();
        var ntem = generador.newTem();
        if (nizq.tipo.tipo == Tipos_1.Tipos.NUMBER) {
            if (nder.tipo.tipo == Tipos_1.Tipos.NUMBER) {
                generador.addExp(nizq.valor, nder.valor, '+', ntem);
                var retorn = new Retorno_1.Retorno(ntem, nizq.tipo, true);
                return retorn;
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede traducir ' + nizq.valor + "+" + nder.valor, '', this.linea, this.columna);
            }
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'No se puede traducir ' + nizq.valor + "+" + nder.valor, '', this.linea, this.columna);
        }
    };
    Mast.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        return { posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena };
    };
    return Mast;
}(Expresion_1.Expresion));
exports.Mast = Mast;
