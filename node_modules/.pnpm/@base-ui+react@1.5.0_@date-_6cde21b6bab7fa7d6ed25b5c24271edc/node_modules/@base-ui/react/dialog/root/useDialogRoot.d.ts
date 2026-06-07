import { type DialogRoot } from "./DialogRoot.js";
import { DialogStore } from "../store/DialogStore.js";
export declare function useDialogRoot(params: UseDialogRootParameters): UseDialogRootReturnValue;
export interface UseDialogRootSharedParameters {}
export interface UseDialogRootParameters {
  store: DialogStore<any>;
  actionsRef?: DialogRoot.Props['actionsRef'] | undefined;
  parentContext?: DialogStore<unknown>['context'] | undefined;
  isDrawer: boolean;
}
export interface UseDialogRootReturnValue {
  parentContext: DialogStore<unknown>['context'] | undefined;
  isDrawer: boolean;
}
export interface UseDialogRootState {}
export declare function DialogInteractions({
  store,
  dialogRoot
}: {
  store: DialogStore<any>;
  dialogRoot: UseDialogRootReturnValue;
}): null;