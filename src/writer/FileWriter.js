"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/*
    A class that writes messages to an output file.
    It has full control over the ouput format and can be extended to write data in multiple formats.
*/
class FileWriter {
    constructor(outputFilePath) {
        this.outputFilePath = outputFilePath;
        this.initializeOutputFile();
    }
    save(output, count) {
        if (count !== Number.MIN_VALUE) {
            let outputData = this.formatOutput(output, count);
            fs_1.default.appendFileSync(this.outputFilePath, outputData);
        }
        else {
            this.closeOutputFile();
        }
    }
    formatOutput(output, count) {
        let outputData = JSON.stringify(output, null, '\t');
        return count === 1 ? outputData : ',\n' + outputData;
    }
    initializeOutputFile(parenthesis = "[") {
        fs_1.default.writeFileSync(this.outputFilePath, parenthesis);
    }
    closeOutputFile(parenthesis = "]") {
        fs_1.default.appendFileSync(this.outputFilePath, parenthesis);
    }
}
exports.default = FileWriter;
