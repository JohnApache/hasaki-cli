"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenOption = (command) => {
    command
        .option('-d, --out-dir <dirname>', 'specify cli output directory.')
        .option('--installed  <plugin,...,plugin>', 'specify which plug-ins are installed.')
        .option('-f, --force-cover', 'generated profile force override.');
    return command;
};
exports.default = GenOption;
