"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Clean = (targets, callback) => {
    targets.forEach(deletePath => {
        const stat = fs_1.default.statSync(deletePath);
        if (stat.isFile()) {
            return fs_1.default.unlinkSync(deletePath);
        }
        if (stat.isDirectory()) {
            const nextTargets = fs_1.default.readdirSync(deletePath).map(fileName => `${deletePath}/${fileName}`);
            Clean(nextTargets, () => {
                fs_1.default.rmdirSync(deletePath);
            });
        }
    });
    callback();
};
exports.default = Clean;
