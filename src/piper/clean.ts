import fs from 'fs';

const Clean = (targets: Array<string>, callback: Function) => {
    targets.forEach(deletePath => {
        if (!fs.existsSync(deletePath)) return;
        const stat = fs.statSync(deletePath);
        if (stat.isFile()) {
            return fs.unlinkSync(deletePath);
        }
        if (stat.isDirectory()) {
            const nextTargets = fs
                .readdirSync(deletePath)
                .map(fileName => `${deletePath}/${fileName}`);
            Clean(nextTargets, () => {
                fs.rmdirSync(deletePath);
            });
        }
    });
    callback();
};

export default Clean;
