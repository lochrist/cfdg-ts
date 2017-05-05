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
        if (!this.shape) {
            throw new Error('Shape with no name');
        }

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
                        // modulo 360
                        this.hsv[0] = h;
                    } else if (h.length === 1) {
                        this.hsv[0] = h[0];
                    } else if (h.length === 3) {
                        this.hsv = h.slice(0, 3);
                    } else if (h.length === 4) {
                        this.hsv = h.slice(0, 3);
                        this.alpha = h[3];
                    }
                    break;
                case 'sat':
                case 'saturation':
                    // [-1, 1]
                    this.hsv[1] = paramValue;
                    break;
                case 'b':
                case 'brightness':
                    // [-1, 1]
                    this.hsv[2] = paramValue
                    break;
                case 'a':
                case 'alpha':
                    // [-1, 1]
                    this.alpha = paramValue;
                    break;
                case 'f':
                case 'flip':
                    let c = Math.cos(Math.PI * paramValue / 90);
                    let scale = Math.sin(Math.PI * paramValue / 90);
                    this.transform = utils.adjustTransform(this.transform, [c, scale, scale, -c, 0, 0]);
                    break;
                case 'skew':
                    let sx = Math.tan(Math.PI * paramValue[0] / 180);
                    let sy = Math.tan(Math.PI * paramValue[1] / 180);
                    this.transform = utils.adjustTransform(this.transform, [1, sy, sx, 1, 0, 0]); 
                    break;
            }
        });

        // s-v and alpha => [-1, 1]
        for (let i = 1; i < 3; ++i) {
            this.hsv[i] = Math.min(Math.max(this.hsv[i], -1), 1);
        }
        this.alpha = Math.min(Math.max(this.alpha, -1), 1);

        this.replacements = [];
        // TODO Replacement: need to handle loop and *
        if (adjustments.replacements) {
            this.replacements = adjustments.replacements.map(r => new Rule(r));
        }
    }
}

export class Rule {
    name: string;
    weight: number;
    shapes: Array<ShapeDesc> = [];

    constructor(data: JsonData) {
        this.name = data.name;
        if (!this.name) {
            throw new Error('Rule with no name');
        }
        this.weight = data.weight || 1;

        if (data.shapes) {
            this.shapes = data.shapes.map(s => new ShapeDesc(s));
        }
    }
}

export class Grammar {
    startshape: ShapeDesc;
    // TODO background
    rules: Map<string, Array<Rule>> = new Map<string, Array<Rule>>()

    constructor (data: JsonData) {
        if (!data.startshape) {
            throw new Error('startshape is needed');
        }

        if (!data.rules) {
            throw new Error('no rules');
        }

        let rules = data.rules.map(r => new Rule(r));
        for (let r of rules) {
            if (!this.rules.has(r.name)) {
                this.rules.set(r.name, new Array<Rule>());
            }
            this.rules.get(r.name).push(r);
        }

        this.startshape = _.isString(data.startshape) ? new ShapeDesc({shape: data.startshape}) : new ShapeDesc(data.startshape.shape);
        let startShapeRule = this.rules.get(this.startshape.shape);
        if (!startShapeRule || startShapeRule.length === 0) {
            throw new Error(`startshape: ${this.startshape.shape} is not specified in rules`);
        }
    }
}

export class Evaluator {
    grammar: Grammar;

    constructor (grammar) {
        // For split evaluation:
            // loop over the rule until not able to create new shape
            // draw each found shapes
    }

    evaluate () {

    }
}
