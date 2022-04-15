"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    A class that orchestrates the parsing process: reading -> extracting error messages -> writing output, and notifying user.
    It takes input from FileReader, passes it to ErrorExtractor, and sends the final output to FileWriter
    It can be extended to use different readers, extractors, or writers as the needs of the app evolve.
*/
class LogParser {
    constructor(fileReader, fileTransformer, fileWriter, logger) {
        this.parse = () => {
            try {
                const input = this.read();
                this.parseAndSave(input);
                this.closeFile();
                this.logger?.saved();
            }
            catch (err) {
                this.logger?.error(err);
            }
        };
        this.fileReader = fileReader;
        this.fileTransformer = fileTransformer;
        this.fileWriter = fileWriter;
        if (logger) {
            this.logger = logger;
        }
    }
    read() {
        return this.FileReader.read();
    }
    transform(input) {
        return this.FileTransformer.transform(input);
    }
    save(output, count) {
        this.FileWriter.save(output, count);
    }
    closeFile(parenthesis) {
        this.FileWriter.save("]", Number.MIN_VALUE);
    }
    parseAndSave(input) {
        if (!input) {
            return undefined;
        }
        let line = input.next();
        let done = line.done;
        let count = 0;
        let transformedData;
        while (line.value !== "" && !done) {
            transformedData = this.transform(line.value);
            if (transformedData) {
                count++;
                this.save(transformedData, count);
            }
            line = input.next();
            done = line.done;
        }
    }
    get FileReader() {
        return this.fileReader;
    }
    get FileWriter() {
        return this.fileWriter;
    }
    get FileTransformer() {
        return this.fileTransformer;
    }
}
exports.default = LogParser;
