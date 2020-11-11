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
exports.Accesoarr = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var Generador_1 = require("../Generador/Generador");
var N_Error_1 = require("../Errores/N_Error");
var Tipos_1 = require("../Otros/Tipos");
var Accesoarr = /** @class */ (function (_super) {
    __extends(Accesoarr, _super);
    function Accesoarr(posicion, anterior, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.posicion = posicion;
        _this.anterior = anterior;
        return _this;
    }
    Accesoarr.prototype.ejecutar = function (entorno) {
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
        generador.addExp(temaux, nanterior.valor, index.valor, '+');
        generador.addExp(temaux, temaux, '1', '+');
        generador.getHeap(temp, temaux);
        return new Retorno_1.Retorno(temp, new Tipos_1.Tipo(nanterior.tipo.tipo, nanterior.tipo.idtipo, nanterior.tipo.dimension - 1), true);
    };
    Accesoarr.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Acceso array en pos\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        return { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
    };
    return Accesoarr;
}(Expresion_1.Expresion));
exports.Accesoarr = Accesoarr;
