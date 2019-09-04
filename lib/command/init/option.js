"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InitOption = (command) => {
    command
        .option('-d, --out-dir <dirname>', 'specify cli output directory.')
        .option('--ignore <pattern>', 'specify template ignore files.')
        .option('--exclude <pattern>', 'specify template files will not render by ejs.')
        .option('--include <pattern>', 'specify template files will render by ejs.')
        .option('-c, --config <configName>', 'specify template config file.');
    return command;
};
exports.default = InitOption;
