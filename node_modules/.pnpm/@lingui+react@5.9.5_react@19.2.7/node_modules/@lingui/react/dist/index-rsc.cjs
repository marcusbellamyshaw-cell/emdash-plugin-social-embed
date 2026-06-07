'use strict';

const server = require('./server.cjs');
const jsxRuntime = require('react/jsx-runtime');
const TransNoContext = require('./shared/react.90cde280.cjs');
require('react');

function TransRsc(props) {
  const ctx = server.getI18n();
  if (!ctx) {
    throw new Error(
      "You tried to use `Trans` in Server Component, but i18n instance for RSC hasn't been setup.\nMake sure to call `setI18n` in the root of your page."
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(TransNoContext.TransNoContext, { ...props, lingui: ctx });
}

function useLingui() {
  const ctx = server.getI18n();
  if (!ctx) {
    throw new Error(
      "You tried to use `useLingui` in a Server Component, but i18n instance for RSC hasn't been setup.\nMake sure to call `setI18n` in the root of your page."
    );
  }
  return ctx;
}

exports.Trans = TransRsc;
exports.useLingui = useLingui;
