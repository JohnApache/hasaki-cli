import { CommanderStatic } from 'commander';

const UseOption = (program: CommanderStatic): CommanderStatic => program;

// program
// .option(
//     '-d, --out-dir <dirname>',
//     'specify cli output directory',
//     process.cwd()
// )
// .option(
//     '--ignore',
//     '忽略模版指定文件',
// )

export default UseOption;
