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
exports.SwitchCase = exports.Case = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Entorno_1 = require("../Entorno/Entorno");
var Generador_1 = require("../Generador/Generador");
var Igual_1 = require("../Expresiones/Relacionales/Igual");
var Case = /** @class */ (function () {
    function Case(id, cuerpo) {
        this.id = id;
        this.cuerpo = cuerpo;
    }
    return Case;
}());
exports.Case = Case;
var SwitchCase = /** @class */ (function (_super) {
    __extends(SwitchCase, _super);
    function SwitchCase(condicion, casos, vdefault, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condicion = condicion;
        _this.casos = casos;
        _this.vdefault = vdefault;
        return _this;
    }
    SwitchCase.prototype.ejecutar = function (entorno) {
        var generator = Generador_1.Generador.getInstancia();
        generator.addComentario('SWITCH');
        var banderadefault = generator.newTem();
        var salida = generator.newTem(); // Salida
        generator.addExp(banderadefault, "0");
        var numerocase = 1;
        for (var _i = 0, _a = this.casos; _i < _a.length; _i++) {
            var nodovalor = _a[_i];
            generator.addComentario('Case no.' + numerocase);
            var comparacion = new Igual_1.Igualt(this.condicion, nodovalor.id, this.linea, this.columna).ejecutar(entorno);
            generator.addEtiq(comparacion.Ltrue);
            //Lista de Instruciones
            var newent = new Entorno_1.Entorno(entorno);
            newent.break = salida;
            generator.addExp(banderadefault, "1");
            for (var _b = 0, _c = nodovalor.cuerpo; _b < _c.length; _b++) {
                var cuerpocaso = _c[_b];
                cuerpocaso.ejecutar(newent);
            }
            generator.addEtiq(comparacion.Lfalse);
            //solo para comemntario de que numero de case es 
            numerocase++;
        }
        if (this.vdefault != null) {
            generator.addComentario('Default');
            var defaulttrue = generator.newEtiq();
            generator.addIf(banderadefault, "0", "==", defaulttrue);
            generator.addGoto(salida);
            generator.addEtiq(defaulttrue);
            var newent = new Entorno_1.Entorno(entorno);
            for (var _d = 0, _e = this.vdefault; _d < _e.length; _d++) {
                var cuerpocaso = _e[_d];
                cuerpocaso.ejecutar(newent);
            }
        }
        generator.addEtiq(salida);
        generator.addComentario('FIN SWITCH');
    };
    SwitchCase.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Switch\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        //Seccion Condicion
        Cadena += (ast.posdes + 1) + " [label =\"Condicion\"];\n";
        Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        result = this.condicion.ejecutarast({ posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena });
        //Seccion Codigo
        result = { posant: ast.posdes, posdes: result.posdes, cadena: result.cadena };
        for (var _i = 0, _a = this.casos; _i < _a.length; _i++) {
            var nodovalor = _a[_i];
            result.cadena += result.posdes + " [label =\"Case\"];\n";
            result.cadena += result.posant + " -> " + result.posdes + ";\n";
            var result2 = { posant: result.posant, posdes: result.posdes + 1, cadena: result.cadena };
            //Expresion
            result = nodovalor.id.ejecutarast({ posant: result.posant, posdes: result.posdes + 1, cadena: result.cadena });
            //Instrucciones
            result.cadena += result.posdes + " [label =\"Instrucciones\"];\n";
            result.cadena += result2.posant + " -> " + result.posdes + ";\n";
            result = { posant: result.posdes, posdes: result.posdes + 1, cadena: result.cadena };
            //Seccion de items de array
            for (var _b = 0, _c = nodovalor.cuerpo; _b < _c.length; _b++) {
                var instr = _c[_b];
                var temresult = instr.ejecutarast(result);
                result.posdes = temresult.posdes;
                result.cadena = temresult.cadena;
            }
            result.cadena += result.posdes + " [label =\"Mas Casos\"];\n";
            result.cadena += result2.posant + " -> " + result.posdes + ";\n";
            result = { posant: result.posdes, posdes: result.posdes + 1, cadena: result.cadena };
        }
        if (this.vdefault != null) {
            result.cadena += result.posdes + " [label =\"Default\"];\n";
            result.cadena += result.posant + " -> " + result.posdes + ";\n";
            result = { posant: result.posant, posdes: result.posdes + 1, cadena: result.cadena };
            //Seccion de items de array
            for (var _d = 0, _e = this.vdefault; _d < _e.length; _d++) {
                var instr = _e[_d];
                var temresult = instr.ejecutarast(result);
                result.posdes = temresult.posdes;
                result.cadena = temresult.cadena;
            }
        }
        return result;
    };
    return SwitchCase;
}(Instruccion_1.Instruccion));
exports.SwitchCase = SwitchCase;
