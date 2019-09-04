import { Command } from "commander";

const InitOption = (command: Command): Command => {
    command
        .option('-d, --out-dir <dirname>', 'specify cli output directory.')
        .option('--ignore <pattern,...,parttern>', 'specify template ignore files.')
        .option('--exclude <pattern,...,parttern>', 'specify template files will not render by ejs.')
        .option('--include <pattern,...,parttern>', 'specify template files will render by ejs.')
        .option('-c, --config <configName>', 'specify template config file.');
    return command;
}

export default InitOption;