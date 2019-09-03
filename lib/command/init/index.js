"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = __importDefault(require("./action"));
const InitCommand = (program) => {
    program
        .command('init <projectName>')
        .alias('i')
        .description('quickly initialize a project by selecting a template.')
        .action((projectName) => {
        action_1.default(projectName);
    });
};
exports.default = InitCommand;
