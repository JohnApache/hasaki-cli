"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy_1 = require("../config/policy");
const CreateTransferStation = (transferRule) => {
    const { parseExclude, parseInclude } = transferRule;
    const AllParseExclude = policy_1.DefaultExclude.concat(parseExclude);
    const AllParseInclude = policy_1.DefaultInclude.concat(parseInclude);
    const TransferStation = (targetFile, renderCb, copyCb) => {
        if (AllParseExclude.some(reg => reg.test(targetFile))) {
            copyCb && copyCb();
            return;
        }
        if (AllParseInclude.some(reg => reg.test(targetFile))) {
            renderCb && renderCb();
            return;
        }
        // default copy
        copyCb && copyCb();
    };
    return TransferStation;
};
exports.default = CreateTransferStation;
