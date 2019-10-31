import ParseRender from "../../../../piper/parseRender"
import path, { resolve } from "path";
import _ from 'lodash'
import { UsedMemoryType, PackageInfo, GenerateContext } from "../../type";

const BuildESLintPackageInfo = (usedMemory: UsedMemoryType): PackageInfo => {
    let packageInfo: PackageInfo = {
        "scripts": {
            "lint": "eslint src --ext .jsx --ext .js --cache --fix",
            "format": "prettier-eslint 'src/**/*.{js,jsx}' --write"
        },
        "lint-staged": {
            "**/*.{jsx,js}": [
              "prettier-eslint --write",
              "git add"
            ]
        },
        "husky": {
            "hooks": {
                "pre-commit": "lint-staged"
            }
        },
        "devDependencies": {
            "eslint": "^6.6.0",
            "eslint-import-resolver-webpack": "^0.11.1",
            "eslint-plugin-import": "^2.18.2",
            "eslint-plugin-promise": "^4.1.1",
            "husky": "^2.3.0",
            "lint-staged": "^8.1.7",
            "prettier-eslint-cli": "^4.7.1",
        },
    };

    const useTs = packageInfo['typescript'];
    const useReact = packageInfo['react'];
    const useBabel = packageInfo['babel'];

    if(useReact) {
        packageInfo = _.merge(packageInfo, {
            "devDependencies": {
                "eslint-config-airbnb": "^18.0.1",
                "eslint-plugin-jsx-a11y": "^6.2.3",
                "eslint-plugin-react": "^7.16.0",
                "eslint-plugin-react-hooks": "^1.7.0"
            },
        })
    } else {
        packageInfo = _.merge(packageInfo, {
            "devDependencies": {
                "eslint-config-airbnb-base": "^14.0.0",
            },
        })
    }

    if(!useTs && useBabel) {
        packageInfo = _.merge(packageInfo, {
            "devDependencies": {
                "babel-eslint": "^10.0.1",
            },
        })
    }

    if(useTs) {
        packageInfo = _.merge(packageInfo, {
            "scripts": {
                "lint": "eslint src --ext .jsx --ext .js --ext .tsx --ext .ts --cache --fix",
                "format": "prettier-eslint 'src/**/*.{js,jsx,ts,tsx}' --write"
            },
            "devDependencies": {
                "@typescript-eslint/eslint-plugin": "^2.6.0",
                "@typescript-eslint/parser": "^2.6.0",
            },
        })
    }
 
    return packageInfo;
}

const GenESLintConfig = (usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> => {
    return new Promise(resolve => {
        let count = 2;
        const onTaskEnd = () => {
            count --;
            count === 0 && resolve(BuildESLintPackageInfo(usedMemory))
        }

        ParseRender(
            path.resolve(__dirname, '../../../../../assets/.eslintrc.js'),
            path.resolve(context.targetPath, './.eslintrc2.js'),
            usedMemory,
            onTaskEnd
        );
    
        ParseRender(
            path.resolve(__dirname, '../../../../../assets/.eslintignore'),
            path.resolve(context.targetPath, './.eslintignore2'),
            usedMemory,
            onTaskEnd
        );
    })
}

export default GenESLintConfig;