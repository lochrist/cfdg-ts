import 'cfdg-parser';

declare var CFDG: any;

export class Builder {
    constructor() {
        console.log('builder created', CFDG);
    }
}

function parseRuleAdjustments(adjustmentDesc: any[]) {
    let a : any = {};

    if (adjustmentDesc[0] !== 'ADJUSTMENTS') {
        throw new Error('Unexpected desc adjustement: ' + adjustmentDesc[0]);
    }

    for (let adjustment of adjustmentDesc[1]) {
        switch (adjustment[0]) {
            case 'XSHIFT':
                a.x = adjustment[1];
                break;
            case 'YSHIFT':
                a.y = adjustment[1];
                break;
            case 'ZSHIFT':
                a.z = adjustment[1];
                break;
            case 'ROTATE':
                a.rotate = adjustment[1];
                break;
            case 'SIZE':
                a.size = adjustment.slice(1, 3);
                break;
            case 'SKEW':
                a.skew = [adjustment[1], adjustment[2]];
                break;
            case 'FLIP':
                a.flip = adjustment[1];
                break;
            case 'HUE':
                a.hue = adjustment[1];
                break;
            case 'SATURATION':
                a.saturation = adjustment[1];
                break;
            case 'BRIGHTNESS':
                a.brightness = adjustment[1];
                break;
            case 'ALPHA':
                a.alpha = adjustment[1];
                break;
            default: 
                throw new Error('Unsupported token adjustement: ' + adjustment[0]);
        }
    }

    return a;
}

function parseRuleShape (shapeDesc: any[]) {
    if (shapeDesc[0] !== 'REPLACEMENT') {
        throw new Error('Unexpected token in rule shape: ' + shapeDesc[0]);
    }

    return {
        shape: shapeDesc[1],
        adjustments: shapeDesc.length === 3 ? parseRuleAdjustments(shapeDesc[2]) : {}
    }
}

function parseRule(rule: any[]) {
    return {
        name: rule[1],
        weight: rule[2],
        shapes: rule[3].map(parseRuleShape)
    }
}

export function parseGrammar(source: string): JsonData {
    let ast = CFDG.parse(source);
    let grammar : any = {rules: []};

    for (let rules of ast) {
        if (rules[0] === 'RULE') {
            let r = parseRule(rules);
            grammar.rules.push(r);
        } else if (rules[0] === 'STARTSHAPE') {
            grammar.startshape = rules[1];
        } else {
            throw new Error('Unexpected token: ' + rules[0]);
        }
    }

    return grammar;
}