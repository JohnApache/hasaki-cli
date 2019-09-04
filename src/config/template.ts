export type Template = {
    templateName: string,
    remoteAddress: string
}
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
import fs from 'fs';
import path from 'path';
export const GetTemplates = (): Template[] => {
    const templateFilePath = path.resolve(__dirname, '../../assets/template.json');
    const buffer = fs.readFileSync(templateFilePath);
    const json = buffer.toString();
    if(!json) return [];
    return JSON.parse(buffer.toString());
}

export const UpdateTemplates = (templates: Template[]): void => {
    const templateFilePath = path.resolve(__dirname, '../../assets/template.json');
    fs.writeFileSync(templateFilePath, JSON.stringify(templates))
}

export const ResetTemplates = (): void => {
    const templateBakFilePath = path.resolve(__dirname, '../../assets/template.json.bak');
    const buffer = fs.readFileSync(templateBakFilePath);
    const json = buffer.toString();
    if(!json) return UpdateTemplates([]);
    return UpdateTemplates(JSON.parse(json));
}