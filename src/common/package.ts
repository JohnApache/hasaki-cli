import fs from 'fs';
import path from 'path';

interface PackageInfo {
    version: string;
    name: string;
}
export const GetPackageInfo = (): PackageInfo => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../package.json'));
    return JSON.parse(buffer.toString());
};
