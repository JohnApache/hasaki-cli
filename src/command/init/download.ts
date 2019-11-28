import chalk from 'chalk';
import dgit from '@dking/dgit';
import ProgressBar from 'progress';

import CreateLoading from '../../loading';

import { PasswordPrompt } from './prompt';
import { ActionOptions } from './type';
import { Exit } from '../../common';

const TextEllipsis = (text: string, maxLen: number): string =>
    (text.length >= maxLen ? `${text.slice(0, maxLen)}...` : text);

export const DownloadHandle = async (
    repo: string,
    dest: string,
    options: ActionOptions
): Promise<void> => {
    const { username, token } = options;
    let { password } = options;

    if (username && !password) {
        password = await PasswordPrompt(username);
    }

    const ld = CreateLoading(
        `downloading template from remote ${chalk.blue.underline(repo)} ...`
    );

    let bar: ProgressBar;
    try {
        ld.start();
        await dgit(
            {
                githubLink: repo,
                username,
                password,
                token,
            },
            dest,
            {
                log: false,
                parallelLimit: 10,
            },
            {
                beforeLoadTree() {
                    ld.start();
                },
                afterLoadTree() {
                    ld.succeed('load remote repo tree succeed! ');
                },
                onResolved(status) {
                    const green = '\u001b[42m \u001b[0m';
                    const red = '\u001b[41m \u001b[0m';
                    bar = new ProgressBar(
                        '  DOWNLOAD |:bar| :current/:total :percent elapsed: :elapseds eta: :eta :file, done.',
                        {
                            total: status.totalCount,
                            width: 50,
                            complete: green,
                            incomplete: red,
                        }
                    );
                },
                onProgress(_, node) {
                    bar.tick({
                        file: TextEllipsis(node.path, 30),
                    });
                },
            }
        );

        ld.succeed('dowload template success!');
    } catch (error) {
        console.log(error);
        ld.fail('dowload template failed!');
        return Exit();
    }
};
