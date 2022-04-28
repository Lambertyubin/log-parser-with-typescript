"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const n_readlines_1 = __importDefault(require("n-readlines"));
const ConsoleLogger_1 = __importDefault(require("../logger/ConsoleLogger"));
/*
    A class that reads log messages from an input file.
    Uses a generator function to read the file line-by-line
    for memory efficiency especially when the input file becomes large
*/
class FileReader {
    constructor(inputFilePath) {
        if (!this.fileExists(inputFilePath)) {
            throw new Error(`Input File does not exist`);
        }
        this.inputFilePath = inputFilePath;
    }
    read() {
        let exists = this.fileExists(this.inputFilePath);
        if (!exists) {
            return undefined;
        }
        let output = this.readInputFile();
        return output;
    }
    *readInputFile() {
        let line;
        try {
            let broadLines = new n_readlines_1.default(this.inputFilePath);
            while (line = broadLines.next()) {
                yield line.toString('ascii');
            }
        }
        catch (err) {
            (new ConsoleLogger_1.default()).error(err);
        }
    }
    fileExists(inputFile) {
        return fs_1.default.existsSync(inputFile);
    }
}
exports.default = FileReader;
