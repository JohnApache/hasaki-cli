"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const copy_1 = __importDefault(require("../../../../piper/copy"));
const path_1 = __importDefault(require("path"));
const GenReadmeConfig = (usedMemory, context) => {
    return new Promise(resolve => {
        let count = 2;
        const onTaskEnd = () => {
            count--;
            count === 0 && resolve();
        };
        copy_1.default(path_1.default.resolve(__dirname, '../../../../../assets/README.en_US.md'), path_1.default.resolve(context.targetPath, './README2.en_US.md'), onTaskEnd);
        copy_1.default(path_1.default.resolve(__dirname, '../../../../../assets/README.zh_CN.md'), path_1.default.resolve(context.targetPath, './README2.md'), onTaskEnd);
    });
};
exports.default = GenReadmeConfig;
