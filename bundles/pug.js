import { compileClient } from 'fn-pug/lib'
import runtime from 'fn-pug/lib/runtime/vdom'
import vdom from 'virtual-dom'

import { bootstrap as boot } from '../esm/decorators/component.js'
import { vdom as renderer } from '../esm/renderers/vdom.js'

export { Component } from '../esm/decorators/component.js'
export { Attribute } from '../esm/decorators/attribute.js'

import { Template as TemplateDecorator } from '../esm/decorators/template.js'

export * from '../esm/utils.js'

const pugRuntime = runtime(vdom.h)

export function Template(template) {
  return TemplateDecorator(compileClient(template, pugRuntime))
}

export function bootstrap(plugins=[]) {
  return boot(plugins.concat([ renderer(vdom) ]))
}
