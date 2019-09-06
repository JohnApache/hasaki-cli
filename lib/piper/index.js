"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clean_1 = __importDefault(require("./clean"));
const parseRender_1 = __importDefault(require("./parseRender"));
const scanner_1 = __importDefault(require("./scanner"));
const transferStation_1 = __importDefault(require("./transferStation"));
const screener_1 = __importDefault(require("./screener"));
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
        const { ignore = [], parseExclude = [], parseInclude = [], parseData = {}, screenRule = {
            exclude: [],
            include: []
        } } = parseOption || {};
        let count = 0;
        const onTaskEnd = () => {
            count--;
            if (count === 0) {
                resolve();
            }
        };
        const Scanner = scanner_1.default(source, ignore);
        const TransferStation = transferStation_1.default(source, { parseExclude, parseInclude });
        const Screener = screener_1.default(source, screenRule);
        try {
            Scanner(source, (scanPath) => {
                Screener(scanPath, (screenPath) => {
                    const targetFile = screenPath.replace(source, target);
                    count++;
                    TransferStation(targetFile, () => {
                        parseRender_1.default(screenPath, targetFile, parseData, onTaskEnd);
                    }, () => {
                        copy_1.default(screenPath, targetFile, onTaskEnd);
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
