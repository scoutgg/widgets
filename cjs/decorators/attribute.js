'use strict';
const { camelCase, kebabCase } = require('../utils.js')

function Attribute(name, type, options = { default: '' }) {
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
        }
        const value = this.getAttribute(attribute)
        if(type.instance) {
          return type.instance(value === null ? options.default : value)
        } else {
          return type(value === null ? options.default : value)
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
exports.Attribute = Attribute
