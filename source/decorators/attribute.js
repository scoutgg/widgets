import { camelCase, kebabCase } from '../utils'

export function Attribute(name, type) {
  const property = camelCase(name)
  const attribute = kebabCase(name)

  return function define(Class) {
    if(!Class.observedAttributes) {
      Class.observedAttributes = []
    }

    Class.observedAttributes.push(attribute)

    Object.defineProperty(Class.prototype, property, {
      enumerable: true,
      configurable: true,
      get() {
        if(type === Boolean) {
          return this.hasAttribute(attribute)
        } else if(type.instance) {
          return type.instance(this.getAttribute(attribute))
        } else {
          return type(this.getAttribute(attribute))
        }
      },
      set(value) {
        if(type === Boolean) {
          if(value) {
            this.setAttribute(attribute, '')
          } else {
            this.removeAttribute(attribute)
          }
        } else {
          this.setAttribute(attribute, value)
        }
      }
    })
  }
}
