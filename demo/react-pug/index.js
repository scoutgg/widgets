import { Component, Template, Attribute, bootstrap } from '../../esm/index.js'
import { define } from '../../esm/utils.js'

import { react as renderer } from '../../esm/renderers/react.js'
import ReactDOM from 'react-dom'
import React from 'react'

import template from '../index.pug'

export default define([
  Component('fn'),
  Template(template),
  Attribute('count', Number),
  Attribute('name', String, { default: 'world' }),
  class Demo extends HTMLElement {
    increment() {
      this.count += 1
    }
    decrement() {
      this.count -= 1
    }
  }
])

bootstrap([
  renderer(ReactDOM)
])

const demo = document.createElement('fn-demo')

document.body.appendChild(demo)
