import { plugin } from '../utils.js'
import { queue } from './queue.js'

export function hyper({ bind }) {
  const shedule = queue(function render(node) {
    return node.template(node.html)
  })

  return function renderer(Class) {
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
