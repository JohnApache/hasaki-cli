"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateOption = (command) => {
    command
        .option('--list', 'show all templates info.')
        .option('--add', 'add a template into templates.')
        .option('--update', 'update one template info in templates.')
        .option('--delete', 'delete a template into template.')
        .option('--clear', 'clear all template into template.')
        .option('--reset', 'reset templates list.');
    return command;
};
exports.default = TemplateOption;
