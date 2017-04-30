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

import './config';
import * as _ from 'lodash';
import {utils} from './utils';

type JsonData = any;

export class ShapeDesc {
    shape: string;
    ordered: boolean = false;
    data: JsonData;
    
    replacements: Array<Rule>;
    transform: Array<number>;
    hsv: Array<number>;
    alpha: number = 1;

    constructor(data: JsonData) {
        this.data = data;
        this.shape = data.shape;
        this.ordered = data.ordered;
        this.transform = utils.identity();
        this.hsv = [0, 0, 0];

        let adjustments = data.adjustments || {};
        this.compileAdjustments(adjustments);
    }

    compileAdjustments(adjustments: JsonData) {
        _.each(adjustments, (paramValue, paramName) => {
            switch(paramName) {
                case 'x':
                    this.transform = utils.adjustTransform(this.transform, [1, 0, 0, 1, paramValue, 0]);
                    break;
                case 'y':
                    this.transform = utils.adjustTransform(this.transform, [1, 0, 0, 1, 0, paramValue]);
                    break;
                case 'rotate':
                case 'r':
                    let rotate = paramValue
                    let cosTheta = Math.cos(-2 * Math.PI * rotate / 360);
                    let sinTheta = Math.sin(-2 * Math.PI * rotate / 360);
                    this.transform = utils.adjustTransform(
                        this.transform,
                        [cosTheta, -sinTheta, sinTheta, cosTheta, 0, 0]);
                    break;
                case 's':
                case 'size':
                    let s = paramValue;
                    if (typeof s === 'number') {
                        s = [s, s];
                    } else if (s.length == 1) {
                        s = [s[0], s[0]];
                    }
                    this.transform = utils.adjustTransform(
                        this.transform,
                        [s[0], 0, 0, s[1], 0, 0]);
                    break;
                case 'h':
                case 'hue':
                    let h = paramValue;
                    if (typeof h === 'number') {
                        this.hsv[0] = h;
                        this.hsv[1] = this.getArg(adjustments, 0, 'sat', 'saturation');
                        this.hsv[2] = this.getArg(adjustments, 0, 'b', 'brightness');
                        this.alpha = this.getArg(adjustments, 1, 'a', 'alpha');
                    } else if (h.length === 3) {
                        this.hsv = h.slice(0, 3);
                        this.alpha = this.getArg(adjustments, 1, 'a', 'alpha');
                    } else if (h.length === 4) {
                        this.hsv = h.slice(0, 3);
                        this.alpha = h[3];
                    }
                    break;
            }
        });

        // this.flip = this.getArg(adjustments, null, 'f', 'flip');
        // this.skew = this.getArg(adjustments, null, 'skew');

        this.replacements = [];
        if (adjustments.replacements) {
            this.replacements = adjustments.replacements.map(r => new Rule(r));
        }
    }

    getArg(data: JsonData, defaultValue: any, ...argNames): any {
        for (let arg of argNames) {
            if (data[arg] !== undefined) {
                return data[arg];
            }
        }
        return defaultValue;
    }
}

export class Rule {
    name: string;
    weight: number;
    shapes: Array<ShapeDesc> = [];

    constructor(data: JsonData) {
        this.name = data.name;
        this.weight = data.weight || 1;

        if (data.shapes) {
            this.shapes = data.shapes.map(s => new ShapeDesc(s));
        }
    }
}

interface Grammar {
    startshape: string;
    // background
    // size : need clip support
    rules: Map<string, Array<Rule>>;
}

export class Evaluator {
    _grammar: Grammar;

    constructor (grammar) {
        // Compile for each rule the transform and the color adjustement.

        // For split evaluation:
            // loop over the rule until not able to create new shape
            // draw each found shapes
    }

    evaluate () {

    }
}
