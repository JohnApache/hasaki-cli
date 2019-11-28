"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const analyse_1 = require("./analyse");
const CreateScreener = (rootPath, screenRule) => {
    const { include = [], exclude = [] } = screenRule;
    const IsInclude = (targetPath) => analyse_1.IsMatchRules(rootPath, targetPath, include);
    const IsExclude = (targetPath) => analyse_1.IsMatchRules(rootPath, targetPath, exclude);
    const Screener = (targetFile, callback) => {
        if (IsExclude(targetFile))
            return;
        if (IsInclude(targetFile)) {
            callback && callback(targetFile);
            return;
        }
        callback && callback(targetFile);
    };
    return Screener;
};
exports.default = CreateScreener;
