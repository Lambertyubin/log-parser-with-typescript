import IReader from "./IReader"
import IWriter from "./IWriter"
import ITransformer from "./ITransformer"

/*
    The ILogParser interface must be implemented 
    by any new LogParser classe as the needs of the application evolve.
*/

export default interface ILogParser extends IReader, IWriter, ITransformer{
    parse(): void
}
