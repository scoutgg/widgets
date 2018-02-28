import hyper from 'hyperhtml/umd'

import { bootstrap as boot } from '../source/decorators/component'
import { hyper as renderer } from '../source/renderers/hyper'

export { Component } from '../source/decorators/component'
export { Attribute } from '../source/decorators/attribute'
export { Template } from '../source/decorators/template'

export * from '../source/utils'

export function bootstrap(plugins=[]) {
  return boot(plugins.concat([ renderer(hyper) ]))
}
