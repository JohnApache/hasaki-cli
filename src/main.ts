import program from 'commander';
import UseOption from './option/index';
import UseCommand from './command/index';
import chalk from 'chalk';

const Exit = (): void => {
    process.exit(1);
}

const UnknownCommand = (cmdName: string): void => {
    console.log(`${chalk.red('Unknown command')} ${chalk.yellow(cmdName)}.`);
}

program.version('0.0.1');
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
