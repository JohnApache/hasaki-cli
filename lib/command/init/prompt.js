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
const template_1 = require("../../config/template");
const inquirer_1 = __importDefault(require("inquirer"));
exports.CreatePrompt = (questions) => {
    return inquirer_1.default.prompt(questions);
};
exports.ChooseTemplatePrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    const question = {
        type: 'list',
        name: 'template',
        message: 'choose a template you want.',
        choices() {
            const templates = template_1.GetTemplates();
            return templates.map(t => {
                return {
                    name: t.templateName,
                    value: t
                };
            });
        }
    };
    const answers = yield exports.CreatePrompt([question]);
    return answers.template;
});
exports.ConfirmDeletePrompt = (dirname) => __awaiter(void 0, void 0, void 0, function* () {
    const question = {
        type: 'confirm',
        name: 'confirm',
        message: `do you confirm delete ${dirname}?`,
        default: false,
    };
    const answers = yield exports.CreatePrompt([question]);
    return answers.confirm;
});
exports.PasswordPrompt = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const question = {
        type: 'password',
        name: 'password',
        message: `input ${username}'s git password?`,
        validate(input) {
            return input && input.length > 0;
        },
    };
    const answers = yield exports.CreatePrompt([question]);
    return answers.password;
});
