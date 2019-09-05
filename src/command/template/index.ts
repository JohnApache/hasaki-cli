import { CommanderStatic, Command } from 'commander';
import TemplateOption from './option';
import TemplateAction from './action';
import CheckVersion from '../../version';
const TemplateCommand = (program: CommanderStatic): CommanderStatic => {
    const command = program.command('template').alias('t');
    TemplateOption(command)
        .description('show inner templates config.')
        .action(async (cmd: Command) => {
            await TemplateAction(cmd);
            CheckVersion();
        });
    return program;
}   

export default TemplateCommand;