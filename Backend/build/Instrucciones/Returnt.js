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
exports.Returnt = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Retorno_1 = require("../Abstracto/Retorno");
var Tipos_1 = require("../Otros/Tipos");
var Generador_1 = require("../Generador/Generador");
var N_Error_1 = require("../Errores/N_Error");
var Returnt = /** @class */ (function (_super) {
    __extends(Returnt, _super);
    function Returnt(valoraretorn, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.valoraretorn = valoraretorn;
        return _this;
    }
    Returnt.prototype.ejecutar = function (entorno) {
        var nvalor = this.valoraretorn != null ? this.valoraretorn.ejecutar(entorno) : new Retorno_1.Retorno('0', new Tipos_1.Tipo(Tipos_1.Tipos.NULL), false);
        var actfunc = entorno.actualFunc;
        var generador = Generador_1.Generador.getInstancia();
        if (actfunc == null) {
            throw new N_Error_1.N_Error('Semantico', 'Return fuera de una funcion', '', this.linea, this.columna);
        }
        if (actfunc.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            var templabel = generador.newEtiq();
            generador.addEtiq(nvalor.Ltrue);
            generador.setstack('p', '1');
            generador.addGoto(templabel);
            generador.addEtiq(nvalor.Lfalse);
            generador.setstack('p', '0');
            generador.addEtiq(templabel);
        }
        else if (actfunc.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            generador.setstack('p', nvalor.valor);
        }
        generador.addGoto(entorno.return || '');
    };
    Returnt.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\" Return \"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return Returnt;
}(Instruccion_1.Instruccion));
exports.Returnt = Returnt;
