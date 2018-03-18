import { compileClient } from 'fn-pug/lib'
import runtime from 'fn-pug/lib/runtime/vdom'
import vdom from 'virtual-dom'

import { bootstrap as boot } from '../source/decorators/component.js'
import { vdom as renderer } from '../source/renderers/vdom.js'

export { Component } from '../source/decorators/component.js'
export { Attribute } from '../source/decorators/attribute.js'

import { Template as TemplateDecorator } from '../source/decorators/template.js'

export * from '../source/utils.js'

const pugRuntime = runtime(vdom.h)

export function Template(template) {
  return TemplateDecorator(compileClient(template, pugRuntime))
}

export function bootstrap(plugins=[]) {
  return boot(plugins.concat([ renderer(vdom) ]))
}
