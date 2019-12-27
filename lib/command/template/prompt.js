"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../../config/template");
const inquirer_1 = __importDefault(require("inquirer"));
exports.CreatePrompt = (questions) => inquirer_1.default.prompt(questions);
exports.AddTemplatePrompt = () => {
    const question = [
        {
            type: 'input',
            name: 'templateName',
            message: 'what is the template local name?',
            filter(input) {
                return input.trim();
            },
            validate(input) {
                if (input.length === 0)
                    return false;
                const templates = template_1.GetTemplates();
                if (templates.some(t => t.templateName === input)) {
                    return 'the current local name has been occupied!';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'remoteAddress',
            message: 'what is the template remote address?',
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
exports.DeleteTemplatePrompt = () => {
    const question = [
        {
            type: 'checkbox',
            name: 'deleteItems',
            message: 'choose one item from the template list.',
            choices() {
                return template_1.GetTemplates().map(t => ({
                    name: t.templateName,
                    value: t,
                }));
            },
        },
        {
            type: 'confirm',
            name: 'confirmDelete',
            message: 'confirm delete the template from list?',
            when(answers) {
                return answers.deleteItems && answers.deleteItems.length > 0;
            },
            'default': true,
        },
    ];
    return exports.CreatePrompt(question);
};
exports.UpdateTemplatePrompt = () => {
    const question = [
        {
            type: 'list',
            name: 'updateItem',
            message: 'choose one item from the template list.',
            choices() {
                return template_1.GetTemplates().map(t => ({
                    name: t.templateName,
                    value: t,
                }));
            },
        },
        {
            type: 'input',
            name: 'templateName',
            message: 'what is the template local name?',
            default(answers) {
                return answers.updateItem.templateName;
            },
            filter(input) {
                return input.trim();
            },
            validate(input, answer) {
                if (input.length === 0)
                    return false;
                const templates = template_1.GetTemplates().filter(v => v.templateName !== answer.updateItem.templateName);
                if (templates.some(t => t.templateName === input)) {
                    return 'the current local name has been occupied!';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'remoteAddress',
            message: 'what is the template remote address?',
            default(answers) {
                return answers.updateItem.remoteAddress;
            },
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
exports.ClearTemplatePrompt = () => {
    const question = [
        {
            type: 'confirm',
            name: 'confirmClear',
            message: 'confirm delete all template from list?',
            'default': false,
        },
    ];
    return exports.CreatePrompt(question);
};
exports.ResetTemplatePrompt = () => {
    const question = [
        {
            type: 'confirm',
            name: 'confirmReset',
            message: 'confirm reset templates list?',
            'default': false,
        },
    ];
    return exports.CreatePrompt(question);
};
// (async () => {
//     const answers = await DeleteTemplatePrompt();
//     console.log(answers);
// })()
