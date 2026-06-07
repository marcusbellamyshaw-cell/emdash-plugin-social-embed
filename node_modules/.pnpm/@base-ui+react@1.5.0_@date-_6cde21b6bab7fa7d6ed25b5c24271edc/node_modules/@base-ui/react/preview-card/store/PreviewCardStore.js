"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewCardStore = void 0;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _store = require("@base-ui/utils/store");
var _popups = require("../../utils/popups");
var _reasons = require("../../internals/reasons");
var _constants = require("../utils/constants");
const selectors = {
  ..._popups.popupStoreSelectors,
  instantType: (0, _store.createSelector)(state => state.instantType),
  hasViewport: (0, _store.createSelector)(state => state.hasViewport)
};
class PreviewCardStore extends _store.ReactStore {
  constructor(initialState, floatingId, nested = false) {
    const triggerElements = new _popups.PopupTriggerMap();
    const state = {
      ...createInitialState(),
      ...initialState
    };
    state.floatingRootContext = (0, _popups.createPopupFloatingRootContext)(triggerElements, floatingId, nested);
    super(state, {
      popupRef: /*#__PURE__*/React.createRef(),
      onOpenChange: undefined,
      onOpenChangeComplete: undefined,
      triggerElements,
      closeDelayRef: {
        current: _constants.CLOSE_DELAY
      },
      inlineRectCoordsRef: {
        current: undefined
      }
    }, selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    const reason = eventDetails.reason;
    const isHover = reason === _reasons.REASONS.triggerHover;
    const isFocusOpen = nextOpen && reason === _reasons.REASONS.triggerFocus;
    const isDismissClose = !nextOpen && (reason === _reasons.REASONS.triggerPress || reason === _reasons.REASONS.escapeKey);
    eventDetails.preventUnmountOnClose = () => {
      this.set('preventUnmountingOnClose', true);
    };
    this.context.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    const event = eventDetails.event;
    if (nextOpen && isHover && eventDetails.trigger && 'clientX' in event && 'clientY' in event && this.context.inlineRectCoordsRef.current?.element !== eventDetails.trigger) {
      (0, _popups.updateInlineRectCoords)(this.context.inlineRectCoordsRef, eventDetails.trigger, event.clientX, event.clientY);
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
      } else if (reason === _reasons.REASONS.triggerHover) {
        updatedState.instantType = undefined;
      }
      (0, _popups.setOpenTriggerState)(updatedState, nextOpen, eventDetails.trigger);
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
    const store = (0, _popups.usePopupStore)(externalStore, (floatingId, nested) => new PreviewCardStore(initialState, floatingId, nested)).store;
    /* eslint-enable react-hooks/rules-of-hooks */

    return store;
  }
}
exports.PreviewCardStore = PreviewCardStore;
function createInitialState() {
  return {
    ...(0, _popups.createInitialPopupStoreState)(),
    instantType: undefined,
    hasViewport: false
  };
}