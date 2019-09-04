import { CommanderStatic, Command } from "commander";
import InitAction from './action';
import InitOption from './option';
const InitCommand = (program: CommanderStatic) :void => {
    const command = program.command('init <projectName>').alias('i');
    InitOption(command) 
        .description('quickly initialize a project by selecting a template.')
        .action((projectName: string, cmd: Command) => {
            InitAction(projectName, cmd);
        })
}

export default InitCommand