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
exports.AsigId = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var N_Error_1 = require("../../Errores/N_Error");
var AsigId = /** @class */ (function (_super) {
    __extends(AsigId, _super);
    function AsigId(id, anterior, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.anterior = anterior;
        return _this;
    }
    AsigId.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        if (this.anterior == null) {
            var nvalor = entorno.obtenervar(this.id);
            if (nvalor == null) {
                throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " no existe", '', this.linea, this.columna);
            }
            if (nvalor.global) {
                return new Retorno_1.Retorno(nvalor.pos + '', nvalor.tipo, false, nvalor);
            }
            else {
                var temp = generador.newTem();
                generador.addExp(temp, 'p', nvalor.pos, '+');
                return new Retorno_1.Retorno(temp, nvalor.tipo, true, nvalor);
            }
        }
        else {
            //temporal
            throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " no existe", '', this.linea, this.columna);
        }
    };
    AsigId.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Id\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return AsigId;
}(Expresion_1.Expresion));
exports.AsigId = AsigId;
