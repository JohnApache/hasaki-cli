"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseRender_1 = __importDefault(require("../../../../piper/parseRender"));
const path_1 = __importDefault(require("path"));
const GenReadmeConfig = (usedMemory) => {
    parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/README.en_US.md'), path_1.default.resolve(process.cwd(), './README2.en_US.md'), usedMemory);
    parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/README.zh_CN.md'), path_1.default.resolve(process.cwd(), './README2.md'), usedMemory);
};
exports.default = GenReadmeConfig;
