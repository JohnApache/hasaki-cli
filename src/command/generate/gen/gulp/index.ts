import { UsedMemoryType, PackageInfo } from '../../type';

const BuildGulpPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    const packageInfo: PackageInfo = {};
    console.log(usedMemory);
    return packageInfo;
};

const GenGulpConfig = (usedMemory: UsedMemoryType): PackageInfo =>
    BuildGulpPackageInfo(usedMemory);

export default GenGulpConfig;
