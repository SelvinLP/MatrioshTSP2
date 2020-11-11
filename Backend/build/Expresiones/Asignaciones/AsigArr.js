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
exports.AsigArr = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var N_Error_1 = require("../../Errores/N_Error");
var Tipos_1 = require("../../Otros/Tipos");
var AsigArr = /** @class */ (function (_super) {
    __extends(AsigArr, _super);
    function AsigArr(posicion, anterior, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.posicion = posicion;
        _this.anterior = anterior;
        return _this;
    }
    AsigArr.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var nanterior = this.anterior.ejecutar(entorno);
        var index = this.posicion.ejecutar(entorno);
        if (nanterior.tipo.dimension == 0) {
            throw new N_Error_1.N_Error('Semantico', 'La variable no es un arreglo', '', this.linea, this.columna);
        }
        else if (index.tipo.dimension != 0 || index.tipo.tipo != Tipos_1.Tipos.NUMBER) {
            throw new N_Error_1.N_Error('Semantico', 'La posicion no es un entero', '', this.linea, this.columna);
        }
        var temaux = generador.newTem();
        var temp = generador.newTem();
        if (nanterior.simbol != null) {
            generador.getstack(temaux, nanterior.valor);
        }
        else {
            generador.getHeap(temaux, nanterior.valor);
        }
        generador.addExp(temp, temaux, index.valor, '+');
        generador.addExp(temp, temp, '1', '+');
        return new Retorno_1.Retorno(temp, new Tipos_1.Tipo(nanterior.tipo.tipo, nanterior.tipo.idtipo, nanterior.tipo.dimension - 1), true);
    };
    AsigArr.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Id\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return AsigArr;
}(Expresion_1.Expresion));
exports.AsigArr = AsigArr;
