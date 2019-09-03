import { CommanderStatic } from "commander";
import InitCommand from './init';

const UseCommand = (program: CommanderStatic):CommanderStatic => {
    InitCommand(program);
    return program;
}

export default UseCommand;