"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.MakeDirs = (dirs) => {
    const mkdirs = (dir, callback) => {
        if (fs_1.default.existsSync(dir)) {
            callback && callback();
            return;
        }
        mkdirs(path_1.default.dirname(dir), () => {
            fs_1.default.mkdirSync(dir);
            callback && callback();
        });
    };
    if (fs_1.default.existsSync(dirs))
        return;
    mkdirs(dirs);
};
