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
const BuildRollupPackageInfo = (usedMemory) => {
    let packageInfo = {
        scripts: {
            'build:rollup': 'rollup -c',
            'watch:rollup': 'rollup --watch',
        },
        devDependencies: {
            rollup: '^1.21.4',
            'rollup-plugin-commonjs': '^10.1.0',
            'rollup-plugin-node-resolve': '^5.2.0',
            'rollup-plugin-terser': '^5.1.2',
            '@rollup/plugin-json': '^4.0.0',
            '@rollup/plugin-replace': '^2.2.1',
        },
    };
    const useBabel = usedMemory.babel;
    const useTs = usedMemory.typescript;
    if (useBabel) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            devDependencies: {
                '@babel/cli': '^7.5.5',
                '@babel/core': '^7.5.5',
                '@babel/plugin-transform-runtime': '^7.5.5',
                '@babel/preset-env': '^7.5.5',
                'rollup-plugin-babel': '^4.3.3',
            },
        });
    }
    if (useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            devDependencies: {
                typescript: '^3.6.4',
                'rollup-plugin-typescript2': '^0.24.3',
            },
        });
    }
    return packageInfo;
};
const GenRollupConfig = (usedMemory, context) => __awaiter(void 0, void 0, void 0, function* () {
    const targetPath = path_1.default.resolve(context.targetPath, `./rollup.config${context.suffix}.js`);
    if (!context.forceCover && fs_1.default.existsSync(targetPath)) {
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath));
        !answer.confirm && common_1.Exit();
    }
    return new Promise(resolve => {
        parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/rollup.config.js'), targetPath, usedMemory, () => {
            resolve(BuildRollupPackageInfo(usedMemory));
        });
    });
});
exports.default = GenRollupConfig;
