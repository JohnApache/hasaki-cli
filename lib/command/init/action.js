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
const path_1 = __importDefault(require("path"));
const analyse_1 = __importDefault(require("../../piper/analyse"));
const download_1 = __importDefault(require("./download"));
const loading_1 = __importDefault(require("../../loading"));
const piper_1 = require("../../piper");
const prompt_1 = require("./prompt");
const definition_1 = require("../../config/definition");
const common_1 = require("../../common");
const log_1 = require("../../common/log");
const template_1 = require("../../common/template");
exports.BeforeInitHandle = (projectName, options) => __awaiter(void 0, void 0, void 0, function* () {
    const targetPath = path_1.default.resolve(process.cwd(), options.outDir || "", projectName);
    const tmpRepoPath = path_1.default.resolve(process.cwd(), options.config || definition_1.TEMPLATE_REPO_TMP_DIRNAME);
    if (fs_1.default.existsSync(tmpRepoPath)) {
        const ld = loading_1.default("clean tmp template gitrepo ...");
        try {
            ld.start();
            yield piper_1.FileCleanner(tmpRepoPath);
            ld.succeed("clean tmp template gitrepo success!");
        }
        catch (error) {
            console.log(error);
            ld.fail("clean tmp template gitrepo failed!");
            return common_1.Exit();
        }
    }
    if (fs_1.default.existsSync(targetPath)) {
        const confirm = yield prompt_1.ConfirmDeletePrompt(projectName);
        if (!confirm)
            return common_1.Exit();
        const ld = loading_1.default("cleaning files...");
        try {
            ld.start();
            yield piper_1.FileCleanner(targetPath);
            ld.succeed("clean files success!");
        }
        catch (error) {
            console.log(error);
            ld.fail("clean files failed!");
            return common_1.Exit();
        }
    }
});
exports.DownloadHandle = (repo, dest) => __awaiter(void 0, void 0, void 0, function* () {
    const ld = loading_1.default(`downloading template from remote ${chalk_1.default.blue.underline(repo)} ...`);
    try {
        ld.start();
        yield download_1.default(repo, dest);
        ld.succeed("dowload template success!");
    }
    catch (error) {
        console.log(error);
        ld.fail("dowload template failed!");
        return common_1.Exit();
    }
});
exports.RepoPromptHandle = (questions) => __awaiter(void 0, void 0, void 0, function* () {
    let parseData = {};
    if (questions.length > 0) {
        parseData = yield prompt_1.CreatePrompt(questions);
    }
    return parseData;
});
exports.RepoPipeHandle = (source, dest, option) => __awaiter(void 0, void 0, void 0, function* () {
    const configName = option.config || "";
    if (path_1.default.isAbsolute(configName)) {
        log_1.ErrorLog("config name cant set an absoulte path!");
        return common_1.Exit();
    }
    const configFilePath = path_1.default.resolve(source, configName || definition_1.TEMPLATE_CONFIG_FILENAME);
    const analyseResult = analyse_1.default(configFilePath);
    const { parseExclude = [], parseInclude = [], ignore = [], question = [], screener = () => {
        return {
            exclude: [],
            include: []
        };
    } } = analyseResult;
    ignore.push({ path: configName || definition_1.TEMPLATE_CONFIG_FILENAME });
    const parseData = yield exports.RepoPromptHandle(question);
    const screenRule = screener(parseData);
    const ld = loading_1.default(`tmp repo pipe to ${chalk_1.default.blue.underline(dest)}...`);
    try {
        ld.start();
        if (option.exclude) {
            option.exclude.split(",").forEach(e => {
                parseExclude.push(new RegExp(e));
            });
        }
        if (option.include) {
            option.include.split(",").forEach(e => {
                parseInclude.push(new RegExp(e));
            });
        }
        if (option.ignore) {
            option.ignore.split(",").forEach(e => {
                ignore.push(new RegExp(e));
            });
        }
        yield piper_1.FilePiper(source, dest, {
            parseData,
            parseExclude,
            parseInclude,
            ignore,
            screenRule
        });
        ld.succeed("pipe handle success!");
    }
    catch (error) {
        console.log(error);
        ld.fail("pipe handle failed!");
        return common_1.Exit();
    }
});
const InitAction = (projectName, command) => __awaiter(void 0, void 0, void 0, function* () {
    if (!template_1.CheckTemplate()) {
        log_1.ErrorLog("current template list is empty.");
        return common_1.Exit();
    }
    const options = command.opts();
    const targetPath = path_1.default.resolve(process.cwd(), options.outDir || "", projectName);
    const tmpRepoPath = path_1.default.resolve(process.cwd(), definition_1.TEMPLATE_REPO_TMP_DIRNAME);
    yield exports.BeforeInitHandle(projectName, options);
    const template = yield prompt_1.ChooseTemplatePrompt();
    yield exports.DownloadHandle(template.remoteAddress, tmpRepoPath);
    yield exports.RepoPipeHandle(tmpRepoPath, targetPath, options);
    yield piper_1.FileCleanner(tmpRepoPath);
    log_1.SuccessLog(`create ${projectName} success!`);
});
exports.default = InitAction;
