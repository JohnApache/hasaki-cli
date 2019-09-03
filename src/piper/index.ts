import Clean from './clean';
import ParseRender from './parseRender';
import Scanner from './scanner';
import TransferStation from './transferStation';
import Copy from './copy';

export type ParseOption = {
    parseInclude?: Array<RegExp>,
    parseExclude?: Array<RegExp>,
    ignore?: Array<RegExp>,
    parseData?: Object
}

export const FileCleanner = (...cleanItem: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            Clean(cleanItem, () => {
                resolve();
            })
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

export const FilePiper = (
        source: string, 
        target: string, 
        parseOption?: ParseOption,
    ): Promise<void> => {
    return new Promise((resolve, reject) => {
        let count = 0;
        const onTaskEnd = () => {
            count--;
            if(count === 0) {
                resolve();
            }
        };
        const {
            ignore = [],
            parseExclude = [],
            parseInclude = [],
            parseData = {}
        } = parseOption || {};

        try {
            Scanner(source, (filepath: string) => {
                count++;
                const targetFile = filepath.replace(source, target);
                TransferStation(
                    targetFile, 
                    {
                        parseExclude,
                        parseInclude,
                        ignore
                    }, 
                    () => {
                        ParseRender(filepath, targetFile, parseData, onTaskEnd);
                    },
                    () => {
                        Copy(filepath, targetFile, onTaskEnd);
                    },
                    () => {
                        setImmediate(onTaskEnd)
                    }
                )
                
            })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}