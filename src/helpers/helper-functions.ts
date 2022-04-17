
import nReadlines from 'n-readlines'
import ConsoleLogger from '../logger/ConsoleLogger';

export function* readFile(fileName: string) {
    let line;
    try {
        let broadLines = new nReadlines(fileName)
        while (line = broadLines.next()) {
            yield line.toString('ascii')
        }
    } catch (err) {
        (new ConsoleLogger()).error(err)
    }
}
