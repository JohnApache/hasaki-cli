import { UsedMemoryType, PackageInfo, GenerateContext } from "../../type";
import ParseRender from "../../../../piper/parseRender";
import path from 'path';
import _ from 'lodash';

const BuildRollupPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo = {
        "scripts": {
            "build:rollup": "rollup -c",
            "watch:rollup": "rollup --watch"
        },
        "devDependencies": {
            "rollup": "^1.21.4",
            "rollup-plugin-commonjs": "^10.1.0",
            "rollup-plugin-node-resolve": "^5.2.0",
            "rollup-plugin-terser": "^5.1.2",
        }
    };

    const useBabel = usedMemory['babel'];
    const useTs = usedMemory['typescript'];
    
    if(useBabel) {
        packageInfo = _.merge(packageInfo, {
            "devDependencies": {
                "@babel/cli": "^7.5.5",
                "@babel/core": "^7.5.5",
                "@babel/plugin-transform-runtime": "^7.5.5",
                "@babel/preset-env": "^7.5.5",
                "rollup-plugin-babel": "^4.3.3",
            }
        })
    }

    if(useTs) {
        packageInfo = _.merge(packageInfo, {
            "devDependencies": {
                "typescript": "^3.6.4",
                "rollup-plugin-typescript2": "^0.24.3",
            }
        })
    }


    return packageInfo;

}

const GenRollupConfig = (usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> => {
    return new Promise(resolve => {
        ParseRender(
            path.resolve(__dirname, '../../../../../assets/rollup.config.js'),
            path.resolve(context.targetPath, './rollup.config2.js'),
            usedMemory,
            () => {
                resolve(BuildRollupPackageInfo(usedMemory));
            }
        )
    })
}

export default GenRollupConfig;