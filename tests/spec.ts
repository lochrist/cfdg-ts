import '../config';
import { Evaluator, Rule, ShapeDesc } from '../evaluator';

describe('shapes', function () {
    it('Default shape', function () {
        let shapeData = {
            shape: 'SQUARE'
        }

        let sd = new ShapeDesc(shapeData);
        expect(sd.shape).toEqual(sd.shape);
        expect(sd.transform).toEqual([1, 0, 0, 1, 0, 0]);
        expect(sd.hsv).toEqual([0, 0, 0]);
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
            name: 'SQUARE',
            adjustments: {
                r: 10
            }
        });
        expect(sd1.transform).toEqual([0.984807753012208, 0.17364817766693033, -0.17364817766693033, 0.984807753012208, 0, 0]);

        let sd2 = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                rotate: 10
            }
        });
        expect(sd2.transform).toEqual([0.984807753012208, 0.17364817766693033, -0.17364817766693033, 0.984807753012208, 0, 0]);
    });

    it('size', function () {
        let sd1 = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                s: [10]
            }
        });
        expect(sd1.transform).toEqual([10, 0, 0, 10, 0, 0]);

        sd1 = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                s: 10
            }
        });
        expect(sd1.transform).toEqual([10, 0, 0, 10, 0, 0]);

        let sd2 = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                size: [10, 20]
            }
        });

        expect(sd2.transform).toEqual([10, 0, 0, 20, 0, 0]);
    });

    it('flip', function () {
        let sd1 = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                f: 10
            }
        });
        let expectedResult = [0.9396926207859084, 0.3420201433256687, 0.3420201433256687, -0.9396926207859084, 0, 0];
        expect(sd1.transform).toEqual(expectedResult);

        let sd2 = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                flip: 10
            }
        });
        expect(sd2.transform).toEqual(expectedResult);
    });

    it('skew', function () {
        let sd1 = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                skew: [10, 5]
            }
        });
        expect(sd1.transform).toEqual([1, 0.08748866352592401, 0.17632698070846498, 1, 0, 0]);
    });

    it('hsv', function () {
        let sd = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                h: [56],
                sat: 2
            }
        });
        expect(sd.hsv).toEqual([56, 1, 0]);

        sd = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                h: [56, -0.2, 0.3],
                alpha: 2
            }
        });
        expect(sd.hsv).toEqual([56, -0.2, 0.3]);
        expect(sd.alpha).toEqual(1);

        sd = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                h: [56, -0.2, 0.3, -2]
            }
        });
        expect(sd.hsv).toEqual([56, -0.2, 0.3]);
        expect(sd.alpha).toEqual(-1);

        sd = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                sat: 0.5,
                b: 0.2
            }
        });
        expect(sd.hsv).toEqual([0, 0.5, 0.2]);

        sd = new ShapeDesc({
            name: 'SQUARE',
            adjustments: {
                saturation: 0.5,
                brightness: -0.4,
                a: 1.6
            }
        });
        expect(sd.hsv).toEqual([0, 0.5, -0.4]);
        expect(sd.alpha).toEqual(1);
    });
});

it("Create evaluator", function () {
    let evaluator = new Evaluator({});
    expect(evaluator).toBeDefined();
});
