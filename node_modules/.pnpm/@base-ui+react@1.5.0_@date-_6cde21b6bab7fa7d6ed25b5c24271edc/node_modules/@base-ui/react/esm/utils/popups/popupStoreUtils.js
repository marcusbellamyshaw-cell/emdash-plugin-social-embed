'use client';

import * as React from 'react';
import { EMPTY_OBJECT } from '@base-ui/utils/empty';
import { useId } from '@base-ui/utils/useId';
import { useStableCallback } from '@base-ui/utils/useStableCallback';
import { useIsoLayoutEffect } from '@base-ui/utils/useIsoLayoutEffect';
import { FOCUSABLE_ATTRIBUTE } from "../../floating-ui-react/utils/constants.js";
import { useFloatingParentNodeId } from "../../floating-ui-react/components/FloatingTree.js";
import { useSyncedFloatingRootContext } from "../../floating-ui-react/hooks/useSyncedFloatingRootContext.js";
import { useTransitionStatus } from "../../internals/useTransitionStatus.js";
import { useOpenChangeComplete } from "../../internals/useOpenChangeComplete.js";
export const FOCUSABLE_POPUP_PROPS = {
  tabIndex: -1,
  [FOCUSABLE_ATTRIBUTE]: ''
};
export function usePopupStore(externalStore, createStore, treatPopupAsFloatingElement = false) {
  const floatingId = useId();
  const nested = useFloatingParentNodeId() != null;
  const internalStoreRef = React.useRef(null);
  if (externalStore === undefined && internalStoreRef.current === null) {
    internalStoreRef.current = createStore(floatingId, nested);
  }
  const store = externalStore ?? internalStoreRef.current;
  useSyncedFloatingRootContext({
    popupStore: store,
    treatPopupAsFloatingElement,
    floatingRootContext: store.state.floatingRootContext,
    floatingId,
    nested,
    onOpenChange: store.setOpen
  });
  return {
    store,
    internalStore: internalStoreRef.current
  };
}

/**
 * Returns a callback ref that registers/unregisters the trigger element in the store.
 *
 * @param store The Store instance where the trigger should be registered.
 */
export function useTriggerRegistration(id, store) {
  // Keep track of the currently registered element to unregister it on unmount or id change.
  const registeredElementIdRef = React.useRef(null);
  const registeredElementRef = React.useRef(null);
  return React.useCallback(element => {
    if (id === undefined) {
      return;
    }
    let shouldSyncTriggerCount = false;
    if (registeredElementIdRef.current !== null) {
      const registeredId = registeredElementIdRef.current;
      const registeredElement = registeredElementRef.current;
      const currentElement = store.context.triggerElements.getById(registeredId);
      if (registeredElement && currentElement === registeredElement) {
        store.context.triggerElements.delete(registeredId);
        shouldSyncTriggerCount = true;
      }
      registeredElementIdRef.current = null;
      registeredElementRef.current = null;
    }
    if (element !== null) {
      registeredElementIdRef.current = id;
      registeredElementRef.current = element;
      store.context.triggerElements.add(id, element);
      shouldSyncTriggerCount = true;
    }
    if (shouldSyncTriggerCount) {
      const triggerCount = store.context.triggerElements.size;
      if (store.select('open') && store.state.triggerCount !== triggerCount) {
        store.set('triggerCount', triggerCount);
      }
    }
  }, [store, id]);
}
export function setOpenTriggerState(state, open, trigger) {
  const triggerId = trigger?.id ?? null;

  // If a popup is closing, the `trigger` may be undefined.
  // We want to keep the previous value so that exit animations are played and focus is returned correctly.
  if (triggerId || open) {
    state.activeTriggerId = triggerId;
    state.activeTriggerElement = trigger ?? null;
  }
}

/**
 * Sets up trigger data forwarding to the store.
 *
 * @param triggerId Id of the trigger.
 * @param triggerElementRef Ref for the trigger DOM element.
 * @param store The Store instance managing the popup state.
 * @param stateUpdates An object with state updates to apply when the trigger is active.
 */
export function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
  const isMountedByThisTrigger = store.useState('isMountedByTrigger', triggerId);
  const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
  const registerTrigger = useStableCallback(element => {
    baseRegisterTrigger(element);
    if (!element) {
      return;
    }
    const open = store.select('open');
    const activeTriggerId = store.select('activeTriggerId');
    if (activeTriggerId === triggerId) {
      store.update({
        activeTriggerElement: element,
        ...(open ? stateUpdates : null)
      });
      return;
    }
    if (activeTriggerId == null && open) {
      // If a popup is already open, a detached trigger can mount before any active trigger
      // has been established. Claim the first registered trigger so trigger-owned focus
      // management and ARIA relationships work.
      store.update({
        activeTriggerId: triggerId,
        activeTriggerElement: element,
        ...stateUpdates
      });
    }
  });
  useIsoLayoutEffect(() => {
    if (isMountedByThisTrigger) {
      store.update({
        activeTriggerElement: triggerElementRef.current,
        ...stateUpdates
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMountedByThisTrigger, store, triggerElementRef, ...Object.values(stateUpdates)]);
  return {
    registerTrigger,
    isMountedByThisTrigger
  };
}
/**
 * Ensures that when there's only one trigger element registered, it is set as the active trigger.
 * This keeps triggerCount reactive while open and allows controlled popups to work correctly without
 * an explicit triggerId, maintaining compatibility with contained triggers.
 *
 * This should be called on the Root part.
 *
 * @param store The Store instance managing the popup state.
 */
export function useImplicitActiveTrigger(store) {
  const open = store.useState('open');
  const reactiveTriggerCount = store.useState('triggerCount');
  useIsoLayoutEffect(() => {
    if (!open) {
      if (store.state.triggerCount !== 0) {
        store.set('triggerCount', 0);
      }
      return;
    }
    const triggerCount = store.context.triggerElements.size;
    const stateUpdates = {};
    if (store.state.triggerCount !== triggerCount) {
      stateUpdates.triggerCount = triggerCount;
    }
    if (!store.select('activeTriggerId') && triggerCount === 1) {
      const iteratorResult = store.context.triggerElements.entries().next();
      if (!iteratorResult.done) {
        const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
        stateUpdates.activeTriggerId = implicitTriggerId;
        stateUpdates.activeTriggerElement = implicitTriggerElement;
      }
    }
    if (stateUpdates.triggerCount !== undefined || stateUpdates.activeTriggerId !== undefined) {
      store.update(stateUpdates);
    }
  }, [open, store, reactiveTriggerCount]);
}

/**
 * Manages the mounted state of the popup.
 * Sets up the transition status listeners and handles unmounting when needed.
 * Updates the `mounted` and `transitionStatus` states in the store.
 *
 * @param open Whether the popup is open.
 * @param store The Store instance managing the popup state.
 * @param onUnmount Optional callback to be called when the popup is unmounted.
 *
 * @returns A function to forcibly unmount the popup.
 */
export function useOpenStateTransitions(open, store, onUnmount) {
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  store.useSyncedValues({
    mounted,
    transitionStatus
  });
  const forceUnmount = useStableCallback(() => {
    setMounted(false);
    store.update({
      activeTriggerId: null,
      activeTriggerElement: null,
      mounted: false,
      preventUnmountingOnClose: false
    });
    onUnmount?.();
    store.context.onOpenChangeComplete?.(false);
  });
  const preventUnmountingOnClose = store.useState('preventUnmountingOnClose');
  useOpenChangeComplete({
    enabled: mounted && !open && !preventUnmountingOnClose,
    open,
    ref: store.context.popupRef,
    onComplete() {
      if (!open) {
        forceUnmount();
      }
    }
  });
  return {
    forceUnmount,
    transitionStatus
  };
}
export function usePopupInteractionProps(store, statePart) {
  store.useSyncedValues(statePart);
  useIsoLayoutEffect(() => () => {
    store.update({
      activeTriggerProps: EMPTY_OBJECT,
      inactiveTriggerProps: EMPTY_OBJECT,
      popupProps: EMPTY_OBJECT
    });
  }, [store]);
}
export function usePopupRootSync(store, open) {
  useIsoLayoutEffect(() => {
    if (!open && store.state.openMethod !== null) {
      store.set('openMethod', null);
    }
  }, [open, store]);
  useIsoLayoutEffect(() => () => {
    if (store.state.openMethod !== null) {
      store.set('openMethod', null);
    }
  }, [store]);
}