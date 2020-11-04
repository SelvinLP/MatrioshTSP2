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
exports.Dect = void 0;
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var N_Error_1 = require("../../Errores/N_Error");
var Tipos_1 = require("../../Otros/Tipos");
var Instruccion_1 = require("../../Abstracto/Instruccion");
var Dect = /** @class */ (function (_super) {
    __extends(Dect, _super);
    function Dect(id, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        return _this;
    }
    Dect.prototype.ejecutar = function (entorno) {
        var nid = this.id.ejecutar(entorno);
        var simbolo = nid.simbol;
        var generador = Generador_1.Generador.getInstancia();
        if (simbolo == null) {
            throw new N_Error_1.N_Error('Semantico', 'No se puede operar decremento (--)', '', this.linea, this.columna);
        }
        if (nid.tipo.tipo = Tipos_1.Tipos.NUMBER) {
            generador.addComentario('DECREMENTO');
            var temp = generador.newTem();
            var tempaux = generador.newTem();
            if (simbolo.global) {
                generador.getstack(temp, simbolo.pos);
                generador.addExp(tempaux, temp, '1', '-');
                generador.setstack(simbolo.pos, tempaux);
            }
            else if (simbolo.sheap) {
                generador.getHeap(temp, nid.valor);
                generador.addExp(tempaux, temp, '1', '-');
                generador.setHeap(nid.valor, tempaux);
            }
            else {
                generador.getstack(temp, nid.valor);
                generador.addExp(tempaux, temp, '1', '-');
                generador.setstack(nid.valor, tempaux);
            }
            generador.addComentario('FIN DECREMENTO');
            return new Retorno_1.Retorno(temp, simbolo.tipo, true);
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'No se puede operar decremento (--)', '', this.linea, this.columna);
        }
    };
    Dect.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\" Decremento id\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return Dect;
}(Instruccion_1.Instruccion));
exports.Dect = Dect;
