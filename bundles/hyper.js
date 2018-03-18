import hyper from 'hyperhtml/umd'

import { bootstrap as boot } from '../source/decorators/component.js'
import { hyper as renderer } from '../source/renderers/hyper.js'

export { Component } from '../source/decorators/component.js'
export { Attribute } from '../source/decorators/attribute.js'
export { Template } from '../source/decorators/template.js'

export * from '../source/utils.js'

export function bootstrap(plugins=[]) {
  return boot(plugins.concat([ renderer(hyper) ]))
}
