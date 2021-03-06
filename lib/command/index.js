"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("./init"));
const template_1 = __importDefault(require("./template"));
const install_1 = __importDefault(require("./install"));
const generate_1 = __importDefault(require("./generate"));
const UseCommand = (program) => {
    init_1.default(program);
    template_1.default(program);
    install_1.default(program);
    generate_1.default(program);
    return program;
};
exports.default = UseCommand;
