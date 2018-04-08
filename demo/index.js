import * as vdom from 'virtual-dom'

import { Component, Template, Attribute, bootstrap } from '../esm/index.js'
import { define } from '../esm/utils.js'

import { vdom as renderer } from '../esm/renderers/vdom.js'

export default define([
  Component('fn'),
  Template(require('./index.pug')),
  Attribute('count', Number),
  Attribute('name', String),
  class Demo extends HTMLElement {

  }
])

bootstrap([
  renderer(vdom)
])

const demo = document.createElement('fn-demo')


demo.setAttribute('name', 'world')

document.body.appendChild(demo)
