import fs from 'fs';

import { DefaultIgnore } from '../config/policy';
import { MatchRules, IsMatchRules } from './analyse';

const CreateScanner = (rootPath: string, ignore: MatchRules) => {
    const AllIgnore = DefaultIgnore.concat(ignore);
    const IsIgnore = (targetPath: string): boolean =>
        IsMatchRules(rootPath, targetPath, AllIgnore);

    const Scanner = (
        targetDir: string,
        callback?: (filePath: string)=> void,
    ): void => {
        if (IsIgnore(targetDir)) return;

        if (!fs.existsSync(targetDir)) {
            throw new Error('targetDir is not exists.');
        }
        const stat = fs.statSync(targetDir);
        if (stat.isFile()) {
            callback && callback(targetDir);
            return;
        }
        if (stat.isDirectory()) {
            const files = fs.readdirSync(targetDir);
            files.forEach(filename => {
                const filepath = `${ targetDir }/${ filename }`;
                const sstat = fs.statSync(filepath);
                if (sstat.isFile() && !IsIgnore(filepath)) {
                    callback && callback(filepath);
                    return;
                }
                if (sstat.isDirectory()) {
                    Scanner(filepath, callback);
                }
            });
        }
    };
    return Scanner;
};

export default CreateScanner;
