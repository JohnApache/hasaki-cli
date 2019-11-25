import chalk from "chalk";
import path from "path";

import { FileCleanner } from "../../piper";
import {
  ChooseTemplatePrompt,
} from "./prompt";
import {
  TEMPLATE_REPO_TMP_DIRNAME,
} from "../../config/definition";
import { Exit } from "../../common";
import { SuccessLog, ErrorLog } from "../../common/log";
import { CheckTemplate } from "../../common/template";
import { Command } from "commander";
import { BeforeInitHandle } from "./beforeInit";
import { DownloadHandle } from "./download";
import { ActionOptions } from "./type";
import { RepoPipeHandle } from "./repoPipe";

const InitAction = async (
  projectName: string,
  command: Command
): Promise<void> => {
  if (!CheckTemplate()) {
    ErrorLog("current template list is empty.");
    return Exit();
  }
  const options: ActionOptions = command.opts();
  const targetPath = path.resolve(
    process.cwd(),
    options.outDir || "",
    projectName
  );
  const tmpRepoPath = path.resolve(process.cwd(), TEMPLATE_REPO_TMP_DIRNAME);

  await BeforeInitHandle(projectName, options);
  const template = await ChooseTemplatePrompt();

  await DownloadHandle(template.remoteAddress, tmpRepoPath, options);
  await RepoPipeHandle(tmpRepoPath, targetPath, options);
  FileCleanner(tmpRepoPath);
  SuccessLog(`create ${projectName} success!`);
};

export default InitAction;
