import '../config';
import { utils } from '../utils';
import { Evaluator, Rule, ShapeDesc, Grammar } from '../evaluator';

describe('shapes', function () {
    it('validation', function () {
        let shapeData = {
        }

        expect(() => new ShapeDesc(shapeData)).toThrowError();
    });

    it('default shape', function () {
        let shapeData = {
            shape: 'SQUARE'
        }

        let sd = new ShapeDesc(shapeData);
        expect(sd.shape).toEqual(sd.shape);
        expect(sd.transform).toEqual([1, 0, 0, 1, 0, 0]);
        expect(sd.hsv).toEqual([0, 0, 0]);
        expect(sd.color).toEqual([0, 0, 0, 1]);
        expect(sd.alpha).toEqual(1);
    });

    it('x/y', function () {
        let shapeData = {
            shape: 'SQUARE',
            adjustments: {
                x: 10,
                y: 5
            }
        };

        let sd = new ShapeDesc(shapeData);
        expect(sd.transform).toEqual([1, 0, 0, 1, shapeData.adjustments.x, shapeData.adjustments.y]);
    });

    it('rotate', function () {
        let sd1 = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                r: 10
            }
        });
        expect(sd1.transform).toEqual([0.984807753012208, 0.17364817766693033, -0.17364817766693033, 0.984807753012208, 0, 0]);

        let sd2 = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                rotate: 10
            }
        });
        expect(sd2.transform).toEqual([0.984807753012208, 0.17364817766693033, -0.17364817766693033, 0.984807753012208, 0, 0]);
    });

    it('size', function () {
        let sd1 = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                s: [10]
            }
        });
        expect(sd1.transform).toEqual([10, 0, 0, 10, 0, 0]);

        sd1 = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                s: 10
            }
        });
        expect(sd1.transform).toEqual([10, 0, 0, 10, 0, 0]);

        let sd2 = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                size: [10, 20]
            }
        });

        expect(sd2.transform).toEqual([10, 0, 0, 20, 0, 0]);
    });

    it('flip', function () {
        let sd1 = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                f: 10
            }
        });
        let expectedResult = [0.9396926207859084, 0.3420201433256687, 0.3420201433256687, -0.9396926207859084, 0, 0];
        expect(sd1.transform).toEqual(expectedResult);

        let sd2 = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                flip: 10
            }
        });
        expect(sd2.transform).toEqual(expectedResult);
    });

    it('skew', function () {
        let sd1 = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                skew: [10, 5]
            }
        });
        expect(sd1.transform).toEqual([1, 0.08748866352592401, 0.17632698070846498, 1, 0, 0]);
    });

    it('hsv', function () {
        let sd = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                h: [56],
                sat: 2
            }
        });
        expect(sd.hsv).toEqual([56, 1, 0]);
        expect(sd.color).toEqual([56, 1, 0, 1]);

        sd = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                h: [56, -0.2, 0.3],
                alpha: 2
            }
        });
        expect(sd.hsv).toEqual([56, -0.2, 0.3]);
        expect(sd.alpha).toEqual(1);
        expect(sd.color).toEqual([56, -0.2, 0.3, 1]);

        sd = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                h: [56, -0.2, 0.3, -2]
            }
        });
        expect(sd.hsv).toEqual([56, -0.2, 0.3]);
        expect(sd.alpha).toEqual(-1);
        expect(sd.color).toEqual([56, -0.2, 0.3, -1]);

        sd = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                sat: 0.5,
                b: 0.2
            }
        });
        expect(sd.hsv).toEqual([0, 0.5, 0.2]);
        expect(sd.color).toEqual([0, 0.5, 0.2, 1]);

        sd = new ShapeDesc({
            shape: 'SQUARE',
            adjustments: {
                saturation: 0.5,
                brightness: -0.4,
                a: 1.6
            }
        });
        expect(sd.hsv).toEqual([0, 0.5, -0.4]);
        expect(sd.alpha).toEqual(1);
        expect(sd.color).toEqual([0, 0.5, -0.4, 1]);
    });
});

describe('rules', function () {
    it('validation', function () {
        expect(() => new Rule({})).toThrowError();
    });


    it('default rule', function () {
        let r = new Rule({name: 'default'});
        expect(r.name).toEqual('default');
        expect(r.weight).toEqual(1);
        expect(r.shapes).toEqual([]);
    });
    
    it('custom rule', function () {
        let r = new Rule({ 
            name: 'default', 
            weight: 0.5,
            shapes: [
                {
                    shape: 'SQUARE'
                }
            ]
        });
        
        expect(r.name).toEqual(r.name);
        expect(r.weight).toEqual(r.weight);
        expect(r.shapes).toEqual([new ShapeDesc({shape: 'SQUARE'})]);
    });
});

describe('adjustments', function () {
    it('color', function () {

        expect(utils.adjustColor([0, 0, 0, 1], [0, 0, 0, 1]))
            .toEqual([0, 0, 0, 1]);
        expect(utils.adjustColor([340, 0, 0, 1], [270, 0, 0, 1]))
            .toEqual([250, 0, 0, 1]);
        expect(utils.adjustColor([340, 0.75, 0, 1], [270, 0.25, 0, 1]))
            .toEqual([250, 0.8125, 0, 1]);
        expect(utils.adjustColor([340, 0, 0.75, 1], [270, 0, 0.25, 1]))
            .toEqual([250, 0, 0.8125, 1]);
        expect(utils.adjustColor([340, 0, 0, 0.75], [270, 0, 0, 0.25]))
            .toEqual([250, 0, 0, 0.8125]);

        expect(utils.adjustColor([340, 0.75, 0, 1], [270, -0.25, 0, 1]))
            .toEqual([250, 0.5625, 0, 1]);
        expect(utils.adjustColor([340, 0, 0.75, 1], [270, 0, -0.25, 1]))
            .toEqual([250, 0, 0.5625, 1]);
        expect(utils.adjustColor([340, 0, 0, 0.75], [270, 0, 0, -0.25]))
            .toEqual([250, 0, 0, 0.5625]);
    });
});

describe('grammars', function () {
    it ('validation', function () {
        expect(() => new Grammar({})).toThrowError();
        expect(() => new Grammar({startshape: 'init'})).toThrowError();
        expect(() => new Grammar({ startshape: 'init', rules:[] })).toThrowError();
        expect(() => new Grammar({ startshape: 'init', rules: [
            {
                name: 'default',
            }
        ] })).toThrowError();
    });

    it ('default rule', function () {
        let desc = {
            startshape: 'init',
            rules: [
                {
                    name: 'init',
                }
            ]
        };
        let g = new Grammar(desc);
        expect(g).toEqual(new Grammar(desc));
        expect(g.startshape.shape).toEqual(desc.startshape);
        expect(g.rules.size).toEqual(1);
    });

    it('start shape', function () {
        let desc = {
            startshape: {
                shape: 'init',
                adjustments: {
                    saturation: 0.5,
                    brightness: -0.4,
                    a: 0.8
                },
            },
            rules: [
                {
                    name: 'init',
                }
            ]
        };
        let g = new Grammar(desc);
        expect(g).toEqual(new Grammar(desc));
        expect(g.startshape.shape).toEqual(desc.startshape.shape);
        expect(g.startshape.alpha).toEqual(desc.startshape.adjustments.a);
        expect(g.rules.size).toEqual(1);
    });
});

let midSquareGrammar = {
    startshape: 'init',
    rules: [
        {
            name: 'init',
            shapes: [
                {
                    shape: 'SQUARE',
                    adjustments: {
                        size: [0.5, 0.5]
                    }
                }
            ]
        }
    ]
};

describe('evaluator', function () {
    it("default evaluator", function () {
        let grammar = new Grammar(midSquareGrammar);
        let evaluator = new Evaluator(grammar);
        expect(evaluator).toBeDefined();
    });
});
