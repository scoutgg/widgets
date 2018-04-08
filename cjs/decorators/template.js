"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Template = Template;
function Template(template) {
  return function define(Class) {
    Class.prototype.template = template;
  };
}