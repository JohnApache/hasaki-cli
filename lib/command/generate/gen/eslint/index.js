"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const parseRender_1 = __importDefault(require("../../../../piper/parseRender"));
const prompt_1 = require("../../prompt");
const common_1 = require("../../../../common");
const lodash_1 = __importDefault(require("lodash"));
const BuildESLintPackageInfo = (usedMemory) => {
    const useTs = usedMemory.typescript;
    const useReact = usedMemory.react;
    const useBabel = usedMemory.babel;
    const useWebpack = usedMemory.webpack;
    let packageInfo = {
        scripts: {
            lint: `eslint src --ext .jsx --ext .js --cache${useTs ? ' --ext .tsx --ext .ts' : ''} --fix`,
        },
        'lint-staged': {
            [`**/*.{jsx,js${useTs ? ',ts,tsx' : ''}}`]: [
                'npm run lint',
                'git add',
            ],
        },
        husky: { hooks: { 'pre-commit': 'lint-staged' } },
        prettier: {
            printWidth: 80,
            tabWidth: 4,
            semi: true,
            singleQuote: true,
            trailingComma: 'es5',
            proseWrap: 'preserve',
        },
        devDependencies: {
            eslint: '^6.8.0',
            husky: '^2.3.0',
            'eslint-plugin-import': '^2.19.1',
            'eslint-plugin-promise': '^4.2.1',
            'lint-staged': '^8.1.7',
        },
    };
    if (useReact) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            devDependencies: {
                'eslint-plugin-react': '^7.17.0',
                'eslint-plugin-react-hooks': '^2.3.0',
            },
        });
    }
    if (useReact || useWebpack) {
        packageInfo = lodash_1.default.merge(packageInfo, { devDependencies: { 'eslint-import-resolver-webpack': '^0.11.1' } });
    }
    if (!useTs && (useBabel || useReact)) {
        packageInfo = lodash_1.default.merge(packageInfo, { devDependencies: { 'babel-eslint': '^10.0.1' } });
    }
    if (useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            devDependencies: {
                '@typescript-eslint/eslint-plugin': '^2.13.0',
                '@typescript-eslint/parser': '^2.13.0',
                'eslint-import-resolver-typescript': '^2.0.0',
                typescript: '^3.7.4',
            },
        });
    }
    if (!useReact && !useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, { devDependencies: { '@dking/eslint-config-base': '^0.0.2' } });
    }
    if (useReact && !useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, { devDependencies: { '@dking/eslint-config-react': '^0.0.2' } });
    }
    if (!useReact && useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, { devDependencies: { '@dking/eslint-config-typescript': '^0.0.5' } });
    }
    if (useReact && useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, { devDependencies: { '@dking/eslint-config-typescript-react': '^0.0.4' } });
    }
    return packageInfo;
};
const GenESLintConfig = (usedMemory, context) => __awaiter(void 0, void 0, void 0, function* () {
    let successResolve;
    const prom = new Promise(resolve => {
        successResolve = resolve;
    });
    let count = 2;
    const onTaskEnd = () => {
        count--;
        count === 0 &&
            successResolve(BuildESLintPackageInfo(usedMemory));
    };
    const targetPath1 = path_1.default.resolve(context.targetPath, `./.eslintrc${context.suffix}.js`);
    if (!context.forceCover && fs_1.default.existsSync(targetPath1)) {
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath1));
        !answer.confirm && common_1.Exit();
    }
    parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/.eslintrc.js'), targetPath1, usedMemory, onTaskEnd);
    const targetPath2 = path_1.default.resolve(context.targetPath, `./.eslintignore${context.suffix}`);
    if (!context.forceCover && fs_1.default.existsSync(targetPath2)) {
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath2));
        !answer.confirm && common_1.Exit();
    }
    parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/.eslintignore'), targetPath2, usedMemory, onTaskEnd);
    return prom;
});
exports.default = GenESLintConfig;
