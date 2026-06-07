'use client';

import * as React from 'react';
import { IsDrawerContext } from "./DialogRootContext.js";
import { useRenderDialogRoot } from "./useRenderDialogRoot.js";

/**
 * Groups all parts of the dialog.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export function DialogRoot(props) {
  const mode = React.useContext(IsDrawerContext) ? 'drawer' : 'dialog';
  return useRenderDialogRoot(props, mode);
}