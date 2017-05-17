import './lib/cfdg-parser.js';

declare var CFDG: any;

export class Builder {
    constructor() {
        console.log('builder created', CFDG);
    }
}

export function parseGrammar(source: string): JsonData {
    return CFDG.parse(source);
}