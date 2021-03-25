'use strict';
const renderer = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./html.js'))

function createHyper(VNode) {
  return function h(name, attrs, ...children) {
    return new VNode(name, attrs, children)
  }
}
function vdom({ diff, patch, VNode, h: hyper, lib }, html = hyper || createHyper(VNode)) {
  const cache = Symbol.for('vdom')

  if(!lib) lib = node => node

  function render(template, target) {
    const previous = target[cache] || new VNode(target.tagName, null, [])
    const current = new VNode(target.tagName, null, [].concat(template))
    const changes = diff(previous, current)
  
    target[cache] = current

    patch(target, changes)
  }

  return renderer({ html, render, lib })
}
exports.vdom = vdom

Object.defineProperty(exports, '__esModule', {value: true}).default = vdom