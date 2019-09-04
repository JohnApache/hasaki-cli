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
        const { ignore = [], parseExclude = [], parseInclude = [], parseData = {} } = parseOption || {};
        let count = 0;
        const onTaskEnd = () => {
            count--;
            if (count === 0) {
                resolve();
            }
        };
        const Scanner = scanner_1.default(ignore);
        const TransferStation = transferStation_1.default({ parseExclude, parseInclude });
        try {
            Scanner(source, (filepath) => {
                count++;
                const targetFile = filepath.replace(source, target);
                TransferStation(targetFile, () => {
                    parseRender_1.default(filepath, targetFile, parseData, onTaskEnd);
                }, () => {
                    copy_1.default(filepath, targetFile, onTaskEnd);
                });
            });
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
