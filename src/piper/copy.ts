import fs from 'fs';
import path from 'path';
const Copy = (source: string, dest: string, callback?: Function) => {
    if(!fs.existsSync(path.dirname(dest))) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
    }
    const rs = fs.createReadStream(source);
    const ws = fs.createWriteStream(dest);
    ws.on('finish', () => {
        callback && callback();
    });
    rs.pipe(ws);
}

export default Copy;