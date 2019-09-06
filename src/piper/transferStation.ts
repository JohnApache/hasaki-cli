import {DefaultExclude, DefaultInclude} from '../config/policy';
import { MatchRules, Rule, IsMatchRules } from './analyse';

type TransferRule = {
    parseExclude: MatchRules,
    parseInclude: MatchRules,
}

const CreateTransferStation = (rootPath: string, transferRule: TransferRule) => {
    const {parseExclude, parseInclude} = transferRule;
    const AllParseExclude = DefaultExclude.concat(parseExclude);
    const AllParseInclude = DefaultInclude.concat(parseInclude);

    const IsParseExclude = (targetPath: string): boolean => {
        return IsMatchRules(rootPath, targetPath, AllParseExclude);
    }

    const IsParseInclde = (targetPath: string): boolean => {
        return IsMatchRules(rootPath, targetPath, AllParseInclude);
    }


    const TransferStation = (
        targetFile: string,
        renderCb?: () => void, 
        copyCb?: () => void, 
    ) => {
       
        if(IsParseExclude(targetFile)) {
            copyCb && copyCb();
            return;
        }

        if(IsParseInclde(targetFile)) {
            renderCb && renderCb();
            return;
        }

        // default copy
        copyCb && copyCb();
    }
    
    return TransferStation;
}


export default CreateTransferStation;