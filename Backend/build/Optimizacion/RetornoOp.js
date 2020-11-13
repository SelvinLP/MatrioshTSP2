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
exports.RetornoOp = void 0;
var InstruccionOp_1 = require("./Abstracto/InstruccionOp");
var Noptimizacion_1 = require("./Noptimizacion");
var RetornoOp = /** @class */ (function (_super) {
    __extends(RetornoOp, _super);
    function RetornoOp(cuerpo, linea) {
        var _this = _super.call(this, linea) || this;
        _this.cuerpo = cuerpo;
        return _this;
    }
    RetornoOp.prototype.ejecutar = function () {
        var cadtem = "  return " + this.cuerpo + ";";
        Noptimizacion_1.Codigonuevo.push(cadtem);
    };
    return RetornoOp;
}(InstruccionOp_1.InstruccionOp));
exports.RetornoOp = RetornoOp;
