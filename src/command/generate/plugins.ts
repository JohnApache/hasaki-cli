import { Plugin, PackageInfo, UsedMemoryType } from "./type";
import GenRollupConfig from "./gen/rollup";
import GenTSConfig from "./gen/typescript";
import GenMochaConfig from "./gen/mocha";

export const PluginList: Plugin[] = [
    {
        pluginName: 'readme',
        install() {}
    },
    {
        pluginName: 'eslint',
        install() {}
    },
    {
        pluginName: 'mocha',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenMochaConfig(usedMemory);
        },
    },
    {
        pluginName: 'babel',
        install() {}
    },
    {
        pluginName: 'webpack',
        install() {}
    },
    {
        pluginName: 'rollup',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenRollupConfig(usedMemory);
        },
    },
    {
        pluginName: 'typescript',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenTSConfig(usedMemory);
        },
    }
] 

