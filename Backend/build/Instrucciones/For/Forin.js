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
exports.Forin = void 0;
var Instruccion_1 = require("../../Abstracto/Instruccion");
var Tipos_1 = require("../../Otros/Tipos");
var Entorno_1 = require("../../Entorno/Entorno");
var Generador_1 = require("../../Generador/Generador");
var Forin = /** @class */ (function (_super) {
    __extends(Forin, _super);
    function Forin(letoconst, id, iddireccion, codigo, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.letoconst = letoconst;
        _this.id = id;
        _this.iddireccion = iddireccion;
        _this.codigo = codigo;
        return _this;
    }
    Forin.prototype.ejecutar = function (entorno) {
        var generador = Generador_1.Generador.getInstancia();
        var newentorno = new Entorno_1.Entorno(entorno);
        var temarray = this.iddireccion.ejecutar(entorno);
        var etiqshile = generador.newEtiq();
        var etiqsalida = generador.newEtiq();
        var etiqverd = generador.newEtiq();
        generador.addComentario('FOR IN');
        //declaracion
        newentorno.guardarvar(true, this.id, new Tipos_1.Tipo(Tipos_1.Tipos.NUMBER), false, this.linea, this.columna);
        var variable = newentorno.obtenervar(this.id);
        if (variable === null || variable === void 0 ? void 0 : variable.global) {
            generador.setstack(variable.pos, '0');
        }
        else {
            var temnueva_1 = generador.newTem();
            generador.addExp(temnueva_1, 'p', variable === null || variable === void 0 ? void 0 : variable.pos, '+');
            generador.setstack(temnueva_1, '0');
        }
        //cuerpo
        var temnueva = generador.newTem();
        var temnuevaheap = generador.newTem();
        generador.getHeap(temnuevaheap, temarray.valor);
        generador.getstack(temnueva, variable === null || variable === void 0 ? void 0 : variable.pos);
        generador.addEtiq(etiqshile);
        generador.addIf(temnueva, temnuevaheap, "<", etiqverd);
        generador.addGoto(etiqsalida);
        generador.addEtiq(etiqverd);
        //cuerpo verdadero
        var ncuerpo = this.codigo.ejecutar(newentorno);
        generador.addExp(temnueva, temnueva, "1", "+");
        generador.setstack(variable === null || variable === void 0 ? void 0 : variable.pos, temnueva);
        generador.addGoto(etiqshile);
        generador.addEtiq(etiqsalida);
        generador.addComentario('FIN FOR IN');
    };
    Forin.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"For in\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        result.cadena += result.posdes + " [label =\"Id: " + this.id + "\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = { posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena };
        result.cadena += result.posdes + " [label =\"Array\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        //Seccion Codigo
        result = this.codigo.ejecutarast({ posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena });
        return result;
    };
    return Forin;
}(Instruccion_1.Instruccion));
exports.Forin = Forin;
