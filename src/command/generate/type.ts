export interface UsedMemoryType {
    [key: string]: boolean
}

export interface PackageInfo {
    [key: string]: any
}

export interface Plugin {
    pluginName: string;
    install(usedMemory: UsedMemoryType): PackageInfo | void;
}