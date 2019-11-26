import fs from 'fs';
import path from 'path';

export const MakeDirs = (dir: string): void => {
    const mkdirs = (dir: string, callback?: () => void) => {
        if(fs.existsSync(dir)) {
            callback && callback();
            return;
        }

        mkdirs(path.dirname(dir), () => {
            fs.mkdirSync(dir);
            callback && callback();
        });
    }

    if(fs.existsSync(dir)) return;
    mkdirs(dir)
}
