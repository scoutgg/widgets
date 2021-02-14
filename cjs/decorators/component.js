'use strict';
const { define, kebabCase, transfer } = require('../utils.js')

const COMPONENTS = [ ]
const sggWidgets = Symbol.for('sggWidgets')

function Component(namespace) {
  return function define(Class) {
    Class.namespace = namespace
    if(customElements[sggWidgets]) {
      return register(Class)
    }
    COMPONENTS.push(Class)
  }
}
exports.Component = Component

function getTagName(Class) {
  if(Class.tagName) return Class.tagName

  const { namespace, className } = Class
  const name = className || Class.name

  return Class.tagName = kebabCase(namespace +  name)
}
exports.getTagName = getTagName

function register(component) {
  const tagName = getTagName(component)
  const plugins = customElements[sggWidgets]
  const Component = define(plugins, component)
  const Element = customElements.get(tagName)

  if(Element) {
    return transfer(Element, Component)
  }

  customElements.define(tagName, Component)
}
exports.register = register

function bootstrap(plugins = []) {
  customElements[sggWidgets] = plugins

  for(const component of COMPONENTS) {
    register(component)
  }
}
exports.bootstrap = bootstrap
