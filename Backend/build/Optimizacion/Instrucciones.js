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
exports.InstrucionesOp = void 0;
var InstruccionOp_1 = require("./Abstracto/InstruccionOp");
var InstrucionesOp = /** @class */ (function (_super) {
    __extends(InstrucionesOp, _super);
    function InstrucionesOp(inst, linea) {
        var _this = _super.call(this, linea) || this;
        _this.inst = inst;
        return _this;
    }
    InstrucionesOp.prototype.ejecutar = function () {
        for (var _i = 0, _a = this.inst; _i < _a.length; _i++) {
            var ninst = _a[_i];
            ninst.ejecutar();
        }
    };
    return InstrucionesOp;
}(InstruccionOp_1.InstruccionOp));
exports.InstrucionesOp = InstrucionesOp;
