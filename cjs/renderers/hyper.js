'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hyper = hyper;

var _utils = require('../utils.js');

var _queue = require('./queue.js');

function hyper({ bind }) {
  const shedule = (0, _queue.queue)(function render(node) {
    return node.template(node.html);
  });

  return function renderer(Class) {
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
        if (!this.html) {
          this.attachShadow({ mode: 'open' });
          this.html = bind(this.shadowRoot);
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