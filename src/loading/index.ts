import ora, {Ora} from 'ora';

const createLoading = (loadingText: string): Ora => {
    return ora(loadingText);
}

export default createLoading;