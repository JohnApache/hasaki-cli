import Clean from './clean';
import ParseRender from './parseRender';
import CreateScanner from './scanner';
import CreateTransferStation from './transferStation';
import CreateScreener from './screener';
import Copy from './copy';
import { ScreenRule, MatchRules } from './analyse';

export type ParseOption = {
    parseInclude?: MatchRules;
    parseExclude?: MatchRules;
    ignore?: MatchRules;
    parseData?: Record<string, any>;
    screenRule?: ScreenRule;
};

export const FileCleanner = (...cleanItem: string[]): Promise<void> =>
    new Promise((resolve, reject) => {
        try {
            Clean(cleanItem, () => {
                resolve();
            });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });

export const FilePiper = (
    source: string,
    target: string,
    parseOption: ParseOption
): Promise<void> =>
    new Promise((resolve, reject) => {
        const {
            ignore = [],
            parseExclude = [],
            parseInclude = [],
            parseData = {},
            screenRule = {
                exclude: [],
                include: [],
            },
        } = parseOption || {};

        let count = 0;
        const onTaskEnd = () => {
            count--;
            if (count === 0) {
                resolve();
            }
        };

        const Scanner = CreateScanner(source, ignore);
        const TransferStation = CreateTransferStation(source, {
            parseExclude,
            parseInclude,
        });
        const Screener = CreateScreener(source, screenRule);

        try {
            Scanner(source, (scanPath: string) => {
                Screener(scanPath, (screenPath: string) => {
                    const targetFile = screenPath.replace(source, target);
                    count++;
                    TransferStation(
                        targetFile,
                        () => {
                            ParseRender(
                                screenPath,
                                targetFile,
                                parseData,
                                onTaskEnd
                            );
                        },
                        () => {
                            Copy(screenPath, targetFile, onTaskEnd);
                        }
                    );
                });
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
