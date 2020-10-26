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
exports.Andt = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var Andt = /** @class */ (function (_super) {
    __extends(Andt, _super);
    function Andt(izq, der, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        return _this;
    }
    Andt.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var nizq = this.izq.ejecutar(entorno);
        var nder = this.der.ejecutar(entorno);
        if (nizq.tipo.tipo == Tipos_1.Tipos.BOOLEAN && nder.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
            this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
            var petiq = generador.newEtiq();
            generador.addIf(nizq.valor, "1", "==", petiq);
            generador.addGoto(this.Lfalse);
            generador.addEtiq(petiq);
            generador.addIf(nder.valor, "1", "==", this.Ltrue);
            generador.addGoto(this.Lfalse);
            if (nizq.valor == "1" && nder.valor == "1") {
                nizq.valor = "1";
            }
            else {
                nizq.valor = "0";
            }
            nizq.Ltrue = this.Ltrue;
            nizq.Lfalse = this.Lfalse;
            var retorno = new Retorno_1.Retorno(nizq.valor, nizq.tipo, false);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            return retorno;
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'No se puede traducir' + nizq.valor + " && " + nder.valor, '', this.linea, this.columna);
        }
    };
    Andt.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        return { posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena };
    };
    return Andt;
}(Expresion_1.Expresion));
exports.Andt = Andt;
