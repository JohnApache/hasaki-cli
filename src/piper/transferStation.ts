import {DefaultExclude, DefaultInclude} from '../config/policy'
type TransferRule = {
    parseExclude: Array<RegExp>,
    parseInclude: Array<RegExp>,
}

const CreateTransferStation = (transferRule: TransferRule) => {
    const {parseExclude, parseInclude} = transferRule;
    const AllParseExclude = DefaultExclude.concat(parseExclude);
    const AllParseInclude = DefaultInclude.concat(parseInclude);
    const TransferStation = (
        targetFile: string,
        renderCb?: () => void, 
        copyCb?: () => void, 
    ) => {
       
        if(AllParseExclude.some(reg => reg.test(targetFile))) {
            copyCb && copyCb();
            return;
        }

        if(AllParseInclude.some(reg => reg.test(targetFile))) {
            renderCb && renderCb();
            return;
        }

        // default copy
        copyCb && copyCb();
    }
    return TransferStation;
}


export default CreateTransferStation;