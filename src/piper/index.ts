import Clean from './clean';
import ParseRender from './parseRender';
import CreateScanner from './scanner';
import CreateTransferStation from './transferStation';
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
       
        const {
            ignore = [],
            parseExclude = [],
            parseInclude = [],
            parseData = {}
        } = parseOption || {};

        let count = 0;
        const onTaskEnd = () => {
            count--;
            if(count === 0) {
                resolve();
            }
        };

        const Scanner = CreateScanner(ignore);
        const TransferStation = CreateTransferStation({ parseExclude, parseInclude });
        
        try {
            Scanner(source, (filepath: string) => {
                count++;
                const targetFile = filepath.replace(source, target);
                TransferStation(
                    targetFile, 
                    () => {
                        ParseRender(filepath, targetFile, parseData, onTaskEnd);
                    },
                    () => {
                        Copy(filepath, targetFile, onTaskEnd);
                    }
                )
                
            })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}