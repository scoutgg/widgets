'use strict';
const { plugin, camelCase } = require('../utils.js')

Object.defineProperty(exports, '__esModule', {value: true}).default = vue

function lowerFirst(string) {
  return string.slice(0, 1).toLowerCase()+string.slice(1)
}

function htmAdapter(h) {
  return function hAdapter(name, attrs, ...children) {
    if(attrs) {
      for(const attr of Object.keys(attrs)) {
        if(/^on/.test(attr)) {
          if(!attrs.on) attrs.on = {}
          attrs.on[lowerFirst(attr.slice(2))] = attrs[attr]
          delete attrs[attr]
        }
      }
    }
    return h(name, attrs, children)
  }
}

function vue(Vue, htm) {
  return function renderer(Class) {
    function htmRender([ h ]) {
      const { host: node } = this.$el.parentNode
       
      if(!node.html) {
        node.html = htm.bind(htmAdapter(h))
      }
      return node.template.call(this, node.html, node)
    }

    function hRender([ h ]) {
      const { host: node } = this.$el.parentNode

      return node.template.call(this, h, node)
    }
    plugin(Class.prototype, {
      /**
       * @this {HTMLElement}
       */
      connectedCallback() {
        if(!this.shadowRoot) {
          this.attachShadow({ mode: 'open' })
          this.el = document.createElement('div')
          this.shadowRoot.append(this.el)
          this.vue = new Vue(this)
        }        
      },
      render: htm ? htmRender : hRender
    })
  }
}
exports.vue = vue

