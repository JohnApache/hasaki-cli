"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const definition_1 = require("./definition");
exports.DefaultIgnore = [
    /node_modules/,
    new RegExp(`${definition_1.TEMPLATE_CONFIG_FILENAME}$`)
];
exports.DefaultExclude = [];
exports.DefaultInclude = [
    /^.+\.js$/,
    /^.+\.json$/,
];
