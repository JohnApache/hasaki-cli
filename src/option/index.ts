import { CommanderStatic } from "commander";

const UseOption = (program: CommanderStatic) => {
    program
        .option(
            '-d, --out-dir <dirname>', 
            'specify cli output directory', 
            process.cwd()
        )
}

export default UseOption;