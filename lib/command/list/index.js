"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = __importDefault(require("./action"));
const ListCommand = (program) => {
    program
        .command('list')
        .alias('l')
        .description('show inner templates config.')
        .action(() => {
        action_1.default();
    });
    return program;
};
exports.default = ListCommand;
