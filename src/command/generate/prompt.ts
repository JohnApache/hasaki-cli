import inquirer, { Question, Answers } from 'inquirer';
import { PluginList } from './plugins';

export const CreatePrompt = (questions: Array<Question>): Promise<any> => {
    return inquirer.prompt(questions);
}


interface ChoosePluginAnswer extends Answers {
    plugins: string []
}

interface ConfirmCoverAnswer extends Answers {
    confirm: boolean
}

export const ChoosePluginPrompt = (): Promise<ChoosePluginAnswer> => {
    const question = {
        type: 'checkbox',
        name: 'plugins',
        message: 'choose one or more template you want.',
        validate(input: string[]) {
            return input.length > 0;
        },
        choices() {
            return PluginList.map(plugin => plugin.pluginName);
        }
    }
    return CreatePrompt([question])
}

export const ConfirmCoverPrompt = async (dirname: string): Promise<ConfirmCoverAnswer> => {
    const question = {
        type: 'confirm',
        name: 'confirm',
        message: `do you confirm cover ${dirname}?`,
        default: false,
    }
    return CreatePrompt([question])
}