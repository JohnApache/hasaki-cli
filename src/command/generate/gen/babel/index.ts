import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo, GenerateContext } from "../../type";

const BuildBabelPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {
        "scripts": {
            "build:babel": "babel src --out-dir lib"
        },
        "devDependencies": {
            "@babel/cli": "^7.5.5",
            "@babel/core": "^7.5.5",
            "@babel/plugin-transform-runtime": "^7.5.5",
            "@babel/preset-env": "^7.5.5",
        },
        "dependencies": {
            "@babel/runtime-corejs3": "^7.5.5",
        }
    }
    return packageInfo;
}

const GenBabelConfig = (usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> => {
    return new Promise(resolve => {
        ParseRender(
            path.resolve(__dirname, '../../../../../assets/babel.config.js'),
            path.resolve(context.targetPath, `babel.config2.js`),
            usedMemory,
            () => {
                resolve(BuildBabelPackageInfo(usedMemory))
            }
        )
    })
}

export default GenBabelConfig;