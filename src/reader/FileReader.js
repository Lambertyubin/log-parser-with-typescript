"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_functions_1 = require("../helpers/helper-functions");
const fs_1 = __importDefault(require("fs"));
/*
    A class that reads log messages from an input file.
    Uses a helper function (readFile) to read the file line-by-line
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
        let output = (0, helper_functions_1.readFile)(this.inputFilePath);
        return output;
    }
    InputFilePath() {
        return this.inputFilePath;
    }
    fileExists(inputFile) {
        return fs_1.default.existsSync(inputFile);
    }
}
exports.default = FileReader;
