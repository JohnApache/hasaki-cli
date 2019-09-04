import { CommanderStatic } from "commander";

const UseOption = (program: CommanderStatic): CommanderStatic => {
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

    return program;    
}

export default UseOption;