import ITransformer from '../interfaces/ITransformer'
import IInputData from "../interfaces/data/IInputData";
import IOutputData from "../interfaces/data/IOutputData";

/*
    A class that finds and extracts all the messages with level error from the logs 
    It has full control over the ouput format and can be extended to represent the extracted messages in multiple formats. 
*/

export default class ErrorExtractor implements ITransformer {
    filter: string = "error"

    constructor(filter?: string) {
        if (filter) this.filter = filter;
    }

    transform(input: string): IOutputData | undefined {

        const dataLineAsArray: string[] = input.split('- {')
        let [first, second] = dataLineAsArray
        second = "{" + second

        let level = first.split(" - ")[1].trim()
        let timestamp = first.split(" - ")[0]

        const newArray: string[] = []
        newArray[0] = timestamp
        newArray[1] = level
        newArray[2] = second

        return newArray[1] === this.filter ? this.constructOutput(newArray) : undefined;

    }

    private constructOutput = (item: string[]): IOutputData => {
        let [time, level, details] = item;

        let myDetails: IInputData = JSON.parse(details);

        let timeStamp: number = new Date(time).getTime();

        let output: IOutputData = {
            timestamp: timeStamp,
            loglevel: level,
            transactionId: myDetails.transactionId,
            err: myDetails.err
        }
        return output;
    }

}