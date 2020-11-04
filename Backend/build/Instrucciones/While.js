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
exports.While = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var N_Error_1 = require("../Errores/N_Error");
var Entorno_1 = require("../Entorno/Entorno");
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var While = /** @class */ (function (_super) {
    __extends(While, _super);
    function While(condicion, codigo, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condicion = condicion;
        _this.codigo = codigo;
        return _this;
    }
    While.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var newentorno = new Entorno_1.Entorno(entorno);
        var etiqshile = generador.newEtiq();
        generador.addComentario('WHILE');
        generador.addEtiq(etiqshile);
        var condicion = this.condicion.ejecutar(entorno);
        if (condicion.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            newentorno.break = condicion.Lfalse;
            newentorno.continue = etiqshile;
            generador.addEtiq(condicion.Ltrue);
            this.codigo.ejecutar(newentorno);
            generador.addGoto(etiqshile);
            generador.addEtiq(condicion.Lfalse);
            generador.addComentario('FIN WHILE');
            return;
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'La condicion no es booleana en el while', '', this.linea, this.columna);
        }
    };
    While.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"While\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        //Seccion Expresion
        result = this.condicion.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena });
        //Seccion Codigo
        result = this.codigo.ejecutarast({ posant: ast.posdes, posdes: result.posdes, cadena: result.cadena });
        return result;
    };
    return While;
}(Instruccion_1.Instruccion));
exports.While = While;
