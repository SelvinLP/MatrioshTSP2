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
exports.Imprimirt = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var N_Error_1 = require("../Errores/N_Error");
var Imprimirt = /** @class */ (function (_super) {
    __extends(Imprimirt, _super);
    function Imprimirt(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    Imprimirt.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        for (var _i = 0, _a = this.valor; _i < _a.length; _i++) {
            var nexp = _a[_i];
            var nvalor = nexp.ejecutar(entorno);
            if (nvalor.tipo.tipo == Tipos_1.Tipos.NUMBER) {
                generador.addComentario("IMPRIMIR");
                generador.addImpr("f", nvalor.valor);
            }
            else if (nvalor.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
                generador.addComentario("IMPRIMIR");
                var newtem = generador.newEtiq();
                //let tetiq= nvalor.valor == "1" ? nvalor.Ltrue : nvalor.Lfalse;
                //generador.addGoto(tetiq);
                generador.addEtiq(nvalor.Ltrue);
                generador.llamarfunc('native_imprimir_true');
                generador.addGoto(newtem);
                generador.addEtiq(nvalor.Lfalse);
                generador.llamarfunc('native_imprimir_false');
                generador.addEtiq(newtem);
            }
            else if (nvalor.tipo.tipo == Tipos_1.Tipos.NULL) {
                generador.addComentario("IMPRIMIR");
                generador.llamarfunc('native_imprimir_null');
            }
            else if (nvalor.tipo.tipo == Tipos_1.Tipos.STRING) {
                generador.addComentario("IMPRIMIR");
                generador.sigEnt(entorno.size);
                generador.setstack('p', nvalor.valor);
                generador.addExp("T0", nvalor.valor);
                generador.llamarfunc('native_imprimir');
                generador.regEnt(entorno.size);
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede Imprimir ' + nvalor.tipo.tipo, '', this.linea, this.columna);
            }
            generador.addImpr('c', 10);
            generador.addComentario("FIN IMPRIMIR");
        }
    };
    Imprimirt.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Console.log\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return Imprimirt;
}(Instruccion_1.Instruccion));
exports.Imprimirt = Imprimirt;
