import IReader from '../interfaces/IReader'
import fs from 'fs';
import nReadlines from 'n-readlines'
import ConsoleLogger from '../logger/ConsoleLogger';

/*
    A class that reads log messages from an input file. 
    Uses a generator function to read the file line-by-line 
    for memory efficiency especially when the input file becomes large
*/

export default class FileReader implements IReader {
    inputFilePath: string;

    constructor(inputFilePath: string) {
        if (!this.fileExists(inputFilePath)) {
            throw new Error(`Input File does not exist`)
        }
        this.inputFilePath = inputFilePath
    }

    read(): Generator<string> | undefined {
        let exists = this.fileExists(this.inputFilePath)
        if (!exists) {
            return undefined
        }
        let output = this.readInputFile()
        return output;
    }

    private * readInputFile(): Generator<string> | undefined {
        let line;
        try {
            let broadLines = new nReadlines(this.inputFilePath)
            while (line = broadLines.next()) {
                yield line.toString('ascii')
            }
        } catch (err) {
            (new ConsoleLogger()).error(err)
        }
    }

    protected fileExists(inputFile: string): boolean {
        return fs.existsSync(inputFile)
    }
}