import IOutputData from './data/IOutputData'

/*
    This ITransformer interface must be implemented 
    by any new Error extractor classes as the needs of the application evolve.
*/

export default interface ITransformer {
    transform(input:string):IOutputData | undefined
}