"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipStore = void 0;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _store = require("@base-ui/utils/store");
var _createBaseUIEventDetails = require("../../internals/createBaseUIEventDetails");
var _reasons = require("../../internals/reasons");
var _popups = require("../../utils/popups");
const selectors = {
  ..._popups.popupStoreSelectors,
  disabled: (0, _store.createSelector)(state => state.disabled),
  instantType: (0, _store.createSelector)(state => state.instantType),
  isInstantPhase: (0, _store.createSelector)(state => state.isInstantPhase),
  trackCursorAxis: (0, _store.createSelector)(state => state.trackCursorAxis),
  disableHoverablePopup: (0, _store.createSelector)(state => state.disableHoverablePopup),
  lastOpenChangeReason: (0, _store.createSelector)(state => state.openChangeReason),
  closeOnClick: (0, _store.createSelector)(state => state.closeOnClick),
  closeDelay: (0, _store.createSelector)(state => state.closeDelay),
  hasViewport: (0, _store.createSelector)(state => state.hasViewport)
};
class TooltipStore extends _store.ReactStore {
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
      triggerElements
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

  // Used by trigger clicks to clear a delayed hover open without reporting a public open-state change.
  cancelPendingOpen(event) {
    this.state.floatingRootContext.dispatchOpenChange(false, (0, _createBaseUIEventDetails.createChangeEventDetails)(_reasons.REASONS.triggerPress, event));
  }
  static useStore(externalStore, initialState) {
    /* eslint-disable react-hooks/rules-of-hooks */
    const store = (0, _popups.usePopupStore)(externalStore, (floatingId, nested) => new TooltipStore(initialState, floatingId, nested)).store;
    /* eslint-enable react-hooks/rules-of-hooks */

    return store;
  }
}
exports.TooltipStore = TooltipStore;
function createInitialState() {
  return {
    ...(0, _popups.createInitialPopupStoreState)(),
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