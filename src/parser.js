"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogParser_1 = __importDefault(require("./parser/LogParser"));
const FileWriter_1 = __importDefault(require("./writer/FileWriter"));
const FileReader_1 = __importDefault(require("./reader/FileReader"));
const ErrorExtractor_1 = __importDefault(require("./transformer/ErrorExtractor"));
const ConsoleLogger_1 = __importDefault(require("./logger/ConsoleLogger"));
const path_1 = __importDefault(require("path"));
/*
    Entry point of the app,
    collects inputs from the command line,
    creates instances of the reader, error extractor, writer and passes them to the parser object
*/
const args = process.argv;
const inputPath = path_1.default.join(__dirname, args[3]);
const fileReader = new FileReader_1.default(inputPath);
const errorExtractor = new ErrorExtractor_1.default();
const fileWriter = new FileWriter_1.default(args[5]);
const consoleLogger = new ConsoleLogger_1.default();
const logParser = new LogParser_1.default(fileReader, errorExtractor, fileWriter, consoleLogger);
logParser.parse();
