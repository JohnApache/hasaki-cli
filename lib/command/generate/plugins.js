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
        install(usedMemory, context) {
            return readme_1.default(usedMemory, context);
        },
    },
    {
        pluginName: 'eslint',
        install(usedMemory, context) {
            return eslint_1.default(usedMemory, context);
        },
    },
    {
        pluginName: 'mocha',
        install(usedMemory, context) {
            return mocha_1.default(usedMemory, context);
        },
    },
    {
        pluginName: 'jest',
        install(usedMemory, context) {
            return jest_1.default(usedMemory);
        },
    },
    {
        pluginName: 'babel',
        install(usedMemory, context) {
            return babel_1.default(usedMemory, context);
        },
    },
    {
        pluginName: 'webpack',
        install(usedMemory, context) {
            return webpack_1.default(usedMemory, context);
        },
    },
    {
        pluginName: 'rollup',
        install(usedMemory, context) {
            return rollup_1.default(usedMemory, context);
        },
    },
    {
        pluginName: 'gulp',
        install(usedMemory, context) {
            return gulp_1.default(usedMemory);
        },
    },
    {
        pluginName: 'lerna',
        install(usedMemory, context) {
            return lerna_1.default(usedMemory);
        },
    },
    {
        pluginName: 'typescript',
        install(usedMemory, context) {
            return typescript_1.default(usedMemory, context);
        },
    }
];
