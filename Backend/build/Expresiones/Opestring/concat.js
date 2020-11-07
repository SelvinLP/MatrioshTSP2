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
exports.Concat = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var Concat = /** @class */ (function (_super) {
    __extends(Concat, _super);
    function Concat(izq, der, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        return _this;
    }
    Concat.prototype.ejecutar = function (entorno) {
        var nizq = this.izq.ejecutar(entorno);
        var nder = this.der.ejecutar(entorno);
        if (nizq.tipo.tipo == Tipos_1.Tipos.STRING && nder.tipo.tipo == Tipos_1.Tipos.STRING) {
            var generador = Generador_1.Generador.getInstancia();
            var ntem = generador.newTem();
            // para concatenar
            generador.addExp("T3", nizq.valor);
            generador.addExp("T5", nder.valor);
            //llamamos
            generador.sigEnt(entorno.size);
            generador.llamarfunc('concat_string_string');
            generador.addExp(ntem, "T2");
            generador.regEnt(entorno.size);
            return new Retorno_1.Retorno(ntem, new Tipos_1.Tipo(Tipos_1.Tipos.STRING), true);
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'Tipos no compatibles en concat()', '', this.linea, this.columna);
        }
    };
    Concat.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posant, posdes: ast.posdes + 1, cadena: Cadena };
        result.cadena += result.posdes + " [label =\"Concat\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = { posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena };
        result = this.izq.ejecutarast(result);
        result.posant = ast.posdes;
        result = this.der.ejecutarast(result);
        return result;
    };
    return Concat;
}(Expresion_1.Expresion));
exports.Concat = Concat;
