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
exports.Opeternario = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Entorno_1 = require("../Entorno/Entorno");
var N_Error_1 = require("../Errores/N_Error");
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var Opeternario = /** @class */ (function (_super) {
    __extends(Opeternario, _super);
    function Opeternario(condicion, valortrue, valorfalse, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.valortrue = valortrue;
        _this.valorfalse = valorfalse;
        return _this;
    }
    Opeternario.prototype.ejecutar = function (entorno) {
        var _a;
        var generator = Generador_1.Generador.getInstancia();
        generator.addComentario('TERNARIO');
        var condicion = (_a = this.condicion) === null || _a === void 0 ? void 0 : _a.ejecutar(entorno);
        var newwntorno = new Entorno_1.Entorno(entorno);
        var salidatrue = generator.newEtiq();
        if (condicion.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            //valores verdaderos
            generator.addEtiq(condicion.Ltrue);
            var condtrue = this.valortrue.ejecutar(newwntorno);
            generator.addGoto(salidatrue);
            //valores falsos
            generator.addEtiq(condicion.Lfalse);
            var condfalse = this.valorfalse.ejecutar(newwntorno);
            generator.addEtiq(salidatrue);
            generator.addComentario('FIN TERNARIO');
            var retorno = condtrue;
            return retorno;
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'La condicion no es booleana:' + condicion.tipo.tipo, '', this.linea, this.columna);
        }
    };
    Opeternario.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Operador Terneario\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var resultado = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        resultado = this.condicion.ejecutarast({ posant: ast.posdes, posdes: resultado.posdes, cadena: resultado.cadena });
        resultado = this.valortrue.ejecutarast({ posant: ast.posdes, posdes: resultado.posdes, cadena: resultado.cadena });
        resultado = this.valorfalse.ejecutarast({ posant: ast.posdes, posdes: resultado.posdes, cadena: resultado.cadena });
        return resultado;
    };
    return Opeternario;
}(Expresion_1.Expresion));
exports.Opeternario = Opeternario;
