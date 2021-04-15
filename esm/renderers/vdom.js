import renderer from './html.js'

function createHyper(VNode) {
  return function h(name, attrs, ...children) {
    return new VNode(name, attrs, children)
  }
}
export function vdom({ diff, patch, VNode, h: hyper, lib }, html = hyper || createHyper(VNode)) {
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

export default vdom