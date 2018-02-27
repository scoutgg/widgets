(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.fnWidgets = {})));
}(this, (function (exports) { 'use strict';

const UPPER = /.[A-Z]/g;

function kebabCase(string) {
  return string.replace(UPPER, c => c[0] + '-' + c[1].toLowerCase())
}

function camelCase(string) {
  return string.replace(/-./g, c => c[1].toUpperCase())
}

function define(decorators=[], target = decorators.pop()) {
  for(const transform of decorators) {
    target = transform(target) || target;
  }
  return target
}

function middleware(done) {
  const middleware = [];

  Object.assign(pipeline, {
    use(...callbacks) {
      return middleware.push(...callbacks), this
    }
  });

  function pipeline(...args) {
    const context = { self: this, index: 0 };

    function next() {
      const method = middleware[context.index++];

      if(method) {
        return method.call(context.self, args, next)
      } else if(done) {
        return done(...args)
      }
    }

    return next()
  }

  return pipeline
}

function mixin(target, ...sources) {
  for(const source of sources) {
    for(const [ property, method ] of Object.entries(source)) {
      if(typeof method !== 'function') continue

      if(!target[property]) {
        target[property] = middleware();
      } else if(!target[property].use) {
        target[property] = middleware(target[property]);
      }

      target[property].use(method);
    }
  }
  return target
}

const COMPONENTS = [ ];

function Component(namespace) {
  return function define$$1(Class) {
    Class.namespace = namespace;

    COMPONENTS.push(Class);
  }
}

function bootstrap(plugins = []) {
  const registry = { };

  for(const component of COMPONENTS) {
    const name = component.className || component.name;
    const namespace = component.namespace;
    const tagName = component.tagName = kebabCase(namespace +  name);
    const Component = define(plugins, component);

    customElements.define(tagName, Component);

    registry[tagName] = Component;
  }

  return registry
}

function Template(template) {
  return function define(Class) {
    Class.prototype.template = template;
  }
}

function Attribute(name, type) {
  const property = camelCase(name);
  const attribute = kebabCase(name);

  return function define$$1(Class) {
    if(!Class.observedAttributes) {
      Class.observedAttributes = [];
    }

    Class.observedAttributes.push(attribute);

    Object.defineProperty(Class.prototype, property, {
      enumerable: true,
      configurable: true,
      get() {
        if(type === Boolean) {
          return this.hasAttribute(attribute)
        } else if(type.instance) {
          return type.instance(this.getAttribute(attribute))
        } else {
          return type(this.getAttribute(attribute))
        }
      },
      set(value) {
        if(type === Boolean) {
          if(value) {
            this.setAttribute(attribute, '');
          } else {
            this.removeAttribute(attribute);
          }
        } else {
          this.setAttribute(attribute, value);
        }
      }
    });
  }
}

exports.Component = Component;
exports.bootstrap = bootstrap;
exports.Template = Template;
exports.Attribute = Attribute;
exports.kebabCase = kebabCase;
exports.camelCase = camelCase;
exports.define = define;
exports.middleware = middleware;
exports.mixin = mixin;

Object.defineProperty(exports, '__esModule', { value: true });

})));
