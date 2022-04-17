"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogParser_1 = __importDefault(require("../../src/parser/LogParser"));
const mockparser_1 = __importDefault(require("./mockparser"));
const ConsoleLogger_1 = __importDefault(require("../../src/logger/ConsoleLogger"));
// mock generator function that returns single data line
function* generateMockInput() {
    yield '2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}';
}
let consoleLogger = new ConsoleLogger_1.default();
let logParser = new LogParser_1.default(mockparser_1.default, mockparser_1.default, mockparser_1.default, consoleLogger);
let data = { timestamp: 12345, loglevel: "error", transactionId: "my-id", err: "Error Message" };
let inputData = String(`2021-08-09T02:12:51.264Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}`);
describe('LogParser', () => {
    describe('Constructor', () => {
        it('should throw an error if called with null params', () => {
            expect(() => { return new LogParser_1.default(null, mockparser_1.default, mockparser_1.default); }).toThrowError("FileReader argument cannot be null");
            expect(() => { return new LogParser_1.default(mockparser_1.default, null, mockparser_1.default); }).toThrowError("ErrorExtractor argument cannot be null");
            expect(() => { return new LogParser_1.default(mockparser_1.default, mockparser_1.default, null); }).toThrowError("FileWriter argument cannot be null");
        });
    });
    describe('Reading input file', () => {
        it('should call the underlying reader', () => {
            logParser.read();
            expect(mockparser_1.default.read).toHaveBeenCalled();
        });
    });
    describe('Saving output', () => {
        it('should call the underlying writer', () => {
            logParser.save(data, 1);
            expect(mockparser_1.default.save).toHaveBeenCalledWith(data, 1);
        });
    });
    describe('Extracting error message', () => {
        it('should call the underlying error extractor', () => {
            logParser.transform(inputData);
            expect(mockparser_1.default.transform).toHaveBeenCalled();
        });
    });
    describe('Helper - Parsing and saving data', () => {
        it('should return undefined when input is null', () => {
            let output = logParser.parseAndSave(null);
            expect(output).toBeUndefined();
        });
        it('should forward input for transformation', () => {
            let fileTransformMock = jest
                .spyOn(LogParser_1.default.prototype, 'transform')
                .mockImplementation((input) => undefined);
            let logParser = new LogParser_1.default(mockparser_1.default, mockparser_1.default, mockparser_1.default);
            logParser.parseAndSave(generateMockInput());
            expect(fileTransformMock).toBeCalledTimes(1);
        });
    });
    describe('Parsing and Saving data', () => {
        it('should parse, save and notify user', () => {
            let closeFileMock = jest
                .spyOn(LogParser_1.default.prototype, 'closeFile')
                .mockImplementation((input) => { });
            let parseAndSaveMock = jest
                .spyOn(LogParser_1.default.prototype, 'parseAndSave')
                .mockImplementation((input) => { });
            let consoleLoggerMock = jest
                .spyOn(ConsoleLogger_1.default.prototype, 'saved')
                .mockImplementation(() => { });
            logParser.parse();
            expect(mockparser_1.default.read).toHaveBeenCalled();
            expect(parseAndSaveMock).toHaveBeenCalled();
            expect(closeFileMock).toHaveBeenCalled();
            expect(consoleLoggerMock).toHaveBeenCalled();
        });
    });
});
