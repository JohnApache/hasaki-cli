"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const package_1 = require("../common/package");
const chalk_1 = __importDefault(require("chalk"));
const os_1 = __importDefault(require("os"));
const CompareVersion = (biggerVersion, smallerVersion) => {
    const [v1_0 = 0, v1_1 = 0, v1_2 = 0] = biggerVersion.split('.');
    const [v2_0 = 0, v2_1 = 0, v2_2 = 0] = smallerVersion.split('.');
    if (v1_0 !== v2_0)
        return v1_0 > v2_0;
    if (v1_1 !== v2_1)
        return v1_1 > v2_1;
    if (v1_2 !== v2_2)
        return v1_2 > v2_2;
    return false;
};
const CheckVersion = () => {
    const packageInfo = package_1.GetPackageInfo();
    child_process_1.exec(`npm info ${packageInfo.name} version`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        const remoteVersion = stdout.trim();
        const currentVersion = packageInfo.version;
        if (CompareVersion(remoteVersion, currentVersion)) {
            console.log(`Update available: ${chalk_1.default.gray(currentVersion)} -> ${chalk_1.default.greenBright.bold(remoteVersion)}, run ${chalk_1.default.greenBright.bold(`npm install ${packageInfo.name} -g`)} to update`);
        }
    });
};
const SpecialLog = (log) => {
    const logArr = log.trim().split(os_1.default.EOL);
    console.log(logArr);
    let maxLen = 0;
    let maxHeight = logArr.length;
    const paddingLeft = 10;
    const paddingRight = 10;
    const paddingTop = 2;
    const paddingBottom = 2;
    logArr.forEach(v => {
        if (v.length > maxLen) {
            maxLen = v.length;
        }
    });
    console.log(new Array(maxLen + paddingLeft + paddingRight).fill('-').join(''));
    new Array(maxHeight + paddingTop + paddingBottom).fill(0).forEach((v, i) => {
        const fillLen = maxLen + paddingLeft + paddingRight - 2;
        if (i < paddingTop || i >= paddingTop + maxHeight) {
            console.log(`|${new Array(fillLen).fill(' ').join('')}|`);
            return;
        }
        const val = logArr[i - paddingTop];
        const len = val.length;
        const plen = Math.floor((fillLen - len) / 2);
        const rlen = fillLen - len - plen;
        console.log(val, len, plen, rlen);
        console.log(`|${new Array(plen).fill(' ').join('')}${val}${new Array(rlen).fill(' ').join('')}|`);
    });
    console.log(new Array(maxLen + paddingLeft + paddingRight).fill('-').join(''));
};
// SpecialLog(`
// Update available: ${chalk.gray('0.0.1')} -> ${chalk.greenBright.bold('0.0.2')}, 
// run ${chalk.greenBright.bold(`npm install ${'@dking/hasaki-cli'} -g`)} to update
// `);
exports.default = CheckVersion;
