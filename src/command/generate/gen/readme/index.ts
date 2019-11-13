import Copy from "../../../../piper/copy"
import path from "path";
import fs from "fs";
import { UsedMemoryType, GenerateContext } from "../../type";
import { ConfirmCoverPrompt } from "../../prompt";
import { Exit } from "../../../../common";

const GenReadmeConfig = async (usedMemory: UsedMemoryType, context: GenerateContext): Promise<void> => {

    return new Promise(async (resolve) => {
        let count = 2;
        const onTaskEnd = () => {
            count --;
            count === 0 && resolve();
        }

        
        const targetPath1 = path.resolve(context.targetPath, `./README${context.suffix}.en_US.md`);
        if(!context.forceCover && fs.existsSync(targetPath1)) {
            const answer = await ConfirmCoverPrompt(path.basename(targetPath1));
            !answer.confirm && Exit(); 
        }

        Copy(
            path.resolve(__dirname, '../../../../../assets/README.en_US.md'),
            targetPath1,
            onTaskEnd
        )

        const targetPath2 = path.resolve(context.targetPath, `./README${context.suffix}.md`);
        if(!context.forceCover && fs.existsSync(targetPath2)) {
            const answer = await ConfirmCoverPrompt(path.basename(targetPath2));
            !answer.confirm && Exit(); 
        }

        Copy(
            path.resolve(__dirname, '../../../../../assets/README.zh_CN.md'),
            targetPath2,
            onTaskEnd
        )
    })
   
}

export default GenReadmeConfig;