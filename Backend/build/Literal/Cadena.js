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
exports.Cadenat = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var Tipos_1 = require("../Otros/Tipos");
var Generador_1 = require("../Generador/Generador");
var Cadenat = /** @class */ (function (_super) {
    __extends(Cadenat, _super);
    function Cadenat(valor, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.tipo = tipo;
        return _this;
    }
    Cadenat.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var nuevatem = generador.newTem();
        generador.addExp(nuevatem, 'h');
        for (var pos = 0; pos < this.valor.length; pos++) {
            var vascii = this.valor.charCodeAt(pos);
            generador.setHeap('h', vascii);
            generador.sigHeap();
        }
        generador.setHeap('h', '-1');
        generador.sigHeap();
        return new Retorno_1.Retorno(nuevatem, new Tipos_1.Tipo(this.tipo), true);
    };
    Cadenat.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        Cadena += (ast.posdes + 1) + " [label =\"" + this.valor + "\"];\n";
        Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        return { posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena };
    };
    return Cadenat;
}(Expresion_1.Expresion));
exports.Cadenat = Cadenat;
