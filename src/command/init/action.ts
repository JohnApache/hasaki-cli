import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

import Analyse from '../../piper/analyse';
import Download from './download';
import CreateLoading from '../../loading';

import {FileCleanner, FilePiper} from '../../piper';
import {ChooseTemplatePrompt, ConfirmDeletePrompt, CreatePrompt} from './prompt';
import {TEMPLATE_REPO_TMP_DIRNAME, TEMPLATE_CONFIG_FILENAME} from '../../config/definition';
import { Question } from 'inquirer';
import {Exit} from '../../common';
import {SuccessLog, ErrorLog} from '../../common/log';
import {CheckTemplate} from '../../common/template';
import { Command } from 'commander';

export const BeforeInitHandle = async (projectName: string, options: ActionOptions): Promise<void> => {
    const targetPath = path.resolve(process.cwd(), options.outDir || '', projectName);
    const tmpRepoPath = path.resolve(process.cwd(), options.config || TEMPLATE_REPO_TMP_DIRNAME);
    if(fs.existsSync(tmpRepoPath)) {
        const ld = CreateLoading('clean tmp template gitrepo ...');
        try {
            ld.start();
            await FileCleanner(tmpRepoPath);
            ld.succeed('clean tmp template gitrepo success!');
        } catch (error) {
            console.log(error);
            ld.fail('clean tmp template gitrepo failed!');
            return Exit();
        }
    }

    if(fs.existsSync(targetPath)) {
        const confirm = await ConfirmDeletePrompt(projectName);
        if(!confirm) return Exit();
        const ld = CreateLoading('cleaning files...');
        try {
            ld.start();
            await FileCleanner(targetPath);
            ld.succeed('clean files success!');
        } catch (error) {
            console.log(error);
            ld.fail('clean files failed!');
            return Exit();
        }
    }
}

export const DownloadHandle = async (repo: string, dest: string): Promise<void> => {
    const ld = CreateLoading(`downloading template from remote ${chalk.blue.underline(repo)} ...`);
    try {
        ld.start();
        await Download(repo, dest);
        ld.succeed('dowload template success!');
    } catch (error) {
        console.log(error);
        ld.fail('dowload template failed!');
        return Exit();
    }
} 

export const RepoPromptHandle = async (questions: Array<Question>): Promise<object> => {
    let parseData: object = {};
    if(questions.length > 0) {
        parseData = await CreatePrompt(questions)
    }
    return parseData;
}

export const RepoPipeHandle = async (source: string, dest: string, option: ActionOptions): Promise<void> => {
    const configName = option.config || '';
    if(path.isAbsolute(configName)) {
        ErrorLog('config name cant set an absoulte path!');
        return Exit();
    }
    const configFilePath = path.resolve(source, configName || TEMPLATE_CONFIG_FILENAME)
    const analyseResult = Analyse(configFilePath);

    const {
        parseExclude = [],
        parseInclude = [],
        ignore = [],
        question = [],
        screener = () => {
            return {
                exclude: [],
                include: []
            }
        }
    } = analyseResult;

    ignore.push({path: configName || TEMPLATE_CONFIG_FILENAME});

    const parseData = await RepoPromptHandle(question);
    const screenRule = screener(parseData);

    const ld = CreateLoading(`tmp repo pipe to ${chalk.blue.underline(dest)}...`);
    try {
        ld.start();
        if(option.exclude) {
            option.exclude.split(',').forEach(e => {
                parseExclude.push(new RegExp(e))
            });
        }
        if(option.include) {
            option.include.split(',').forEach(e => {
                parseInclude.push(new RegExp(e));
            });
        }
        if(option.ignore) {
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
}

export type ActionOptions = {
    outDir?: string,
    ignore?: string,
    exclude?: string,
    include?: string,
    config?: string,
}

const InitAction = async (projectName: string, command: Command): Promise<void> => {
    if(!CheckTemplate()) {
        ErrorLog('current template list is empty.');
        return Exit();
    }
    const options: ActionOptions = command.opts();
    const targetPath = path.resolve(process.cwd(), options.outDir || '', projectName);
    const tmpRepoPath = path.resolve(process.cwd(), TEMPLATE_REPO_TMP_DIRNAME);
    await BeforeInitHandle(projectName, options);
    const template = await ChooseTemplatePrompt();
    await DownloadHandle(template.remoteAddress, tmpRepoPath);
    await RepoPipeHandle(tmpRepoPath, targetPath, options);
    await FileCleanner(tmpRepoPath);
    SuccessLog(`create ${projectName} success!`)
}

export default InitAction;