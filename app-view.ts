import 'mithril';
import _ = require('lodash');
import { Builder, parseGrammar } from './builder';
import { CanvasRenderer } from './canvas-renderer';
import { Evaluator, Grammar, EvaluationType, EvaluationStats } from './evaluator';

let m = (window as any).m;

interface MithrilModel {
    (newValue?: any) : any;
}

function makeModel(initialValue): MithrilModel {
    let value = initialValue;
    return function (newValue) {
        if (arguments.length) {
            value = newValue;
        }
        return value;
    }
}

const midSquareGrammarStr = `
startshape init

rule init {
    square [h 100 sat 0.5 b 0.5]
    square [h 200 sat 0.7 b 0.7 a 0.5 s 0.5]
}

rule square {
    SQUARE [r 45 h 45]
}`;

export class AppView {
    grammarModel: MithrilModel;
    stats: EvaluationStats
    canvas: HTMLCanvasElement;
    renderer: CanvasRenderer;

    constructor(vnode) {
        this.grammarModel = makeModel(midSquareGrammarStr);
    }

    oninit (vnode) {
        console.log("stats-comp-initialized");
    }
    
    oncreate (vnode) {
        console.log("stats-comp-DOM created");
        this.canvas = document.getElementById('CFDG') as HTMLCanvasElement;
        this.renderer = new CanvasRenderer(this.canvas);
    }

    onupdate (vnode) {
        console.log("stats-comp-DOM updated");
    }
    
    onbeforeremove (vnode) {
        console.log("stats-comp-onbeforemove");
    }

    onremove (vnode) {
        console.log("stats-comp-removing DOM element");
    }

    onbeforeupdate (vnode, old) {
        return true
    }

    view (vnode) {
        return m('div', {}, [
            this._grammarView(),
            this._report()
        ]);
    }

    _grammarView() {
        return m('div', {}, [
            m('textarea', { rows: "25", style: { width: '350px' }, 
                value: this.grammarModel(),
                onchange: m.withAttr('value', this.grammarModel)
             }),
            m('div', { className: 'button-row'}, [
                m('button', {onclick: () => this._evaluateGrammar()}, 'Evaluate')
            ])
        ]);
    }

    _report() {
        if (!this.stats) {
            return m('div');
        }

        let rulesEntries = Array.from(this.stats.rules.entries());
        let rules: any[] = [m('div', {}, 'Rules')].concat(rulesEntries.map(entry => {
            return this._statLine(entry[0], entry[1].count);
        }));

        let shapes: any[] = _.map(this.stats.shapeStats(), (count, shapeName) => {
            return this._statLine(shapeName, count);
        });

        return m('div', { className: 'stat-report' }, [
            this._statLine('Time', this.stats.evaluationTime),
            this._statLine('Nb Shapes', this.stats.shapes.length),
            m('div', {}, shapes),
            this._statLine('Nb Rules', this.stats.totalRules()),
            m('div', {}, rules)
        ]);
    }

    _statLine (label: string, statVdom) {
        return m('div', {className: 'stat-line'}, [
            m('span', {className: 'stat-label'}, label),
            m('span', { className: 'stat-value' }, statVdom)
        ]);
    }

    _evaluateGrammar () {
        let grammarStr = this.grammarModel();
        let grammar = new Grammar(parseGrammar(grammarStr));
        let evaluator = new Evaluator(grammar);
        evaluator.evaluate(EvaluationType.RulesSync);
        this.renderer.render(evaluator.shapes);

        this.stats = evaluator.stats;
    }
}

