import Copy from "../../../../piper/copy"
import path from "path";
import { UsedMemoryType, GenerateContext } from "../../type";

const GenReadmeConfig = (usedMemory: UsedMemoryType, context: GenerateContext): Promise<void> => {
    return new Promise(resolve => {
        let count = 2;
        const onTaskEnd = () => {
            count --;
            count === 0 && resolve();
        }
        Copy(
            path.resolve(__dirname, '../../../../../assets/README.en_US.md'),
            path.resolve(context.targetPath, './README2.en_US.md'),
            onTaskEnd
        )
        Copy(
            path.resolve(__dirname, '../../../../../assets/README.zh_CN.md'),
            path.resolve(context.targetPath, './README2.md'),
            onTaskEnd
        )
    })
   
}

export default GenReadmeConfig;