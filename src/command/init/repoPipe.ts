import path from 'path';
import { Question } from 'inquirer';
import chalk from 'chalk';
import { CreatePrompt } from './prompt';
import { ActionOptions } from './type';
import { ErrorLog } from '../../common/log';
import { Exit } from '../../common';
import { TEMPLATE_CONFIG_FILENAME } from '../../config/definition';
import Analyse from '../../piper/analyse';
import CreateLoading from '../../loading';
import { FilePiper } from '../../piper';

const RepoPromptHandle = async (
    questions: Array<Question>
): Promise<object> => {
    let parseData: object = {};
    if (questions.length > 0) {
        parseData = await CreatePrompt(questions);
    }
    return parseData;
};

export const RepoPipeHandle = async (
    source: string,
    dest: string,
    option: ActionOptions
): Promise<void> => {
    const configName = option.config || '';
    if (path.isAbsolute(configName)) {
        ErrorLog('config name cant set an absoulte path!');
        return Exit();
    }
    const configFilePath = path.resolve(
        source,
        configName || TEMPLATE_CONFIG_FILENAME
    );
    const analyseResult = Analyse(configFilePath);

    const {
        parseExclude = [],
        parseInclude = [],
        ignore = [],
        question = [],
        screener = () => ({
            exclude: [],
            include: [],
        }),
    } = analyseResult;

    ignore.push({ path: configName || TEMPLATE_CONFIG_FILENAME });

    const parseData = await RepoPromptHandle(question);
    const screenRule = screener(parseData);

    const ld = CreateLoading(
        `tmp repo pipe to ${chalk.blue.underline(dest)}...`
    );
    try {
        ld.start();
        if (option.exclude) {
            option.exclude.split(',').forEach(e => {
                parseExclude.push(new RegExp(e));
            });
        }
        if (option.include) {
            option.include.split(',').forEach(e => {
                parseInclude.push(new RegExp(e));
            });
        }
        if (option.ignore) {
            option.ignore.split(',').forEach(e => {
                ignore.push(new RegExp(e));
            });
        }
        await FilePiper(source, dest, {
            parseData,
            parseExclude,
            parseInclude,
            ignore,
            screenRule,
        });

        ld.succeed('pipe handle success!');
    } catch (error) {
        console.log(error);
        ld.fail('pipe handle failed!');
        return Exit();
    }
};
