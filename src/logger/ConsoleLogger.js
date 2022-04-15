"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    A class that logs messages to the command line to notify the user.
    The ILogger interface can be implemented by any other logger - like 3rd party loggers.
*/
class ConsoleLogger {
    constructor() {
    }
    saved() {
        console.log("File parsed and saved to output successfully");
    }
    error(err) {
        console.error("Error occured", err);
    }
}
exports.default = ConsoleLogger;
