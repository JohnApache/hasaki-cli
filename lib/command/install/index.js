"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = __importDefault(require("./option"));
const action_1 = __importDefault(require("./action"));
const InstallCommand = (program) => {
    const command = program.command('install <remoteAddress>');
    option_1.default(command)
        .description('install template repo from remote address.')
        .action((remoteAddress, cmd) => {
        action_1.default(remoteAddress, cmd);
    });
    return program;
};
exports.default = InstallCommand;
