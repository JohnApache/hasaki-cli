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
const path_1 = __importDefault(require("path"));
const piper_1 = require("../../piper");
const prompt_1 = require("./prompt");
const definition_1 = require("../../config/definition");
const common_1 = require("../../common");
const log_1 = require("../../common/log");
const template_1 = require("../../common/template");
const beforeInit_1 = require("./beforeInit");
const download_1 = require("./download");
const repoPipe_1 = require("./repoPipe");
const InitAction = (projectName, command) => __awaiter(void 0, void 0, void 0, function* () {
    if (!template_1.CheckTemplate()) {
        log_1.ErrorLog('current template list is empty.');
        return common_1.Exit();
    }
    const options = command.opts();
    const targetPath = path_1.default.resolve(process.cwd(), options.outDir || '', projectName);
    const tmpRepoPath = path_1.default.resolve(process.cwd(), definition_1.TEMPLATE_REPO_TMP_DIRNAME);
    yield beforeInit_1.BeforeInitHandle(projectName, options);
    const template = yield prompt_1.ChooseTemplatePrompt();
    yield download_1.DownloadHandle(template.remoteAddress, tmpRepoPath, options);
    yield repoPipe_1.RepoPipeHandle(tmpRepoPath, targetPath, options);
    piper_1.FileCleanner(tmpRepoPath);
    log_1.SuccessLog(`create ${projectName} success!`);
});
exports.default = InitAction;
