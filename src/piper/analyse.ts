import fs from 'fs';
import {TEMPLATE_CONFIG_FILENAME} from '../config/definition';
import {Question} from 'inquirer';

type AnalyseResult = {
    question: Array<Question>,
    parseInclude: Array<RegExp>,
    parseExclude: Array<RegExp>,
    ignore: Array<RegExp>
}

const Analyse = (sourceDir: string): AnalyseResult => {
    const configFilePath = `${sourceDir}/${TEMPLATE_CONFIG_FILENAME}`;
    if(fs.existsSync(configFilePath)) {
        const result = require(configFilePath) as AnalyseResult;
        return {
            question: result.question || [],
            parseInclude: result.parseInclude || [],
            parseExclude: result.parseExclude || [],
            ignore: result.ignore || [],
        };
    }
    return {
        question: [],
        parseInclude: [],
        parseExclude: [],
        ignore: [],
    };
}

export default Analyse;