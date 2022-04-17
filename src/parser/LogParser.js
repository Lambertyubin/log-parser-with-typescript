"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    A class that orchestrates the parsing process: reading -> extracting error messages -> writing output, and notifying user.
    It takes input from FileReader, passes it to ErrorExtractor, and sends the final output to FileWriter
    It can be extended to use different readers, extractors, or writers as the needs of the app evolve.
*/
class LogParser {
    constructor(fileReader, errorExtractor, fileWriter, logger) {
        this.parse = () => {
            var _a, _b;
            try {
                const input = this.read();
                this.parseAndSave(input);
                this.closeFile();
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.saved();
            }
            catch (err) {
                (_b = this.logger) === null || _b === void 0 ? void 0 : _b.error(err);
            }
        };
        if (fileReader === null) {
            throw new Error("FileReader argument cannot be null");
        }
        if (errorExtractor === null) {
            throw new Error("ErrorExtractor argument cannot be null");
        }
        if (fileWriter === null) {
            throw new Error("FileWriter argument cannot be null");
        }
        this.fileReader = fileReader;
        this.errorExtractor = errorExtractor;
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
        return this.errorExtractor;
    }
}
exports.default = LogParser;
