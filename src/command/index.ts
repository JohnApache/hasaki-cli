import { CommanderStatic } from "commander";
import InitCommand from './init';
import TemplateCommand from './template';
import InstallCommand from './install';
import GenerateCommand from './generate';

const UseCommand = (program: CommanderStatic):CommanderStatic => {
    InitCommand(program);
    TemplateCommand(program);
    InstallCommand(program);
    GenerateCommand(program);
    return program;
}

export default UseCommand;