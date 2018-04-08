'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./decorators/component.js');

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function () {
    return _component.Component;
  }
});
Object.defineProperty(exports, 'bootstrap', {
  enumerable: true,
  get: function () {
    return _component.bootstrap;
  }
});

var _template = require('./decorators/template.js');

Object.defineProperty(exports, 'Template', {
  enumerable: true,
  get: function () {
    return _template.Template;
  }
});

var _attribute = require('./decorators/attribute.js');

Object.defineProperty(exports, 'Attribute', {
  enumerable: true,
  get: function () {
    return _attribute.Attribute;
  }
});

var _utils = require('./utils.js');

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});