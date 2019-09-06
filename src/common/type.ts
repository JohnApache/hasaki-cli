export const isRegExp = (target: any): boolean => {
    return Object.prototype.toString.call(target) === '[object RegExp]';
}