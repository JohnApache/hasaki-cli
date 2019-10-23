import inquirer, { Question, Answers } from 'inquirer';
import { PluginList } from './plugins';

export const CreatePrompt = (questions: Array<Question>): Promise<any> => {
    return inquirer.prompt(questions);
}


interface ChoosePluginAnswer extends Answers {
    plugins: string []
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