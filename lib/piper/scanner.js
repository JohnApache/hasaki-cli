"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Scanner = (targetDir, callback) => {
    if (!fs_1.default.existsSync(targetDir)) {
        throw new Error('targetDir is not exists.');
    }
    const stat = fs_1.default.statSync(targetDir);
    if (stat.isFile()) {
        callback && callback(targetDir);
        return;
    }
    if (stat.isDirectory()) {
        const files = fs_1.default.readdirSync(targetDir);
        files.forEach(filename => {
            const filepath = `${targetDir}/${filename}`;
            const stat = fs_1.default.statSync(filepath);
            if (stat.isFile()) {
                callback && callback(filepath);
                return;
            }
            if (stat.isDirectory()) {
                Scanner(filepath, callback);
            }
        });
    }
};
exports.default = Scanner;
