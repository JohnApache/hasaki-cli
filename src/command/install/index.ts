import { CommanderStatic, Command } from "commander";
import InstallOption from './option';
import InstallAction from './action';
const InstallCommand = (program: CommanderStatic): CommanderStatic => {
    const command = program.command('install <remoteAddress>');
    InstallOption(command)
        .description('install template repo from remote address.')
        .action(async (remoteAddress, cmd: Command) => {
            InstallAction(remoteAddress, cmd);
        })
    return program;
}

export default InstallCommand;