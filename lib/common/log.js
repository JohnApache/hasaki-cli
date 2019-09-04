"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
exports.ErrorLog = (text) => {
    ora_1.default().fail(chalk_1.default.red.bold(text));
};
exports.SuccessLog = (text) => {
    ora_1.default().succeed(text);
};
