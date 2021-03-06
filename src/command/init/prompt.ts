import { GetTemplates, Template } from '../../config/template';
import inquirer, { Question, Answers } from 'inquirer';

interface TemplateAnswer extends Answers {
    template: Template;
}

interface ConfirmAnswer extends Answers {
    confirm: boolean;
}

interface PasswordAnswer extends Answers {
    password: string;
}

export const CreatePrompt = (questions: Array<Question>): Promise<any> =>
    inquirer.prompt(questions);

export const ChooseTemplatePrompt = async (): Promise<Template> => {
    const question = {
        type   : 'list',
        name   : 'template',
        message: 'choose a template you want.',
        choices () {
            const templates = GetTemplates();
            return templates.map(t => ({
                name : t.templateName,
                value: t,
            }));
        },
    };
    const answers: TemplateAnswer = await CreatePrompt([ question ]);
    return answers.template;
};

export const ConfirmDeletePrompt = async (
    dirname: string,
): Promise<boolean> => {
    const question = {
        type     : 'confirm',
        name     : 'confirm',
        message  : `do you confirm delete ${ dirname }?`,
        'default': false,
    };
    const answers: ConfirmAnswer = await CreatePrompt([ question ]);
    return answers.confirm;
};

export const PasswordPrompt = async (username: string): Promise<string> => {
    const question = {
        type   : 'password',
        name   : 'password',
        message: `input ${ username }'s git password?`,
        validate (input: string) {
            return input && input.length > 0;
        },
    };
    const answers: PasswordAnswer = await CreatePrompt([ question ]);
    return answers.password;
};
