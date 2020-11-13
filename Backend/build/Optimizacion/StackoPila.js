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
exports.CadenaOtro = void 0;
var InstruccionOp_1 = require("./Abstracto/InstruccionOp");
var Noptimizacion_1 = require("./Noptimizacion");
var CadenaOtro = /** @class */ (function (_super) {
    __extends(CadenaOtro, _super);
    function CadenaOtro(result, operador, cont, linea) {
        if (operador === void 0) { operador = " = "; }
        var _this = _super.call(this, linea) || this;
        _this.result = result;
        _this.operador = operador;
        _this.cont = cont;
        return _this;
    }
    CadenaOtro.prototype.ejecutar = function () {
        var cadtem = "  " + this.result + " " + this.operador + " " + this.cont;
        cadtem += this.puntoycoma ? ";" : "";
        Noptimizacion_1.Codigonuevo.push(cadtem);
    };
    CadenaOtro.prototype.onlycad = function () {
        var cadtem = "  " + this.result + " " + this.operador + " " + this.cont;
        cadtem += this.puntoycoma ? ";" : "";
        return cadtem;
    };
    return CadenaOtro;
}(InstruccionOp_1.InstruccionOp));
exports.CadenaOtro = CadenaOtro;
