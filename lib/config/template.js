"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const templates: Template[] = [
//     {
//         templateName: 'vue-project',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'react-project',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'vue-component',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'react-component',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'jquery-project',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'jquery-plugin',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'js-lib',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'koa-project',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'express-project',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'egg-project',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
//     {
//         templateName: 'node-lib',
//         remoteAddress: 'https://github.com/JohnApache/events-proxy#test-cli'
//     },
// ]
// export default templates;
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
    const templateBakFilePath = path_1.default.resolve(__dirname, '../../assets/template.json.bak');
    const buffer = fs_1.default.readFileSync(templateBakFilePath);
    const json = buffer.toString();
    console.log(json);
    if (!json)
        return exports.UpdateTemplates([]);
    return exports.UpdateTemplates(JSON.parse(json));
};
