import { Plugin, PackageInfo, UsedMemoryType, GenerateContext } from "./type";
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
        install(usedMemory: UsedMemoryType, context: GenerateContext): Promise<void> {
            return GenReadmeConfig(usedMemory, context);
        },
    },
    {
        pluginName: 'eslint',
        install(usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> {
            return GenESLintConfig(usedMemory, context);
        },
    },
    {
        pluginName: 'mocha',
        install(usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> {
            return GenMochaConfig(usedMemory, context);
        },
    },
    {
        pluginName: 'jest',
        install(usedMemory: UsedMemoryType, context: GenerateContext): PackageInfo {
            return GenJestConfig(usedMemory);
        },
    },
    {
        pluginName: 'babel',
        install(usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> {
            return GenBabelConfig(usedMemory, context);
        },
    },
    {
        pluginName: 'webpack',
        install(usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> {
            return GenWebpackConfig(usedMemory, context);
        },
    },
    {
        pluginName: 'rollup',
        install(usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> {
            return GenRollupConfig(usedMemory, context);
        },
    },
    {
        pluginName: 'gulp',
        install(usedMemory: UsedMemoryType, context: GenerateContext): PackageInfo {
            return GenGulpConfig(usedMemory);
        },
    },
    {
        pluginName: 'lerna',
        install(usedMemory: UsedMemoryType, context: GenerateContext): PackageInfo {
            return GenLernaConfig(usedMemory);
        },
    },
    {
        pluginName: 'typescript',
        install(usedMemory: UsedMemoryType, context: GenerateContext): Promise<PackageInfo> {
            return GenTSConfig(usedMemory, context);
        },
    }
] 

