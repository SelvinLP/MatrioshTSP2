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
exports.AccesoId = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var Generador_1 = require("../Generador/Generador");
var N_Error_1 = require("../Errores/N_Error");
var Tipos_1 = require("../Otros/Tipos");
var AccesoId = /** @class */ (function (_super) {
    __extends(AccesoId, _super);
    function AccesoId(id, anterior, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.anterior = anterior;
        return _this;
    }
    AccesoId.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        if (this.anterior == null) {
            var simbolo = entorno.obtenervar(this.id);
            if (simbolo == null) {
                throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " no existe", '', this.linea, this.columna);
            }
            var temp = generador.newTem();
            if (simbolo.global) {
                generador.getstack(temp, simbolo.pos);
                if (simbolo.tipo.tipo != Tipos_1.Tipos.BOOLEAN) {
                    return new Retorno_1.Retorno(temp, simbolo.tipo, true, simbolo);
                }
                var retorno = new Retorno_1.Retorno('', simbolo.tipo, false, simbolo);
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                generador.addIf(temp, '1', '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }
            else {
                var tempAux = generador.newTem();
                generador.addExp(tempAux, 'p', simbolo.pos, '+');
                generador.getstack(temp, tempAux);
                if (simbolo.tipo.tipo != Tipos_1.Tipos.BOOLEAN) {
                    return new Retorno_1.Retorno(temp, simbolo.tipo, true, simbolo);
                }
                var retorno = new Retorno_1.Retorno('', simbolo.tipo, false);
                this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
                this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
                generador.addIf(temp, '1', '==', this.Ltrue);
                generador.addGoto(this.Lfalse);
                retorno.Ltrue = this.Ltrue;
                retorno.Lfalse = this.Lfalse;
                return retorno;
            }
        }
        else {
            //Temporal
            throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " no existe", '', this.linea, this.columna);
        }
    };
    AccesoId.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"" + this.id + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        return { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
    };
    return AccesoId;
}(Expresion_1.Expresion));
exports.AccesoId = AccesoId;
