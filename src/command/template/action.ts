import {GetTemplates, UpdateTemplates, ResetTemplates} from '../../config/template';
import { Command } from 'commander';
import {
    AddTemplatePrompt, 
    DeleteTemplatePrompt, 
    ClearTemplatePrompt, 
    UpdateTemplatePrompt,
    ResetTemplatePrompt
} from './prompt';

import {Exit} from '../../common';
import {ErrorLog, SuccessLog} from '../../common/log';

type ActionOptions = {
    list?: boolean,
    add?: boolean,
    update?: boolean,
    delete?: boolean,
    clear?: boolean,
    reset?: boolean
}

const CheckTemplate = () => {
    const templates = GetTemplates();
    return templates && templates.length > 0;
}

const ListAction = async (): Promise<void> => {
    const templates = GetTemplates();
    console.table(templates);
}

const AddAction = async (): Promise<void> => {
    const answer = await AddTemplatePrompt();
    const templates = GetTemplates();
    templates.unshift({
        templateName: answer.templateName,
        remoteAddress: answer.remoteAddress
    })
    UpdateTemplates(templates);
    SuccessLog('add template success!')
}

const UpdateAction = async (): Promise<void> => {
    if(!CheckTemplate()) {
        ErrorLog('current template list is empty.');
        return Exit();
    }

    const answer = await UpdateTemplatePrompt();
    const templates = GetTemplates();
    const newTemplates = templates.map(v => {
        if(v.templateName === answer.updateItem.templateName) {
            return {
                templateName: answer.templateName,
                remoteAddress: answer.remoteAddress
            }
        }
        return v;
    });

    UpdateTemplates(newTemplates);
    SuccessLog('update template success!');
}

const DeleteAction = async (): Promise<void> => {
    if(!CheckTemplate()) {
        ErrorLog('current template list is empty.');
        return Exit();
    }

    const templates = GetTemplates();
    const answer = await DeleteTemplatePrompt();
    if(answer.confirmDelete) {
        const newTemplates = templates.filter(t => answer.deleteItems.every(v => v.templateName !== t.templateName));
        UpdateTemplates(newTemplates);
        SuccessLog('delete templates success!')
        return;
    }
    console.log('cancel delete operation.');
}

const ClearAction = async (): Promise<void> => {
    const answer = await ClearTemplatePrompt();
    if(answer.confirmClear) {
        UpdateTemplates([]);
        SuccessLog('clear templates list success!');
        return;
    }
    console.log('cancel clear operation.');
}

const ResetAction = async (): Promise<void> => {
    const answer = await ResetTemplatePrompt();
    if(answer.confirmReset) {
        ResetTemplates();
        SuccessLog('reset template success!');
        return;
    }
    console.log('cancel reset operation.');
}

const TemplateAction = async (command: Command): Promise<void> => {
    const options: ActionOptions = command.opts();
    if(options.list) {
        return ListAction();
    }
    if(options.add) {
        return AddAction();
    }
    if(options.delete) {
        return DeleteAction();
    }
    if(options.update) {
        return UpdateAction();
    }
    if(options.clear) {
        return ClearAction();
    }
    if(options.reset) {
        return ResetAction();
    }

    return command.help();
}


export default TemplateAction;