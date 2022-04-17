"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileReader_1 = __importDefault(require("../../src/reader/FileReader"));
jest.mock('fs');
//jest.mock('n-readlines')
describe('FileReader', () => {
    const MOCK_FILE_INFO = {
        'input.log': '2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}',
        'output.json': '',
    };
    beforeEach(() => {
        // Seting up some mocked out file info before each test
        require('fs').__setMockFiles(MOCK_FILE_INFO);
    });
    test("sets the inputfile attribute with the new file path when it exists", () => {
        let fileExistsMock = jest
            .spyOn(FileReader_1.default.prototype, 'fileExists')
            .mockImplementation((fileName) => true);
        let fileReader = new FileReader_1.default("input.log");
        expect(fileReader.inputFilePath).toBe("input.log");
        expect(fileExistsMock).toBeCalledTimes(1);
        fileExistsMock.mockClear();
    });
    describe("Sanity checks on input file", () => {
        it("checks if input file path is valid", () => {
            let fileExistsMock = jest
                .spyOn(FileReader_1.default.prototype, 'fileExists')
                .mockImplementation((fileName) => require('fs').existsSync(fileName));
            let invalidFilePath = "inpuooot.log";
            let validFilePath = "input.log";
            let invalidExists = FileReader_1.default.prototype.fileExists(invalidFilePath);
            let validExists = FileReader_1.default.prototype.fileExists(validFilePath);
            expect(invalidExists).toBeFalsy();
            expect(validExists).toBeTruthy();
            fileExistsMock.mockClear();
        });
        it("throws an error if input file does not exist", () => {
            let fileExistsMock = jest
                .spyOn(FileReader_1.default.prototype, 'fileExists')
                .mockImplementation((fileName) => false);
            expect(() => new FileReader_1.default("input.log")).toThrowError('Input File does not exist');
            fileExistsMock.mockClear();
        });
    });
    describe("Reading input file", () => {
        beforeAll(() => {
            let fileExistsMock = jest
                .spyOn(FileReader_1.default.prototype, 'fileExists')
                .mockImplementation((fileName) => require('fs').existsSync(fileName));
        });
        it("returns file content if file exists", () => {
            let readInputFileMock = jest
                .spyOn(FileReader_1.default.prototype, 'readInputFile')
                .mockImplementation((fileName) => require('fs').readFileSync(fileName));
            FileReader_1.default.prototype.inputFilePath = "input.log";
            let data = FileReader_1.default.prototype.read();
            expect(data[0]).toBe(MOCK_FILE_INFO['input.log']);
        });
        it("returns undefined when file does not exist", () => {
            FileReader_1.default.prototype.inputFilePath = "inpuooot.log";
            expect(FileReader_1.default.prototype.read()).toBeUndefined();
        });
    });
});
