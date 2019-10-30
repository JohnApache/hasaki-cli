import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo } from "../../type";

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

const GenBabelConfig = (usedMemory: UsedMemoryType): PackageInfo => {
    ParseRender(
        path.resolve(__dirname, '../../../../../assets/babel.config.js.bak'),
        path.resolve(process.cwd(), `babel.config2.js`),
        usedMemory
    )
    return BuildBabelPackageInfo(usedMemory);
}

export default GenBabelConfig;