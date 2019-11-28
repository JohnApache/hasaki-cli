import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import Copy from './copy';
import { MakeDirs } from './utils';

const ParseRender = (
    sourcePath: string,
    targetPath: string,
    parseData: Record<string, any>,
    callback?: () => void
) => {
    ejs.renderFile(
        sourcePath,
        parseData,
        {
            _with: false,
            localsName: 'locals',
        },
        (err, data) => {
            if (err) {
                console.log(err);
                Copy(sourcePath, targetPath, callback);
                return;
            }
            if (!fs.existsSync(path.dirname(targetPath))) {
                MakeDirs(path.dirname(targetPath));
            }
            fs.writeFileSync(targetPath, data);
            callback && callback();
        }
    );
};

export default ParseRender;
