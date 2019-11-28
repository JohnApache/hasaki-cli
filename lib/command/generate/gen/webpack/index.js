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
const lodash_1 = __importDefault(require("lodash"));
const parseRender_1 = __importDefault(require("../../../../piper/parseRender"));
const scanner_1 = __importDefault(require("../../../../piper/scanner"));
const copy_1 = __importDefault(require("../../../../piper/copy"));
const prompt_1 = require("../../prompt");
const common_1 = require("../../../../common");
const BuildWebpackPackageInfo = (usedMemory) => {
    let packageInfo = {};
    const useReact = usedMemory.react;
    const useVue = usedMemory.vue;
    const useTs = usedMemory.typescript;
    if (useReact || useVue)
        return packageInfo;
    packageInfo = lodash_1.default.merge(packageInfo, {
        scripts: {
            'build:webpack:dev': 'webpack',
            'build:webpack:prod': 'webpack --env.NODE_ENV=prod',
            'start:webpack:dev': 'webpack-dev-server --open',
        },
        devDependencies: {
            'babel-loader': '^8.0.6',
            'clean-webpack-plugin': '^3.0.0',
            'css-loader': '^3.2.0',
            'exports-loader': '^0.7.0',
            'file-loader': '^4.2.0',
            'html-webpack-plugin': '^3.2.0',
            'imports-loader': '^0.8.0',
            'style-loader': '^1.0.0',
            webpack: '^4.41.1',
            'webpack-cli': '^3.3.9',
            'webpack-dev-server': '^3.8.2',
            'webpack-manifest-plugin': '^2.2.0',
            'webpack-merge': '^4.2.2',
            'workbox-webpack-plugin': '^4.3.1',
        },
    });
    if (useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            devDependencies: {
                'ts-loader': '^6.2.0',
                typescript: '^3.6.4',
            },
        });
    }
    return packageInfo;
};
const GenWebpackConfig = (usedMemory, context) => new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
    const useReact = usedMemory.react;
    const useVue = usedMemory.vue;
    if (useReact)
        return resolve(BuildWebpackPackageInfo(usedMemory));
    if (useVue)
        return resolve(BuildWebpackPackageInfo(usedMemory));
    const rootPath = path_1.default.resolve(__dirname, '../../../../../assets/webpack');
    const contextPath = path_1.default.resolve(context.targetPath, `./webpack_config${context.suffix}`);
    const Scanner = scanner_1.default(rootPath, []);
    let count = 0;
    const onTaskEnd = () => {
        count--;
        count === 0 && resolve(BuildWebpackPackageInfo(usedMemory));
    };
    const handleTask = (filepath) => {
        const targetPath = filepath.replace(rootPath, contextPath);
        const isTemplate = path_1.default.extname(filepath).indexOf('html') !== -1;
        count++;
        if (isTemplate)
            return copy_1.default(filepath, targetPath, onTaskEnd);
        parseRender_1.default(filepath, targetPath, usedMemory, onTaskEnd);
    };
    const coverPromptFileQueue = [];
    Scanner(rootPath, filepath => {
        const targetPath = filepath.replace(rootPath, contextPath);
        if (!context.forceCover && fs_1.default.existsSync(targetPath)) {
            return coverPromptFileQueue.push(filepath);
        }
        handleTask(filepath);
    });
    for (let i = 0; i < coverPromptFileQueue.length; i++) {
        const filepath = coverPromptFileQueue[i];
        const targetPath = filepath.replace(rootPath, contextPath);
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath));
        if (!answer.confirm)
            return common_1.Exit();
        handleTask(filepath);
    }
}));
exports.default = GenWebpackConfig;
