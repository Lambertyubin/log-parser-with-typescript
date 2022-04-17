import ErrorExtractor from "../../src/transformer/ErrorExtractor";
import IOutputData from '../../src/interfaces/data/IOutputData';


describe('ErrorExtractor', () => {
  const mockInputData = {
    withoutError: '2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}',
    withError: '2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}'

  };

  const expectedOutputData: IOutputData = {
    timestamp: 1628475171259,
    loglevel: "error",
    transactionId: "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
    err: "Not found"
  }



  it("returns transformed output when message has level error", () => {

    let errorExtractor = new ErrorExtractor()
    let output = errorExtractor.transform(mockInputData.withError.toString())

    expect(output).toEqual(expectedOutputData)

  })

  test("returns undefined when message has no level error", () => {

    let errorExtractor = new ErrorExtractor()
    let output = errorExtractor.transform(mockInputData.withoutError.toString())

    expect(output).toBeUndefined()

  })



});
