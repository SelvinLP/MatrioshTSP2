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
exports.Opearitmetica = void 0;
var InstruccionOp_1 = require("./Abstracto/InstruccionOp");
var Noptimizacion_1 = require("./Noptimizacion");
var Opearitmetica = /** @class */ (function (_super) {
    __extends(Opearitmetica, _super);
    function Opearitmetica(temresult, opei, operador, oped, linea) {
        var _this = _super.call(this, linea) || this;
        _this.temresult = temresult;
        _this.opei = opei;
        _this.operador = operador;
        _this.oped = oped;
        return _this;
    }
    Opearitmetica.prototype.ejecutar = function () {
        var cadtem = "  ";
        //casos de 6 al 9
        if (this.temresult == this.opei.toString() || this.temresult == this.oped.toString()) {
            if (this.operador == '+' || this.operador == '-') {
                var number = this.operador == '+' ? "6" : "7";
                if (typeof this.opei == 'number') {
                    if (this.opei == 0 && this.operador == '+') {
                        Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. " + number + ": Simplificación algebraica y reducción por fuerza", this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";", "", this.linea));
                        return;
                    }
                }
                else if (typeof this.oped == 'number') {
                    if (this.oped == 0) {
                        Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. " + number + ": Simplificación algebraica y reducción por fuerza", this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";", "", this.linea));
                        return;
                    }
                }
            }
            else if (this.operador == '*' || this.operador == '/') {
                var number = this.operador == '*' ? "8" : "9";
                if (typeof this.opei == 'number') {
                    if (this.opei == 1) {
                        Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. " + number + ": Simplificación algebraica y reducción por fuerza", this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";", "", this.linea));
                        return;
                    }
                }
                else if (typeof this.oped == 'number') {
                    if (this.oped == 1) {
                        Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. " + number + ": Simplificación algebraica y reducción por fuerza", this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";", "", this.linea));
                        return;
                    }
                }
            }
        }
        else {
            if (this.operador == '+' || this.operador == '-') {
                var number = this.operador == '+' ? "10" : "11";
                if (typeof this.opei == 'number') {
                    if (this.opei == 0 && this.operador == '+') {
                        Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. " + number + ": Simplificación algebraica y reducción por fuerza", this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";", this.temresult + " = " + this.oped + ";", this.linea));
                        cadtem += this.temresult + " = " + this.oped + ";";
                        Noptimizacion_1.Codigonuevo.push(cadtem);
                        return;
                    }
                }
                else if (typeof this.oped == 'number') {
                    if (this.oped == 0) {
                        Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. " + number + ": Simplificación algebraica y reducción por fuerza", this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";", this.temresult + " = " + this.opei + ";", this.linea));
                        cadtem += this.temresult + " = " + this.opei + ";";
                        Noptimizacion_1.Codigonuevo.push(cadtem);
                        return;
                    }
                }
            }
            else if (this.operador == '*' || this.operador == '/') {
                var number = this.operador == '*' ? "12" : "13";
                if (typeof this.opei == 'number') {
                    if (this.opei == 1) {
                        Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. " + number + ": Simplificación algebraica y reducción por fuerza", this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";", this.temresult + " = " + this.oped + ";", this.linea));
                        cadtem += this.temresult + " = " + this.oped + ";";
                        Noptimizacion_1.Codigonuevo.push(cadtem);
                        return;
                    }
                }
                else if (typeof this.oped == 'number') {
                    if (this.oped == 1) {
                        Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. " + number + ": Simplificación algebraica y reducción por fuerza", this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";", this.temresult + " = " + this.opei + ";", this.linea));
                        cadtem += this.temresult + " = " + this.opei + ";";
                        Noptimizacion_1.Codigonuevo.push(cadtem);
                        return;
                    }
                }
            }
        }
        cadtem += this.temresult + " = " + this.opei + " " + this.operador + " " + this.oped + ";";
        Noptimizacion_1.Codigonuevo.push(cadtem);
    };
    return Opearitmetica;
}(InstruccionOp_1.InstruccionOp));
exports.Opearitmetica = Opearitmetica;
