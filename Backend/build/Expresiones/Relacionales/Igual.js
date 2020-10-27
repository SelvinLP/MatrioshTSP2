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
exports.Igualt = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var Igualt = /** @class */ (function (_super) {
    __extends(Igualt, _super);
    function Igualt(izq, der, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        return _this;
    }
    Igualt.prototype.ejecutar = function (entorno) {
        var nizq = this.izq.ejecutar(entorno);
        var nder = null;
        var generador = Generador_1.Generador.getInstancia();
        if (nizq.tipo.tipo == Tipos_1.Tipos.NUMBER) {
            nder = this.der.ejecutar(entorno);
            if (nder.tipo.tipo == Tipos_1.Tipos.NUMBER) {
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                generador.addIf(nizq.valor, nder.valor, '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                var retorno = new Retorno_1.Retorno('', new Tipos_1.Tipo(Tipos_1.Tipos.BOOLEAN), false);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede traducir' + nizq.valor + " == " + nder.valor, '', this.linea, this.columna);
            }
        }
        else if (nizq.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            var lbtrue = generador.newEtiq();
            var lbfalse = generador.newEtiq();
            generador.addEtiq(nizq.Ltrue);
            this.der.Ltrue = lbtrue;
            this.der.Lfalse = lbfalse;
            nder = this.der.ejecutar(entorno);
            generador.addEtiq(nizq.Lfalse);
            this.der.Ltrue = lbfalse;
            this.der.Lfalse = lbtrue;
            nder = this.der.ejecutar(entorno);
            if (nder.tipo.tipo = Tipos_1.Tipos.BOOLEAN) {
                var retorno = new Retorno_1.Retorno('', nizq.tipo, false);
                retorno.Ltrue = lbtrue;
                retorno.Lfalse = lbfalse;
                return retorno;
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede traducir' + nizq.valor + " == " + nder.valor, '', this.linea, this.columna);
            }
        }
        else if (nizq.tipo.tipo == Tipos_1.Tipos.NULL) {
            nder = this.der.ejecutar(entorno);
            if (nder.tipo.tipo == Tipos_1.Tipos.STRING || nder.tipo.tipo == Tipos_1.Tipos.NULL) {
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                generador.addIf(nizq.valor, nder.valor, '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                var retorno = new Retorno_1.Retorno('', new Tipos_1.Tipo(Tipos_1.Tipos.NULL), false);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede traducir' + nizq.valor + " == " + nder.valor, '', this.linea, this.columna);
            }
        }
        else if (nizq.tipo.tipo == Tipos_1.Tipos.STRING) {
            nder = this.der.ejecutar(entorno);
            if (nder.tipo.tipo == Tipos_1.Tipos.NULL) {
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                generador.addIf(nizq.valor, nder.valor, '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                var retorno = new Retorno_1.Retorno('', new Tipos_1.Tipo(Tipos_1.Tipos.BOOLEAN), false);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }
            else if (nder.tipo.tipo == Tipos_1.Tipos.STRING) {
                var temp = generador.newTem();
                generador.sigEnt(entorno.size);
                generador.addExp("T7", nizq.valor);
                generador.addExp("T8", nder.valor);
                generador.llamarfunc('native_cmp_str');
                generador.addExp(temp, "T11");
                generador.regEnt(entorno.size);
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                generador.addIf(temp, '1', '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                var retorno = new Retorno_1.Retorno('', new Tipos_1.Tipo(Tipos_1.Tipos.BOOLEAN), false);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede traducir' + nizq.valor + " == " + nder.valor, '', this.linea, this.columna);
            }
        }
        else {
            nder = this.der.ejecutar(entorno);
            throw new N_Error_1.N_Error('Semantico', 'No se puede traducir' + nizq.valor + " == " + nder.valor, '', this.linea, this.columna);
        }
    };
    Igualt.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"==\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        result = this.izq.ejecutarast(result);
        result.posant = ast.posdes;
        result = this.der.ejecutarast(result);
        return result;
    };
    return Igualt;
}(Expresion_1.Expresion));
exports.Igualt = Igualt;
