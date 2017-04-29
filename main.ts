import './config';
import {Builder} from './builder';
import { Evaluator, Rule, Test} from './evaluator';

let b = new Builder();
let e = new Test();

let el = document.createElement('div');
let newContent = document.createTextNode("Hi there and greetings!");
el.appendChild(newContent);

document.body.appendChild(el);

console.log('init');