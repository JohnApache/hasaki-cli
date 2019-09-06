import { CommanderStatic, Command } from "commander";
import InstallOption from './option';
import InstallAction from './action';
import CheckVersion from '../../version';
const InstallCommand = (program: CommanderStatic): CommanderStatic => {
    const command = program.command('install <remoteAddress>');
    InstallOption(command)
        .description('install template repo from remote address.')
        .action(async (remoteAddress, cmd: Command) => {
            await InstallAction(remoteAddress, cmd);
            CheckVersion();
        })
    return program;
}

export default InstallCommand;