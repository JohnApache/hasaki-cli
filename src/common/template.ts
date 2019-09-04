import {GetTemplates} from '../config/template';

export const CheckTemplate = () => {
    const templates = GetTemplates();
    return templates && templates.length > 0;
}
