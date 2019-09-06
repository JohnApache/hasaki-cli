import fs from 'fs';
import path from 'path';
import { Question } from 'inquirer';
import { isRegExp } from 'util';
import { ErrorLog } from '../common/log';
import { Exit } from '../common';



export type Rule = {
    path?: string,
    match?: RegExp
};

export type MatchRules = Array<Rule | RegExp>;

export const IsMatchRules = (rootPath: string, targetPath: string, matchRules: MatchRules): boolean => {
    const result = matchRules.some(reg => {
        if(isRegExp(reg)) {
            return (reg as RegExp).test(targetPath);
        }
        const match = (reg as Rule).match;
        const matchPath = (reg as Rule).path;
        if(match) return match.test(targetPath);
        if(matchPath) {
            if(path.isAbsolute(matchPath)) {
                ErrorLog(matchPath);
                ErrorLog('match path only accept relative path!');
                return Exit();
            }
            const fullMatchPath = path.resolve(rootPath, matchPath);
            // console.log(matchPath);
            // console.log(rootPath);
            // console.log(fullMatchPath);
            // console.log(targetPath);
            return targetPath.includes(fullMatchPath);
        }
        return false;
    });

    return result;
}

export type ScreenRule = {
    exclude?: MatchRules,
    include?: MatchRules,
}

type AnalyseResult = {
    question?: Array<Question>,
    parseInclude?: MatchRules,
    parseExclude?: MatchRules,
    ignore?: MatchRules,
    screener?: (parseData: Object) => ScreenRule
}

const Analyse = (configFilePath: string): AnalyseResult => {
    if(fs.existsSync(configFilePath)) {
        const result = require(configFilePath) as AnalyseResult;
        return {
            question: result.question,
            parseInclude: result.parseInclude,
            parseExclude: result.parseExclude,
            ignore: result.ignore,
            screener: result.screener
        };
    }
    return {};
}

export default Analyse;