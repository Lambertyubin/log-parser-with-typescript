import LogParser from "./parser/LogParser";
import FileWriter from "./writer/FileWriter";
import FileReader from "./reader/FileReader";
import ErrorExtractor from "./transformer/ErrorExtractor";
import ConsoleLogger from "./logger/ConsoleLogger";
import path from 'path'

/*
    Entry point of the app,
    collects inputs from the command line, 
    creates instances of the reader, error extractor, writer and passes them to the parser object
*/

const args: string[] = process.argv;
const inputPath = path.join(__dirname, args[3])
const fileReader = new FileReader(inputPath);
const errorExtractor = new ErrorExtractor()
const fileWriter = new FileWriter(args[5])
const consoleLogger = new ConsoleLogger()
const logParser: LogParser = new LogParser(fileReader, errorExtractor, fileWriter, consoleLogger)

logParser.parse()

