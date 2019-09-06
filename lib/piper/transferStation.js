"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy_1 = require("../config/policy");
const analyse_1 = require("./analyse");
const CreateTransferStation = (rootPath, transferRule) => {
    const { parseExclude, parseInclude } = transferRule;
    const AllParseExclude = policy_1.DefaultExclude.concat(parseExclude);
    const AllParseInclude = policy_1.DefaultInclude.concat(parseInclude);
    const IsParseExclude = (targetPath) => {
        return analyse_1.IsMatchRules(rootPath, targetPath, AllParseExclude);
    };
    const IsParseInclde = (targetPath) => {
        return analyse_1.IsMatchRules(rootPath, targetPath, AllParseInclude);
    };
    const TransferStation = (targetFile, renderCb, copyCb) => {
        if (IsParseExclude(targetFile)) {
            copyCb && copyCb();
            return;
        }
        if (IsParseInclde(targetFile)) {
            renderCb && renderCb();
            return;
        }
        // default copy
        copyCb && copyCb();
    };
    return TransferStation;
};
exports.default = CreateTransferStation;
