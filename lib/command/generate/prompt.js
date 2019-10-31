"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.ConfirmCoverPrompt = (dirname) => __awaiter(void 0, void 0, void 0, function* () {
    const question = {
        type: 'confirm',
        name: 'confirm',
        message: `do you confirm cover ${dirname}?`,
        default: false,
    };
    return exports.CreatePrompt([question]);
});
