import ILogger from "../interfaces/ILogger";

/*
    A class that logs messages to the command line to notify the user.
    The ILogger interface can be implemented by any other logger - like 3rd party loggers. 
*/

export default class ConsoleLogger implements ILogger {
    constructor(){
        
    }
    saved(): void{
        console.log("File parsed and saved to output successfully");
    }
    error(err: Error): void {
        console.error("Error occured", err)
    }
}