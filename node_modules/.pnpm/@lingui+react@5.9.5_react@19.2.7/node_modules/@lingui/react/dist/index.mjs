'use client';
import { jsx } from 'react/jsx-runtime';
import { createContext, useRef, useCallback, useState, useEffect, useContext } from 'react';
import { T as TransNoContext } from './shared/react.8970326b.mjs';

const LinguiContext = createContext(null);
const useLinguiInternal = (devErrorMessage) => {
  const context = useContext(LinguiContext);
  if (process.env.NODE_ENV !== "production") {
    if (context == null) {
      throw new Error(
        devErrorMessage ?? "useLingui hook was used without I18nProvider."
      );
    }
  }
  return context;
};
function useLingui() {
  return useLinguiInternal();
}
const I18nProvider = ({
  i18n,
  defaultComponent,
  children
}) => {
  const latestKnownLocale = useRef(i18n.locale);
  const makeContext = useCallback(
    () => ({
      i18n,
      defaultComponent,
      _: i18n.t.bind(i18n)
    }),
    [i18n, defaultComponent]
  );
  const [context, setContext] = useState(makeContext());
  useEffect(() => {
    const updateContext = () => {
      latestKnownLocale.current = i18n.locale;
      setContext(makeContext());
    };
    const unsubscribe = i18n.on("change", updateContext);
    if (latestKnownLocale.current !== i18n.locale) {
      updateContext();
    }
    return unsubscribe;
  }, [i18n, makeContext]);
  if (!latestKnownLocale.current) {
    process.env.NODE_ENV === "development" && console.log(
      "I18nProvider rendered `null`. A call to `i18n.activate` needs to happen in order for translations to be activated and for the I18nProvider to render.This is not an error but an informational message logged only in development."
    );
    return null;
  }
  return /* @__PURE__ */ jsx(LinguiContext.Provider, { value: context, children });
};

function Trans(props) {
  let errMessage = void 0;
  if (process.env.NODE_ENV !== "production") {
    errMessage = `Trans component was rendered without I18nProvider.
Attempted to render message: ${props.message} id: ${props.id}. Make sure this component is rendered inside a I18nProvider.`;
  }
  const lingui = useLinguiInternal(errMessage);
  return /* @__PURE__ */ jsx(TransNoContext, { ...props, lingui });
}

export { I18nProvider, LinguiContext, Trans, useLingui };
