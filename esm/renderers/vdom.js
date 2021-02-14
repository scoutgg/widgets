import renderer from './html.js'

function createHyper(VNode) {
  return function h(name, attrs, ...children) {
    return new VNode(name, attrs, children)
  }
}
export function vdom({ diff, patch, VNode, h: hyper }, html = hyper || createHyper(VNode)) {
  const cache = new WeakMap()

  function render(template, target) {
    const previous = cache.get(target) || new VNode(target.tagName, null, [])
    const current = new VNode(target.tagName, null, [].concat(template))
    const changes = diff(previous, current)
  
    cache.set(target, current)

    patch(target, changes)
  }

  return renderer({ html, render })
}

export default vdom