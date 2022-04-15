import FileReader from "../../src/reader/FileReader";
import fs, { writeFileSync } from "fs";
import { tmpdir } from "os";
import mock from 'mock-fs'
import path from 'path'

describe ("FileReader", () => {
  let fileReader: FileReader;
  let inputFilePath: string;

  beforeAll(()=>{
    mock({
        'tempDir.log':""
    })
  })

  afterAll(()=>{
    mock.restore()
  })

  beforeEach(()=>{
    
    inputFilePath = "tempDir"
    let input = path.join(tmpdir(), "/", inputFilePath+".log")
    fileReader = new FileReader(input)
  })

  describe("FileReader: Reading files", ()=>{
    let fullFileName: Function

    beforeEach(()=>{
    
      fullFileName = ():string =>{return tmpdir()+"/"+inputFilePath+".log"}
      
    })
    it("Should read the content from a file", ()=>{
      fs.openSync(fullFileName(), 'w+')
      let content = 'Sample text content'
      writeFileSync(fullFileName(), content)
      expect(fileReader.read()).toBeDefined()
    })

    it("Should return undefined if file doesn't exist", ()=>{
        fileReader.inputFilePath = "adddppp"
        expect(fileReader.read()).toBeUndefined()
    })
  })
})