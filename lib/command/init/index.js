"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = __importDefault(require("./action"));
const option_1 = __importDefault(require("./option"));
const InitCommand = (program) => {
    const command = program.command('init <projectName>').alias('i');
    option_1.default(command)
        .description('quickly initialize a project by selecting a template.')
        .action((projectName, cmd) => {
        action_1.default(projectName, cmd);
    });
};
exports.default = InitCommand;
