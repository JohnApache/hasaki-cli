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
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const analyse_1 = __importDefault(require("../../piper/analyse"));
const download_1 = __importDefault(require("./download"));
const loading_1 = __importDefault(require("../../loading"));
const piper_1 = require("../../piper");
const prompt_1 = require("./prompt");
const definition_1 = require("../../config/definition");
const Exit = () => {
    process.exit(1);
};
const BeforeInitHandle = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    const targetPath = `${process.cwd()}/${projectName}`;
    const tmpRepoPath = `${process.cwd()}/${definition_1.TEMPLATE_REPO_TMP_DIRNAME}`;
    if (fs_1.default.existsSync(tmpRepoPath)) {
        const ld = loading_1.default('clean tmp template gitrepo ...');
        try {
            ld.start();
            yield piper_1.FileCleanner(tmpRepoPath);
            ld.succeed('clean tmp template gitrepo success!');
        }
        catch (error) {
            console.log(error);
            ld.fail('clean tmp template gitrepo failed!');
            return Exit();
        }
    }
    if (fs_1.default.existsSync(targetPath)) {
        const confirm = yield prompt_1.ConfirmDeletePrompt(projectName);
        if (!confirm)
            return Exit();
        const ld = loading_1.default('cleaning files...');
        try {
            ld.start();
            yield piper_1.FileCleanner(targetPath);
            ld.succeed('clean files success!');
        }
        catch (error) {
            console.log(error);
            ld.fail('clean files failed!');
            return Exit();
        }
    }
});
const DownloadHandle = (repo, dest) => __awaiter(void 0, void 0, void 0, function* () {
    const ld = loading_1.default(`downloading template from remote ${chalk_1.default.blue.underline(repo)} ...`);
    try {
        ld.start();
        yield download_1.default(repo, dest);
        ld.succeed('dowload template success!');
    }
    catch (error) {
        console.log(error);
        ld.fail('dowload template failed!');
        return Exit();
    }
});
const RepoPromptHandle = (questions) => __awaiter(void 0, void 0, void 0, function* () {
    let parseData = {};
    if (questions.length > 0) {
        parseData = yield prompt_1.CreatePrompt(questions);
    }
    return parseData;
});
const RepoPipeHandle = (source, dest) => __awaiter(void 0, void 0, void 0, function* () {
    const analyseResult = analyse_1.default(source);
    const parseData = yield RepoPromptHandle(analyseResult.question);
    const ld = loading_1.default(`tmp repo pipe to ${chalk_1.default.blue.underline(dest)}...`);
    try {
        ld.start();
        yield piper_1.FilePiper(source, dest, {
            parseData,
            parseExclude: analyseResult.parseExclude,
            parseInclude: analyseResult.parseInclude,
            ignore: analyseResult.ignore
        });
        ld.succeed('pipe handle success!');
    }
    catch (error) {
        console.log(error);
        ld.fail('pipe handle failed!');
        return Exit();
    }
});
const InitAction = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    const targetPath = `${process.cwd()}/${projectName}`;
    const tmpRepoPath = `${process.cwd()}/${definition_1.TEMPLATE_REPO_TMP_DIRNAME}`;
    yield BeforeInitHandle(projectName);
    const template = yield prompt_1.ChooseTemplatePrompt();
    yield DownloadHandle(template.remoteAddress, tmpRepoPath);
    yield RepoPipeHandle(tmpRepoPath, targetPath);
    yield piper_1.FileCleanner(tmpRepoPath);
    console.log(`${projectName} in success!`);
});
exports.default = InitAction;
