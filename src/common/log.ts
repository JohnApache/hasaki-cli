import chalk from 'chalk';
import ora from 'ora';

export const ErrorLog = (text: string): void => {
    ora().fail(chalk.red.bold(text));
}

export const SuccessLog = (text: string): void => {
    ora().succeed(text);
}