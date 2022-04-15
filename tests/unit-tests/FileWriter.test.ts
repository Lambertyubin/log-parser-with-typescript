import FileWriter from "../../src/writer/FileWriter";
import fs, { readFileSync } from "fs";
import { tmpdir } from "os";
import IOutputData from '../../src/interfaces/data/IOutputData'
import mock from 'mock-fs'

describe ("FileWriter", () => {
  let fileWriter: FileWriter;
  let outputFilePath: string;
  let data: IOutputData

  beforeAll(()=>{
    mock({
        'tempDir.json':""
    })
  })

  afterAll(()=>{
    mock.restore()
  })

  beforeEach(()=>{
    data = {
      timestamp: 12345,
      loglevel:"error",
      transactionId:"my-id",
      err:"Error Message"
    }
    outputFilePath = "tempDir"
    let output = process.cwd()+"/"+"/tempDir.json"
    fileWriter = new FileWriter(output)
    
  })

  describe("FileWriter: Writing files", ()=>{
    let fullFileName: Function
    let originalFileName: any

    beforeEach(()=>{
      originalFileName = fileWriter.outputFilePath
      fullFileName = ():string =>{return tmpdir()+"/"+outputFilePath+".json"}
      fs.openSync(fullFileName(), 'w+')
    })
    afterEach(()=>{
      fs.closeSync(fullFileName())
    })

    it("Should save the data to the file tempDir.json", ()=>{
      
      fileWriter.OutputFilePath = jest.fn(():string =>{return fullFileName()})
      fileWriter.outputFilePath = fullFileName()

      fileWriter.save(data,1)
      expect(readFileSync(fullFileName(), {encoding:"ascii"})).toBe(JSON.stringify(data))
      
    })
  })
})