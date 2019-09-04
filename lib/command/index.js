"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("./init"));
const template_1 = __importDefault(require("./template"));
const UseCommand = (program) => {
    init_1.default(program);
    template_1.default(program);
    return program;
};
exports.default = UseCommand;