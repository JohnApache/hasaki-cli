import inquirer, {Question, Answers} from 'inquirer';
import {GetTemplates, Template} from '../../config/template';

interface AddPromptAnswers extends Answers {
    templateName: string,
    remoteAddress: string
}

interface DeletePromptAnswers extends Answers {
    deleteItems: Template[],
    confirmDelete: boolean | undefined
}

interface UpdatePromptAnswers extends Answers {
    updateItem: Template,
    templateName: string,
    remoteAddress: string
}

interface ClearPromptAnswers extends Answers {
    confirmClear: boolean
}

interface ResetPromptAnswers extends Answers {
    confirmReset: boolean
}

export const CreatePrompt = (questions: Question []): Promise<any> => {
    return inquirer.prompt(questions);
}

export const AddTemplatePrompt = async (): Promise<AddPromptAnswers> => {
    const question = [
        {
            type: 'input',
            name: 'templateName',
            message: 'what is the template local name?',
            filter(input: string) {
                return input.trim();
            },
            validate(input: string) {
                if(input.length === 0) return false;
                const templates = GetTemplates();
                if(templates.some(t => t.templateName === input)) {
                    return 'the current local name has been occupied!'
                }
                return true;
            }
        }, 
        {
            type: 'input',
            name: 'remoteAddress',
            message: 'what is the template remote address?',
            filter(input: string) {
                return input.trim();
            },
            validate(input: string): boolean {
                return input.length > 0;
            }
        }
    ]

    return CreatePrompt(question);
}

export const DeleteTemplatePrompt = async (): Promise<DeletePromptAnswers> => {
    const question = [
        {
            type: 'checkbox',
            name: 'deleteItems',
            message: 'choose one item from the template list.',
            choices() {
                return GetTemplates().map(t => {
                    return {
                        name: t.templateName,
                        value: t,
                    }
                });
            },
        }, 
        {
            type: 'confirm',
            name: 'confirmDelete',
            message: 'confirm delete the template from list?',
            when(answers: Answers) {
                return answers.deleteItems && answers.deleteItems.length > 0;
            },
            default: true,
        }
    ]
    return CreatePrompt(question);
}

export const UpdateTemplatePrompt = async (): Promise<UpdatePromptAnswers> => {
    const question = [
        {
            type: 'list',
            name: 'updateItem',
            message: 'choose one item from the template list.',
            choices() {
                return GetTemplates().map(t => {
                    return {
                        name: t.templateName,
                        value: t
                    }
                });
            }
        },
        {
            type: 'input',
            name: 'templateName',
            message: 'what is the template local name?',
            default(answers: Answers) {
                return answers.updateItem.templateName;
            },
            filter(input: string) {
                return input.trim();
            },
            validate(input: string, answer: Answers) {
                if(input.length === 0) return false;
                const templates = GetTemplates().filter(v => v.templateName !== answer.updateItem.templateName);
                if(templates.some(t => t.templateName === input)) {
                    return 'the current local name has been occupied!'
                }
                return true;
            }
        }, 
        {
            type: 'input',
            name: 'remoteAddress',
            message: 'what is the template remote address?',
            default(answers: Answers) {
                return answers.updateItem.remoteAddress;
            },
            filter(input: string) {
                return input.trim();
            },
            validate(input: string): boolean {
                return input.length > 0;
            }
        }
    ]
    return CreatePrompt(question);
}

export const ClearTemplatePrompt = async (): Promise<ClearPromptAnswers> => {
    const question = [
        {
            type: 'confirm',
            name: 'confirmClear',
            message: 'confirm delete all template from list?',
            default: false,
        }
    ]

    return CreatePrompt(question);
}


export const ResetTemplatePrompt = async (): Promise<ResetPromptAnswers> => {
    const question = [
        {
            type: 'confirm',
            name: 'confirmReset',
            message: 'confirm reset templates list?',
            default: false,
        }
    ]
    return CreatePrompt(question);
}

// (async () => {
//     const answers = await DeleteTemplatePrompt();
//     console.log(answers);
// })()