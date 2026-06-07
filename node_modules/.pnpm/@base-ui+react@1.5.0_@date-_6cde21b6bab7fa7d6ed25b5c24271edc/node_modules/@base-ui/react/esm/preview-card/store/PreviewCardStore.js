import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createSelector, ReactStore } from '@base-ui/utils/store';
import { createPopupFloatingRootContext, createInitialPopupStoreState, popupStoreSelectors, PopupTriggerMap, setOpenTriggerState, updateInlineRectCoords, usePopupStore } from "../../utils/popups/index.js";
import { REASONS } from "../../internals/reasons.js";
import { CLOSE_DELAY } from "../utils/constants.js";
const selectors = {
  ...popupStoreSelectors,
  instantType: createSelector(state => state.instantType),
  hasViewport: createSelector(state => state.hasViewport)
};
export class PreviewCardStore extends ReactStore {
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
      triggerElements,
      closeDelayRef: {
        current: CLOSE_DELAY
      },
      inlineRectCoordsRef: {
        current: undefined
      }
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
    const event = eventDetails.event;
    if (nextOpen && isHover && eventDetails.trigger && 'clientX' in event && 'clientY' in event && this.context.inlineRectCoordsRef.current?.element !== eventDetails.trigger) {
      updateInlineRectCoords(this.context.inlineRectCoordsRef, eventDetails.trigger, event.clientX, event.clientY);
    }
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    const changeState = () => {
      const updatedState = {
        open: nextOpen
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
  static useStore(externalStore, initialState) {
    /* eslint-disable react-hooks/rules-of-hooks */
    const store = usePopupStore(externalStore, (floatingId, nested) => new PreviewCardStore(initialState, floatingId, nested)).store;
    /* eslint-enable react-hooks/rules-of-hooks */

    return store;
  }
}
function createInitialState() {
  return {
    ...createInitialPopupStoreState(),
    instantType: undefined,
    hasViewport: false
  };
}