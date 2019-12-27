"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
exports.CreatePrompt = (questions) => inquirer_1.default.prompt(questions);
exports.ProjectNamePrompt = () => {
    const question = [
        {
            type: 'input',
            name: 'projectName',
            message: 'what is the project name?',
            filter(input) {
                return input.trim();
            },
            validate(input) {
                return input.length > 0;
            },
        },
    ];
    return exports.CreatePrompt(question);
};
