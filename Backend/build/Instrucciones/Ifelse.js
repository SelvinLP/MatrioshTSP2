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
exports.Ifelse = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var N_Error_1 = require("../Errores/N_Error");
var Entorno_1 = require("../Entorno/Entorno");
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var Ifelse = /** @class */ (function (_super) {
    __extends(Ifelse, _super);
    function Ifelse(condicion, codigo, elsest, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.codigo = codigo;
        _this.elsest = elsest;
        return _this;
    }
    Ifelse.prototype.ejecutar = function (entorno) {
        var _a;
        var generator = Generador_1.Generador.getInstancia();
        generator.addComentario('IF');
        var cond = (_a = this.condicion) === null || _a === void 0 ? void 0 : _a.ejecutar(entorno);
        var newent = new Entorno_1.Entorno(entorno);
        if (cond.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            generator.addEtiq(cond.Ltrue);
            this.codigo.ejecutar(newent);
            if (this.elsest != null) {
                var newetq = generator.newEtiq();
                generator.addGoto(newetq);
                generator.addEtiq(cond.Lfalse);
                this.elsest.ejecutar(entorno);
                generator.addEtiq(newetq);
            }
            else {
                generator.addEtiq(cond.Lfalse);
            }
            generator.addComentario('FIN IF');
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'La condicion no es booleana:' + cond.tipo.tipo, '', this.linea, this.columna);
        }
    };
    Ifelse.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"If\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        //Seccion Condicion
        result = this.condicion.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena });
        //Seccion Codigo
        result = this.codigo.ejecutarast({ posant: ast.posdes, posdes: result.posdes, cadena: result.cadena });
        //Seccion Else
        if (this.elsest != null) {
            var Cadena_1 = result.cadena + "\n";
            Cadena_1 += result.posdes + " [label =\"Else\"];\n";
            Cadena_1 += ast.posdes + " -> " + result.posdes + ";\n";
            result = this.elsest.ejecutarast({ posant: result.posdes, posdes: result.posdes + 1, cadena: Cadena_1 });
        }
        return result;
    };
    return Ifelse;
}(Instruccion_1.Instruccion));
exports.Ifelse = Ifelse;
