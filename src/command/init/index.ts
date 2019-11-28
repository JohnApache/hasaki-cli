import { CommanderStatic, Command } from 'commander';
import InitAction from './action';
import InitOption from './option';
import CheckVersion from '../../version';

const InitCommand = (program: CommanderStatic): void => {
    const command = program.command('init <projectName>').alias('i');
    InitOption(command)
        .description('quickly initialize a project by selecting a template.')
        .action(async (projectName: string, cmd: Command) => {
            await InitAction(projectName, cmd);
            CheckVersion();
        });
};

export default InitCommand;
