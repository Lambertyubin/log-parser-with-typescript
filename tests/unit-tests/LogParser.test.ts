import IOutputData from '../../src/interfaces/data/IOutputData'
import LogParser from '../../src/parser/LogParser'
import mockparser from './mockparser'
import ConsoleLogger from '../../src/logger/ConsoleLogger'

// mock generator function that returns single data line
function* generateMockInput() {
  yield '2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}'
}

let consoleLogger = new ConsoleLogger()
let logParser: LogParser = new LogParser(mockparser, mockparser, mockparser, consoleLogger)
let data: IOutputData = { timestamp: 12345, loglevel: "error", transactionId: "my-id", err: "Error Message" }
let inputData: string = String(`2021-08-09T02:12:51.264Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}`)

describe('LogParser', () => {

  describe('Constructor', () => {
    it('should throw an error if called with null params', () => {
      expect(() => { return new LogParser(null, mockparser, mockparser) }).toThrowError("FileReader argument cannot be null");
      expect(() => { return new LogParser(mockparser, null, mockparser) }).toThrowError("ErrorExtractor argument cannot be null");
      expect(() => { return new LogParser(mockparser, mockparser, null) }).toThrowError("FileWriter argument cannot be null");
    })
  })
  describe('Reading input file', () => {
    it('should call the underlying reader', () => {
      logParser.read()
      expect(mockparser.read).toHaveBeenCalled()
    })

  })
  describe('Saving output', () => {
    it('should call the underlying writer', () => {
      logParser.save(data, 1)
      expect(mockparser.save).toHaveBeenCalledWith(data, 1)
    })
  })
  describe('Extracting error message', () => {
    it('should call the underlying error extractor', () => {
      logParser.transform(inputData)
      expect(mockparser.transform).toHaveBeenCalled()
    })

  })

  describe('Helper - Parsing and saving data', () => {

    it('should return undefined when input is null', () => {
      let output = logParser.parseAndSave(null)
      expect(output).toBeUndefined()

    })

    it('should forward input for transformation', () => {
      let fileTransformMock = jest
        .spyOn(LogParser.prototype, 'transform')
        .mockImplementation((input: string): IOutputData | undefined => undefined)

      let logParser = new LogParser(mockparser, mockparser, mockparser)
      logParser.parseAndSave(generateMockInput())
      expect(fileTransformMock).toBeCalledTimes(1)

    })
  })

  describe('Parsing and Saving data', () => {

    it('should parse, save and notify user', () => {

      let closeFileMock = jest
        .spyOn(LogParser.prototype, 'closeFile')
        .mockImplementation((input?: string): void => { })

      let parseAndSaveMock = jest
        .spyOn(LogParser.prototype, 'parseAndSave')
        .mockImplementation((input: Generator<string> | undefined): void => { })

      let consoleLoggerMock = jest
        .spyOn(ConsoleLogger.prototype, 'saved')
        .mockImplementation((): void => { })

      logParser.parse()
      expect(mockparser.read).toHaveBeenCalled()
      expect(parseAndSaveMock).toHaveBeenCalled()
      expect(closeFileMock).toHaveBeenCalled()
      expect(consoleLoggerMock).toHaveBeenCalled()
    })
  })

})