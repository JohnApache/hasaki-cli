import {TEMPLATE_CONFIG_FILENAME} from './definition';
export const DefaultIgnore: RegExp[] = [
    /node_modules/,
    new RegExp(`${TEMPLATE_CONFIG_FILENAME}$`)
];

export const DefaultExclude: RegExp[] = [
];

export const DefaultInclude: RegExp[] = [
    /^.+\.js$/,
    /^.+\.json$/,
];