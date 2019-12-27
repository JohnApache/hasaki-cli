"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = __importDefault(require("./option"));
const action_1 = __importDefault(require("./action"));
const TemplateCommand = (program) => {
    const command = program.command('template').alias('t');
    option_1.default(command)
        .description('show inner templates config.')
        .action((cmd) => {
        action_1.default(cmd);
    });
    return program;
};
exports.default = TemplateCommand;
