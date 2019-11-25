import ora, {Ora} from 'ora';

const CreateLoading = (loadingText: string): Ora => {
    return ora(loadingText);
}

export default CreateLoading;