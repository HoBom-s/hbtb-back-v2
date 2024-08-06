"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSORTING = void 0;
function isSORTING(value) {
    return (value === "asc" ||
        value === "ASC" ||
        value === "desc" ||
        value === "DESC" ||
        value === undefined);
}
exports.isSORTING = isSORTING;
