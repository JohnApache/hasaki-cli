import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo } from "../../type";

const BuildLernaPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {}

    return packageInfo;
}

const GenLernaConfig = (usedMemory: UsedMemoryType): PackageInfo => {
    return BuildLernaPackageInfo(usedMemory);
}

export default GenLernaConfig;