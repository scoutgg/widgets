import vdom from 'virtual-dom'

import { bootstrap as boot } from '../esm/decorators/component.js'
import { vdom as renderer } from '../esm/renderers/vdom.js'

export { Component } from '../esm/decorators/component.js'
export { Attribute } from '../esm/decorators/attribute.js'

export { Template } from '../esm/decorators/template.js'

export * from '../esm/utils.js'

export function bootstrap(plugins=[]) {
  return boot(plugins.concat([ renderer(vdom) ]))
}
