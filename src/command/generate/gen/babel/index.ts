import path from 'path';
import fs from 'fs';
import ParseRender from '../../../../piper/parseRender';
import { UsedMemoryType, PackageInfo, GenerateContext } from '../../type';
import { ConfirmCoverPrompt } from '../../prompt';
import { Exit } from '../../../../common';

const BuildBabelPackageInfo = (): PackageInfo => {
    const packageInfo: PackageInfo = {
        scripts: {
            'build:babel': 'babel src --out-dir lib',
        },
        devDependencies: {
            '@babel/cli': '^7.5.5',
            '@babel/core': '^7.5.5',
            '@babel/plugin-transform-runtime': '^7.5.5',
            '@babel/preset-env': '^7.5.5',
        },
        dependencies: {
            '@babel/runtime-corejs3': '^7.5.5',
        },
    };
    return packageInfo;
};

const GenBabelConfig = async (
    usedMemory: UsedMemoryType,
    context: GenerateContext
): Promise<PackageInfo> => {
    const targetPath = path.resolve(
        context.targetPath,
        `babel.config${context.suffix}.js`
    );
    if (!context.forceCover && fs.existsSync(targetPath)) {
        const answer = await ConfirmCoverPrompt(path.basename(targetPath));
        !answer.confirm && Exit();
    }

    return new Promise(resolve => {
        ParseRender(
            path.resolve(__dirname, '../../../../../assets/babel.config.js'),
            targetPath,
            usedMemory,
            () => {
                resolve(BuildBabelPackageInfo());
            }
        );
    });
};

export default GenBabelConfig;
