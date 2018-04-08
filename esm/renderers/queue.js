import { plugin } from '../utils.js'

export function queue(render) {
  const queue = new Set()
  const cache = new WeakMap()
  const callbacks = new Set()

  function apply() {
    for(const node of queue) {
      render(node, cache)
    }
  }

  function attempt() {
    try {
      apply()
    } catch(error) {
      throw error
    } finally {
      queue.clear()
      for(const callback of callbacks) {
        callback()
      }
      callbacks.clear()
    }
  }

  return function shedule(element, callback) {
    if(!queue.size) {
      requestAnimationFrame(attempt)
    }
    if(typeof callback === 'function') {
      callbacks.add(callback)
    }
    queue.add(element)
  }
}
