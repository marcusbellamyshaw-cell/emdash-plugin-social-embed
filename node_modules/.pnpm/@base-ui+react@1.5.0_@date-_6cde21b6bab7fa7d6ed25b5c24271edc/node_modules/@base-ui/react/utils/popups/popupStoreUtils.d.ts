import * as React from 'react';
import { ReactStore } from '@base-ui/utils/store';
import type { InteractionType } from '@base-ui/utils/useEnhancedClickHandler';
import type { BaseUIChangeEventDetails } from "../../internals/createBaseUIEventDetails.js";
import { PopupStoreState, PopupStoreContext, popupStoreSelectors, PopupStoreSelectors } from "./store.js";
export declare const FOCUSABLE_POPUP_PROPS: {
  tabIndex: number;
  "data-base-ui-focusable": string;
};
type PopupStoreWithOpen<State extends PopupStoreState<unknown>, SetOpenEventDetails extends BaseUIChangeEventDetails<string>> = ReactStore<State, PopupStoreContext<never>, PopupStoreSelectors> & {
  setOpen(open: boolean, eventDetails: SetOpenEventDetails): void;
};
export declare function usePopupStore<State extends PopupStoreState<unknown>, SetOpenEventDetails extends BaseUIChangeEventDetails<string>, Store extends PopupStoreWithOpen<State, SetOpenEventDetails>>(externalStore: Store | undefined, createStore: (floatingId: string | undefined, nested: boolean) => Store, treatPopupAsFloatingElement?: boolean): {
  store: Store;
  internalStore: Store | null;
};
/**
 * Returns a callback ref that registers/unregisters the trigger element in the store.
 *
 * @param store The Store instance where the trigger should be registered.
 */
export declare function useTriggerRegistration<State extends PopupStoreState<unknown>>(id: string | undefined, store: ReactStore<State, PopupStoreContext<never>, PopupStoreSelectors>): (element: Element | null) => void;
export declare function setOpenTriggerState(state: Partial<PopupStoreState<unknown>>, open: boolean, trigger: Element | undefined): void;
/**
 * Sets up trigger data forwarding to the store.
 *
 * @param triggerId Id of the trigger.
 * @param triggerElementRef Ref for the trigger DOM element.
 * @param store The Store instance managing the popup state.
 * @param stateUpdates An object with state updates to apply when the trigger is active.
 */
export declare function useTriggerDataForwarding<State extends PopupStoreState<unknown>>(triggerId: string | undefined, triggerElementRef: React.RefObject<Element | null>, store: ReactStore<State, PopupStoreContext<never>, typeof popupStoreSelectors>, stateUpdates: Omit<Partial<State>, 'activeTriggerId' | 'activeTriggerElement'>): {
  registerTrigger: (element: Element | null) => void;
  isMountedByThisTrigger: boolean;
};
export type PayloadChildRenderFunction<Payload> = (arg: {
  payload: Payload | undefined;
}) => React.ReactNode;
/**
 * Ensures that when there's only one trigger element registered, it is set as the active trigger.
 * This keeps triggerCount reactive while open and allows controlled popups to work correctly without
 * an explicit triggerId, maintaining compatibility with contained triggers.
 *
 * This should be called on the Root part.
 *
 * @param store The Store instance managing the popup state.
 */
export declare function useImplicitActiveTrigger<State extends PopupStoreState<unknown>>(store: ReactStore<State, PopupStoreContext<never>, typeof popupStoreSelectors>): void;
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
export declare function useOpenStateTransitions<State extends PopupStoreState<unknown>>(open: boolean, store: ReactStore<State, PopupStoreContext<never>, typeof popupStoreSelectors>, onUnmount?: () => void): {
  forceUnmount: () => void;
  transitionStatus: import("../../internals/useTransitionStatus.js").TransitionStatus;
};
export declare function usePopupInteractionProps<State extends PopupStoreState<unknown>>(store: ReactStore<State, PopupStoreContext<never>, typeof popupStoreSelectors>, statePart: Partial<State> & Pick<State, 'activeTriggerProps' | 'inactiveTriggerProps' | 'popupProps'>): void;
export declare function usePopupRootSync<State extends PopupStoreState<unknown> & {
  openMethod: InteractionType | null;
}>(store: ReactStore<State, PopupStoreContext<never>, typeof popupStoreSelectors>, open: boolean): void;
export {};