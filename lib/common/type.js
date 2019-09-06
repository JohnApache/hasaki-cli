"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegExp = (target) => {
    return Object.prototype.toString.call(target) === '[object RegExp]';
};
