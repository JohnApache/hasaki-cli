import path from 'path';
import fs from 'fs';

import CreateLoading from '../../loading';

import { ActionOptions } from './type';
import { FileCleanner } from '../../piper';
import { Exit } from '../../common';
import { ConfirmDeletePrompt } from './prompt';
import { TEMPLATE_REPO_TMP_DIRNAME } from '../../config/definition';

export const BeforeInitHandle = async (
    projectName: string,
    options: ActionOptions
): Promise<void> => {
    const targetPath = path.resolve(
        process.cwd(),
        options.outDir || '',
        projectName
    );
    const tmpRepoPath = path.resolve(
        process.cwd(),
        options.config || TEMPLATE_REPO_TMP_DIRNAME
    );
    if (fs.existsSync(tmpRepoPath)) {
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

    if (fs.existsSync(targetPath)) {
        const confirm = await ConfirmDeletePrompt(projectName);
        if (!confirm) return Exit();
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
};
