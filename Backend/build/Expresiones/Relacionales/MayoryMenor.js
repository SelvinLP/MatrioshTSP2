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
exports.MayoryMenort = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var MayoryMenort = /** @class */ (function (_super) {
    __extends(MayoryMenort, _super);
    function MayoryMenort(izq, der, Tipor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        _this.Tipor = Tipor;
        return _this;
    }
    MayoryMenort.prototype.ejecutar = function (entorno) {
        var nizq = this.izq.ejecutar(entorno);
        var nder = this.der.ejecutar(entorno);
        var generador = Generador_1.Generador.getInstancia();
        if (nizq.tipo.tipo == Tipos_1.Tipos.NUMBER && nder.tipo.tipo == Tipos_1.Tipos.NUMBER) {
            this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
            this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
            if (this.Tipor == Tipos_1.TipoRelacional.MAYORQUE) {
                generador.addIf(nizq.valor, nder.valor, '>', this.Ltrue);
            }
            else if (this.Tipor == Tipos_1.TipoRelacional.MAYORIGUAL) {
                generador.addIf(nizq.valor, nder.valor, '>=', this.Ltrue);
            }
            else if (this.Tipor == Tipos_1.TipoRelacional.MENORQUE) {
                generador.addIf(nizq.valor, nder.valor, '<', this.Ltrue);
            }
            else {
                generador.addIf(nizq.valor, nder.valor, '<=', this.Ltrue);
            }
            generador.addGoto(this.Lfalse);
            var retorno = new Retorno_1.Retorno('', new Tipos_1.Tipo(Tipos_1.Tipos.BOOLEAN), false);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            return retorno;
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'No se puede traducir' + nizq.valor + " " + this.Tipor + " " + nder.valor, '', this.linea, this.columna);
        }
    };
    MayoryMenort.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        return { posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena };
    };
    return MayoryMenort;
}(Expresion_1.Expresion));
exports.MayoryMenort = MayoryMenort;
