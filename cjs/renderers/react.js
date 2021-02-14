'use strict';

const renderer = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./html.js'))

Object.defineProperty(exports, '__esModule', {value: true}).default = react

function react(ReactDOM, html = ReactDOM.createElement || ReactDOM.html) {
  return renderer({ html, render: ReactDOM.render })
}
exports.react = react