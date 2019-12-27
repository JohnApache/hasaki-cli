"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const createGitArgs = (option) => {
    const { repo, shallow = true, branch = 'master', depth = 1, dest = process.cwd(), } = option;
    const args = [
        'clone',
        repo,
        dest,
    ];
    if (shallow) {
        args.push('--depth', `${depth}`);
    }
    args.push('-b', branch, '--single-branch');
    return args;
};
const clone = (option) => new Promise((resolve, reject) => {
    const args = createGitArgs(option);
    const gitProcess = child_process_1.spawn('git', args);
    gitProcess.on('close', status => {
        if (status !== 0) {
            console.log(' ');
            console.error('git clone failed!', 'status:', status);
            console.log(args);
            return reject(new Error(`git clone failed with status ${status}`));
        }
        resolve();
    });
});
exports.default = clone;
