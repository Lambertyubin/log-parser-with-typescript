import IReader from '../interfaces/IReader'
import IWriter from '../interfaces/IWriter'
import ITransformer from '../interfaces/ITransformer'
import ILogger from '../interfaces/ILogger';
import IOutputData from '../interfaces/data/IOutputData';

/*
    A class that orchestrates the parsing process: reading -> extracting error messages -> writing output, and notifying user. 
    It takes input from FileReader, passes it to ErrorExtractor, and sends the final output to FileWriter
    It can be extended to use different readers, extractors, or writers as the needs of the app evolve.
*/


export default class LogParser implements IReader, IWriter, ITransformer {
    fileReader: IReader
    errorExtractor: ITransformer
    fileWriter: IWriter
    private logger?: ILogger | null

    constructor(fileReader: IReader, errorExtractor: ITransformer, fileWriter: IWriter, logger?: ILogger) {
        if (fileReader === null) {
            throw new Error("FileReader argument cannot be null")
        }
        if (errorExtractor === null) {
            throw new Error("ErrorExtractor argument cannot be null")
        }
        if (fileWriter === null) {
            throw new Error("FileWriter argument cannot be null")
        }
        this.fileReader = fileReader
        this.errorExtractor = errorExtractor
        this.fileWriter = fileWriter
        if (logger) {
            this.logger = logger
        }

    }

    parse = (): void => {
        try {
            const input = this.read()
            this.parseAndSave(input)
            this.closeFile()
            this.logger?.saved()
        } catch (err: any) {
            this.logger?.error(err)
        }

    }

    read(): Generator<string> | undefined {
        return this.FileReader.read()
    }

    transform(input: string): IOutputData | undefined {
        return this.FileTransformer.transform(input)

    }

    save(output: IOutputData, count: number): void {
        this.FileWriter.save(output, count)
    }

    private closeFile(parenthesis?: string): void {
        this.FileWriter.save("]", Number.MIN_VALUE)
    }

    private parseAndSave(input: Generator<string> | undefined): void {
        if (!input) {
            return undefined;
        }
        let line = input.next();
        let done = line.done;
        let count = 0;
        let transformedData;
        while (line.value !== "" && !done) {
            transformedData = this.transform(line.value)
            if (transformedData) {
                count++
                this.save(transformedData, count)
            }
            line = input.next();
            done = line.done;
        }
    }

    get FileReader(): IReader {
        return this.fileReader
    }

    get FileWriter(): IWriter {
        return this.fileWriter
    }

    get FileTransformer(): ITransformer {
        return this.errorExtractor
    }
}