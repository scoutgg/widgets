"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simpleHmr;

var _rerender = _interopRequireWildcard(require("./rerender.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function toHex(buffer) {
  return Array.from(buffer).map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

async function getSource(script) {
  const response = await fetch(script);
  const source = await response.text();
  const buffer = new TextEncoder("utf-8").encode(source);
  const hashBuffer = await crypto.subtle.digest({
    name: "SHA-256"
  }, buffer);
  const hash = toHex(new Uint8Array(hashBuffer));
  return {
    hash,
    source
  };
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
  return (0, _rerender.default)(config);
}