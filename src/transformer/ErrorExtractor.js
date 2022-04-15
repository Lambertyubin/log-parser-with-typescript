"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    A class that finds and extracts all the messages with level error from the logs
    It has full control over the ouput format and can be extended to represent the extracted messages in multiple formats.
*/
class ErrorExtractor {
    constructor(filter) {
        this.filter = "error";
        this.constructOutput = (item) => {
            let [time, level, details] = item;
            let myDetails = JSON.parse(details);
            let timeStamp = new Date(time).getTime();
            let output = {
                timestamp: timeStamp,
                loglevel: level,
                transactionId: myDetails.transactionId,
                err: myDetails.err
            };
            return output;
        };
        if (filter)
            this.filter = filter;
    }
    transform(input) {
        const dataLineAsArray = input.split(' - ');
        return dataLineAsArray[1] === this.filter ? this.constructOutput(dataLineAsArray) : undefined;
    }
}
exports.default = ErrorExtractor;
