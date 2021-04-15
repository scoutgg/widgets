export function queue(render) {
  const queue = new Set()
  const callbacks = new Set()

  function apply() {
    for(const node of queue) {
      render(node)
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

  let next = null

  return function shedule(element, callback) {
    if(!queue.size) {
      next = Promise.resolve().then(attempt)
    }
    if(typeof callback === 'function') {
      callbacks.add(callback)
    }
    queue.add(element)
    return next
  }
}
