import path from 'path';

import {TEMPLATE_REPO_TMP_DIRNAME} from '../../config/definition';
import {ActionOptions, BeforeInitHandle, DownloadHandle, RepoPipeHandle} from '../init/action';
import {FileCleanner} from '../../piper'
import {ProjectNamePrompt} from './prompt';
import {SuccessLog} from '../../common/log';
import { Command } from 'commander';
const SetProjectName = async (): Promise<string> => {
    const answers = await ProjectNamePrompt();
    return answers.projectName;
}

const InstallAction = async (remoteAddress: string, command: Command): Promise<void> => {
    const options: ActionOptions = command.opts();
    const projectName = await SetProjectName();
    const targetPath = path.resolve(process.cwd(), options.outDir || '', projectName);
    const tmpRepoPath = path.resolve(process.cwd(), options.config || TEMPLATE_REPO_TMP_DIRNAME);
    await BeforeInitHandle(projectName, options);
    await DownloadHandle(remoteAddress, tmpRepoPath);
    await RepoPipeHandle(tmpRepoPath, targetPath, options);
    await FileCleanner(tmpRepoPath);
    SuccessLog(`create ${projectName} success!`);
}

export default InstallAction;