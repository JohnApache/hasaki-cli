import path from 'path';
import fs from 'fs';
import ParseRender from '../../../../piper/parseRender';
import {
    UsedMemoryType, PackageInfo, GenerateContext,
} from '../../type';
import { ConfirmCoverPrompt } from '../../prompt';
import { Exit } from '../../../../common';

const BuildTSPackageInfo = (): PackageInfo => {
    const packageInfo = {
        scripts: {
            'build:ts': 'tsc --build',
            'watch:ts': 'tsc --watch',
        },
        devDependencies: {
            typescript   : '^3.6.4',
            '@types/node': '^12.7.5',
        },
    };

    return packageInfo;
};

const GenTSConfig = async (
    usedMemory: UsedMemoryType,
    context: GenerateContext,
): Promise<PackageInfo> => {
    const targetPath = path.resolve(
        context.targetPath,
        `tsconfig${ context.suffix }.json`,
    );
    if (!context.forceCover && fs.existsSync(targetPath)) {
        const answer = await ConfirmCoverPrompt(path.basename(targetPath));
        !answer.confirm && Exit();
    }
    return new Promise(resolve => {
        ParseRender(
            path.resolve(__dirname, '../../../../../assets/tsconfig.json'),
            targetPath,
            usedMemory,
            () => {
                resolve(BuildTSPackageInfo());
            },
        );
    });
};

export default GenTSConfig;
