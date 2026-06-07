import { ToastManagerAddOptions, ToastObject } from '@base-ui/react/toast';
import { default as React } from 'react';
import { ButtonProps } from '../../components/button';
import { PortalContainer } from '../../utils/portal-provider';
/**
 * Toast styling configuration for Figma plugin consumption.
 * Toast has no user-facing variants but documents the styling structure.
 */
export declare const KUMO_TOAST_VARIANTS: {
    readonly root: {
        readonly classes: "rounded-lg border border-kumo-fill bg-kumo-control p-4 shadow-lg text-kumo-default";
        readonly description: "Toast container with background, border, and shadow";
    };
    readonly title: {
        readonly classes: "text-[0.975rem] leading-5 font-medium text-kumo-default";
        readonly description: "Toast title with primary text color";
    };
    readonly description: {
        readonly classes: "text-[0.925rem] leading-5 text-kumo-subtle";
        readonly description: "Toast description with muted text color";
    };
    readonly close: {
        readonly classes: "absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded bg-transparent text-kumo-subtle hover:bg-kumo-fill-hover hover:text-kumo-default";
        readonly description: "Close button with X icon";
    };
    readonly variant: {
        readonly default: {
            readonly classes: "border-kumo-fill bg-kumo-base";
            readonly description: "Default toast style";
        };
        readonly success: {
            readonly classes: "ring-[0.3px] ring-kumo-success bg-kumo-base [&_[data-toast-icon]]:text-kumo-success [&_[data-toast-title]]:text-kumo-success";
            readonly description: "Success toast for confirmations and positive outcomes";
            readonly icon: import('@phosphor-icons/react').Icon;
        };
        readonly error: {
            readonly classes: "ring-[0.3px] ring-kumo-danger bg-kumo-base [&_[data-toast-icon]]:text-kumo-danger [&_[data-toast-title]]:text-kumo-danger";
            readonly description: "Error toast for critical issues";
            readonly icon: import('@phosphor-icons/react').Icon;
        };
        readonly warning: {
            readonly classes: "ring-[0.3px] ring-kumo-warning bg-kumo-base [&_[data-toast-icon]]:text-kumo-warning [&_[data-toast-title]]:text-kumo-warning";
            readonly description: "Warning toast for cautionary messages";
            readonly icon: import('@phosphor-icons/react').Icon;
        };
        readonly info: {
            readonly classes: "ring-[0.3px] ring-kumo-info bg-kumo-control [&_[data-toast-icon]]:text-kumo-info [&_[data-toast-title]]:text-kumo-info";
            readonly description: "Info toast for neutral informational messages";
            readonly icon: import('@phosphor-icons/react').Icon;
        };
    };
};
export declare const KUMO_TOAST_DEFAULT_VARIANTS: {
    readonly variant: "default";
};
/**
 * Toast styling configuration for Figma plugin consumption.
 * Provides structured metadata for generating Toast components in Figma.
 */
export declare const KUMO_TOAST_STYLING: {
    readonly container: {
        readonly width: 300;
        readonly padding: 16;
        readonly borderRadius: 8;
        readonly background: "bg-kumo-base";
        readonly border: "ring-[0.3px] ring-kumo-hairline";
        readonly shadow: "shadow-lg";
        readonly gap: 4;
    };
    readonly title: {
        readonly fontSize: 16;
        readonly fontWeight: 500;
        readonly color: "text-color-surface";
    };
    readonly description: {
        readonly fontSize: 15;
        readonly fontWeight: 400;
        readonly color: "text-color-muted";
    };
    readonly closeButton: {
        readonly size: 20;
        readonly iconSize: 16;
        readonly iconName: "ph-x";
        readonly iconColor: "text-color-muted";
        readonly hoverBackground: "color-color-2";
        readonly hoverColor: "text-color-label";
        readonly borderRadius: 4;
    };
};
export type KumoToastVariant = keyof typeof KUMO_TOAST_VARIANTS.variant;
export interface KumoToastVariantsProps {
    variant?: KumoToastVariant;
}
export declare function toastVariants({ variant, }?: KumoToastVariantsProps): string;
/**
 * Toasty component props.
 *
 * Wrap your app with `<Toasty>` to enable toast notifications.
 * Use `Toast.useToastManager().notify(…)` to create toasts.
 *
 * @example
 * ```tsx
 * // 1. Wrap your app
 * <Toasty>
 *   <App />
 * </Toasty>
 *
 * // 2. Show a toast from any child component
 * const toasts = Toast.useToastManager();
 * toasts.notify({ title: "Saved", description: "Changes saved successfully." });
 * ```
 *
 * @example Dispatching toasts from non-React-component code
 * ```tsx
 * // 1. Create a manager at module scope
 * import { createKumoToastManager } from "@cloudflare/kumo";
 * export const appToastManager = createKumoToastManager();
 *
 * // 2. Pass it to <Toasty>
 * <Toasty toastManager={appToastManager}>
 *   <App />
 * </Toasty>
 *
 * // 3. Dispatch from anywhere — timers, callbacks, query-cache listeners
 * appToastManager.add({ title: "Saved" });
 * ```
 */
export interface ToastyProps extends KumoToastVariantsProps {
    /** Application content. Toasts render via a portal above this. */
    children: React.ReactNode;
    /**
     * Container element for the portal. Use this to render toasts inside
     * a Shadow DOM or custom container. Overrides `KumoPortalProvider` context.
     * @default document.body (or KumoPortalProvider container if set)
     */
    container?: PortalContainer;
    /**
     * Optional toast manager created by `createKumoToastManager()`. When
     * provided, allows code outside the React tree (timers, module-load
     * callbacks, query-cache listeners) to dispatch toasts via the same
     * dedupe-aware manager that `useKumoToastManager()` returns inside the
     * tree.
     *
     * Forwarded to the underlying `@base-ui/react/toast` `Toast.Provider`
     * `toastManager` prop — see
     * https://base-ui.com/react/components/toast for the upstream primitive.
     */
    toastManager?: ReturnType<typeof createKumoToastManager>;
}
type KumoToastOptionsBase = {
    variant?: KumoToastVariant;
    content?: React.ReactNode;
    actions?: Array<ButtonProps>;
    bump?: boolean;
};
export type KumoToastOptions<Data extends object> = ToastObject<Data> & KumoToastOptionsBase;
export type KumoToastManagerAddOptions<Data extends object> = ToastManagerAddOptions<Data> & KumoToastOptionsBase;
export declare const useKumoToastManager: () => {
    toasts: Array<KumoToastOptions<any>>;
    add: (<T extends any = any>(options: ToastManagerAddOptions<T>) => string) & ((options: KumoToastManagerAddOptions<any>) => any);
    close: (toastId?: string) => void;
    update: (<T extends any = any>(toastId: string, options: import('@base-ui/react').ToastManagerUpdateOptions<T>) => void) & ((id: string, options: Partial<KumoToastManagerAddOptions<any>>) => any);
    promise: (<Value, T extends any = any>(promise: Promise<Value>, options: import('@base-ui/react').ToastManagerPromiseOptions<Value, T>) => Promise<Value>) & (<T>(promise: Promise<T>, options: {
        loading: KumoToastManagerAddOptions<any>;
        success: KumoToastManagerAddOptions<any> | ((data: T) => KumoToastManagerAddOptions<any>);
        error: KumoToastManagerAddOptions<any> | ((error: Error) => KumoToastManagerAddOptions<any>);
    }) => any);
};
export declare const createKumoToastManager: () => import('@base-ui/react').ToastManager<any> & {
    add: (options: KumoToastManagerAddOptions<any>) => any;
    update: (id: string, options: Partial<KumoToastManagerAddOptions<any>>) => any;
    promise: <T>(promise: Promise<T>, options: {
        loading: KumoToastManagerAddOptions<any>;
        success: KumoToastManagerAddOptions<any> | ((data: T) => KumoToastManagerAddOptions<any>);
        error: KumoToastManagerAddOptions<any> | ((error: Error) => KumoToastManagerAddOptions<any>);
    }) => any;
};
/**
 * Toasty — toast notification provider and viewport.
 *
 * Renders a `Toast.Provider` with a fixed-position viewport in the bottom-right corner.
 * Toasts stack with smooth enter/exit animations, swipe-to-dismiss, and expand-on-hover.
 *
 * Built on `@base-ui/react/toast`.
 *
 * @example
 * ```tsx
 * <Toasty>
 *   <App />
 * </Toasty>
 * ```
 */
export declare function Toasty({ children, container: containerProp, toastManager, }: ToastyProps): import("react/jsx-runtime").JSX.Element;
/** Alias for Toasty — provided for discoverability when migrating from other libraries */
export declare const ToastProvider: typeof Toasty;
export {};
//# sourceMappingURL=toast.d.ts.map