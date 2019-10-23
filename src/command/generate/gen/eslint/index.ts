import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo } from "../../type";

const BuildESLintPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {}

    return packageInfo;
}

const GenESLintConfig = (usedMemory: UsedMemoryType): PackageInfo => {
    return BuildESLintPackageInfo(usedMemory);
}

export default GenESLintConfig;