import { CommanderStatic, Command } from 'commander';
import CheckVersion from '../../version';
import InstallOption from './option';
import InstallAction from './action';

const InstallCommand = (program: CommanderStatic): CommanderStatic => {
    const command = program.command('install <remoteAddress>');
    InstallOption(command)
        .description('install template repo from remote address.')
        .action(async (remoteAddress, cmd: Command) => {
            await InstallAction(remoteAddress, cmd);
            CheckVersion();
        });
    return program;
};

export default InstallCommand;
