import { MatchRules } from '../piper/analyse';

export const DefaultIgnore: MatchRules = [/node_modules/];

export const DefaultExclude: MatchRules = [];

export const DefaultInclude: MatchRules = [/^.+\.js$/, /^.+\.json$/];
