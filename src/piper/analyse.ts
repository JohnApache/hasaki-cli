import path from 'path';
import fs from 'fs';
import { isRegExp } from 'util';
import { ErrorLog } from '../common/log';
import { Exit } from '../common';
import { Question } from 'inquirer';

type AnalyseResult = {
    question?: Array<Question>;
    parseInclude?: MatchRules;
    parseExclude?: MatchRules;
    ignore?: MatchRules;
    screener?: (parseData: Record<string, any>)=> ScreenRule;
};

const Analyse = (configFilePath: string): AnalyseResult => {
    let result: AnalyseResult = {};
    if (fs.existsSync(configFilePath) && fs.statSync(configFilePath).isFile()) {
        result = require(configFilePath);
    }
    return result;
};

export type Rule = {
    path?: string;
    match?: RegExp;
};

export type MatchRules = Array<Rule | RegExp>;

export const IsMatchRules = (
    rootPath: string,
    targetPath: string,
    matchRules: MatchRules,
): boolean => {
    const result = matchRules.some(reg => {
        if (isRegExp(reg)) {
            return reg.test(targetPath);
        }
        const { match, path: matchPath } = reg;
        if (match) return match.test(targetPath);
        if (matchPath) {
            if (path.isAbsolute(matchPath)) {
                ErrorLog(matchPath);
                ErrorLog('match path only accept relative path!');
                return Exit();
            }
            const fullMatchPath = path.resolve(rootPath, matchPath);
            return targetPath.includes(fullMatchPath);
        }
        return false;
    });

    return result;
};

export type ScreenRule = {
    exclude?: MatchRules;
    include?: MatchRules;
};

export default Analyse;
