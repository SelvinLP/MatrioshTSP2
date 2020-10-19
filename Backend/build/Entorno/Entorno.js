"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Simbolo_1 = require("./Simbolo");
var Tipos_1 = require("../Otros/Tipos");
var N_Error_1 = require("../Errores/N_Error");
var L_Simb_1 = require("../Otros/L_Simb");
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {
        if (anterior === void 0) { anterior = null; }
        this.anterior = anterior;
        this.variables = new Map();
        this.size = (anterior === null || anterior === void 0 ? void 0 : anterior.size) || 0;
    }
    Entorno.prototype.guardarvar = function (letoconst, id, tipo, sref, linea, columna) {
        var env = this;
        if (env.variables.has(id)) {
            if (tipo.tipo == Tipos_1.Tipos.ARRAY) {
                throw new N_Error_1.N_Error('Semantico', 'El array ya existe: ' + id, '', linea, columna);
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'La variable ya existe: ' + id, '', linea, columna);
            }
        }
        this.variables.set(id, new Simbolo_1.Simbolo(letoconst, id, tipo, this.size++, sref, this.anterior == null));
        //tabla de simbolos
        var tipodevariable = letoconst ? "let" : "const";
        var cadgobal = this.anterior == null ? "Global" : "Funcion";
        L_Simb_1.L_Simbs.push(new L_Simb_1.N_Simbolo(tipodevariable, id, tipo.tipo, "", cadgobal));
    };
    Entorno.prototype.obtenervar = function (id) {
        var env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    };
    return Entorno;
}());
exports.Entorno = Entorno;
