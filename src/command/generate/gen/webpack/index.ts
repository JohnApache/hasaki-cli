import ParseRender from "../../../../piper/parseRender";
import CreateScanner from "../../../../piper/scanner";
import Copy from "../../../../piper/copy";
import path from "path";
import _ from "lodash";
import { UsedMemoryType, PackageInfo, GenerateContext } from "../../type";
import { Command } from "commander";

const BuildWebpackPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {};
    const useReact = usedMemory['react'];
    const useVue = usedMemory['vue'];
    const useTs = usedMemory['typescript'];
    if(useReact || useVue) return packageInfo

    packageInfo = _.merge(packageInfo, {
        "scripts": {
            "build:webpack:dev": "webpack",
            "build:webpack:prod": "webpack --env.NODE_ENV=prod",
            "start:webpack:dev": "webpack-dev-server --open",
        },
        "devDependencies": {
            "babel-loader": "^8.0.6",
            "clean-webpack-plugin": "^3.0.0",
            "css-loader": "^3.2.0",
            "exports-loader": "^0.7.0",
            "file-loader": "^4.2.0",
            "html-webpack-plugin": "^3.2.0",
            "imports-loader": "^0.8.0",
            "style-loader": "^1.0.0",
            "webpack": "^4.41.1",
            "webpack-cli": "^3.3.9",
            "webpack-dev-server": "^3.8.2",
            "webpack-manifest-plugin": "^2.2.0",
            "webpack-merge": "^4.2.2",
            "workbox-webpack-plugin": "^4.3.1",
        },
    })

    if(useTs) {
        packageInfo = _.merge(packageInfo, {
            "devDependencies": {
                "ts-loader": "^6.2.0",
                "typescript": "^3.6.4",
            }
        })
    }
    return packageInfo;
}

const GenWebpackConfig = async (usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> => {
    return new Promise(resolve => {
        const useReact = usedMemory['react'];
        const useVue = usedMemory['vue'];

        if(useReact) return resolve(BuildWebpackPackageInfo(usedMemory));
        if(useVue) return resolve(BuildWebpackPackageInfo(usedMemory));

        const rootPath = path.resolve(__dirname, '../../../../../assets/webpack');
        const contextPath: string = path.resolve(context.targetPath, './webpack_config2');
        
        const Scanner = CreateScanner(rootPath, []);
        let count = 0;
        const onTaskEnd = () => {
            count --;
            count === 0 && resolve(BuildWebpackPackageInfo(usedMemory))
        }
        
        Scanner(
            rootPath,
            filepath => {
                const targetPath = filepath.replace(rootPath, contextPath);
                const isTemplate = path.extname(filepath).indexOf('html') !== -1;
                count ++;
                if(isTemplate) return Copy(filepath, targetPath, onTaskEnd);
                ParseRender(
                    filepath, 
                    targetPath,
                    usedMemory,
                    onTaskEnd
                )
            }
        )
    })
}

export default GenWebpackConfig;