"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UseOption = (program) => {
    program
        .option('-d, --out-dir <dirname>', 'specify cli output directory', process.cwd());
};
exports.default = UseOption;
