"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOCUSABLE_POPUP_PROPS = void 0;
exports.setOpenTriggerState = setOpenTriggerState;
exports.useImplicitActiveTrigger = useImplicitActiveTrigger;
exports.useOpenStateTransitions = useOpenStateTransitions;
exports.usePopupInteractionProps = usePopupInteractionProps;
exports.usePopupRootSync = usePopupRootSync;
exports.usePopupStore = usePopupStore;
exports.useTriggerDataForwarding = useTriggerDataForwarding;
exports.useTriggerRegistration = useTriggerRegistration;
var React = _interopRequireWildcard(require("react"));
var _empty = require("@base-ui/utils/empty");
var _useId = require("@base-ui/utils/useId");
var _useStableCallback = require("@base-ui/utils/useStableCallback");
var _useIsoLayoutEffect = require("@base-ui/utils/useIsoLayoutEffect");
var _constants = require("../../floating-ui-react/utils/constants");
var _FloatingTree = require("../../floating-ui-react/components/FloatingTree");
var _useSyncedFloatingRootContext = require("../../floating-ui-react/hooks/useSyncedFloatingRootContext");
var _useTransitionStatus = require("../../internals/useTransitionStatus");
var _useOpenChangeComplete = require("../../internals/useOpenChangeComplete");
const FOCUSABLE_POPUP_PROPS = exports.FOCUSABLE_POPUP_PROPS = {
  tabIndex: -1,
  [_constants.FOCUSABLE_ATTRIBUTE]: ''
};
function usePopupStore(externalStore, createStore, treatPopupAsFloatingElement = false) {
  const floatingId = (0, _useId.useId)();
  const nested = (0, _FloatingTree.useFloatingParentNodeId)() != null;
  const internalStoreRef = React.useRef(null);
  if (externalStore === undefined && internalStoreRef.current === null) {
    internalStoreRef.current = createStore(floatingId, nested);
  }
  const store = externalStore ?? internalStoreRef.current;
  (0, _useSyncedFloatingRootContext.useSyncedFloatingRootContext)({
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
function useTriggerRegistration(id, store) {
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
function setOpenTriggerState(state, open, trigger) {
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
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
  const isMountedByThisTrigger = store.useState('isMountedByTrigger', triggerId);
  const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
  const registerTrigger = (0, _useStableCallback.useStableCallback)(element => {
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
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
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
function useImplicitActiveTrigger(store) {
  const open = store.useState('open');
  const reactiveTriggerCount = store.useState('triggerCount');
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
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
function useOpenStateTransitions(open, store, onUnmount) {
  const {
    mounted,
    setMounted,
    transitionStatus
  } = (0, _useTransitionStatus.useTransitionStatus)(open);
  store.useSyncedValues({
    mounted,
    transitionStatus
  });
  const forceUnmount = (0, _useStableCallback.useStableCallback)(() => {
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
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
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
function usePopupInteractionProps(store, statePart) {
  store.useSyncedValues(statePart);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => () => {
    store.update({
      activeTriggerProps: _empty.EMPTY_OBJECT,
      inactiveTriggerProps: _empty.EMPTY_OBJECT,
      popupProps: _empty.EMPTY_OBJECT
    });
  }, [store]);
}
function usePopupRootSync(store, open) {
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!open && store.state.openMethod !== null) {
      store.set('openMethod', null);
    }
  }, [open, store]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => () => {
    if (store.state.openMethod !== null) {
      store.set('openMethod', null);
    }
  }, [store]);
}