'use strict';

const renderer = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./html.js'))

Object.defineProperty(exports, '__esModule', {value: true}).default = hyper

function hyper({ bind }, html) { 
  return renderer({
    lib(node) {
      if(!node.html) {
        node.html = bind(node.shadowRoot || node)
      }
      return html || node.html
    },
    render(template) {
      return this.html`${template}`
    }
  })
}
exports.hyper = hyper
