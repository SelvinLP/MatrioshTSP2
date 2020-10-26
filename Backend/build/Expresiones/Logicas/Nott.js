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
exports.Nott = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var Nott = /** @class */ (function (_super) {
    __extends(Nott, _super);
    function Nott(izq, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        return _this;
    }
    Nott.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var nizq = this.izq.ejecutar(entorno);
        this.Ltrue = nizq.Lfalse;
        this.Lfalse = nizq.Ltrue;
        nizq.valor = nizq.valor == "1" ? "0" : "1";
        if (nizq.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            var retorno = new Retorno_1.Retorno('', nizq.tipo, false);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            return retorno;
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'No se puede traducir !' + nizq.valor, '', this.linea, this.columna);
        }
    };
    Nott.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        return { posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena };
    };
    return Nott;
}(Expresion_1.Expresion));
exports.Nott = Nott;
