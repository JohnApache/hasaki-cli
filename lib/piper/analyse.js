"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const definition_1 = require("../config/definition");
const Analyse = (sourceDir) => {
    const configFilePath = `${sourceDir}/${definition_1.TEMPLATE_CONFIG_FILENAME}`;
    if (fs_1.default.existsSync(configFilePath)) {
        const result = require(configFilePath);
        return {
            question: result.question || [],
            parseInclude: result.parseInclude || [],
            parseExclude: result.parseExclude || [],
            ignore: result.ignore || [],
        };
    }
    return {
        question: [],
        parseInclude: [],
        parseExclude: [],
        ignore: [],
    };
};
exports.default = Analyse;
