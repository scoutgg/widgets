import { plugin } from '../utils.js'
import { queue } from './queue.js'

export function react(ReactDOM) {
  const shedule = queue(function render(node, cache) {
    const target = node.shadowRoot || node
    const current = node.template(node)

    ReactDOM.render(current, target)
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
