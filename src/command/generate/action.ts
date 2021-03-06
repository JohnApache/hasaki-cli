import path from 'path';
import fs from 'fs';
import EventProxy from '@dking/event-proxy';
import { Command } from 'commander';
import CreateLoading from '../../loading';
import { PluginList } from './plugins';
import { ChoosePluginPrompt } from './prompt';
import {
    UsedMemoryType,
    PackageInfo,
    NormalObject,
    GenerateContext,
} from './type';
import _ from 'lodash';

const EP = EventProxy.create();

const SortObjectByKey = (obj: NormalObject): NormalObject => {
    const sortedKeys = Object.keys(obj).sort();
    const result: NormalObject = {};
    return sortedKeys.reduce((prev, cur) => {
        prev[cur] = obj[cur];
        return prev;
    }, result);
};

const GenPlugin = async (
    pluginName: string,
    usedMemory: UsedMemoryType,
    context: GenerateContext,
): Promise<void> => {
    if (PluginList.every(plugin => plugin.pluginName !== pluginName)) {
        throw new Error(`cant't resolve ${ pluginName } plugin!`);
    }
    const ld = CreateLoading('relative config files are generating...');
    for (let i = 0; i < PluginList.length; i++) {
        const plugin = PluginList[i];
        if (plugin.pluginName !== pluginName) continue;
        try {
            const packageInfo = await plugin.install(usedMemory, context);
            ld.succeed(`resolved ${ pluginName }'s config files!`);
            packageInfo && EP.emit('update_package', packageInfo);
        } catch (error) {
            ld.fail(`generate ${ pluginName } config files failed!`);
            throw new Error(error);
        }
    }
};

const GenPackage = (context: GenerateContext): void => {
    const packagePath = path.resolve(context.targetPath, 'package.json');
    const newPackagePath = path.resolve(
        context.targetPath,
        `package${ context.suffix }.json`,
    );
    let packageJson: PackageInfo = {
        name       : '@dking/hasaki-cli-template',
        version    : '0.0.1',
        description: '@dking/hasaki-cli init application',
        main       : 'index.js',
        keywords   : [],
        author     : '',
        license    : '',
    };
    if (fs.existsSync(packagePath) && fs.statSync(packagePath).isFile()) {
        packageJson = require(packagePath);
    }

    EP.register('update_package', (newInfo: PackageInfo): void => {
        packageJson = _.merge(packageJson, newInfo || {});
    });

    EP.once('on_generate_finish', () => {
        packageJson.scripts = SortObjectByKey(packageJson.scripts || {});
        packageJson.dependencies = SortObjectByKey(packageJson.dependencies || {});
        packageJson.devDependencies = SortObjectByKey(packageJson.devDependencies || {});
        fs.writeFileSync(newPackagePath, JSON.stringify(packageJson, null, 2));
    });
};

const GenUsedMemory = (pluginList: string[]): UsedMemoryType => {
    const UsedMemory: UsedMemoryType = {};

    // 取消读取 已安装配置
    // const memoryPath = path.resolve(process.cwd(), '.hasakimemory.json');
    // if(fs.existsSync(memoryPath) && fs.statSync(memoryPath).isFile()) {
    //     UsedMemory = require(memoryPath);
    // }
    pluginList.forEach(pluginName => {
        UsedMemory[pluginName] = true;
    });

    return UsedMemory;
};

const BuildGenerateContext = (cmd: Command): GenerateContext => {
    const outDir: string = cmd.outDir || '';
    const rootPath: string = process.cwd();
    const forceCover: boolean = cmd.forceCover || false;
    const suffix: string = cmd.suffix || '';
    let targetPath: string;
    if (path.isAbsolute(outDir)) {
        targetPath = outDir;
    } else {
        targetPath = path.resolve(rootPath, outDir);
    }

    return {
        rootPath,
        targetPath,
        forceCover,
        suffix,
    };
};

const GenAction = async (pluginName: string, cmd: Command) => {
    const lPluginName = pluginName.trim().toLowerCase();
    let pluginList = [];
    if (!lPluginName) {
        const answer = await ChoosePluginPrompt();
        pluginList = answer.plugins;
    } else {
        pluginList = lPluginName.split(',').filter(v => v.trim().length > 0);
    }

    const installed: string = cmd.installed || '';
    const installedList = installed.split(',').filter(v => v.trim().length > 0);
    const context = BuildGenerateContext(cmd);
    const usedMemory = GenUsedMemory(pluginList.concat(installedList));
    GenPackage(context);

    for (let i = 0; i < pluginList.length; i++) {
        const plugin = pluginList[i];
        await GenPlugin(plugin, usedMemory, context);
    }

    EP.emit('on_generate_finish');
};

export default GenAction;
