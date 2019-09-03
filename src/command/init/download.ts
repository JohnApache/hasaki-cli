import clone from '../../git/clone';
import {FileCleanner} from '../../piper';
const getRemoteTemplate = async (source: string, dest: string): Promise<void> => {
    const [
        repo, 
        branch = 'master'
    ] = source.split('#');

    await clone({
        repo,
        dest,
        branch,
        shallow: true,
        depth: 1,
    });
    
    await FileCleanner(`${dest}/.git`);
}

export default getRemoteTemplate;