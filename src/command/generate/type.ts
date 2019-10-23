export interface UsedMemoryType {
    [key: string]: boolean
}

export interface NormalObject {
    [key: string]: any
}

export interface PackageInfo extends NormalObject{}

export interface Plugin {
    pluginName: string;
    install(usedMemory: UsedMemoryType): PackageInfo | void;
}

