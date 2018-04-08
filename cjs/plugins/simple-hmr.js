'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simpleHmr;

var _rerender = require('./rerender.js');

var _rerender2 = _interopRequireDefault(_rerender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toHex(buffer) {
  return Array.from(buffer).map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

async function getSource(script) {
  const response = await fetch(script);
  const source = await response.text();
  const buffer = new TextEncoder("utf-8").encode(source);
  const hashBuffer = await crypto.subtle.digest({ name: "SHA-256" }, buffer);
  const hash = toHex(new Uint8Array(hashBuffer));

  return { hash, source };
}

function simpleHmr(config) {
  const script = document.currentScript.src;
  const original = getSource(script);

  async function checkChanges() {
    const [was, is] = await Promise.all([original, getSource(script)]);

    if (was.hash !== is.hash) {
      Function(['hmr'], is.source)(true);
      Object.assign(was, is);
    }

    const ready = await (0, _rerender.rerender)();

    setTimeout(checkChanges, config.interval || 2000);
  }

  setTimeout(checkChanges, config.interval || 2000);

  return (0, _rerender2.default)(config);
}