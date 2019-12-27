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
const version_1 = __importDefault(require("../../version"));
const action_1 = __importDefault(require("./action"));
const option_1 = __importDefault(require("./option"));
const InitCommand = (program) => {
    const command = program.command('init <projectName>').alias('i');
    option_1.default(command)
        .description('quickly initialize a project by selecting a template.')
        .action((projectName, cmd) => __awaiter(void 0, void 0, void 0, function* () {
        yield action_1.default(projectName, cmd);
        version_1.default();
    }));
};
exports.default = InitCommand;
