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
exports.IfOp = void 0;
var InstruccionOp_1 = require("./Abstracto/InstruccionOp");
var Noptimizacion_1 = require("./Noptimizacion");
var IfOp = /** @class */ (function (_super) {
    __extends(IfOp, _super);
    function IfOp(izq, ope, der, goto1, goto2, etiq, linea) {
        var _this = _super.call(this, linea) || this;
        _this.izq = izq;
        _this.ope = ope;
        _this.der = der;
        _this.goto1 = goto1;
        _this.goto2 = goto2;
        _this.etiq = etiq;
        return _this;
    }
    IfOp.prototype.ejecutar = function () {
        //Regla 3 y 4
        var acceso = false;
        var bandera = false;
        var cadtem = "";
        if (typeof this.izq == 'string' && typeof this.der == 'string') {
            if (this.izq == this.der) {
                if (this.ope == "==") {
                    Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. 3: Eliminacion de codigo muerto", "if( " + this.izq + " " + this.ope + " " + this.der + ")" + this.goto1.onlycad() + this.goto2.onlycad(), this.goto1.onlycad() + "", this.linea));
                    cadtem += this.goto1.onlycad() + "";
                    Noptimizacion_1.Codigonuevo.push(cadtem);
                    cadtem = this.etiq.onlycad() + "";
                    Noptimizacion_1.Codigonuevo.push(cadtem);
                    return;
                }
                else if (this.ope == "!=") {
                    Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. 4: Eliminacion de codigo muerto", "if( " + this.izq + " " + this.ope + " " + this.der + ")" + this.goto1.onlycad() + this.goto2.onlycad(), this.goto2.onlycad() + "", this.linea));
                    cadtem += this.goto2.onlycad() + "";
                    Noptimizacion_1.Codigonuevo.push(cadtem);
                    cadtem = this.etiq.onlycad() + "";
                    Noptimizacion_1.Codigonuevo.push(cadtem);
                    return;
                }
            }
        }
        else if (typeof this.izq == 'number' && typeof this.der == 'number') {
            if (this.ope == "==") {
                if (this.izq == this.der) {
                    console.log("s");
                    acceso = true;
                    bandera = true;
                }
                else {
                    acceso = true;
                    bandera = false;
                }
            }
            else if (this.ope == "!=") {
                if (this.izq != this.der) {
                    acceso = true;
                    bandera = true;
                }
                else {
                    acceso = true;
                    bandera = false;
                }
            }
            else if (this.ope == ">=") {
                if (this.izq >= this.der) {
                    acceso = true;
                    bandera = true;
                }
                else {
                    acceso = true;
                    bandera = false;
                }
            }
            else if (this.ope == "<=") {
                if (this.izq <= this.der) {
                    acceso = true;
                    bandera = true;
                }
                else {
                    acceso = true;
                    bandera = false;
                }
            }
            else if (this.ope == ">") {
                if (this.izq > this.der) {
                    acceso = true;
                    bandera = true;
                }
                else {
                    acceso = true;
                    bandera = false;
                }
            }
            else if (this.ope == "<") {
                if (this.izq < this.der) {
                    acceso = true;
                    bandera = true;
                }
                else {
                    acceso = true;
                    bandera = false;
                }
            }
        }
        if (acceso) {
            console.log("llego");
            if (bandera) {
                Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. 3: Eliminacion de codigo muerto", "if( " + this.izq + " " + this.ope + " " + this.der + ")" + this.goto1.onlycad() + this.goto2.onlycad(), this.goto1.onlycad() + "", this.linea));
                cadtem += this.goto1.onlycad() + "";
                Noptimizacion_1.Codigonuevo.push(cadtem);
                cadtem = this.etiq.onlycad() + "";
                Noptimizacion_1.Codigonuevo.push(cadtem);
            }
            else {
                Noptimizacion_1.L_Optimizacion.push(new Noptimizacion_1.N_Optim("Mirilla", "No. 4: Eliminacion de codigo muerto", "if( " + this.izq + " " + this.ope + " " + this.der + ")" + this.goto1.onlycad() + this.goto2.onlycad(), this.goto2.onlycad() + "", this.linea));
                cadtem += this.goto2.onlycad() + "";
                Noptimizacion_1.Codigonuevo.push(cadtem);
                cadtem = this.etiq.onlycad() + "";
                Noptimizacion_1.Codigonuevo.push(cadtem);
            }
            return;
        }
        cadtem += "if( " + this.izq + " " + this.ope + " " + this.der + ")" + this.goto1.onlycad() + "\n" + this.goto2.onlycad();
        Noptimizacion_1.Codigonuevo.push(cadtem);
        cadtem = this.etiq.onlycad() + "";
        Noptimizacion_1.Codigonuevo.push(cadtem);
    };
    return IfOp;
}(InstruccionOp_1.InstruccionOp));
exports.IfOp = IfOp;
