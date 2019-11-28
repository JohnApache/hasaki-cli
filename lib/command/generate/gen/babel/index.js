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
const BuildBabelPackageInfo = () => {
    const packageInfo = {
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
const GenBabelConfig = (usedMemory, context) => __awaiter(void 0, void 0, void 0, function* () {
    const targetPath = path_1.default.resolve(context.targetPath, `babel.config${context.suffix}.js`);
    if (!context.forceCover && fs_1.default.existsSync(targetPath)) {
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath));
        !answer.confirm && common_1.Exit();
    }
    return new Promise(resolve => {
        parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/babel.config.js'), targetPath, usedMemory, () => {
            resolve(BuildBabelPackageInfo());
        });
    });
});
exports.default = GenBabelConfig;
