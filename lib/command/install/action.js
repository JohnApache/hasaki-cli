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
const definition_1 = require("../../config/definition");
const action_1 = require("../init/action");
const piper_1 = require("../../piper");
const prompt_1 = require("./prompt");
const log_1 = require("../../common/log");
const SetProjectName = () => __awaiter(void 0, void 0, void 0, function* () {
    const answers = yield prompt_1.ProjectNamePrompt();
    return answers.projectName;
});
const InstallAction = (remoteAddress, command) => __awaiter(void 0, void 0, void 0, function* () {
    const options = command.opts();
    const projectName = yield SetProjectName();
    const targetPath = path_1.default.resolve(process.cwd(), options.outDir || '', projectName);
    const tmpRepoPath = path_1.default.resolve(process.cwd(), options.config || definition_1.TEMPLATE_REPO_TMP_DIRNAME);
    yield action_1.BeforeInitHandle(projectName, options);
    yield action_1.DownloadHandle(remoteAddress, tmpRepoPath);
    yield action_1.RepoPipeHandle(tmpRepoPath, targetPath, options);
    yield piper_1.FileCleanner(tmpRepoPath);
    log_1.SuccessLog(`create ${projectName} success!`);
});
exports.default = InstallAction;
