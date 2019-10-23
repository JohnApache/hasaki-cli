"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseRender_1 = __importDefault(require("../../../../piper/parseRender"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const BuildRollupPackageInfo = (usedMemory) => {
    let packageInfo = {
        "scripts": {
            "build:rollup": "rollup -c"
        },
        "devDependencies": {
            "rollup": "^1.21.4",
            "rollup-plugin-commonjs": "^10.1.0",
            "rollup-plugin-node-resolve": "^5.2.0",
            "rollup-plugin-terser": "^5.1.2",
        }
    };
    const useBabel = usedMemory['babel'];
    const useTs = usedMemory['typescript'];
    if (useBabel) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            "devDependencies": {
                "@babel/cli": "^7.5.5",
                "@babel/core": "^7.5.5",
                "@babel/plugin-transform-runtime": "^7.5.5",
                "@babel/preset-env": "^7.5.5",
                "rollup-plugin-babel": "^4.3.3",
            }
        });
    }
    if (useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            "devDependencies": {
                "typescript": "^3.6.4",
                "rollup-plugin-typescript2": "^0.24.3",
            }
        });
    }
    return packageInfo;
};
const GenRollupConfig = (usedMemory) => {
    parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/rollup.config.js.bak'), path_1.default.resolve(process.cwd(), './rollup.config2.js'), usedMemory);
    return BuildRollupPackageInfo(usedMemory);
};
exports.default = GenRollupConfig;
