import fs from 'fs';

const Scanner = (
        targetDir: string, 
        callback?: (filePath: string) => void
    ): void => {
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

export default Scanner;