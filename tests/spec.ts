import '../config';
import { Evaluator, Rule } from '../evaluator';


describe('rules', function () {
    it('Default rule', function () {
        let ruleDesc = {
            name: 'defaultRule'
        }

        let r = new Rule(ruleDesc);
        expect(r.name).toEqual(ruleDesc.name);
        expect(r.transform).toEqual([1, 0, 0, 1, 0, 0]);
        expect(r.hsv).toEqual([0, 0, 0]);
        expect(r.alpha).toEqual(1);
    });
});

it("Create evaluator", function () {
    let evaluator = new Evaluator({});
    expect(evaluator).toBeDefined();
});
