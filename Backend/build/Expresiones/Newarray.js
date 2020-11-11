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
exports.Newarray = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var N_Error_1 = require("../Errores/N_Error");
var Newarray = /** @class */ (function (_super) {
    __extends(Newarray, _super);
    function Newarray(tamanio, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tamanio = tamanio;
        return _this;
    }
    Newarray.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var nsize = this.tamanio.ejecutar(entorno);
        //error que no ingreso el tamanio correcto
        if (nsize.tipo.tipo != Tipos_1.Tipos.NUMBER) {
            throw new N_Error_1.N_Error('Semantico', 'Tamanio de array no es number', '', this.linea, this.columna);
        }
        var ntem = generador.newTem();
        generador.addExp(ntem, 'h');
        generador.setHeap('h', nsize.valor);
        generador.addExp('h', 'h', nsize.valor, '+');
        generador.sigHeap();
        return new Retorno_1.Retorno(ntem, new Tipos_1.Tipo(Tipos_1.Tipos.ARRAY, '', 1), true);
    };
    Newarray.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"New Array()\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var retorn = this.tamanio.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena });
        return retorn;
    };
    return Newarray;
}(Expresion_1.Expresion));
exports.Newarray = Newarray;
