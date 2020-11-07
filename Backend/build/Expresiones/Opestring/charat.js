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
exports.CharAt = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var CharAt = /** @class */ (function (_super) {
    __extends(CharAt, _super);
    function CharAt(valor, pos, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.pos = pos;
        return _this;
    }
    CharAt.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var nvalor = this.valor.ejecutar(entorno);
        var npos = this.pos.ejecutar(entorno);
        var naux = generador.newTem();
        var ntem = generador.newTem();
        var ntemvalor = generador.newTem();
        if (nvalor.tipo.tipo == Tipos_1.Tipos.STRING) {
            generador.addExp(naux, nvalor.valor, npos.valor, "+");
            generador.getHeap(ntemvalor, naux);
            generador.addExp(ntem, "h");
            generador.setHeap('h', ntemvalor);
            generador.sigHeap();
            generador.setHeap('h', '-1');
            generador.sigHeap();
            //llamamos
            var retorn = new Retorno_1.Retorno(ntem, new Tipos_1.Tipo(Tipos_1.Tipos.STRING), true);
            return retorn;
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'Tipo no compatible para charat()', '', this.linea, this.columna);
        }
    };
    CharAt.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posant, posdes: ast.posdes + 1, cadena: Cadena };
        result.cadena += result.posdes + " [label =\"CharAt\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = { posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena };
        result = this.valor.ejecutarast(result);
        return result;
    };
    return CharAt;
}(Expresion_1.Expresion));
exports.CharAt = CharAt;
