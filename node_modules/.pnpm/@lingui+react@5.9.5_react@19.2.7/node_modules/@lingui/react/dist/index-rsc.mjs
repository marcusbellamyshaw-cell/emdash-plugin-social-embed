import { getI18n } from './server.mjs';
import { jsx } from 'react/jsx-runtime';
import { T as TransNoContext } from './shared/react.8970326b.mjs';
import 'react';

function TransRsc(props) {
  const ctx = getI18n();
  if (!ctx) {
    throw new Error(
      "You tried to use `Trans` in Server Component, but i18n instance for RSC hasn't been setup.\nMake sure to call `setI18n` in the root of your page."
    );
  }
  return /* @__PURE__ */ jsx(TransNoContext, { ...props, lingui: ctx });
}

function useLingui() {
  const ctx = getI18n();
  if (!ctx) {
    throw new Error(
      "You tried to use `useLingui` in a Server Component, but i18n instance for RSC hasn't been setup.\nMake sure to call `setI18n` in the root of your page."
    );
  }
  return ctx;
}

export { TransRsc as Trans, useLingui };
