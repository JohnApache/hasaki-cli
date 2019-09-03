import fs from 'fs';
import chalk from 'chalk';


import Analyse from '../../piper/analyse';
import Download from './download';
import CreateLoading from '../../loading';

import {FileCleanner, FilePiper} from '../../piper';
import {ChooseTemplatePrompt, ConfirmDeletePrompt, CreatePrompt} from './prompt';
import {TEMPLATE_REPO_TMP_DIRNAME} from '../../config/definition';
import { Question } from 'inquirer';

const Exit = () => {
    process.exit(1);
}

const BeforeInitHandle = async (projectName: string): Promise<void> => {
    const targetPath = `${process.cwd()}/${projectName}`;
    const tmpRepoPath = `${process.cwd()}/${TEMPLATE_REPO_TMP_DIRNAME}`;
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

const DownloadHandle = async (repo: string, dest: string): Promise<void> => {
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

const RepoPromptHandle = async (questions: Array<Question>): Promise<object> => {
    let parseData: object = {};
    if(questions.length > 0) {
        parseData = await CreatePrompt(questions)
    }
    return parseData;
}

const RepoPipeHandle = async (source: string, dest: string): Promise<void> => {
    const analyseResult = Analyse(source);
    const parseData = await RepoPromptHandle(analyseResult.question);
    const ld = CreateLoading(`tmp repo pipe to ${chalk.blue.underline(dest)}...`);
    try {
        ld.start();

        await FilePiper(source, dest, {
            parseData,
            parseExclude: analyseResult.parseExclude,
            parseInclude: analyseResult.parseInclude,
            ignore: analyseResult.ignore
        });

        ld.succeed('pipe handle success!');
    } catch (error) {
        console.log(error);
        ld.fail('pipe handle failed!');
        return Exit();
    }
}

const InitAction = async (projectName: string): Promise<void> => {
    const targetPath = `${process.cwd()}/${projectName}`;
    const tmpRepoPath = `${process.cwd()}/${TEMPLATE_REPO_TMP_DIRNAME}`;
    await BeforeInitHandle(projectName);
    const template = await ChooseTemplatePrompt();
    await DownloadHandle(template.remoteAddress, tmpRepoPath);
    await RepoPipeHandle(tmpRepoPath, targetPath);
    await FileCleanner(tmpRepoPath);
    console.log(`${projectName} in success!`);
}

export default InitAction;