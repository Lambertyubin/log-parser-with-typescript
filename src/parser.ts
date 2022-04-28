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
const inputPath: string = path.join(__dirname, args[3])
const outputPath: string = path.join(__dirname, args[5])


const fileReader: FileReader = new FileReader(inputPath);
const errorExtractor: ErrorExtractor = new ErrorExtractor()
const fileWriter: FileWriter = new FileWriter(outputPath)
const consoleLogger: ConsoleLogger = new ConsoleLogger()
const logParser: LogParser = new LogParser(fileReader, errorExtractor, fileWriter, consoleLogger)

logParser.parse()

