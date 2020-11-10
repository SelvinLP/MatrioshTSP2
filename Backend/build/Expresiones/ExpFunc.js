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
exports.ExpFunc = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var ExpFunc = /** @class */ (function (_super) {
    __extends(ExpFunc, _super);
    function ExpFunc(id, params, anterior, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.params = params;
        _this.anterior = anterior;
        return _this;
    }
    ExpFunc.prototype.ejecutar = function (entorno) {
        if (this.anterior == null) {
            var funcactual = entorno.buscarfunc(this.id);
            if (funcactual == null) {
                throw new N_Error_1.N_Error('Semantico', 'La funcion no existe: ' + this.id, '', this.linea, this.columna);
            }
            var paramsValues_1 = new Array();
            var generator_1 = Generador_1.Generador.getInstancia();
            generator_1.addComentario("LLAMADA A FUNCION");
            //guardo variables dentro del entorno
            var size = generator_1.guardartems(entorno);
            //Guardo temporales
            this.params.forEach(function (param) {
                paramsValues_1.push(param.ejecutar(entorno));
            });
            //TODO comprobar parametros correctos
            var temp_1 = generator_1.newTem();
            //Paso de parametros en cambio simulado
            if (paramsValues_1.length != 0) {
                generator_1.addExp(temp_1, 'p', entorno.size + 1, '+'); //+1 porque la posicion 0 es para el retorno;
                paramsValues_1.forEach(function (value, index) {
                    //TODO paso de parametros booleanos
                    generator_1.setstack(temp_1, value.valor);
                    if (index != paramsValues_1.length - 1)
                        generator_1.addExp(temp_1, temp_1, '1', '+');
                });
            }
            generator_1.sigEnt(entorno.size);
            generator_1.llamarfunc(funcactual.id);
            generator_1.getstack(temp_1, 'p');
            generator_1.regEnt(entorno.size);
            generator_1.recoverTemps(entorno, size);
            generator_1.addTemp(temp_1);
            if (funcactual.tipo.tipo != Tipos_1.Tipos.BOOLEAN) {
                generator_1.addComentario("FIN LLAMADA A FUNCION");
                return new Retorno_1.Retorno(temp_1, funcactual.tipo, true);
            }
            var retorno = new Retorno_1.Retorno('', funcactual.tipo, false);
            this.Ltrue = this.Ltrue == '' ? generator_1.newEtiq() : this.Ltrue;
            this.Lfalse = this.Lfalse == '' ? generator_1.newEtiq() : this.Lfalse;
            generator_1.addIf(temp_1, '1', '==', this.Ltrue);
            generator_1.addGoto(this.Lfalse);
            retorno.Ltrue = this.Ltrue;
            retorno.Lfalse = this.Lfalse;
            generator_1.addComentario("FIN LLAMADA A FUNCION");
            return retorno;
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'La funcion no existe: ' + this.id, '', this.linea, this.columna);
        }
    };
    ExpFunc.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Llamar funcion: " + this.id + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var retorno = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return retorno;
    };
    return ExpFunc;
}(Expresion_1.Expresion));
exports.ExpFunc = ExpFunc;
