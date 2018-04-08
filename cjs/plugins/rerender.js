'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elements = undefined;
exports.rerender = rerender;
exports.default = rerenderPlugin;

var _utils = require('../utils.js');

const elements = exports.elements = new Set();

function rerender() {
  return new Promise(resolve => {
    let pending = 0;

    function decrement() {
      if (--pending < 1) resolve();
    }

    for (const element of elements) {
      if (element.render && ++pending) {
        return element.render(decrement);
      }
    }
  });
}

function rerenderPlugin(config) {
  return function define(Class) {
    (0, _utils.plugin)(Class.prototype, {
      connectedCallback(args, next) {
        elements.add(this);
        return next();
      },
      disconnectedCallback() {
        elements.delete(this);
        return next();
      }
    });
  };
}