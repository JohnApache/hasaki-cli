import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo } from "../../type";

const BuildWebpackPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {};

    return packageInfo;
}

const GenWebpackConfig = (usedMemory: UsedMemoryType): PackageInfo => {
    return BuildWebpackPackageInfo(usedMemory);
}

export default GenWebpackConfig;