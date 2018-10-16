import { plugin } from '../utils.js'

export const elements = new Set()

export function rerender() {
  return new Promise(resolve => {
    let pending = 0

    function decrement() {
      if(--pending < 1) resolve()
    }

    for(const element of elements) {
      if(element.render && ++pending) {
        element.render(decrement)
      }
    }
  })
}

export default function rerenderPlugin(config) {
  return function define(Class) {
    plugin(Class.prototype, {
      connectedCallback(args, next) {
        elements.add(this)
        return next()
      },
      disconnectedCallback(args, next) {
        elements.delete(this)
        return next()
      }
    })
  }
}
