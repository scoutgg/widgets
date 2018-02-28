import { compileClient } from 'fn-pug/lib'
import runtime from 'fn-pug/lib/runtime/vdom'
import vdom from 'virtual-dom'

import { bootstrap as boot } from '../source/decorators/component'
import { vdom as renderer } from '../source/renderers/vdom'

export { Component } from '../source/decorators/component'
export { Attribute } from '../source/decorators/attribute'

import { Template as TemplateDecorator } from '../source/decorators/template'

export * from '../source/utils'

const pugRuntime = runtime(vdom.h)

export function Template(template) {
  return TemplateDecorator(compileClient(template, pugRuntime))
}

export function bootstrap(plugins=[]) {
  return boot(plugins.concat([ renderer(vdom) ]))
}
