import { mixin } from '../utils'

export function vdom({ VNode, diff, patch }) {
  const queue = new Set()
  const cache = new WeakMap()

  function apply() {
    for(const node of queue) {
      const target = node.shadowRoot || node
      const previous = cache.get(node) || new VNode(target.tagName, null, [])
      const current = new VNode(target.tagName, null, node.template(node))

      const changes = diff(previous, current)

      cache.set(node, current)
      patch(target, changes)
    }
  }

  function attempt() {
    try {
      apply()
    } catch(error) {
      throw error
    } finally {
      queue.clear()
    }
  }

  return function define(Class) {
    mixin(Class.prototype, {
      attributeChangedCallback(args, next) {
        this.render()
        return next()
      },
      connectedCallback(args, next) {
        if(this.shadowRoot) return
        this.attachShadow({ mode: 'open' })
        this.render()
        return next()
      },
      render(args, next) {
        if(!queue.size) {
          requestAnimationFrame(attempt)
        }
        queue.add(this)
        return next()
      }
    })
  }
}
