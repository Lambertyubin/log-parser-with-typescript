/*
    The ILogger interface must be implemented 
    by any new Loggger classe as the logging needs of the application evolve.
*/

export default interface ILogger {
    saved(): void
    error(err: any | unknown): void
}