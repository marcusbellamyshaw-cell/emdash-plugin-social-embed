'use client';

import * as React from 'react';
import { useIsoLayoutEffect } from '@base-ui/utils/useIsoLayoutEffect';
import { useFieldRootContext } from "../field-root-context/FieldRootContext.js";
export function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true) {
  const {
    registerFieldControl
  } = useFieldRootContext();
  const sourceRef = React.useRef(null);
  if (!sourceRef.current) {
    sourceRef.current = Symbol();
  }
  useIsoLayoutEffect(() => {
    const source = sourceRef.current;
    if (!source || !enabled) {
      return undefined;
    }
    const registration = {
      controlRef,
      getValue: getFormValueOverride,
      id,
      value
    };
    registerFieldControl(source, registration);
    return () => {
      registerFieldControl(source, undefined);
    };
  }, [controlRef, enabled, getFormValueOverride, id, registerFieldControl, value]);
}