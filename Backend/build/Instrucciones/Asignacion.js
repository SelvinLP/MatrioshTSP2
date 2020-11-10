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
exports.Asignacion = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Generador_1 = require("../Generador/Generador");
var Tipos_1 = require("../Otros/Tipos");
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(id, value, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.value = value;
        return _this;
    }
    Asignacion.prototype.ejecutar = function (entorno) {
        var value = this.value.ejecutar(entorno);
        var nid = this.id.ejecutar(entorno);
        var generador = Generador_1.Generador.getInstancia();
        var simbolo = nid.simbol;
        if (simbolo === null || simbolo === void 0 ? void 0 : simbolo.global) {
            if (nid.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
                var templabel = generador.newEtiq();
                generador.addEtiq(value.Ltrue);
                generador.setstack(simbolo.pos, '1');
                generador.addGoto(templabel);
                generador.addEtiq(value.Lfalse);
                generador.setstack(simbolo.pos, '0');
                generador.addEtiq(templabel);
            }
            else {
                generador.setstack(simbolo.pos, value.valor);
            }
        }
        else if (simbolo === null || simbolo === void 0 ? void 0 : simbolo.sheap) {
            if (nid.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
                var templabel = generador.newEtiq();
                generador.addEtiq(value.Ltrue);
                generador.setstack(simbolo.pos, '1');
                generador.addGoto(templabel);
                generador.addEtiq(value.Lfalse);
                generador.setstack(simbolo.pos, '0');
                generador.addEtiq(templabel);
            }
            else {
                generador.setHeap(nid.valor, value.valor);
            }
        }
        else {
            if (nid.tipo.tipo == Tipos_1.Tipos.BOOLEAN) {
                var templabel = generador.newEtiq();
                generador.addEtiq(value.Ltrue);
                generador.setstack(nid.valor, '1');
                generador.addGoto(templabel);
                generador.addEtiq(value.Lfalse);
                generador.setstack(nid.valor, '0');
                generador.addEtiq(templabel);
            }
            else {
                generador.setstack(nid.valor, value.valor);
            }
        }
    };
    Asignacion.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Asignacion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var resultado;
        //Id
        Cadena += (ast.posdes + 1) + " [label =\"id\"];\n";
        Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        Cadena += (ast.posdes + 2) + " [label =\"=\"];\n";
        Cadena += (ast.posdes) + " -> " + (ast.posdes + 2) + ";\n";
        //Expresion
        resultado = this.value.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 3, cadena: Cadena });
        return resultado;
    };
    return Asignacion;
}(Instruccion_1.Instruccion));
exports.Asignacion = Asignacion;
