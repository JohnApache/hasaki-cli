"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const copy_1 = __importDefault(require("./copy"));
const ParseRender = (sourcePath, targetPath, parseData, callback) => {
    ejs_1.default.renderFile(sourcePath, parseData, {
        _with: false,
        localsName: 'locals',
    }, (err, data) => {
        if (err) {
            console.log(err);
            copy_1.default(sourcePath, targetPath, callback);
            return;
        }
        if (!fs_1.default.existsSync(path_1.default.dirname(targetPath))) {
            fs_1.default.mkdirSync(path_1.default.dirname(targetPath), { recursive: true });
        }
        fs_1.default.writeFileSync(targetPath, data);
        callback && callback();
    });
};
exports.default = ParseRender;
