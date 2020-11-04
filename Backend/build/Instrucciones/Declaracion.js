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
exports.Declaracion = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Tipos_1 = require("../Otros/Tipos");
var Generador_1 = require("../Generador/Generador");
var N_Error_1 = require("../Errores/N_Error");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(letoconst, id, tipo, posiblearr, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.letoconst = letoconst;
        _this.id = id;
        _this.tipo = tipo;
        _this.posiblearr = posiblearr;
        _this.valor = valor;
        return _this;
    }
    Declaracion.prototype.ejecutar = function (entorno) {
        if (this.posiblearr == null) {
            if (this.valor == null) {
                //Validaciones de const
                if (this.letoconst == Tipos_1.TipoDato.CONST) {
                    throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " tipo const no tiene definido un valor", '', this.linea, this.columna);
                }
                else {
                    if (this.tipo == null) {
                        this.tipo = new Tipos_1.Tipo(Tipos_1.Tipos.NULL);
                    }
                    entorno.guardarvar(true, this.id, this.tipo, false, this.linea, this.columna);
                    //validaciones de codigo intermedio
                    this.codigointermedio(entorno, null);
                }
            }
            else {
                var resp = this.valor.ejecutar(entorno);
                //Definicion de tipo sino tiene
                if (this.tipo == null) {
                    this.tipo = resp.tipo;
                }
                else if (this.tipo.tipo != resp.tipo.tipo) {
                    throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " no es de tipo compatible con la expresion", '', this.linea, this.columna);
                }
                if (this.letoconst == Tipos_1.TipoDato.CONST) { //const es false porque no se puede editar
                    entorno.guardarvar(false, this.id, this.tipo, false, this.linea, this.columna);
                }
                else {
                    entorno.guardarvar(true, this.id, this.tipo, false, this.linea, this.columna);
                }
                //validaciones codigo intermedio
                this.codigointermedio(entorno, resp);
            }
        }
    };
    Declaracion.prototype.codigointermedio = function (entorno, nvalor) {
        var generator = Generador_1.Generador.getInstancia();
        var variable = entorno.obtenervar(this.id);
        if (variable === null || variable === void 0 ? void 0 : variable.global) {
            if (this.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
                generator.addComentario("DECLARACION");
                var etiqnueva = generator.newEtiq();
                generator.addEtiq(nvalor.Ltrue);
                generator.setstack(variable.pos, '1');
                generator.addGoto(etiqnueva);
                generator.addEtiq(nvalor.Lfalse);
                generator.setstack(variable.pos, '0');
                generator.addEtiq(etiqnueva);
                generator.addComentario("FIN DECLARACION");
            }
            else {
                generator.setstack(variable.pos, nvalor.valor);
            }
        }
        else {
            var temnueva = generator.newTem();
            //generator.freeTemp(temp);
            generator.addExp(temnueva, 'p', variable === null || variable === void 0 ? void 0 : variable.pos, '+');
            if (this.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
                var tempetiq = generator.newEtiq();
                generator.addEtiq(nvalor.Ltrue);
                generator.setstack(temnueva, '1');
                generator.addGoto(tempetiq);
                generator.addEtiq(nvalor.Lfalse);
                generator.setstack(temnueva, '0');
                generator.addEtiq(tempetiq);
            }
            else {
                generator.setstack(temnueva, nvalor.valor);
            }
        }
    };
    Declaracion.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Declaracion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        //Id
        if (this.letoconst == Tipos_1.TipoDato.CONST) {
            Cadena += (ast.posdes + 1) + " [label =\"const\"];\n";
            Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        }
        else {
            Cadena += (ast.posdes + 1) + " [label =\"let\"];\n";
            Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        }
        Cadena += (ast.posdes + 2) + " [label =\"" + this.id + "\"];\n";
        Cadena += ast.posdes + " -> " + (ast.posdes + 2) + ";\n";
        result = { posant: ast.posdes + 2, posdes: ast.posdes + 3, cadena: Cadena };
        //si es array
        if (this.posiblearr != null) {
            result.cadena += (result.posdes) + " [label =\"[]\"];\n";
            result.cadena += ast.posdes + " -> " + (result.posdes) + ";\n";
            result = { posant: result.posdes, posdes: result.posdes + 1, cadena: result.cadena };
        }
        if (this.valor != null) {
            //=
            result.cadena += (result.posdes) + " [label =\"=\"];\n";
            result.cadena += ast.posdes + " -> " + (result.posdes) + ";\n";
            //Expresion
            result = this.valor.ejecutarast({ posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena });
        }
        return result;
    };
    return Declaracion;
}(Instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
