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
exports.LPrimitivo = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Tipos_1 = require("../Otros/Tipos");
var Generador_1 = require("../Generador/Generador");
var LPrimitivo = /** @class */ (function (_super) {
    __extends(LPrimitivo, _super);
    function LPrimitivo(valor, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.tipo = tipo;
        return _this;
    }
    LPrimitivo.prototype.ejecutar = function (entorno) {
        if (this.tipo == Tipos_1.Tipos.NUMBER) {
            return new Retorno_1.Retorno(this.valor, new Tipos_1.Tipo(this.tipo), false);
        }
        else if (this.tipo == Tipos_1.Tipos.BOOLEAN) {
            var generador = Generador_1.Generador.getInstancia();
            //Comprobacion de banderas
            this.Ltrue = this.Ltrue == '' ? generador.newEtiq() : this.Ltrue;
            this.Lfalse = this.Lfalse == '' ? generador.newEtiq() : this.Lfalse;
            this.valor = this.valor == "true" || this.valor == true ? true : false;
            this.valor ? generador.addGoto(this.Ltrue) : generador.addGoto(this.Lfalse);
            var retorn = new Retorno_1.Retorno('', new Tipos_1.Tipo(this.tipo), false);
            retorn.Ltrue = this.Ltrue;
            retorn.Lfalse = this.Lfalse;
            return retorn;
        }
        else if (this.tipo == Tipos_1.Tipos.NULL) {
            return new Retorno_1.Retorno('-1', new Tipos_1.Tipo(this.tipo), false);
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'El tipo de dato no existe', '', this.linea, this.columna);
        }
    };
    LPrimitivo.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        Cadena += (ast.posdes + 1) + " [label =\"" + this.valor + "\"];\n";
        Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        return { posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena };
    };
    return LPrimitivo;
}(Expresion_1.Expresion));
exports.LPrimitivo = LPrimitivo;
