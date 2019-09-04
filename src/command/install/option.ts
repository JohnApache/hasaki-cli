import InitOption from '../init/option';
import { Command } from 'commander';

const InstallOption = (command: Command): Command => {
    return InitOption(command);
}

export default InstallOption;