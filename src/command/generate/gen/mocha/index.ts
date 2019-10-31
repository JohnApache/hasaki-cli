import ParseRender from "../../../../piper/parseRender"
import path from "path";
import { UsedMemoryType, PackageInfo, GenerateContext } from "../../type";
import _ from 'lodash';

const BuildMochaPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    const useTs = usedMemory['typescript'];
    const useBabel = usedMemory['babel'];

    let packageInfo = {
        "scripts": {
            "test:mocha": "nyc --reporter=text mocha 'test/**/*.{ts,tsx}' -t 5000",
            "test:mocha:reporter": "nyc --reporter=lcov --reporter=text mocha 'test/**/*.{js,jsx}' -t 5000 --reporter=mochawesome"
        },
        "devDependencies": {
            "chai": "^4.2.0",
            "mocha": "^6.2.0",
            "mochawesome": "^4.1.0",
            "nyc": "^14.1.1"
        }
    }

    if(useBabel) {
        packageInfo = _.merge(packageInfo, {
            "scripts": {
                "test:mocha": "nyc --reporter=text mocha --require @babel/register 'test/**/*.{js,jsx}' -t 5000",
                "test:mocha:reporter": "nyc --reporter=lcov --reporter=text mocha --require @babel/register 'test/**/*.{ts,tsx}' -t 5000 --reporter=mochawesome"
            },
            "devDependencies": {
                "@babel/core": "^7.5.5",
                "@babel/preset-env": "^7.5.5",
                "@babel/register": "^7.5.5",
            }
        })
    }

    if(useTs) {
        packageInfo = _.merge(packageInfo, {
            "scripts": {
                "test:mocha": "nyc --reporter=text mocha --require ts-node/register 'test/**/*.{ts,tsx}' -t 5000",
                "test:mocha:reporter": "nyc --reporter=lcov --reporter=text mocha --require ts-node/register 'test/**/*.{ts,tsx}' -t 5000 --reporter=mochawesome"
            },
            "devDependencies": {
                "ts-node": "^8.3.0",
                "typescript": "^3.6.2",
                "@types/chai": "^4.2.0",
                "@types/mocha": "^5.2.7",
                "@types/node": "^12.7.5",
            }
        })
    }

    return packageInfo;
}

const GenMochaConfig = (usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> => {
    return new Promise(resolve => {
        const useTs = usedMemory['typescript'];
        ParseRender(
            path.resolve(__dirname, '../../../../../assets/mocha-demo.js'),
            path.resolve(context.targetPath, `mocha-demo.${useTs ? 'ts' : 'js'}`),
            usedMemory,
            () => {
                resolve(BuildMochaPackageInfo(usedMemory));
            }
        )
    })
}

export default GenMochaConfig;