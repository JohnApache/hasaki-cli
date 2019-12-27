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
const option_1 = __importDefault(require("./option"));
const action_1 = __importDefault(require("./action"));
const InstallCommand = (program) => {
    const command = program.command('install <remoteAddress>');
    option_1.default(command)
        .description('install template repo from remote address.')
        .action((remoteAddress, cmd) => __awaiter(void 0, void 0, void 0, function* () {
        yield action_1.default(remoteAddress, cmd);
        version_1.default();
    }));
    return program;
};
exports.default = InstallCommand;
