"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = __importDefault(require("./gen/rollup"));
const typescript_1 = __importDefault(require("./gen/typescript"));
const mocha_1 = __importDefault(require("./gen/mocha"));
const readme_1 = __importDefault(require("./gen/readme"));
const eslint_1 = __importDefault(require("./gen/eslint"));
const babel_1 = __importDefault(require("./gen/babel"));
const webpack_1 = __importDefault(require("./gen/webpack"));
const lerna_1 = __importDefault(require("./gen/lerna"));
const gulp_1 = __importDefault(require("./gen/gulp"));
const jest_1 = __importDefault(require("./gen/jest"));
exports.PluginList = [
    {
        pluginName: 'readme',
        install(usedMemory) {
            return readme_1.default(usedMemory);
        },
    },
    {
        pluginName: 'eslint',
        install(usedMemory) {
            return eslint_1.default(usedMemory);
        },
    },
    {
        pluginName: 'mocha',
        install(usedMemory) {
            return mocha_1.default(usedMemory);
        },
    },
    {
        pluginName: 'jest',
        install(usedMemory) {
            return jest_1.default(usedMemory);
        },
    },
    {
        pluginName: 'babel',
        install(usedMemory) {
            return babel_1.default(usedMemory);
        },
    },
    {
        pluginName: 'webpack',
        install(usedMemory) {
            return webpack_1.default(usedMemory);
        },
    },
    {
        pluginName: 'rollup',
        install(usedMemory) {
            return rollup_1.default(usedMemory);
        },
    },
    {
        pluginName: 'gulp',
        install(usedMemory) {
            return gulp_1.default(usedMemory);
        },
    },
    {
        pluginName: 'lerna',
        install(usedMemory) {
            return lerna_1.default(usedMemory);
        },
    },
    {
        pluginName: 'typescript',
        install(usedMemory) {
            return typescript_1.default(usedMemory);
        },
    }
];
