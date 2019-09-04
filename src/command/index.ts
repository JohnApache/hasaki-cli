import { CommanderStatic } from "commander";
import InitCommand from './init';
import TemplateCommand from './template';

const UseCommand = (program: CommanderStatic):CommanderStatic => {
    InitCommand(program);
    TemplateCommand(program);
    return program;
}

export default UseCommand;