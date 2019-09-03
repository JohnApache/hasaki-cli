import {spawn} from 'child_process';

type CloneOptions = {
    repo: string,
    shallow?: boolean,
    branch?: string,
    depth?: number,
    dest?: string,
}

const createGitArgs = (option: CloneOptions): Array<string> => {
    const {
        repo,
        shallow = true,
        branch = 'master',
        depth = 1,
        dest = process.cwd()
    } = option;
    const args = ['clone', repo, dest];
    if(shallow) {
        args.push('--depth', `${depth}`)
    }
    args.push('-b', branch, '--single-branch');
    return args;
}


const clone = (option: CloneOptions): Promise<void> => {
    return new Promise((resolve, reject) => {
        const args = createGitArgs(option);
        const gitProcess = spawn('git', args);
        gitProcess.on('close', (status) => {
            if(status !== 0) {
                console.log(' ');
                console.error('git clone failed!', 'status:', status);
                console.log(args);
                return reject(new Error(`git clone failed with status ${status}`));
            }
            resolve();
        });
    })
}

export default clone;