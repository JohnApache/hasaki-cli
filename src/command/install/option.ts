import { Command } from 'commander';
import InitOption from '../init/option';

const InstallOption = (command: Command): Command => InitOption(command);

export default InstallOption;
