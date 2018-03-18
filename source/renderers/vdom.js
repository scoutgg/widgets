import { plugin } from '../utils'
import { queue } from './queue'

export function vdom({ VNode, diff, patch }) {
  const shedule = queue(function render(node, cache) {
    const target = node.shadowRoot || node
    const previous = cache.get(node) || new VNode(target.tagName, null, [])
    const current = new VNode(target.tagName, null, node.template(node))

    const changes = diff(previous, current)

    cache.set(node, current)
    patch(target, changes)
  })

  return function define(Class) {
    plugin(Class.prototype, {
      attributeChangedCallback(args, next) {
        this.render()
        return next()
      },
      connectedCallback(args, next) {
        this.render()
        return next()
      },
      render([ callback ], next) {
        if(!this.shadowRoot) {
          this.attachShadow({ mode: 'open' })
        }
        shedule(this, (...args) => {
          if(typeof callback === 'function') {
            callback(...args)
          }
          next()
        })
      }
    })
  }
}
