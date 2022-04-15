/*
    This IReader interface must be implemented 
    by any new FileReader classe as the needs of the application evolve.
*/

export default interface IReader  {
    read(): Generator<string> | undefined;
}