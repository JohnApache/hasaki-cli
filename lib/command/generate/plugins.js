"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = __importDefault(require("./gen/rollup"));
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
        install() { }
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
        install() { }
    }
];
