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
const parseRender_1 = __importDefault(require("../../../../piper/parseRender"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const prompt_1 = require("../../prompt");
const common_1 = require("../../../../common");
const BuildMochaPackageInfo = (usedMemory) => {
    const useTs = usedMemory['typescript'];
    const useBabel = usedMemory['babel'];
    let packageInfo = {
        "scripts": {
            "test:mocha": "nyc --reporter=text mocha 'test/**/*.{ts,tsx}' -t 5000",
            "test:mocha:reporter": "nyc --reporter=lcov --reporter=text mocha 'test/**/*.{js,jsx}' -t 5000 --reporter=mochawesome"
        },
        "devDependencies": {
            "chai": "^4.2.0",
            "mocha": "^6.2.0",
            "mochawesome": "^4.1.0",
            "nyc": "^14.1.1"
        }
    };
    if (useBabel) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            "scripts": {
                "test:mocha": "nyc --reporter=text mocha --require @babel/register 'test/**/*.{js,jsx}' -t 5000",
                "test:mocha:reporter": "nyc --reporter=lcov --reporter=text mocha --require @babel/register 'test/**/*.{ts,tsx}' -t 5000 --reporter=mochawesome"
            },
            "devDependencies": {
                "@babel/core": "^7.5.5",
                "@babel/preset-env": "^7.5.5",
                "@babel/register": "^7.5.5",
            }
        });
    }
    if (useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            "scripts": {
                "test:mocha": "nyc --reporter=text mocha --require ts-node/register 'test/**/*.{ts,tsx}' -t 5000",
                "test:mocha:reporter": "nyc --reporter=lcov --reporter=text mocha --require ts-node/register 'test/**/*.{ts,tsx}' -t 5000 --reporter=mochawesome"
            },
            "devDependencies": {
                "ts-node": "^8.3.0",
                "typescript": "^3.6.2",
                "@types/chai": "^4.2.0",
                "@types/mocha": "^5.2.7",
                "@types/node": "^12.7.5",
            }
        });
    }
    return packageInfo;
};
const GenMochaConfig = (usedMemory, context) => __awaiter(void 0, void 0, void 0, function* () {
    const useTs = usedMemory['typescript'];
    const targetPath = path_1.default.resolve(context.targetPath, `mocha-demo.${useTs ? 'ts' : 'js'}`);
    if (!context.forceCover && fs_1.default.existsSync(targetPath)) {
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath));
        !answer.confirm && common_1.Exit();
    }
    return new Promise(resolve => {
        parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/mocha-demo.js'), targetPath, usedMemory, () => {
            resolve(BuildMochaPackageInfo(usedMemory));
        });
    });
});
exports.default = GenMochaConfig;
