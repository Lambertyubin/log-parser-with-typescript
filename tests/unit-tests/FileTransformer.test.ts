import ErrorExtractor from "../../src/transformer/ErrorExtractor";
import IOutputData from "../../src/interfaces/data/IOutputData";

describe ("Error Extractor", () => {
    
    let mockOutputData: IOutputData
    let inputData: string
    let errorExtractor: ErrorExtractor;


    beforeEach(()=>{
      mockOutputData = {
        timestamp: 12345,
        loglevel:"error",
        transactionId:"my-id",
        err:"Error Message"
      }
      inputData = String(`2021-08-09T02:12:51.264Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}`)
      errorExtractor = new ErrorExtractor();
    })
  
    it("Should be defined", ()=>{
        expect(errorExtractor.transform(inputData)).toBeDefined()
    })

    it("should extract logs with error level", ()=>{
      let input = String(`2021-08-09T02:12:51.264Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error"}`)
      expect(errorExtractor.transform(input)).toHaveProperty('error')
    })

    it("should extract return empty file if no log has error level", ()=>{
      let input = String(`2021-08-09T02:12:51.264Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error"}`)
      expect(errorExtractor.transform(input)).not.toHaveProperty('error')
    })

  })