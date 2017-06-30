import './config';
import { AppView } from './app-view';
import 'mithril';

let m = (window as any).m;

let anchor = document.querySelector('#mithril-root');
m.mount(anchor, { 
    view: function () { 
        return m(AppView, {}) 
    } 
});