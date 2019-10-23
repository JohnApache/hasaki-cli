"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = __importDefault(require("./gen/rollup"));
const typescript_1 = __importDefault(require("./gen/typescript"));
const mocha_1 = __importDefault(require("./gen/mocha"));
exports.PluginList = [
    {
        pluginName: 'readme',
        install() { }
    },
    {
        pluginName: 'eslint',
        install() { }
    },
    {
        pluginName: 'mocha',
        install(usedMemory) {
            return mocha_1.default(usedMemory);
        },
    },
    {
        pluginName: 'babel',
        install() { }
    },
    {
        pluginName: 'webpack',
        install() { }
    },
    {
        pluginName: 'rollup',
        install(usedMemory) {
            return rollup_1.default(usedMemory);
        },
    },
    {
        pluginName: 'typescript',
        install(usedMemory) {
            return typescript_1.default(usedMemory);
        },
    }
];
