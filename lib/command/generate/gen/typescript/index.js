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
const BuildTSPackageInfo = () => {
    const packageInfo = {
        scripts: {
            'build:ts': 'tsc --build',
            'watch:ts': 'tsc --watch',
        },
        devDependencies: {
            typescript: '^3.6.4',
            '@types/node': '^12.7.5',
        },
    };
    return packageInfo;
};
const GenTSConfig = (usedMemory, context) => __awaiter(void 0, void 0, void 0, function* () {
    const targetPath = path_1.default.resolve(context.targetPath, `tsconfig${context.suffix}.json`);
    if (!context.forceCover && fs_1.default.existsSync(targetPath)) {
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath));
        !answer.confirm && common_1.Exit();
    }
    return new Promise(resolve => {
        parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/tsconfig.json'), targetPath, usedMemory, () => {
            resolve(BuildTSPackageInfo());
        });
    });
});
exports.default = GenTSConfig;
