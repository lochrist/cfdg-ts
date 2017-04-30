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

    x?: number;
    y?: number;
    z?: number;
    sx?: number;
    sy?: number;
    sz?: number;
    rotate?: number;
    flip?: number;
    skew?: number;
    alpha?: number;

    replacements: Array<Rule>;
    transform: Array<number>;
    hsv: Array<number>;

    constructor(data: JsonData) {
        this.shape = data.shape;
        this.ordered = data.ordered;
        let adjustments = data.adjustments || {};
        this.compileAdjustments(adjustments);
    }

    compileAdjustments(adjustments: JsonData) {
        this.x = this.getArg(adjustments, 0, 'x');
        this.y = this.getArg(adjustments, 0, 'y');
        // this.z = this.getArg(data, 0, 'z');
        this.transform = utils.adjustTransform(utils.identity(), [1, 0, 0, 1, this.x, this.y]);

        this.rotate = this.getArg(adjustments, null, 'r', 'rotate');
        if (this.rotate !== null) {
            let cosTheta = Math.cos(-2 * Math.PI * this.rotate / 360);
            let sinTheta = Math.sin(-2 * Math.PI * this.rotate / 360);
            this.transform = utils.adjustTransform(
                this.transform,
                [cosTheta, -sinTheta, sinTheta, cosTheta, 0, 0]);
        }

        let s = this.getArg(adjustments, null, 's', 'size');
        if (s !== null) {
            if (typeof s === 'number') {
                this.sx = this.sy = this.sz = s;
            } else if (s.length == 1) {
                this.sx = this.sy = this.sz = s[0];
            } else if (s.length == 2) {
                this.sx = s[0]
                this.sy = s[1]
            }
            this.transform = utils.adjustTransform(
                this.transform,
                [this.sx, 0, 0, this.sy, 0, 0]);
        }

        this.flip = this.getArg(adjustments, null, 'f', 'flip');
        this.skew = this.getArg(adjustments, null, 'skew');

        this.hsv = [0, 0, 0];
        let h = this.getArg(adjustments, [0, 0, 0], 'h', 'hue');
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
