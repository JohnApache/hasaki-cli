import { CommanderStatic } from "commander";

const GenerateAction = (program: CommanderStatic): CommanderStatic => {
    const command = program.command('generate <pluginName>').alias('gen');
    command
        .description('generate a plugin for current project.')
        .action(async () => {
            
        })
    return program;
}

export default GenerateAction;