import fs from 'fs';
import path from 'path';
import { MakeDirs } from './utils';
const Copy = (source: string, dest: string, callback?: Function) => {
    if(!fs.existsSync(path.dirname(dest))) {
        MakeDirs(path.dirname(dest))
    }
    const rs = fs.createReadStream(source);
    const ws = fs.createWriteStream(dest);
    ws.on('finish', () => {
        callback && callback();
    });
    rs.pipe(ws);
}

export default Copy;