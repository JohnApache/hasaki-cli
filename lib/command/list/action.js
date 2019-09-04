"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("../../config/template"));
const ListAction = () => {
    console.table(template_1.default);
};
exports.default = ListAction;
