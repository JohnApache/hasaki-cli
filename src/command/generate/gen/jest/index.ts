import { UsedMemoryType, PackageInfo } from '../../type';

const BuildJestPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    const packageInfo: PackageInfo = {};
    console.log(usedMemory);
    return packageInfo;
};

const GenJestConfig = (usedMemory: UsedMemoryType): PackageInfo =>
    BuildJestPackageInfo(usedMemory);

export default GenJestConfig;
