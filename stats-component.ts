import 'mithril';
import _ = require('lodash');
import {EvaluationStats} from './evaluator';

let m = (window as any).m;

export class Stats {
    oninit (vnode) {
        console.log("stats-comp-initialized")
    }
    
    oncreate (vnode) {
        console.log("stats-comp-DOM created")
    }

    onupdate (vnode) {
        console.log("stats-comp-DOM updated")
    }
    
    onbeforeremove (vnode) {
        console.log("stats-comp-onbeforemove")
    }

    onremove (vnode) {
        console.log("stats-comp-removing DOM element")
    }

    onbeforeupdate (vnode, old) {
        return true
    }

    view (vnode) {
        let stats = vnode.attrs.stats as EvaluationStats;
        let rulesEntries = Array.from(stats.rules.entries());
        let rules: any[] = [m('div', {}, 'Rules')].concat(rulesEntries.map(entry => {
            return this._statLine(entry[0], entry[1].count);
        }));

        let shapes: any[] = _.map(stats.shapeStats(), (count, shapeName) => {
            return this._statLine(shapeName, count);
        });

        return m('div', {className: 'stat-report'}, [
            this._statLine('Time', stats.evaluationTime),
            this._statLine('Nb Shapes', stats.shapes.length),
            m('div', {}, shapes),
            this._statLine('Nb Rules', stats.totalRules()),
            m('div', {}, rules)
        ]);
    }

    _statLine (label: string, statVdom) {
        return m('div', {className: 'stat-line'}, [
            m('span', {className: 'stat-label'}, label),
            m('span', { className: 'stat-value' }, statVdom)
        ]);
    }
}