import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo, GenerateContext } from "../../type";

const BuildTSPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo = {
        "scripts": {
            "build:rollup": "tsc --build",
            "watch:rollup": "tsc --watch"
        },
        "devDependencies": {
            "typescript": "^3.6.4",
            "@types/node": "^12.7.5"
        }
    }

    return packageInfo;
}

const GenTSConfig = (usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> => {
    return new Promise(resolve => {
        ParseRender(
            path.resolve(__dirname, '../../../../../assets/tsconfig.json'),
            path.resolve(context.targetPath, 'tsconfig2.json'),
            usedMemory,
            () => {
                resolve(BuildTSPackageInfo(usedMemory));
            }
        )
    })
}

export default GenTSConfig;