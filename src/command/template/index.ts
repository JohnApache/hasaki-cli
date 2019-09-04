import { CommanderStatic } from 'commander';
import TemplateOption from './option';
import TemplateAction from './action';

const TemplateCommand = (program: CommanderStatic): CommanderStatic => {
    const command = program.command('template').alias('t');
    TemplateOption(command)
        .description('show inner templates config.')
        .action((cmd) => {
            TemplateAction(cmd);
        });
    return program;
}   

export default TemplateCommand;