import path from 'path';

import { Command } from 'commander';
import { TEMPLATE_REPO_TMP_DIRNAME } from '../../config/definition';
import { FileCleanner } from '../../piper';
import { SuccessLog } from '../../common/log';
import { ActionOptions } from '../init/type';
import { BeforeInitHandle } from '../init/beforeInit';
import { DownloadHandle } from '../init/download';
import { RepoPipeHandle } from '../init/repoPipe';
import { ProjectNamePrompt } from './prompt';

const SetProjectName = async (): Promise<string> => {
    const answers = await ProjectNamePrompt();
    return answers.projectName;
};

const InstallAction = async (
    remoteAddress: string,
    command: Command,
): Promise<void> => {
    const options: ActionOptions = command.opts();
    const projectName = await SetProjectName();
    const targetPath = path.resolve(
        process.cwd(),
        options.outDir || '',
        projectName,
    );
    const tmpRepoPath = path.resolve(
        process.cwd(),
        options.config || TEMPLATE_REPO_TMP_DIRNAME,
    );
    await BeforeInitHandle(projectName, options);
    await DownloadHandle(remoteAddress, tmpRepoPath, options);
    await RepoPipeHandle(tmpRepoPath, targetPath, options);
    await FileCleanner(tmpRepoPath);
    SuccessLog(`create ${ projectName } success!`);
};

export default InstallAction;
