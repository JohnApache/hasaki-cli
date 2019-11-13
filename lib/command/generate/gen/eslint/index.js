"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseRender_1 = __importDefault(require("../../../../piper/parseRender"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const prompt_1 = require("../../prompt");
const common_1 = require("../../../../common");
const BuildESLintPackageInfo = (usedMemory) => {
    let packageInfo = {
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
    if (useReact) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            "devDependencies": {
                "eslint-config-airbnb": "^18.0.1",
                "eslint-plugin-jsx-a11y": "^6.2.3",
                "eslint-plugin-react": "^7.16.0",
                "eslint-plugin-react-hooks": "^1.7.0"
            },
        });
    }
    else {
        packageInfo = lodash_1.default.merge(packageInfo, {
            "devDependencies": {
                "eslint-config-airbnb-base": "^14.0.0",
            },
        });
    }
    if (!useTs && useBabel) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            "devDependencies": {
                "babel-eslint": "^10.0.1",
            },
        });
    }
    if (useTs) {
        packageInfo = lodash_1.default.merge(packageInfo, {
            "scripts": {
                "lint": "eslint src --ext .jsx --ext .js --ext .tsx --ext .ts --cache --fix",
                "format": "prettier-eslint 'src/**/*.{js,jsx,ts,tsx}' --write"
            },
            "devDependencies": {
                "@typescript-eslint/eslint-plugin": "^2.6.0",
                "@typescript-eslint/parser": "^2.6.0",
            },
        });
    }
    return packageInfo;
};
const GenESLintConfig = (usedMemory, context) => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        let count = 2;
        const onTaskEnd = () => {
            count--;
            count === 0 && resolve(BuildESLintPackageInfo(usedMemory));
        };
        const targetPath1 = path_1.default.resolve(context.targetPath, `./.eslintrc${context.suffix}.js`);
        if (!context.forceCover && fs_1.default.existsSync(targetPath1)) {
            const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath1));
            !answer.confirm && common_1.Exit();
        }
        parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/.eslintrc.js'), targetPath1, usedMemory, onTaskEnd);
        const targetPath2 = path_1.default.resolve(context.targetPath, `./.eslintignore${context.suffix}`);
        if (!context.forceCover && fs_1.default.existsSync(targetPath2)) {
            const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath2));
            !answer.confirm && common_1.Exit();
        }
        parseRender_1.default(path_1.default.resolve(__dirname, '../../../../../assets/.eslintignore'), targetPath2, usedMemory, onTaskEnd);
    }));
};
exports.default = GenESLintConfig;
