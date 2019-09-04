"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../config/template");
const log_1 = require("./log");
const index_1 = require("./index");
exports.CheckTemplate = () => {
    const templates = template_1.GetTemplates();
    return templates && templates.length > 0;
};
exports.CheckEnv = () => {
    if (!exports.CheckTemplate()) {
        log_1.ErrorLog('current template list is empty.');
        return index_1.Exit();
    }
};
