"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rerender = rerender;
exports.default = rerenderPlugin;
exports.elements = void 0;

var _utils = require("../utils.js");

const elements = new Set();
exports.elements = elements;

function rerender() {
  return new Promise(resolve => {
    let pending = 0;

    function decrement() {
      if (--pending < 1) resolve();
    }

    for (const element of elements) {
      if (element.render && ++pending) {
        element.render(decrement);
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