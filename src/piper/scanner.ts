import fs from 'fs';
import {DefaultIgnore} from '../config/policy';
const CreateScanner = (ignore: RegExp[]) => {
    const AllIgnore = DefaultIgnore.concat(ignore);
    const Scanner = (
        targetDir: string, 
        callback?: (filePath: string) => void
    ): void => {
        if(AllIgnore.some(reg => reg.test(targetDir))) return;

        if(!fs.existsSync(targetDir)) {
            throw new Error('targetDir is not exists.');
        }
        const stat = fs.statSync(targetDir);
        if(stat.isFile()) {
            callback && callback(targetDir);
            return;
        }
        if(stat.isDirectory()) {
            const files = fs.readdirSync(targetDir);
            files.forEach(filename => {
                const filepath = `${targetDir}/${filename}`;
                if(AllIgnore.some(reg => reg.test(filepath))) return;
                const stat = fs.statSync(filepath);
                if(stat.isFile()) {
                    callback && callback(filepath);
                    return;
                }
                if(stat.isDirectory()) {
                    Scanner(filepath, callback);
                }
            })
           
        }
    }
    return Scanner;
}

export default CreateScanner;