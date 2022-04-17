"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileWriter_1 = __importDefault(require("../../src/writer/FileWriter"));
jest.mock('fs');
const mockOutputData = {
    timestamp: 1233,
    loglevel: "error",
    transactionId: "abcd",
    err: "Error occured"
};
let formatOutputMock = jest
    .spyOn(FileWriter_1.default.prototype, 'formatOutput')
    .mockImplementation((data, count) => JSON.stringify(mockOutputData));
describe('FileReader', () => {
    const MOCK_FILE_INFO = {
        'input.log': '2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}',
        'output.json': '',
    };
    beforeEach(() => {
        // Seting up some mocked out file info before each test
        require('fs').__setMockFiles(MOCK_FILE_INFO);
    });
    describe("Initializing and closing output file", () => {
        it("initializes output file", () => {
            let fileWriter = new FileWriter_1.default("output.json");
            let output = require('fs').readFileSync('output.json');
            expect(output[output.length - 1]).toBe('[');
        });
        it("closes the output file after writing all data", () => {
            FileWriter_1.default.prototype.outputFilePath = "output.json";
            FileWriter_1.default.prototype.save(mockOutputData, Number.MIN_VALUE);
            let output = require('fs').readFileSync('output.json');
            expect(output[output.length - 1]).toBe(']');
        });
    });
    describe("Saving data to the output file", () => {
        it("check if output conversion function is called ", () => {
            FileWriter_1.default.prototype.save(mockOutputData, 2);
            expect(formatOutputMock).toBeCalledTimes(1);
            formatOutputMock.mockClear();
        });
        it("Saves data to the output file", () => {
            FileWriter_1.default.prototype.outputFilePath = "output.json";
            FileWriter_1.default.prototype.save(mockOutputData, 2);
            let output = require('fs').readFileSync('output.json');
            expect(output[output.length - 1]).toBe(JSON.stringify(mockOutputData));
        });
    });
});
