import { Plugin, PackageInfo, UsedMemoryType } from "./type";
import GenRollupConfig from "./gen/rollup";
import GenTSConfig from "./gen/typescript";
import GenMochaConfig from "./gen/mocha";
import GenReadmeConfig from "./gen/readme";
import GenESLintConfig from "./gen/eslint";
import GenBabelConfig from "./gen/babel";
import GenWebpackConfig from "./gen/webpack";
import GenLernaConfig from "./gen/lerna";
import GenGulpConfig from "./gen/gulp";
import GenJestConfig from "./gen/jest";

export const PluginList: Plugin[] = [
    {
        pluginName: 'readme',
        install(usedMemory: UsedMemoryType): void {
            return GenReadmeConfig(usedMemory);
        },
    },
    {
        pluginName: 'eslint',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenESLintConfig(usedMemory);
        },
    },
    {
        pluginName: 'mocha',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenMochaConfig(usedMemory);
        },
    },
    {
        pluginName: 'jest',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenJestConfig(usedMemory);
        },
    },
    {
        pluginName: 'babel',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenBabelConfig(usedMemory);
        },
    },
    {
        pluginName: 'webpack',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenWebpackConfig(usedMemory);
        },
    },
    {
        pluginName: 'rollup',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenRollupConfig(usedMemory);
        },
    },
    {
        pluginName: 'gulp',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenGulpConfig(usedMemory);
        },
    },
    {
        pluginName: 'lerna',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenLernaConfig(usedMemory);
        },
    },
    {
        pluginName: 'typescript',
        install(usedMemory: UsedMemoryType): PackageInfo {
            return GenTSConfig(usedMemory);
        },
    }
] 

