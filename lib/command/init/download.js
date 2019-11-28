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
const chalk_1 = __importDefault(require("chalk"));
const dgit_1 = __importDefault(require("@dking/dgit"));
const progress_1 = __importDefault(require("progress"));
const loading_1 = __importDefault(require("../../loading"));
const prompt_1 = require("./prompt");
const common_1 = require("../../common");
const TextEllipsis = (text, maxLen) => (text.length >= maxLen ? `${text.slice(0, maxLen)}...` : text);
exports.DownloadHandle = (repo, dest, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, token } = options;
    let { password } = options;
    if (username && !password) {
        password = yield prompt_1.PasswordPrompt(username);
    }
    const ld = loading_1.default(`downloading template from remote ${chalk_1.default.blue.underline(repo)} ...`);
    let bar;
    try {
        ld.start();
        yield dgit_1.default({
            githubLink: repo,
            username,
            password,
            token,
        }, dest, {
            log: false,
            parallelLimit: 10,
        }, {
            beforeLoadTree() {
                ld.start();
            },
            afterLoadTree() {
                ld.succeed('load remote repo tree succeed! ');
            },
            onResolved(status) {
                const green = '\u001b[42m \u001b[0m';
                const red = '\u001b[41m \u001b[0m';
                bar = new progress_1.default('  DOWNLOAD |:bar| :current/:total :percent elapsed: :elapseds eta: :eta :file, done.', {
                    total: status.totalCount,
                    width: 50,
                    complete: green,
                    incomplete: red,
                });
            },
            onProgress(_, node) {
                bar.tick({
                    file: TextEllipsis(node.path, 30),
                });
            },
        });
        ld.succeed('dowload template success!');
    }
    catch (error) {
        console.log(error);
        ld.fail('dowload template failed!');
        return common_1.Exit();
    }
});
