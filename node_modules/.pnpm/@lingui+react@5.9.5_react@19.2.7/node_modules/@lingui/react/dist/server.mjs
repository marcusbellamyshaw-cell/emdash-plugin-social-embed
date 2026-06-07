export { T as TransNoContext } from './shared/react.8970326b.mjs';
import React from 'react';
import 'react/jsx-runtime';

let cache = null;
const getLinguiCache = () => {
  if (!cache) {
    cache = React.cache(
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

export { getI18n, setI18n };
