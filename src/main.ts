import program from 'commander';
import UseOption from './option/index';
import UseCommand from './command/index';
import chalk from 'chalk';
import { GetPackageInfo } from './common/package';

const Exit = (): void => {
    process.exit(1);
}

const UnknownCommand = (cmdName: string): void => {
    console.log(`${chalk.red('Unknown command')} ${chalk.yellow(cmdName)}.`);
}

const packageInfo = GetPackageInfo();

program.version(packageInfo.version);

UseOption(program);
UseCommand(program);

program.on('command:*', (cmdObj = []) => {
    const [cmd, envs] = cmdObj;
    if(cmd) {
        program.outputHelp();
        UnknownCommand(cmd);
        Exit();
    }
});

if(process.argv.slice(2).length <= 0) {
    program.help();
}

program.parse(process.argv);
