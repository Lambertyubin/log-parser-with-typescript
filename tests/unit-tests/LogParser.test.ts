import IOutputData from '../../src/interfaces/data/IOutputData'
import LogParser from '../../src/parser/LogParser'
import mockparser from './mockparser'

let logParser: LogParser
      logParser= new LogParser(mockparser, mockparser, mockparser)
      let data:IOutputData = {timestamp: 12345,loglevel:"error",transactionId:"my-id",err:"Error Message"}
      let inputData: string = String(`2021-08-09T02:12:51.264Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}`)

  describe('LogParser', () => {
    
    describe('constructor', () => {
      it('should throw and error if called with null params', () => {
        expect(() => {new LogParser(null, mockparser, mockparser)}).toThrowError("FileReader argument cannot be null");
        expect(() => {new LogParser(mockparser, null, mockparser)}).toThrowError("FileTransformer argument cannot be null");
      })
    })
    describe('File Reader', () => {
      describe('read', () => {
        it('should call the underlying reader', () => {
          logParser.read()
          expect(mockparser.read).toHaveBeenCalled()
        })
      })
    })
    describe('File Writer', () => {
      describe('save', () => {
        it('should call the underlying writer', () => {
          logParser.save(data, 1)
          expect(mockparser.save).toHaveBeenCalledWith(1, 'message')
        })
      })
    })
    describe('Error Extractor', () => {
      describe('save', () => {
        it('should call the underlying transformer', () => {
          logParser.transform(inputData)
          expect(mockparser.transform).toHaveBeenCalled()
        })
      })
    })
  })