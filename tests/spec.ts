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
});

it("Create evaluator", function () {
    let evaluator = new Evaluator({});
    expect(evaluator).toBeDefined();
});
