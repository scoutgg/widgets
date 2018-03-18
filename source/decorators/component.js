import { define, kebabCase, transfer } from '../utils'

const COMPONENTS = [ ]
const sggWidgets = Symbol.for('sggWidgets')

export function Component(namespace) {
  return function define(Class) {
    Class.namespace = namespace
    if(customElements[sggWidgets]) {
      return register(Class)
    }
    COMPONENTS.push(Class)
  }
}

export function getTagName(Class) {
  if(Class.tagName) return Class.tagName

  const { namespace, className } = Class
  const name = className || Class.name

  return Class.tagName = kebabCase(namespace +  name)
}

export function register(component) {
  const tagName = getTagName(component)
  const plugins = customElements[sggWidgets]
  const Component = define(plugins, component)
  const Element = customElements.get(tagName)

  if(Element) {
    return transfer(Element, Component)
  }

  customElements.define(tagName, Component)
}

export function bootstrap(plugins = []) {
  customElements[sggWidgets] = plugins

  for(const component of COMPONENTS) {
    register(component)
  }
}
