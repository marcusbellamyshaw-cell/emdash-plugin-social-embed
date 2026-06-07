import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createSelector, ReactStore } from '@base-ui/utils/store';
import { createChangeEventDetails } from "../../internals/createBaseUIEventDetails.js";
import { REASONS } from "../../internals/reasons.js";
import { createPopupFloatingRootContext, createInitialPopupStoreState, popupStoreSelectors, PopupTriggerMap, setOpenTriggerState, usePopupStore } from "../../utils/popups/index.js";
const selectors = {
  ...popupStoreSelectors,
  disabled: createSelector(state => state.disabled),
  instantType: createSelector(state => state.instantType),
  isInstantPhase: createSelector(state => state.isInstantPhase),
  trackCursorAxis: createSelector(state => state.trackCursorAxis),
  disableHoverablePopup: createSelector(state => state.disableHoverablePopup),
  lastOpenChangeReason: createSelector(state => state.openChangeReason),
  closeOnClick: createSelector(state => state.closeOnClick),
  closeDelay: createSelector(state => state.closeDelay),
  hasViewport: createSelector(state => state.hasViewport)
};
export class TooltipStore extends ReactStore {
  constructor(initialState, floatingId, nested = false) {
    const triggerElements = new PopupTriggerMap();
    const state = {
      ...createInitialState(),
      ...initialState
    };
    state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested);
    super(state, {
      popupRef: /*#__PURE__*/React.createRef(),
      onOpenChange: undefined,
      onOpenChangeComplete: undefined,
      triggerElements
    }, selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    const reason = eventDetails.reason;
    const isHover = reason === REASONS.triggerHover;
    const isFocusOpen = nextOpen && reason === REASONS.triggerFocus;
    const isDismissClose = !nextOpen && (reason === REASONS.triggerPress || reason === REASONS.escapeKey);
    eventDetails.preventUnmountOnClose = () => {
      this.set('preventUnmountingOnClose', true);
    };
    this.context.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    const changeState = () => {
      const updatedState = {
        open: nextOpen,
        openChangeReason: reason
      };
      if (isFocusOpen) {
        updatedState.instantType = 'focus';
      } else if (isDismissClose) {
        updatedState.instantType = 'dismiss';
      } else if (reason === REASONS.triggerHover) {
        updatedState.instantType = undefined;
      }
      setOpenTriggerState(updatedState, nextOpen, eventDetails.trigger);
      this.update(updatedState);
    };
    if (isHover) {
      // If a hover reason is provided, we need to flush the state synchronously. This ensures
      // `node.getAnimations()` knows about the new state.
      ReactDOM.flushSync(changeState);
    } else {
      changeState();
    }
  };

  // Used by trigger clicks to clear a delayed hover open without reporting a public open-state change.
  cancelPendingOpen(event) {
    this.state.floatingRootContext.dispatchOpenChange(false, createChangeEventDetails(REASONS.triggerPress, event));
  }
  static useStore(externalStore, initialState) {
    /* eslint-disable react-hooks/rules-of-hooks */
    const store = usePopupStore(externalStore, (floatingId, nested) => new TooltipStore(initialState, floatingId, nested)).store;
    /* eslint-enable react-hooks/rules-of-hooks */

    return store;
  }
}
function createInitialState() {
  return {
    ...createInitialPopupStoreState(),
    disabled: false,
    instantType: undefined,
    isInstantPhase: false,
    trackCursorAxis: 'none',
    disableHoverablePopup: false,
    openChangeReason: null,
    closeOnClick: true,
    closeDelay: 0,
    hasViewport: false
  };
}