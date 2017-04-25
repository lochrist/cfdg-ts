/**
 * create builder
 * 
 * input to compiler is json
 * 
 * program
 *     backgroung
 *     size
*      startshape
 *     rule
*      no need for path? user could just specify its drawing function assuming canvas is used
 * 
 * compile each rule
 *      color adjust
 *      transform adjust
 * 
 * runner
 *      use canvas
 *      first pass: eval all rules until no timeslice (no animation)
 *      need to have a 
 *      run for how much time? how to animate
 *      
 * 
 */

class Rule {
    name: string;
    weight: number = 1;
    x?: number;
    y?: number;
    z?: number;
    size?: number;
    rotate?: number;
    flip?: number;
    skew?: number;
    transform?: Array<number>;
    hsv?: Array<number>;
    targetHsv?: Array<number>;
    replacements?: Array<Rule>;

    constructor (name: string, data: any) {

    }
}

interface Grammar {
    startshape: string;
    // background
    // size : need clip support
    rules: Map<string, Array<Rule>>;
}


export class Evaluator {
    constructor(grammar) {

    }
}
