export const isRegExp = (target: any): boolean =>
    Object.prototype.toString.call(target) === '[object RegExp]';
