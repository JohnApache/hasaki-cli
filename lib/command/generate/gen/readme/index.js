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
const copy_1 = __importDefault(require("../../../../piper/copy"));
const prompt_1 = require("../../prompt");
const common_1 = require("../../../../common");
const GenReadmeConfig = (usedMemory, context) => __awaiter(void 0, void 0, void 0, function* () {
    let successResolve;
    const prom = new Promise(resolve => {
        successResolve = resolve;
    });
    let count = 2;
    const onTaskEnd = () => {
        count--;
        count === 0 && successResolve();
    };
    const targetPath1 = path_1.default.resolve(context.targetPath, `./README${context.suffix}.en_US.md`);
    if (!context.forceCover && fs_1.default.existsSync(targetPath1)) {
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath1));
        !answer.confirm && common_1.Exit();
    }
    copy_1.default(path_1.default.resolve(__dirname, '../../../../../assets/README.en_US.md'), targetPath1, onTaskEnd);
    const targetPath2 = path_1.default.resolve(context.targetPath, `./README${context.suffix}.md`);
    if (!context.forceCover && fs_1.default.existsSync(targetPath2)) {
        const answer = yield prompt_1.ConfirmCoverPrompt(path_1.default.basename(targetPath2));
        !answer.confirm && common_1.Exit();
    }
    copy_1.default(path_1.default.resolve(__dirname, '../../../../../assets/README.zh_CN.md'), targetPath2, onTaskEnd);
    return prom;
});
exports.default = GenReadmeConfig;
