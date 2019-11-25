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
const fs_1 = __importDefault(require("fs"));
const loading_1 = __importDefault(require("../../loading"));
const piper_1 = require("../../piper");
const common_1 = require("../../common");
const prompt_1 = require("./prompt");
const definition_1 = require("../../config/definition");
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
