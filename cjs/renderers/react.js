"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.react = react;

var _utils = require("../utils.js");

var _queue = require("./queue.js");

function react(ReactDOM) {
  const shedule = (0, _queue.queue)(function render(node, cache) {
    const target = node.shadowRoot || node;
    const current = node.template(node);
    ReactDOM.render(current, target);
  });
  return function define(Class) {
    (0, _utils.plugin)(Class.prototype, {
      attributeChangedCallback(args, next) {
        this.render();
        return next();
      },

      connectedCallback(args, next) {
        this.render();
        return next();
      },

      render([callback], next) {
        if (!this.shadowRoot) {
          this.attachShadow({
            mode: 'open'
          });
        }

        shedule(this, (...args) => {
          if (typeof callback === 'function') {
            callback(...args);
          }

          next();
        });
      }

    });
  };
}