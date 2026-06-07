import { DialogHandle } from "../dialog/store/DialogHandle.js";
import { DialogStore } from "../dialog/store/DialogStore.js";
export const alertDialogState = {
  modal: true,
  disablePointerDismissal: true,
  role: 'alertdialog'
};

/**
 * A handle to control an Alert Dialog imperatively and to associate detached triggers with it.
 */
export class AlertDialogHandle extends DialogHandle {
  constructor(store) {
    const alertDialogStore = store ?? new DialogStore(alertDialogState);
    super(alertDialogStore);
    if (store) {
      // Supplied stores may have been created as plain dialogs; enforce alert-dialog state.
      this.store.update(alertDialogState);
    }
  }
}
export function createAlertDialogHandle() {
  return new AlertDialogHandle();
}