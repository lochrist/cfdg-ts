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
import {utils, Shape} from './utils';

export class ShapeDesc {
    shape: string;
    data: JsonData;
    transform: Transform;
    hsv: Hsv;
    alpha: number = 1;
    color: Color;
    isTerminal: boolean

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
        this.isTerminal = this.shape === 'SQUARE' || this.shape === 'CIRCLE' || this.shape === 'TRIANGLE';
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

        this.color = [this.hsv[0], this.hsv[1], this.hsv[2], this.alpha];
    }
}

export class Rule {
    name: string;
    weight: number;
    shapes: Array<ShapeDesc> = [];
    probability: number = 0;

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
    ruleGroups: Map<string, Array<Rule>> = new Map<string, Array<Rule>>()

    constructor (data: JsonData) {
        if (!data.startshape) {
            throw new Error('startshape is needed');
        }

        if (!data.rules) {
            throw new Error('no rules');
        }

        let rules = data.rules.map(r => new Rule(r));
        for (let r of rules) {
            if (!this.ruleGroups.has(r.name)) {
                this.ruleGroups.set(r.name, new Array<Rule>());
            }
            this.ruleGroups.get(r.name).push(r);
        }

        this.startshape = _.isString(data.startshape) ? new ShapeDesc({shape: data.startshape}) : new ShapeDesc(data.startshape);
        let startShapeRule = this.ruleGroups.get(this.startshape.shape);
        if (!startShapeRule || startShapeRule.length === 0) {
            throw new Error('startshape: ' + this.startshape.shape + ' is not specified in rules');
        }

        for (let rules of this.ruleGroups.values()) {
            let totalWeight = rules.reduce((t, r) => r.weight + t, 0);
            for (let r of rules) {
                r.probability = r.weight / totalWeight;
            }
        }
    }

    getRule (ruleName: string, probability?: number) : Rule {
        let rg = this.ruleGroups.get(ruleName);
        if (rg.length === 1) {
            return rg[0];
        }

        let probabilityTotal = 0;
        probability = probability === undefined ? Math.random() : probability;
        for (let r of rg) {
            probabilityTotal += r.probability;
            if (probability < probabilityTotal) {
                return r;
            }
        }

        // Should not be here...
        return rg[rg.length - 1];
    }
}

export class EvalDesc {
    transform: Transform;
    color: Color;
    shapeDesc: ShapeDesc;
    constructor(transform: Transform, color: Color, shapeDesc: ShapeDesc) {
        this.transform = transform;
        this.color = color;
        this.shapeDesc = shapeDesc;
    }
}

export enum EvaluationType {
    RulesSync,
    RulesASync,
    RuleAndShapeSync,
    RuleAndShapeASync
}

export class RuleStat {
    count: number = 0;
}

export class EvaluationStats {
    rules: Map<string, RuleStat> = new Map<string, RuleStat>()
    shapes: Shape[] = [];
    evaluationTime: number;
    _startEvaluation: number;
    renderTime: number;
    culledShapeCount: number = 0;

    startEvaluation () {
        this._startEvaluation = Date.now();
    }

    endEvaluation(shapes: Shape[]) {
        this.evaluationTime = Date.now() - this._startEvaluation;
        this.shapes = shapes;
    }

    evalRule (rule: Rule) {
        let ruleName = rule.name + '_' + rule.probability;
        if (!this.rules.has(ruleName)) {
            this.rules.set(ruleName, new RuleStat());
        }
        let ruleStat = this.rules.get(ruleName);
        ruleStat.count++;
    }

    totalRules () {
        let nbRules = 0;
        this.rules.forEach(r => nbRules = nbRules + r.count);
        return nbRules;
    }
}

export class Evaluator {
    grammar: Grammar;
    evaluationStack: EvalDesc[] = [];
    shapes: Shape[] = [];
    stats: EvaluationStats;

    constructor (grammar: Grammar) {
        this.grammar = grammar;
        this.stats = new EvaluationStats();
        // TODO: For split evaluation:
            // loop over the rule until not able to create new shape
            // draw each found shapes
    }

    evaluate(evalType: EvaluationType) : void {
        let initialTransform = utils.identity();
        let initialColor = utils.defaultColor();
        this.evaluationStack.push(new EvalDesc(initialTransform, initialColor, this.grammar.startshape));

        this._evalRulesSync();
    }

    _evalRulesSync () : Shape[] {
        this.stats.startEvaluation();
        while (this.evaluationStack.length) {
            this._evaluateTick();
        }
        this.stats.endEvaluation(this.shapes);
        return this.shapes;
    }

    _evaluateTick(): Shape {
        if (this.evaluationStack.length === 0) {
            throw new Error('Evaluation is empty');
        }

        let desc = this.evaluationStack.shift();
        let transform = utils.adjustTransform(desc.transform, desc.shapeDesc.transform);
        let color = utils.adjustColor(desc.color, desc.shapeDesc.color);

        // TODO check shape transform size to see if we stop recursion.

        let shape;
        if (desc.shapeDesc.isTerminal) {
            let shape = new Shape(desc.shapeDesc.shape, transform, color);
            this.shapes.push(shape);
            return shape;
        }

        let rule = this.grammar.getRule(desc.shapeDesc.shape);
        this.stats.evalRule(rule);
        for (let sd of rule.shapes) {
            this.evaluationStack.push(new EvalDesc(transform, color, sd));
        }
    }
}
