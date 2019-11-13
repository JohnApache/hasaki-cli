"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = require("./prompt");
const plugins_1 = require("./plugins");
const event_proxy_1 = __importDefault(require("@dking/event-proxy"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const loading_1 = __importDefault(require("../../loading"));
const EP = event_proxy_1.default.create();
const SortObjectByKey = (obj) => {
    const sortedKeys = Object.keys(obj).sort();
    return sortedKeys.reduce((prev, cur) => {
        prev[cur] = obj[cur];
        return prev;
    }, {});
};
const GenPlugin = (pluginName, usedMemory, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (plugins_1.PluginList.every(plugin => plugin.pluginName !== pluginName)) {
        throw new Error(`cant't resolve ${pluginName} plugin!`);
    }
    const ld = loading_1.default("relative config files are generating...");
    for (let i = 0; i < plugins_1.PluginList.length; i++) {
        const plugin = plugins_1.PluginList[i];
        if (plugin.pluginName !== pluginName)
            continue;
        try {
            const packageInfo = yield plugin.install(usedMemory, context);
            ld.succeed(`resolved ${pluginName}'s config files!`);
            packageInfo && EP.emit("update_package", packageInfo);
        }
        catch (error) {
            ld.fail(`generate ${pluginName} config files failed!`);
            throw new Error(error);
        }
    }
});
const GenPackage = (context) => {
    const packagePath = path_1.default.resolve(context.targetPath, "package.json");
    const newPackagePath = path_1.default.resolve(context.targetPath, `package${context.suffix}.json`);
    let packageJson = {
        "name": "@dking/hasaki-cli-template",
        "version": "0.0.1",
        "description": "@dking/hasaki-cli init application",
        "main": "index.js",
        "keywords": [],
        "author": "",
        "license": "",
    };
    if (fs_1.default.existsSync(packagePath) && fs_1.default.statSync(packagePath).isFile()) {
        packageJson = require(packagePath);
    }
    EP.register("update_package", (newInfo) => {
        packageJson = lodash_1.default.merge(packageJson, newInfo || {});
    });
    EP.once("on_generate_finish", () => {
        packageJson["scripts"] = SortObjectByKey(packageJson["scripts"] || {});
        packageJson["dependencies"] = SortObjectByKey(packageJson["dependencies"] || {});
        packageJson["devDependencies"] = SortObjectByKey(packageJson["devDependencies"] || {});
        fs_1.default.writeFileSync(newPackagePath, JSON.stringify(packageJson, null, 2));
    });
};
const GenUsedMemory = (pluginList) => {
    let UsedMemory = {};
    // 取消读取 已安装配置
    // const memoryPath = path.resolve(process.cwd(), '.hasakimemory.json');
    // if(fs.existsSync(memoryPath) && fs.statSync(memoryPath).isFile()) {
    //     UsedMemory = require(memoryPath);
    // }
    pluginList.forEach(pluginName => {
        if (plugins_1.PluginList.some(v => v.pluginName === pluginName)) {
            UsedMemory[pluginName] = true;
        }
    });
    return UsedMemory;
};
const BuildGenerateContext = (cmd) => {
    const outDir = cmd.outDir || "";
    const rootPath = process.cwd();
    const forceCover = cmd.forceCover || false;
    const suffix = cmd.suffix || '';
    let targetPath;
    if (path_1.default.isAbsolute(outDir)) {
        targetPath = outDir;
    }
    else {
        targetPath = path_1.default.resolve(rootPath, outDir);
    }
    return {
        rootPath,
        targetPath,
        forceCover,
        suffix
    };
};
const GenAction = (pluginName, cmd) => __awaiter(void 0, void 0, void 0, function* () {
    pluginName = pluginName.trim().toLowerCase();
    let pluginList = [];
    if (!pluginName) {
        const answer = yield prompt_1.ChoosePluginPrompt();
        pluginList = answer.plugins;
    }
    else {
        pluginList = pluginName.split(",").filter(v => v.trim().length > 0);
    }
    const installed = cmd.installed || "";
    const installedList = installed.split(",").filter(v => v.trim().length > 0);
    const context = BuildGenerateContext(cmd);
    const usedMemory = GenUsedMemory(pluginList.concat(installedList));
    GenPackage(context);
    for (let i = 0; i < pluginList.length; i++) {
        const plugin = pluginList[i];
        yield GenPlugin(plugin, usedMemory, context);
    }
    EP.emit("on_generate_finish");
});
exports.default = GenAction;
