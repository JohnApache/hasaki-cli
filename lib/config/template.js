"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.GetTemplates = () => {
    const templateFilePath = path_1.default.resolve(__dirname, '../../assets/template.json');
    const buffer = fs_1.default.readFileSync(templateFilePath);
    const json = buffer.toString();
    if (!json)
        return [];
    return JSON.parse(buffer.toString());
};
exports.UpdateTemplates = (templates) => {
    const templateFilePath = path_1.default.resolve(__dirname, '../../assets/template.json');
    fs_1.default.writeFileSync(templateFilePath, JSON.stringify(templates));
};
exports.ResetTemplates = () => {
    const templateFilePath = path_1.default.resolve(__dirname, '../../assets/template.json');
    const templateBakFilePath = path_1.default.resolve(__dirname, '../../assets/template.json.bak');
    const buffer = fs_1.default.readFileSync(templateBakFilePath);
    fs_1.default.writeFileSync(templateFilePath, buffer);
};
