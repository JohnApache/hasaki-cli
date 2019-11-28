"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const chalk_1 = __importDefault(require("chalk"));
const index_1 = __importDefault(require("./option/index"));
const index_2 = __importDefault(require("./command/index"));
const package_1 = require("./common/package");
const Exit = () => {
    process.exit(1);
};
const UnknownCommand = (cmdName) => {
    console.log(`${chalk_1.default.red('Unknown command')} ${chalk_1.default.yellow(cmdName)}.`);
};
const packageInfo = package_1.GetPackageInfo();
commander_1.default.version(packageInfo.version);
index_1.default(commander_1.default);
index_2.default(commander_1.default);
commander_1.default.on('command:*', (cmdObj = []) => {
    const [cmd] = cmdObj;
    if (cmd) {
        commander_1.default.outputHelp();
        UnknownCommand(cmd);
        Exit();
    }
});
if (process.argv.slice(2).length <= 0) {
    commander_1.default.help();
}
commander_1.default.parse(process.argv);
