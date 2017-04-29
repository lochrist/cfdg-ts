import '../config';
import { Evaluator, Rule } from '../evaluator';

describe("Player", function () {
    describe('rules', function () {
        it('Default rule', function () {
            let ruleDesc = {
                name: 'testrule'
            }

            let r = new Rule(ruleDesc);
            expect(r.transform).toBeDefined();
            expect(r.hsv).toBeDefined();

        });
    });

    it("should be able to play a Song", function () {
        let evaluator = new Evaluator({});
        expect(evaluator).toBeDefined();
    });
});
