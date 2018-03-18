const UPPER = /.[A-Z]/g

export function kebabCase(string) {
  return string.replace(UPPER, c => c[0] + '-' + c[1].toLowerCase())
}

export function camelCase(string) {
  return string.replace(/-./g, c => c[1].toUpperCase())
}

export function define(decorators=[], target = decorators.pop()) {
  for(const transform of decorators.reverse()) {
    target = transform(target) || target
  }
  return target
}

export function middleware(done) {
  const middleware = []

  Object.assign(pipeline, {
    use(...callbacks) {
      return middleware.push(...callbacks), this
    }
  })

  function pipeline(...args) {
    const context = { self: this, index: 0 }

    function next() {
      const method = middleware[context.index++]

      if(method) {
        return method.call(context.self, args, next)
      } else if(done) {
        return done.apply(context.self, args)
      }
    }

    return next()
  }

  return pipeline
}

export function plugin(target, ...sources) {
  for(const source of sources) {
    for(const [ property, method ] of Object.entries(source)) {
      if(typeof method !== 'function') continue

      if(!target[property]) {
        target[property] = middleware()
      } else if(!target[property].use) {
        target[property] = middleware(target[property])
      }

      target[property].use(method)
    }
  }
  return target
}

export function transfer(target, ...sources) {
  for(const source of sources) {
    const properties = Object.getOwnPropertyDescriptors(source)

    for(const [name, descriptor] of Object.entries(properties)) {
      if(name === 'prototype') {
        transfer(target.prototype, source.prototype)
      }
      if(descriptor.configurable) {
        Object.defineProperty(target, name, descriptor)
      }
    }
  }
}
