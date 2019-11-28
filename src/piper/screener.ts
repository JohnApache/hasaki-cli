import { ScreenRule, IsMatchRules } from './analyse';

const CreateScreener = (rootPath: string, screenRule: ScreenRule) => {
    const { include = [], exclude = [] } = screenRule;
    const IsInclude = (targetPath: string): boolean =>
        IsMatchRules(rootPath, targetPath, include);

    const IsExclude = (targetPath: string): boolean =>
        IsMatchRules(rootPath, targetPath, exclude);

    const Screener = (
        targetFile: string,
        callback?: (targetDir: string) => void
    ): void => {
        if (IsExclude(targetFile)) return;
        if (IsInclude(targetFile)) {
            callback && callback(targetFile);
            return;
        }
        callback && callback(targetFile);
    };

    return Screener;
};

export default CreateScreener;
