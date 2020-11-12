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
exports.Declaracionarr = void 0;
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var N_Error_1 = require("../Errores/N_Error");
var Instruccion_1 = require("../Abstracto/Instruccion");
var Declaracionarr = /** @class */ (function (_super) {
    __extends(Declaracionarr, _super);
    function Declaracionarr(tipo, id, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipo = tipo;
        _this.id = id;
        _this.valor = valor;
        return _this;
    }
    Declaracionarr.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        generador.addComentario("DECLARACION ARRAY");
        var nvalor = this.valor.ejecutar(entorno);
        entorno.guardarvar(true, this.id, this.tipo, false, this.linea, this.columna);
        var variable = entorno.obtenervar(this.id);
        if (nvalor.tipo.tipo == Tipos_1.Tipos.ARRAY) { //viene un new array
            var tem = generador.newTem();
            var etq1 = generador.newEtiq();
            var etq2 = generador.newEtiq();
            generador.addExp(tem, nvalor.valor, '1', '+');
            generador.addEtiq(etq1);
            generador.addIf(tem, 'h', '==', etq2);
            if (this.tipo.dimension == nvalor.tipo.dimension) { //llenar valores por defecto
                this.tipo.tipo != Tipos_1.Tipos.STRING && this.tipo.tipo != Tipos_1.Tipos.TYPE ? generador.setHeap(tem, '0') : generador.setHeap(tem, '-1');
            }
            else {
                generador.setHeap(tem, '-1');
            }
            generador.addExp(tem, tem, '1', '+');
            generador.addGoto(etq1);
            generador.addEtiq(etq2);
        }
        else if (this.tipo.dimension != nvalor.tipo.dimension || this.tipo.tipo != nvalor.tipo.tipo) {
            throw new N_Error_1.N_Error('Semantico', 'Tipos de datos incorrectos en el array', '', this.linea, this.columna);
        }
        if (variable === null || variable === void 0 ? void 0 : variable.global) {
            generador.setstack(variable.pos, nvalor.valor);
        }
        else {
            var tem = generador.newTem();
            generador.addExp(tem, 'p', variable === null || variable === void 0 ? void 0 : variable.pos, '+');
            generador.setstack(tem, nvalor.valor);
        }
        generador.addComentario("FIN DECLARACION ARRAY");
    };
    Declaracionarr.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Declaracion Array: " + this.id + " = \"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var retorno = this.valor.ejecutarast({ posant: ast.posant, posdes: ast.posdes + 1, cadena: Cadena });
        return retorno;
    };
    return Declaracionarr;
}(Instruccion_1.Instruccion));
exports.Declaracionarr = Declaracionarr;
