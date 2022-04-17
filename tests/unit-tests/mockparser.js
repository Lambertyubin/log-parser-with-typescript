"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mockparser;
exports.default = mockparser = {
    read: jest.fn(() => undefined),
    save: jest.fn((outputData, count) => { }),
    transform: jest.fn((inputData) => { return { timestamp: 12345, loglevel: "error", transactionId: "my-id", err: "Error Message" }; }),
    parse: jest.fn(() => { })
};
