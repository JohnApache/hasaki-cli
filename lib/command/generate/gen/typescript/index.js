"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseRender_1 = __importDefault(require("../../../../piper/parseRender"));
const path_1 = __importDefault(require("path"));
const BuildTSPackageInfo = (usedMemory) => {
    let packageInfo = {
        "scripts": {
            "build:rollup": "tsc --build",
            "watch:rollup": "tsc --watch"
        },
        "devDependencies": {
            "typescript": "^3.6.4",
            "@types/node": "^12.7.5"
        }
    };
    return packageInfo;
};
const GenTSConfig = (usedMemory) => {
    parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/tsconfig.json.bak'), path_1.default.resolve(process.cwd(), 'tsconfig2.json'), usedMemory);
    return BuildTSPackageInfo(usedMemory);
};
exports.default = GenTSConfig;
