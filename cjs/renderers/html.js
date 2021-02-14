'use strict';
const { plugin } = require('../utils.js')
const { queue } = require('./queue.js')

Object.defineProperty(exports, '__esModule', {value: true}).default = html

function mirror(_render) {
  return function render(template, node) {
    return _render(node, template)
  }
}

function html({ h, html = h, render, lib = () => html, reverse }) {
  if(reverse) render = mirror(render)

  const shedule = queue(function onRender(node) {
    const template = node.template(lib(node, html), node)
    const target = node.shadowRoot || node
    return render(template, target)
  })

  return function renderer(Class) {
    plugin(Class.prototype, {
      attributeChangedCallback(args, next) {
        this.render()
        return next()
      },
      connectedCallback(args, next) {
        this.render()
        return next()
      },
      render([ callback ], next) {
        if(!this.shadowRoot) {
          this.attachShadow({ mode: 'open' })
        }

        shedule(this, (...args) => {
          if(typeof callback === 'function') {
            callback(...args)
          }
          next()
        })
      }
    })
  }
}
exports.html = html

