"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../config/template");
exports.CheckTemplate = () => {
    const templates = template_1.GetTemplates();
    return templates && templates.length > 0;
};
