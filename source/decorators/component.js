import { define, kebabCase } from '../utils'

const COMPONENTS = [ ]

export function Component(namespace) {
  return function define(Class) {
    Class.namespace = namespace

    COMPONENTS.push(Class)
  }
}

export function bootstrap(plugins = []) {
  const registry = { }

  for(const component of COMPONENTS) {
    const name = component.className || component.name
    const namespace = component.namespace
    const tagName = component.tagName = kebabCase(namespace +  name)
    const Component = define(plugins, component)

    customElements.define(tagName, Component)

    registry[tagName] = Component
  }

  return registry
}
