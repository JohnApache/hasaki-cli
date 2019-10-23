import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo } from "../../type";

const BuildBabelPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {}

    return packageInfo;
}

const GenBabelConfig = (usedMemory: UsedMemoryType): PackageInfo => {
    return BuildBabelPackageInfo(usedMemory);
}

export default GenBabelConfig;