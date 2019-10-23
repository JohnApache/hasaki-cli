import { Command } from "commander";
import { ChoosePluginPrompt } from './prompt';
import {PluginList} from './plugins';
import EventProxy from '@dking/event-proxy';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { UsedMemoryType, PackageInfo, NormalObject } from "./type";

const EP = EventProxy.create();

const SortObjectByKey = (obj: NormalObject): NormalObject => {
    const sortedKeys = Object.keys(obj).sort();
    return sortedKeys.reduce((prev, cur) => {
        prev[cur] = obj[cur];
        return prev;
    }, {} as NormalObject);
}

const GenPlugin = async (pluginName: string, usedMemory: UsedMemoryType): Promise<void> => {
    if(PluginList.every(plugin => plugin.pluginName !== pluginName)) {
        throw new Error(`cant't resolve ${pluginName} plugin!`);
    }

    for(let i = 0; i < PluginList.length; i++) {
        const plugin = PluginList[i];
        if(plugin.pluginName !== pluginName) continue;
        const packageInfo = await plugin.install(usedMemory);
        packageInfo && EP.emit('update_package', packageInfo);
    }
}

const GenPackage = (): void => {
    const packagePath = path.resolve(process.cwd(), 'package.json');
    const newPackagePath = path.resolve(process.cwd(), 'package2.json');
    let packageJson: PackageInfo = {};
    if(fs.existsSync(packagePath) && fs.statSync(packagePath).isFile()) {
        packageJson = require(packagePath);
    }

    EP.register('update_package', (newInfo: PackageInfo): void => {
        packageJson = _.merge(packageJson, newInfo || {});
    });
 
    EP.once('on_generate_finish', () => {
        packageJson['scripts'] = SortObjectByKey(packageJson['scripts']);
        packageJson['dependencies'] = SortObjectByKey(packageJson['dependencies']);
        packageJson['devDependencies'] = SortObjectByKey(packageJson['devDependencies']);
        fs.writeFileSync(newPackagePath, JSON.stringify(packageJson, null, 2));
    });
}

const GenUsedMemory = (pluginList: string[]): UsedMemoryType => {
    let UsedMemory: UsedMemoryType = {};
    // 取消读取 已安装配置
    // const memoryPath = path.resolve(process.cwd(), '.hasakimemory.json');
    // if(fs.existsSync(memoryPath) && fs.statSync(memoryPath).isFile()) {
    //     UsedMemory = require(memoryPath);
    // } 
    pluginList.forEach(pluginName => {
        if(PluginList.some(v => v.pluginName === pluginName)) {
            UsedMemory[pluginName] = true;
        }
    })

    return UsedMemory;
}

const GenAction = async (pluginName: string, cmd: Command) => {
    pluginName = pluginName.trim().toLowerCase();
    let pluginList = [];
    if(!pluginName) {
        const answer = await ChoosePluginPrompt();
        pluginList = answer.plugins;
    }else {
        pluginList = pluginName.split(',').filter(v => v.trim().length > 0);
    }

    GenPackage(); 

    const usedMemory = GenUsedMemory(pluginList);
    
    for(let i = 0; i < pluginList.length; i ++) {
        const plugin = pluginList[i];
        await GenPlugin(plugin, usedMemory);
    }
    
    EP.emit('on_generate_finish');
}

export default GenAction;