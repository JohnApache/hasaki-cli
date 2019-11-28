import { UsedMemoryType, PackageInfo } from '../../type';

const BuildLernaPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    const packageInfo: PackageInfo = {};
    console.log(usedMemory);
    return packageInfo;
};

const GenLernaConfig = (usedMemory: UsedMemoryType): PackageInfo =>
    BuildLernaPackageInfo(usedMemory);

export default GenLernaConfig;
