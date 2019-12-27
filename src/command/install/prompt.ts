import inquirer, { Question, Answers } from 'inquirer';

interface ProjectPromptAnswers extends Answers {
    projectName: string;
}

export const CreatePrompt = (questions: Array<Question>): Promise<any> =>
    inquirer.prompt(questions);

export const ProjectNamePrompt = (): Promise<ProjectPromptAnswers> => {
    const question = [
        {
            type   : 'input',
            name   : 'projectName',
            message: 'what is the project name?',
            filter (input: string) {
                return input.trim();
            },
            validate (input: string) {
                return input.length > 0;
            },
        },
    ];
    return CreatePrompt(question);
};
