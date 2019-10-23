import { Plugin, PackageInfo, UsedMemoryType } from "./type";
import GenRollupConfig from "./gen/rollup";

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
        install() {}
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
        install() {}
    }
] 

