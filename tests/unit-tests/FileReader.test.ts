import FileReader from "../../src/reader/FileReader";

jest.mock('fs')
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
      .spyOn(FileReader.prototype, 'fileExists')
      .mockImplementation((fileName: string) => true)

    let fileReader = new FileReader("input.log")
    expect(fileReader.inputFilePath).toBe("input.log")
    expect(fileExistsMock).toBeCalledTimes(1)
    fileExistsMock.mockClear()

  })

  describe("Sanity checks on input file", () => {

    it("checks if input file path is valid", () => {
      let fileExistsMock = jest
        .spyOn(FileReader.prototype, 'fileExists')
        .mockImplementation((fileName: string) => require('fs').existsSync(fileName))

      let invalidFilePath = "inpuooot.log"
      let validFilePath = "input.log"

      let invalidExists = FileReader.prototype.fileExists(invalidFilePath)
      let validExists = FileReader.prototype.fileExists(validFilePath)

      expect(invalidExists).toBeFalsy()
      expect(validExists).toBeTruthy()

      fileExistsMock.mockClear()

    })

    it("throws an error if input file does not exist", () => {
      let fileExistsMock = jest
        .spyOn(FileReader.prototype, 'fileExists')
        .mockImplementation((fileName: string) => false)

      expect(() => new FileReader("input.log")).toThrowError('Input File does not exist')
      fileExistsMock.mockClear()

    })



  })

  describe("Reading input file", () => {

    beforeAll(() => {
      let fileExistsMock = jest
        .spyOn(FileReader.prototype, 'fileExists')
        .mockImplementation((fileName: string) => require('fs').existsSync(fileName))
    })

    it("returns file content if file exists", () => {

      let readInputFileMock = jest
        .spyOn(FileReader.prototype, 'readInputFile')
        .mockImplementation((fileName: string) => require('fs').readFileSync(fileName))

      FileReader.prototype.inputFilePath = "input.log"

      let data = FileReader.prototype.read()

      expect(data[0]).toBe(MOCK_FILE_INFO['input.log'])

    })

    it("returns undefined when file does not exist", () => {

      FileReader.prototype.inputFilePath = "inpuooot.log"
      expect(FileReader.prototype.read()).toBeUndefined()

    })

  })
});
