"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
// import os from 'os';
const package_1 = require("../common/package");
const CompareVersion = (biggerVersion, smallerVersion) => {
    const [v10 = 0, v11 = 0, v12 = 0,] = biggerVersion.split('.');
    const [v20 = 0, v21 = 0, v22 = 0,] = smallerVersion.split('.');
    if (v10 !== v20)
        return v10 > v20;
    if (v11 !== v21)
        return v11 > v21;
    if (v12 !== v22)
        return v12 > v22;
    return false;
};
const CheckVersion = () => {
    const packageInfo = package_1.GetPackageInfo();
    child_process_1.exec(`npm info ${packageInfo.name} version`, (err, stdout) => {
        if (err) {
            console.log(err);
            return;
        }
        const remoteVersion = stdout.trim();
        const currentVersion = packageInfo.version;
        if (CompareVersion(remoteVersion, currentVersion)) {
            console.log(`Update available: ${chalk_1.default.gray(currentVersion)} -> ${chalk_1.default.greenBright.bold(remoteVersion)}, run ${chalk_1.default.greenBright.bold(`npm install ${packageInfo.name} -g`)} to update!`);
        }
    });
};
// const SpecialLog = (log: string) => {
//     const logArr = log.trim().split(os.EOL);
//     console.log(logArr);
//     let maxLen = 0;
//     const maxHeight: number = logArr.length;
//     const paddingLeft = 10;
//     const paddingRight = 10;
//     const paddingTop = 2;
//     const paddingBottom = 2;
//     logArr.forEach((v) => {
//         if (v.length > maxLen) {
//             maxLen = v.length;
//         }
//     });
//     console.log(new Array(maxLen + paddingLeft + paddingRight).fill('-').join(''));
//     new Array(maxHeight + paddingTop + paddingBottom).fill(0).forEach((v, i) => {
//         const fillLen = maxLen + paddingLeft + paddingRight - 2;
//         if (i < paddingTop || i >= paddingTop + maxHeight) {
//             console.log(`|${new Array(fillLen).fill(' ').join('')}|`);
//             return;
//         }
//         const val = logArr[i - paddingTop];
//         const len = val.length;
//         const plen = Math.floor((fillLen - len) / 2);
//         const rlen = fillLen - len - plen;
//         console.log(val, len, plen, rlen);
//         console.log(`|${new Array(plen).fill(' ').join('')}${val}${new Array(rlen).fill(' ').join('')}|`);
//     });
//     console.log(new Array(maxLen + paddingLeft + paddingRight).fill('-').join(''));
// };
// SpecialLog(`
// Update available: ${chalk.gray('0.0.1')} -> ${chalk.greenBright.bold('0.0.2')},
// run ${chalk.greenBright.bold(`npm install ${'@dking/hasaki-cli'} -g`)} to update
// `);
exports.default = CheckVersion;
