import IOutputData from './data/IOutputData'

/*
    The IWriter interface must be implemented 
    by any new Writer class as the needs of the app evolve.
*/

export default interface IWriter {
    save(output:IOutputData |string, count:number): void
}