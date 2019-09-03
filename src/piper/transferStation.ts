import {DefaultExclude, DefaultIgnore, DefaultInclude} from '../config/policy'
type TransferRule = {
    parseExclude: Array<RegExp>,
    parseInclude: Array<RegExp>,
    ignore: Array<RegExp>,
}
const TransferStation = (
        targetFile: string,
        transferRule: TransferRule, 
        renderCb?: () => void, 
        copyCb?: () => void, 
        ignoreCb?: () => void
    ) => {
        const {ignore, parseExclude, parseInclude} = transferRule;
        const isIgnore = DefaultIgnore.concat(ignore).some(ignoreReg => {
            return ignoreReg.test(targetFile);
        });

        if(isIgnore) {
            ignoreCb && ignoreCb();
            return;
        }

        const isExclude = DefaultExclude.concat(parseExclude).some(excludeReg => {
            return excludeReg.test(targetFile);
        });

        if(isExclude) {
            copyCb && copyCb();
            return;
        }

        const isInclude = DefaultInclude.concat(parseInclude).some(includeReg => {
            return includeReg.test(targetFile);
        });

        if(isInclude) {
            renderCb && renderCb();
            return;
        }
        // default copy
        copyCb && copyCb();
}

export default TransferStation;