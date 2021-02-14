'use strict';
function Template(template) {
  return function define(Class) {
    Class.prototype.template = template
  }
}
exports.Template = Template
