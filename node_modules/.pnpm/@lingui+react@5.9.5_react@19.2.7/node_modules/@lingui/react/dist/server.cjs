'use strict';

const TransNoContext = require('./shared/react.90cde280.cjs');
const React = require('react');
require('react/jsx-runtime');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const React__default = /*#__PURE__*/_interopDefaultCompat(React);

let cache = null;
const getLinguiCache = () => {
  if (!cache) {
    cache = React__default.cache(
      () => ({
        current: null
      })
    );
  }
  return cache();
};
function setI18n(i18n, defaultComponent) {
  getLinguiCache().current = {
    i18n,
    _: i18n._.bind(i18n),
    defaultComponent
  };
}
function getI18n() {
  return getLinguiCache()?.current;
}

exports.TransNoContext = TransNoContext.TransNoContext;
exports.getI18n = getI18n;
exports.setI18n = setI18n;
