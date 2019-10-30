import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType } from "../../type";

const GenReadmeConfig = (usedMemory: UsedMemoryType): void => {
    ParseRender(
        path.resolve(__dirname, '../../../../../assets/README.en_US.md'),
        path.resolve(process.cwd(), './README2.en_US.md'),
        usedMemory
    )

     ParseRender(
        path.resolve(__dirname, '../../../../../assets/README.zh_CN.md'),
        path.resolve(process.cwd(), './README2.md'),
        usedMemory
    )
}

export default GenReadmeConfig;