"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(LetoConst, id, tipo, posh, sheap, global) {
        if (sheap === void 0) { sheap = false; }
        this.LetoConst = LetoConst;
        this.id = id;
        this.tipo = tipo,
            this.posh = posh;
        this.sheap = sheap;
        this.global = global;
    }
    return Simbolo;
}());
exports.Simbolo = Simbolo;
