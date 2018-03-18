import * as vdom from 'virtual-dom'

import { Component, Template, Attribute, bootstrap } from '../source/index'
import { define } from '../source/utils'

import { vdom as renderer } from '../source/renderers/vdom'

export default define([
  Component('fn'),
  Template(require('./index.pug')),
  Attribute('is-awesome', Boolean),
  class Demo extends HTMLElement {

  }
])

bootstrap([
  renderer(vdom)
])

const demo = document.createElement('fn-demo')


demo.setAttribute('is-awesome', '')

document.body.appendChild(demo)
