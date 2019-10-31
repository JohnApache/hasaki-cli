import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo } from "../../type";

const BuildJestPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {}

    return packageInfo;
}

const GenJestConfig = (usedMemory: UsedMemoryType): PackageInfo => {
    return BuildJestPackageInfo(usedMemory);
}

export default GenJestConfig;