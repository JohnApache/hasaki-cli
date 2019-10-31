"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseRender_1 = __importDefault(require("../../../../piper/parseRender"));
const path_1 = __importDefault(require("path"));
const BuildBabelPackageInfo = (usedMemory) => {
    let packageInfo = {
        "scripts": {
            "build:babel": "babel src --out-dir lib"
        },
        "devDependencies": {
            "@babel/cli": "^7.5.5",
            "@babel/core": "^7.5.5",
            "@babel/plugin-transform-runtime": "^7.5.5",
            "@babel/preset-env": "^7.5.5",
        },
        "dependencies": {
            "@babel/runtime-corejs3": "^7.5.5",
        }
    };
    return packageInfo;
};
const GenBabelConfig = (usedMemory, context) => {
    return new Promise(resolve => {
        parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/babel.config.js'), path_1.default.resolve(context.targetPath, `babel.config2.js`), usedMemory, () => {
            resolve(BuildBabelPackageInfo(usedMemory));
        });
    });
};
exports.default = GenBabelConfig;
