import ora, { Ora } from 'ora';

const CreateLoading = (loadingText: string): Ora => ora(loadingText);

export default CreateLoading;
