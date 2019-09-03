"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clean_1 = __importDefault(require("./clean"));
const parseRender_1 = __importDefault(require("./parseRender"));
const scanner_1 = __importDefault(require("./scanner"));
const transferStation_1 = __importDefault(require("./transferStation"));
const copy_1 = __importDefault(require("./copy"));
exports.FileCleanner = (...cleanItem) => {
    return new Promise((resolve, reject) => {
        try {
            clean_1.default(cleanItem, () => {
                resolve();
            });
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
exports.FilePiper = (source, target, parseOption) => {
    return new Promise((resolve, reject) => {
        let count = 0;
        const onTaskEnd = () => {
            count--;
            if (count === 0) {
                resolve();
            }
        };
        const { ignore = [], parseExclude = [], parseInclude = [], parseData = {} } = parseOption || {};
        try {
            scanner_1.default(source, (filepath) => {
                count++;
                const targetFile = filepath.replace(source, target);
                transferStation_1.default(targetFile, {
                    parseExclude,
                    parseInclude,
                    ignore
                }, () => {
                    parseRender_1.default(filepath, targetFile, parseData, onTaskEnd);
                }, () => {
                    copy_1.default(filepath, targetFile, onTaskEnd);
                }, () => {
                    setImmediate(() => {
                        count--;
                        onTaskEnd();
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
