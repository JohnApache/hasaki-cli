import { CommanderStatic } from "commander";
import InitAction from './action';

const InitCommand = (program: CommanderStatic) :void => {
    program
        .command('init <projectName>')
        .alias('i')
        .description('quickly initialize a project by selecting a template.')
        .action((projectName: string) => {
            InitAction(projectName);
        })
}

export default InitCommand