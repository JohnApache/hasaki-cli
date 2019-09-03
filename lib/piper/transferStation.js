"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy_1 = require("../config/policy");
const TransferStation = (targetFile, transferRule, renderCb, copyCb, ignoreCb) => {
    const { ignore, parseExclude, parseInclude } = transferRule;
    const isIgnore = policy_1.DefaultIgnore.concat(ignore).some(ignoreReg => {
        return ignoreReg.test(targetFile);
    });
    if (isIgnore) {
        ignoreCb && ignoreCb();
        return;
    }
    const isExclude = policy_1.DefaultExclude.concat(parseExclude).some(excludeReg => {
        return excludeReg.test(targetFile);
    });
    if (isExclude) {
        copyCb && copyCb();
        return;
    }
    const isInclude = policy_1.DefaultInclude.concat(parseInclude).some(includeReg => {
        return includeReg.test(targetFile);
    });
    if (isInclude) {
        renderCb && renderCb();
        return;
    }
    // default copy
    copyCb && copyCb();
};
exports.default = TransferStation;
