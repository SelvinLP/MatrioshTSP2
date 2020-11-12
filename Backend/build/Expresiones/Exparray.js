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
exports.Exparray = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var Exparray = /** @class */ (function (_super) {
    __extends(Exparray, _super);
    function Exparray(valores, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valores = valores;
        return _this;
    }
    Exparray.prototype.ejecutar = function (entorno) {
        var _this = this;
        var generador = Generador_1.Generador.getInstancia();
        var tem = generador.newTem();
        var temaux = generador.newTem();
        var dimension = 0;
        var tipo = Tipos_1.Tipos.NULL;
        generador.addExp(tem, 'h');
        generador.addExp(temaux, tem, '1', '+');
        generador.setHeap('h', this.valores.length);
        generador.addExp('h', 'h', this.valores.length + 1, '+');
        this.valores.forEach(function (value, index) {
            var result = value.ejecutar(entorno);
            dimension = result.tipo.dimension + 1;
            generador.setHeap(temaux, result.valor);
            if (index != _this.valores.length - 1) {
                generador.addExp(temaux, temaux, '1', '+');
            }
            tipo = result.tipo.tipo;
        });
        return new Retorno_1.Retorno(tem, new Tipos_1.Tipo(tipo, '', dimension), true);
    };
    Exparray.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Dimension\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var retorno = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        for (var _i = 0, _a = this.valores; _i < _a.length; _i++) {
            var nodo = _a[_i];
            retorno.posant = ast.posdes;
            retorno = nodo.ejecutarast(retorno);
        }
        return retorno;
    };
    return Exparray;
}(Expresion_1.Expresion));
exports.Exparray = Exparray;
