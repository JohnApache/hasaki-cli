"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const log_1 = require("../common/log");
const common_1 = require("../common");
exports.IsMatchRules = (rootPath, targetPath, matchRules) => {
    const result = matchRules.some(reg => {
        if (util_1.isRegExp(reg)) {
            return reg.test(targetPath);
        }
        const match = reg.match;
        const matchPath = reg.path;
        if (match)
            return match.test(targetPath);
        if (matchPath) {
            if (path_1.default.isAbsolute(matchPath)) {
                log_1.ErrorLog(matchPath);
                log_1.ErrorLog('match path only accept relative path!');
                return common_1.Exit();
            }
            const fullMatchPath = path_1.default.resolve(rootPath, matchPath);
            // console.log(matchPath);
            // console.log(rootPath);
            // console.log(fullMatchPath);
            // console.log(targetPath);
            return targetPath.includes(fullMatchPath);
        }
        return false;
    });
    return result;
};
const Analyse = (configFilePath) => {
    if (fs_1.default.existsSync(configFilePath)) {
        const result = require(configFilePath);
        return {
            question: result.question,
            parseInclude: result.parseInclude,
            parseExclude: result.parseExclude,
            ignore: result.ignore,
            screener: result.screener
        };
    }
    return {};
};
exports.default = Analyse;
