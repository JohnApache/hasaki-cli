export interface UsedMemoryType {
    [key: string]: boolean;
}

export interface NormalObject {
    [key: string]: any;
}

export type PackageInfo = NormalObject;

export interface Plugin {
    pluginName: string;
    install(
        usedMemory: UsedMemoryType,
        context?: GenerateContext
    ): Promise<PackageInfo> | Promise<void> | PackageInfo | void;
}

export interface GenerateContext {
    rootPath: string;
    targetPath: string;
    forceCover: boolean;
    suffix: string;
}
