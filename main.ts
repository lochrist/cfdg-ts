import {Builder} from './builder';
import { Evaluator} from './evaluator';

let b = new Builder();

let el = document.createElement('div');
let newContent = document.createTextNode("Hi there and greetings!");
el.appendChild(newContent);
document.body.appendChild(el);

console.log('init');