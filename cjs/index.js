'use strict';
(m => {
  exports.Component = m.Component
  exports.bootstrap = m.bootstrap
})(require('./decorators/component.js'));
(m => {
  exports.Template = m.Template
})(require('./decorators/template.js'));
(m => {
  exports.Attribute = m.Attribute
})(require('./decorators/attribute.js'));
(m => {
  exports.Input = m.Input
})(require('./decorators/input.js'));

(m => {
  exports.define = m.define
  exports.plugin = m.plugin
  exports.middleware = m.middleware
  exports.transfer = m.transfer
})(require('./utils.js'));
