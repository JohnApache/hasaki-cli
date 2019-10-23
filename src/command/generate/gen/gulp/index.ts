import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo } from "../../type";

const BuildGulpPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {}

    return packageInfo;
}

const GenGulpConfig = (usedMemory: UsedMemoryType): PackageInfo => {
    return BuildGulpPackageInfo(usedMemory);
}

export default GenGulpConfig;