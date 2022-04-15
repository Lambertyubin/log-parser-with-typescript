import IReader from '../interfaces/IReader'
import {readFile} from '../helpers/helper-functions'
import fs from 'fs';

/*
    A class that reads log messages from an input file. 
    Uses a helper function (readFile) to read the file line-by-line 
    for memory efficiency especially when the input file becomes large
*/

export default class FileReader implements IReader {
    inputFilePath: string;

    constructor(inputFilePath: string){
        if(!this.fileExists(inputFilePath)){
            throw new Error(`Input File does not exist`)
        }
        this.inputFilePath = inputFilePath
    }

    read():Generator<string>|undefined{
        let exists = this.fileExists(this.inputFilePath)
        if(!exists){
            return undefined
        }
        let output = readFile(this.inputFilePath)
        return output;
    }

    InputFilePath():string{
        return this.inputFilePath
    }
    private fileExists(inputFile:string):boolean{
        return fs.existsSync(inputFile)
    }
}