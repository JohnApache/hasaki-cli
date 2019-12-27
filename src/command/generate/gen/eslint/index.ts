import path from 'path';
import fs from 'fs';
import ParseRender from '../../../../piper/parseRender';
import {
    UsedMemoryType, PackageInfo, GenerateContext,
} from '../../type';
import { ConfirmCoverPrompt } from '../../prompt';
import { Exit } from '../../../../common';
import _ from 'lodash';

const BuildESLintPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    const useTs = usedMemory.typescript;
    const useReact = usedMemory.react;
    const useBabel = usedMemory.babel;
    const useWebpack = usedMemory.webpack;
    let packageInfo: PackageInfo = {
        scripts: {
            lint: `eslint src --ext .jsx --ext .js --cache${ useTs ? ' --ext .tsx --ext .ts' : '' } --fix`,

            // format: "prettier-eslint 'src/**/*.{js,jsx}' --write",
        },
        'lint-staged': {
            [`**/*.{jsx,js${ useTs ? ',ts,tsx' : '' }}`]: [
                'npm run lint',
                'git add',
            ],
        },
        husky: { hooks: { 'pre-commit': 'lint-staged' }},

        prettier: {
            printWidth   : 80,
            tabWidth     : 4,
            semi         : true,
            singleQuote  : true,
            trailingComma: 'es5',
            proseWrap    : 'preserve',
        },

        devDependencies: {
            eslint                 : '^6.8.0',
            husky                  : '^2.3.0',
            'eslint-plugin-import' : '^2.19.1',
            'eslint-plugin-promise': '^4.2.1',
            'lint-staged'          : '^8.1.7',
        },
    };

    if (useReact) {
        packageInfo = _.merge(packageInfo, {
            devDependencies: {
                'eslint-plugin-react'      : '^7.17.0',
                'eslint-plugin-react-hooks': '^2.3.0',
            },
        });
    }

    if (useReact || useWebpack) {
        packageInfo = _.merge(packageInfo, { devDependencies: { 'eslint-import-resolver-webpack': '^0.11.1' }});
    }

    if (!useTs && (useBabel || useReact)) {
        packageInfo = _.merge(packageInfo, { devDependencies: { 'babel-eslint': '^10.0.1' }});
    }

    if (useTs) {
        packageInfo = _.merge(packageInfo, {
            devDependencies: {
                '@typescript-eslint/eslint-plugin' : '^2.13.0',
                '@typescript-eslint/parser'        : '^2.13.0',
                'eslint-import-resolver-typescript': '^2.0.0',
                typescript                         : '^3.7.4',
            },
        });
    }

    if (!useReact && !useTs) {
        packageInfo = _.merge(packageInfo, { devDependencies: { '@dking/eslint-config-base': '^0.0.2' }});
    }

    if (useReact && !useTs) {
        packageInfo = _.merge(packageInfo, { devDependencies: { '@dking/eslint-config-react': '^0.0.2' }});
    }

    if (!useReact && useTs) {
        packageInfo = _.merge(packageInfo, { devDependencies: { '@dking/eslint-config-typescript': '^0.0.5' }});
    }

    if (useReact && useTs) {
        packageInfo = _.merge(packageInfo, { devDependencies: { '@dking/eslint-config-typescript-react': '^0.0.4' }});
    }


    return packageInfo;
};

const GenESLintConfig = async (
    usedMemory: UsedMemoryType,
    context: GenerateContext,
): Promise<PackageInfo> => {
    let successResolve: any;

    const prom: Promise<PackageInfo> = new Promise(resolve => {
        successResolve = resolve;
    });

    let count = 2;
    const onTaskEnd = () => {
        count--;
        count === 0 &&
        successResolve(BuildESLintPackageInfo(usedMemory));
    };

    const targetPath1 = path.resolve(
        context.targetPath,
        `./.eslintrc${ context.suffix }.js`,
    );
    if (!context.forceCover && fs.existsSync(targetPath1)) {
        const answer = await ConfirmCoverPrompt(path.basename(targetPath1));
        !answer.confirm && Exit();
    }

    ParseRender(
        path.resolve(__dirname, '../../../../../assets/.eslintrc.js'),
        targetPath1,
        usedMemory,
        onTaskEnd,
    );

    const targetPath2 = path.resolve(
        context.targetPath,
        `./.eslintignore${ context.suffix }`,
    );
    if (!context.forceCover && fs.existsSync(targetPath2)) {
        const answer = await ConfirmCoverPrompt(path.basename(targetPath2));
        !answer.confirm && Exit();
    }

    ParseRender(
        path.resolve(__dirname, '../../../../../assets/.eslintignore'),
        targetPath2,
        usedMemory,
        onTaskEnd,
    );

    return prom;
};

export default GenESLintConfig;
