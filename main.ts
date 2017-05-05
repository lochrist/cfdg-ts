import './config';
import {Builder} from './builder';
import { CanvasRenderer } from './canvas-renderer';
import { Evaluator, Grammar, EvaluationType} from './evaluator';

let midSquareGrammar = {
    startshape: 'init',
    rules: [
        {
            name: 'init',
            shapes: [
                {
                    shape: 'square',
                    adjustments: {
                        h: [100, 0.5, 0.5]
                    }
                },
                {
                    shape: 'square',
                    adjustments: {
                        h: [200, 0.7, 0.7, 0.5],
                        size: 0.5
                    }
                }
            ]
        },
        {
            name: 'square',
            shapes: [
                {
                    shape: 'SQUARE',
                    adjustments: {
                        rotate: 45,
                        h: 45
                    }
                }
            ]
        }
    ]
};

let grammar = new Grammar(midSquareGrammar)
let evaluator = new Evaluator(grammar);

evaluator.evaluate(EvaluationType.RulesSync);

let canvas = document.getElementById('CFDG') as HTMLCanvasElement;
let renderer = new CanvasRenderer(canvas);
renderer.render(evaluator.shapes);