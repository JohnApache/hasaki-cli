"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const log_1 = require("../common/log");
const common_1 = require("../common");
const Analyse = (configFilePath) => {
    let result = {};
    if (fs_1.default.existsSync(configFilePath) && fs_1.default.statSync(configFilePath).isFile()) {
        result = require(configFilePath);
    }
    return result;
};
exports.IsMatchRules = (rootPath, targetPath, matchRules) => {
    const result = matchRules.some(reg => {
        if (util_1.isRegExp(reg)) {
            return reg.test(targetPath);
        }
        const { match, path: matchPath } = reg;
        if (match)
            return match.test(targetPath);
        if (matchPath) {
            if (path_1.default.isAbsolute(matchPath)) {
                log_1.ErrorLog(matchPath);
                log_1.ErrorLog('match path only accept relative path!');
                return common_1.Exit();
            }
            const fullMatchPath = path_1.default.resolve(rootPath, matchPath);
            return targetPath.includes(fullMatchPath);
        }
        return false;
    });
    return result;
};
exports.default = Analyse;
