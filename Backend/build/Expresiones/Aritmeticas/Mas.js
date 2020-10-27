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
exports.Mast = void 0;
var Expresion_1 = require("../../Abstracto/Expresion");
var Retorno_1 = require("../../Abstracto/Retorno");
var Generador_1 = require("../../Generador/Generador");
var Tipos_1 = require("../../Otros/Tipos");
var N_Error_1 = require("../../Errores/N_Error");
var Mast = /** @class */ (function (_super) {
    __extends(Mast, _super);
    function Mast(izq, der, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        return _this;
    }
    Mast.prototype.ejecutar = function (entorno) {
        var nizq = this.izq.ejecutar(entorno);
        var nder = this.der.ejecutar(entorno);
        var generador = Generador_1.Generador.getInstancia();
        var ntem = generador.newTem();
        if (nizq.tipo.tipo == Tipos_1.Tipos.NUMBER) {
            if (nder.tipo.tipo == Tipos_1.Tipos.NUMBER) {
                generador.addExp(ntem, nizq.valor, nder.valor, '+');
                var retorn = new Retorno_1.Retorno(ntem, nizq.tipo, true);
                return retorn;
            }
            else if (nder.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
                nder.valor = nder.valor ? 1 : 0;
                generador.addExp(ntem, nizq.valor, nder.valor, '+');
                var retorn = new Retorno_1.Retorno(ntem, nizq.tipo, true);
                return retorn;
            }
            else if (nder.tipo.tipo == Tipos_1.Tipos.STRING) {
                //const nuevotem = generador.newTem();
                //generador.addExp(nuevotem,'p',entorno.size + 1, '+');
                //generador.setstack(nuevotem,nizq.valor);
                //generador.addExp(nuevotem,nuevotem,'1','+');
                //generador.setstack(nuevotem,nder.valor);
                //generador.sigEnt(entorno.size);
                //generador.llamarfunc('concat_number_string');
                //generador.getstack(ntem,'p');
                //generador.regEnt(entorno.size);
                var retorn = new Retorno_1.Retorno(ntem, new Tipos_1.Tipo(Tipos_1.Tipos.STRING), true);
                return retorn;
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede traducir ' + nizq.valor + "+" + nder.valor, '', this.linea, this.columna);
            }
        }
        else if (nizq.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
            if (nder.tipo.tipo == Tipos_1.Tipos.STRING) {
                var nuevotem = generador.newTem();
                generador.addExp(nuevotem, "h");
                if (nizq.valor) {
                    generador.setHeap('h', 't'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'r'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'u'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'e'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', '-1');
                    generador.sigHeap();
                }
                else {
                    generador.setHeap('h', 'f'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'a'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'l'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 's'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'e'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', '-1');
                    generador.sigHeap();
                }
                // para concatenar
                generador.addExp("T3", nuevotem);
                generador.addExp("T5", nder.valor);
                //llamamos
                generador.sigEnt(entorno.size);
                generador.llamarfunc('concat_string_string');
                generador.addExp(ntem, "T2");
                generador.regEnt(entorno.size);
                var retorn = new Retorno_1.Retorno(ntem, new Tipos_1.Tipo(Tipos_1.Tipos.STRING), true);
                return retorn;
            }
            else if (nder.tipo.tipo == Tipos_1.Tipos.NUMBER) {
                nizq.valor = nizq.valor ? 1 : 0;
                generador.addExp(ntem, nizq.valor, nder.valor, '+');
                var retorn = new Retorno_1.Retorno(ntem, nder.tipo, true);
                return retorn;
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede traducir ' + nizq.valor + "+" + nder.valor, '', this.linea, this.columna);
            }
        }
        else if (nizq.tipo.tipo == Tipos_1.Tipos.STRING) {
            if (nder.tipo.tipo == Tipos_1.Tipos.STRING) {
                var nuevotem = generador.newTem();
                // para concatenar
                generador.addExp("T3", nizq.valor);
                generador.addExp("T5", nder.valor);
                //llamamos
                generador.sigEnt(entorno.size);
                generador.llamarfunc('concat_string_string');
                generador.addExp(ntem, "T2");
                generador.regEnt(entorno.size);
                var retorn = new Retorno_1.Retorno(ntem, new Tipos_1.Tipo(Tipos_1.Tipos.STRING), true);
                return retorn;
            }
            else if (nder.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
                var nuevotem = generador.newTem();
                generador.addExp(nuevotem, "h");
                if (nder.valor) {
                    generador.setHeap('h', 't'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'r'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'u'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'e'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', '-1');
                    generador.sigHeap();
                }
                else {
                    generador.setHeap('h', 'f'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'a'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'l'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 's'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', 'e'.charCodeAt(0));
                    generador.sigHeap();
                    generador.setHeap('h', '-1');
                    generador.sigHeap();
                }
                // para concatenar
                generador.addExp("T3", nizq.valor);
                generador.addExp("T5", nuevotem);
                //llamamos
                generador.sigEnt(entorno.size);
                generador.llamarfunc('concat_string_string');
                generador.addExp(ntem, "T2");
                generador.regEnt(entorno.size);
                var retorn = new Retorno_1.Retorno(ntem, new Tipos_1.Tipo(Tipos_1.Tipos.STRING), true);
                return retorn;
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'No se puede traducir ' + nizq.valor + "+" + nder.valor, '', this.linea, this.columna);
            }
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'No se puede traducir ' + nizq.valor + "+" + nder.valor, '', this.linea, this.columna);
        }
    };
    Mast.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"+\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        result = this.izq.ejecutarast(result);
        result.posant = ast.posdes;
        result = this.der.ejecutarast(result);
        return result;
    };
    return Mast;
}(Expresion_1.Expresion));
exports.Mast = Mast;
