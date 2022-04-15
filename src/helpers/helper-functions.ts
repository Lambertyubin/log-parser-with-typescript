import nReadlines from 'n-readlines'

export function* readFile(fileName:string){
    let line;
    try {
        let broadLines = new nReadlines(fileName)
        while(line = broadLines.next()){
            yield line.toString('ascii')
        }
    } catch (error) {
        console.log(error)
    }
}
