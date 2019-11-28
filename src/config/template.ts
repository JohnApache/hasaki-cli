import fs from 'fs';
import path from 'path';

export type Template = {
    templateName: string;
    remoteAddress: string;
};

export const GetTemplates = (): Template[] => {
    const templateFilePath = path.resolve(
        __dirname,
        '../../assets/template.json'
    );
    const buffer = fs.readFileSync(templateFilePath);
    const json = buffer.toString();
    if (!json) return [];
    return JSON.parse(buffer.toString());
};

export const UpdateTemplates = (templates: Template[]): void => {
    const templateFilePath = path.resolve(
        __dirname,
        '../../assets/template.json'
    );
    fs.writeFileSync(templateFilePath, JSON.stringify(templates, null, 2));
};

export const ResetTemplates = (): void => {
    const templateFilePath = path.resolve(
        __dirname,
        '../../assets/template.json'
    );
    const templateBakFilePath = path.resolve(
        __dirname,
        '../../assets/template.json.bak'
    );
    const buffer = fs.readFileSync(templateBakFilePath);
    fs.writeFileSync(templateFilePath, buffer);
};
