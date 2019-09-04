import {GetTemplates} from '../config/template';
import {ErrorLog} from './log';
import {Exit} from './index';

export const CheckTemplate = () => {
    const templates = GetTemplates();
    return templates && templates.length > 0;
}

export const CheckEnv = () => {
    if(!CheckTemplate()) {
        ErrorLog('current template list is empty.');
        return Exit();
    }
}