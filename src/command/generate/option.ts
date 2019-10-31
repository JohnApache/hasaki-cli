import { Command } from "commander";

const GenOption = (command: Command): Command => {
    command
        .option('-d, --out-dir <dirname>', 'specify cli output directory.')
        .option('--installed  <plugin,...,plugin>', 'specify which plug-ins are installed.')
        .option('-f, --force-cover', 'generated profile force override.')
    return command;
}

export default GenOption;