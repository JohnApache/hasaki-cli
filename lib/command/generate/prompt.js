"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const plugins_1 = require("./plugins");
exports.CreatePrompt = (questions) => {
    return inquirer_1.default.prompt(questions);
};
exports.ChoosePluginPrompt = () => {
    const question = {
        type: 'checkbox',
        name: 'plugins',
        message: 'choose one or more template you want.',
        validate(input) {
            return input.length > 0;
        },
        choices() {
            return plugins_1.PluginList.map(plugin => plugin.pluginName);
        }
    };
    return exports.CreatePrompt([question]);
};
