import fs from 'fs';
import IWriter from '../interfaces/IWriter';
import IOutputData from '../interfaces/data/IOutputData';

/*
    A class that writes messages to an output file.
    It has full control over the ouput format and can be extended to write data in multiple formats.
*/

export default class FileWriter implements IWriter {
    outputFilePath: string
    constructor(outputFilePath: string) {
        this.outputFilePath = outputFilePath
        this.initializeOutputFile()

    }

    save(output: IOutputData, count: number) {
        if (count !== Number.MIN_VALUE) {
            let outputData: string = this.formatOutput(output, count);
            fs.appendFileSync(this.OutputFilePath(), outputData);
        } else {
            this.closeOutputFile()
        }
    }

    private closeOutputFile(parenthesis: string = "]"): void {
        fs.appendFileSync(this.OutputFilePath(), parenthesis)
    }

    private initializeOutputFile(parenthesis: string = "["): void {
        fs.writeFileSync(this.OutputFilePath(), parenthesis)
    }


    private formatOutput(output: IOutputData, count: number): string {
        let outputData: string = JSON.stringify(output, null, '\t')
        return count === 1 ? outputData : ',\n' + outputData
    }

    private OutputFilePath(): string {
        return this.outputFilePath
    }
}
