import { Component, Template, Attribute, bootstrap } from '../../esm/index.js'
import { define } from '../../esm/utils.js'

import { react as renderer } from '../../esm/renderers/react.js'
import ReactDOM from 'react-dom'
import React from 'react'

export default define([
  Component('fn'),
  Template(scope => <>
    <h1>Count {scope.count}</h1>
    <button onClick={e => scope.increment()}>+</button>
    <button onClick={e => scope.decrement()}>-</button>
  </>),
  Attribute('count', Number),
  Attribute('name', String),
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


demo.setAttribute('name', 'world')

document.body.appendChild(demo)
