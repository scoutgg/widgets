"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Input;

function Input(property) {
  const prop = Symbol.for(property);
  return function define(Class) {
    Object.defineProperty(Class.prototype, property, {
      configurable: true,

      get() {
        return this[prop];
      },

      set(value) {
        if (this[prop] !== value) this.render(this[prop] = value);
      }

    });
  };
}