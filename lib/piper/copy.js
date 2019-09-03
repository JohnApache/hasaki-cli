"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Copy = (source, dest, callback) => {
    if (!fs_1.default.existsSync(path_1.default.dirname(dest))) {
        fs_1.default.mkdirSync(path_1.default.dirname(dest), { recursive: true });
    }
    const rs = fs_1.default.createReadStream(source);
    const ws = fs_1.default.createWriteStream(dest);
    ws.on('finish', () => {
        callback && callback();
    });
    rs.pipe(ws);
};
exports.default = Copy;
