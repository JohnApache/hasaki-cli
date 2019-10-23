import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo } from "../../type";

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

const GenTSConfig = (usedMemory: UsedMemoryType): PackageInfo => {
    ParseRender(
        path.resolve(__dirname, '../../../../../assets/tsconfig.json.bak'),
        path.resolve(process.cwd(), 'tsconfig2.json'),
        usedMemory
    )
    return BuildTSPackageInfo(usedMemory);
}

export default GenTSConfig;