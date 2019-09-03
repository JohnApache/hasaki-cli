import templates from '../../config/template';
import inquirer, {Question, Answers} from 'inquirer';

type Template = {
    templateName: string,
    remoteAddress: string,
}

interface TemplateAnswer extends Answers {
    template: Template
}

interface ConfirmAnswer extends Answers {
    confirm: boolean
}

export const CreatePrompt = (questions: Array<Question>): Promise<Answers> => {
    return inquirer.prompt(questions);
}

export const ChooseTemplatePrompt = async (): Promise<Template> => {
    const question = {
        type: 'list',
        name: 'template',
        message: 'choose a template you want.',
        choices() {
            return templates.map(t => {
                return {
                    name: t.templateName,
                    value: t
                }
            })
        }
    }
    const answers = await CreatePrompt([question]) as TemplateAnswer;
    return answers.template;
}


export const ConfirmDeletePrompt = async (dirname: string): Promise<boolean> => {
    const question = {
        type: 'confirm',
        name: 'confirm',
        message: `do you confirm delete ${dirname}?`,
        default: false,
    }
    const answers = await CreatePrompt([question]) as ConfirmAnswer;
    return answers.confirm;
}