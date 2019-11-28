import { CommanderStatic, Command } from 'commander';
import GenOption from './option';
import GenAction from './action';

const GenerateAction = (program: CommanderStatic): CommanderStatic => {
    const command = program.command('generate [pluginName]').alias('gen');
    GenOption(command)
        .description('generate a plugin for current project.')
        .action(async (pluginName: string | undefined, cmd: Command) => {
            await GenAction(pluginName || '', cmd);
        });
    return program;
};

export default GenerateAction;
