import IOutputData from "../../src/interfaces/data/IOutputData";

let mockparser;

export default mockparser = {
  read: jest.fn((): Generator<string> | undefined => undefined),
  save: jest.fn((outputData: IOutputData, count: number): void => { }),
  transform: jest.fn((inputData: string): IOutputData => { return { timestamp: 12345, loglevel: "error", transactionId: "my-id", err: "Error Message" } }),
  parse: jest.fn((): void => { })
}