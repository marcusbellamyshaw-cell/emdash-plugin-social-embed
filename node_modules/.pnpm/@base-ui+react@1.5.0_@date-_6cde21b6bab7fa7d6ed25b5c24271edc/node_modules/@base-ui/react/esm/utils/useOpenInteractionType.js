'use client';

import * as React from 'react';
import { useStableCallback } from '@base-ui/utils/useStableCallback';
import { useEnhancedClickHandler } from '@base-ui/utils/useEnhancedClickHandler';
import { isIOS } from '@base-ui/utils/detectBrowser';
import { useValueChanged } from "../internals/useValueChanged.js";
export function useOpenMethodTriggerProps(open, setOpenMethod) {
  const handleTriggerClick = useStableCallback((_, interactionType) => {
    const isOpen = typeof open === 'function' ? open() : open;
    if (!isOpen) {
      setOpenMethod(interactionType || (
      // On iOS Safari, the hitslop around touch targets means tapping outside an element's
      // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
      // will be "" in that case.
      isIOS ? 'touch' : ''));
    }
  });
  const {
    onClick,
    onPointerDown
  } = useEnhancedClickHandler(handleTriggerClick);
  return React.useMemo(() => ({
    onClick,
    onPointerDown
  }), [onClick, onPointerDown]);
}

/**
 * Determines the interaction type (keyboard, mouse, touch, etc.) that opened the component.
 *
 * @param open The open state of the component.
 */
export function useOpenInteractionType(open) {
  const [openMethod, setOpenMethod] = React.useState(null);
  const triggerProps = useOpenMethodTriggerProps(open, setOpenMethod);
  useValueChanged(open, previousOpen => {
    if (previousOpen && !open) {
      setOpenMethod(null);
    }
  });
  return React.useMemo(() => ({
    openMethod,
    triggerProps
  }), [openMethod, triggerProps]);
}