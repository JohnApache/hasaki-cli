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
const clone_1 = __importDefault(require("../../git/clone"));
const piper_1 = require("../../piper");
const getRemoteTemplate = (source, dest) => __awaiter(void 0, void 0, void 0, function* () {
    const [repo, branch = 'master'] = source.split('#');
    yield clone_1.default({
        repo,
        dest,
        branch,
        shallow: true,
        depth: 1,
    });
    yield piper_1.FileCleanner(`${dest}/.git`);
});
exports.default = getRemoteTemplate;
