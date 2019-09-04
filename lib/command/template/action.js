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
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const template_1 = require("../../config/template");
const prompt_1 = require("./prompt");
const Exit = () => {
    process.exit(1);
};
const ErrorLog = (text) => {
    console.log(chalk_1.default.red.bold(text));
};
const SuccessLog = (text) => {
    ora_1.default().succeed(text);
};
const CheckTemplate = () => {
    const templates = template_1.GetTemplates();
    return templates && templates.length > 0;
};
const ListAction = () => __awaiter(void 0, void 0, void 0, function* () {
    const templates = template_1.GetTemplates();
    console.table(templates);
});
const AddAction = () => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield prompt_1.AddTemplatePrompt();
    const templates = template_1.GetTemplates();
    templates.unshift({
        templateName: answer.templateName,
        remoteAddress: answer.remoteAddress
    });
    template_1.UpdateTemplates(templates);
    SuccessLog('add template success!');
});
const UpdateAction = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!CheckTemplate()) {
        ErrorLog('current template list is empty.');
        return Exit();
    }
    const answer = yield prompt_1.UpdateTemplatePrompt();
    const templates = template_1.GetTemplates();
    const newTemplates = templates.map(v => {
        if (v.templateName === answer.updateItem.templateName) {
            return {
                templateName: answer.templateName,
                remoteAddress: answer.remoteAddress
            };
        }
        return v;
    });
    template_1.UpdateTemplates(newTemplates);
    SuccessLog('update template success!');
});
const DeleteAction = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!CheckTemplate()) {
        ErrorLog('current template list is empty.');
        return Exit();
    }
    const templates = template_1.GetTemplates();
    const answer = yield prompt_1.DeleteTemplatePrompt();
    if (answer.confirmDelete) {
        const newTemplates = templates.filter(t => answer.deleteItems.every(v => v.templateName !== t.templateName));
        template_1.UpdateTemplates(newTemplates);
        SuccessLog('delete templates success!');
        return;
    }
    console.log('cancel delete operation.');
});
const ClearAction = () => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield prompt_1.ClearTemplatePrompt();
    if (answer.confirmClear) {
        template_1.UpdateTemplates([]);
        SuccessLog('clear templates list success!');
        return;
    }
    console.log('cancel clear operation.');
});
const ResetAction = () => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield prompt_1.ResetTemplatePrompt();
    if (answer.confirmReset) {
        template_1.ResetTemplates();
        SuccessLog('reset template success!');
        return;
    }
    console.log('cancel reset operation.');
});
const TemplateAction = (command) => __awaiter(void 0, void 0, void 0, function* () {
    const options = command.opts();
    if (options.list) {
        return ListAction();
    }
    if (options.add) {
        return AddAction();
    }
    if (options.delete) {
        return DeleteAction();
    }
    if (options.update) {
        return UpdateAction();
    }
    if (options.clear) {
        return ClearAction();
    }
    if (options.reset) {
        return ResetAction();
    }
    return command.help();
});
exports.default = TemplateAction;
