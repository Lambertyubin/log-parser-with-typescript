"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const n_readlines_1 = __importDefault(require("n-readlines"));
const ConsoleLogger_1 = __importDefault(require("../logger/ConsoleLogger"));
function* readFile(fileName) {
    let line;
    try {
        let broadLines = new n_readlines_1.default(fileName);
        while (line = broadLines.next()) {
            yield line.toString('ascii');
        }
    }
    catch (err) {
        (new ConsoleLogger_1.default()).error(err);
    }
}
exports.readFile = readFile;
