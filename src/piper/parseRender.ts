import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import Copy from './copy';
const ParseRender = (
        sourcePath: string, 
        targetPath: string, 
        parseData: Object, 
        callback?: () => void
    ) => {
    ejs.renderFile(sourcePath, parseData, {
        _with: false,
        localsName: 'locals',
    }, (err, data) => {
        if(err) {
            console.log(err);
            Copy(sourcePath, targetPath, callback)
            return;
        }
        if(!fs.existsSync(path.dirname(targetPath))) {
            fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        }
        fs.writeFileSync(targetPath, data);
        callback && callback();
    });
}

export default ParseRender;