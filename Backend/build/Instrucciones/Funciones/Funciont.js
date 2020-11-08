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
exports.Funciont = void 0;
var Instruccion_1 = require("../../Abstracto/Instruccion");
var Entorno_1 = require("../../Entorno/Entorno");
var N_Error_1 = require("../../Errores/N_Error");
var Generador_1 = require("../../Generador/Generador");
var Funciont = /** @class */ (function (_super) {
    __extends(Funciont, _super);
    function Funciont(id, parametros, tiporetorno, codigo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.parametros = parametros;
        _this.tiporetorno = tiporetorno;
        _this.codigo = codigo;
        return _this;
    }
    Funciont.prototype.ejecutar = function (entorno) {
        //guardamos la funcion
        entorno.guardarfunc(this.id, this, this.linea, this.columna);
        var nfuncion = entorno.obtenerfunc(this.id);
        if (nfuncion == undefined) {
            throw new N_Error_1.N_Error('Semantico', 'La funcion no existe: ' + this.id, '', this.linea, this.columna);
        }
        var generador = Generador_1.Generador.getInstancia();
        var newent = new Entorno_1.Entorno(entorno);
        var returnLbl = generador.newEtiq();
    };
    Funciont.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Funcion: " + this.id + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var retorno = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        //Instrucciones
        retorno.cadena += retorno.posdes + " [label =\"Instrucciones\"];\n";
        retorno.cadena += retorno.posant + " -> " + retorno.posdes + ";\n";
        //Seccion de items de array
        retorno = { posant: retorno.posdes, posdes: retorno.posdes + 1, cadena: retorno.cadena };
        for (var _i = 0, _a = this.codigo; _i < _a.length; _i++) {
            var instr = _a[_i];
            var temresult = instr.ejecutarast(retorno);
            retorno.posdes = temresult.posdes;
            retorno.cadena = temresult.cadena;
        }
        return retorno;
    };
    return Funciont;
}(Instruccion_1.Instruccion));
exports.Funciont = Funciont;
