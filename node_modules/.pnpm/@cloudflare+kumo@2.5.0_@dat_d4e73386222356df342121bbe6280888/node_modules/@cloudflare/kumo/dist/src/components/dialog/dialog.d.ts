import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import { Dialog as DialogBase } from '@base-ui/react/dialog';
import { AlertDialog as AlertDialogBase } from '@base-ui/react/alert-dialog';
import { PortalContainer } from '../../utils/portal-provider';
/** Dialog size variant definitions mapping sizes to their minimum widths. */
export declare const KUMO_DIALOG_VARIANTS: {
    readonly size: {
        readonly base: {
            readonly classes: "sm:min-w-96";
            readonly description: "Default dialog width";
        };
        readonly sm: {
            readonly classes: "min-w-72";
            readonly description: "Small dialog for simple confirmations";
        };
        readonly lg: {
            readonly classes: "min-w-[32rem]";
            readonly description: "Large dialog for complex content";
        };
        readonly xl: {
            readonly classes: "min-w-[48rem]";
            readonly description: "Extra large dialog for detailed views";
        };
    };
    readonly role: {
        readonly dialog: {
            readonly classes: "";
            readonly description: "Standard dialog for general-purpose modals";
        };
        readonly alertdialog: {
            readonly classes: "";
            readonly description: "Alert dialog for confirmation flows requiring explicit user acknowledgment";
        };
    };
};
export declare const KUMO_DIALOG_DEFAULT_VARIANTS: {
    readonly size: "base";
    readonly role: "dialog";
};
export declare const KUMO_DIALOG_STYLING: {
    readonly dimensions: {
        readonly sm: {
            readonly width: 350;
            readonly titleSize: 20;
            readonly descSize: 16;
            readonly padding: 16;
            readonly gap: 8;
            readonly buttonSize: "sm";
        };
        readonly base: {
            readonly width: 384;
            readonly titleSize: 20;
            readonly descSize: 16;
            readonly padding: 24;
            readonly gap: 16;
            readonly buttonSize: "base";
        };
        readonly lg: {
            readonly width: 512;
            readonly titleSize: 20;
            readonly descSize: 16;
            readonly padding: 24;
            readonly gap: 16;
            readonly buttonSize: "base";
        };
        readonly xl: {
            readonly width: 768;
            readonly titleSize: 20;
            readonly descSize: 16;
            readonly padding: 24;
            readonly gap: 16;
            readonly buttonSize: "base";
        };
    };
    readonly baseTokens: {
        readonly background: "color-surface";
        readonly text: "text-color-surface";
        readonly borderRadius: 12;
        readonly shadow: "shadow-m";
    };
    readonly backdrop: {
        readonly background: "color-surface-secondary";
        readonly opacity: 0.8;
    };
    readonly header: {
        readonly title: {
            readonly fontWeight: 600;
            readonly color: "text-color-surface";
        };
        readonly closeIcon: {
            readonly name: "ph-x";
            readonly size: 20;
            readonly color: "text-color-muted";
        };
    };
    readonly description: {
        readonly fontWeight: 400;
        readonly color: "text-color-muted";
    };
    readonly buttons: {
        readonly primary: {
            readonly background: "color-primary";
            readonly text: "white";
        };
        readonly secondary: {
            readonly ring: "color-border";
            readonly text: "text-color-surface";
        };
    };
};
export type KumoDialogSize = keyof typeof KUMO_DIALOG_VARIANTS.size;
export type KumoDialogRole = keyof typeof KUMO_DIALOG_VARIANTS.role;
export interface KumoDialogVariantsProps {
    /**
     * Dialog width.
     * - `"sm"` — Small (min 288px) for simple confirmations
     * - `"base"` — Default (min 384px)
     * - `"lg"` — Large (min 512px) for complex content
     * - `"xl"` — Extra large (min 768px) for detailed views
     * @default "base"
     */
    size?: KumoDialogSize;
}
export declare function dialogVariants({ size, }?: KumoDialogVariantsProps): string;
/**
 * Dialog component props — the modal content panel.
 *
 * @example
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Trigger render={(p) => <Button {...p}>Open</Button>} />
 *   <Dialog className="p-8">
 *     <Dialog.Title>Confirm Action</Dialog.Title>
 *     <Dialog.Description>Are you sure?</Dialog.Description>
 *     <Dialog.Close render={(p) => <Button {...p}>Cancel</Button>} />
 *   </Dialog>
 * </Dialog.Root>
 * ```
 */
export type DialogProps = KumoDialogVariantsProps & {
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** Dialog content (typically Title, Description, Close, and action buttons). */
    children: ReactNode;
    /** Inline styles. */
    style?: CSSProperties;
    /**
     * Container element for the portal. Use this to render the dialog inside
     * a Shadow DOM or custom container. Overrides `KumoPortalProvider` context.
     * @default document.body (or KumoPortalProvider container if set)
     */
    container?: PortalContainer;
};
/**
 * Modal dialog overlay with backdrop. Compound component with `Dialog.Root`,
 * `Dialog.Trigger`, `Dialog.Title`, `Dialog.Description`, and `Dialog.Close`.
 *
 * @example
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Trigger render={(p) => <Button {...p}>Delete</Button>} />
 *   <Dialog className="p-8">
 *     <Dialog.Title>Delete Item</Dialog.Title>
 *     <Dialog.Description>This action cannot be undone.</Dialog.Description>
 *     <Dialog.Close render={(p) => <Button variant="destructive" {...p}>Delete</Button>} />
 *   </Dialog>
 * </Dialog.Root>
 * ```
 *
 * @example Alert Dialog for destructive actions
 * ```tsx
 * <Dialog.Root role="alertdialog">
 *   <Dialog.Trigger render={(p) => <Button variant="destructive" {...p}>Delete Project</Button>} />
 *   <Dialog className="p-8">
 *     <Dialog.Title>Delete Project?</Dialog.Title>
 *     <Dialog.Description>This action cannot be undone.</Dialog.Description>
 *     <Dialog.Close render={(p) => <Button variant="secondary" {...p}>Cancel</Button>} />
 *     <Dialog.Close render={(p) => <Button variant="destructive" {...p}>Delete</Button>} />
 *   </Dialog>
 * </Dialog.Root>
 * ```
 */
declare function DialogContent({ className, children, style, size, container: containerProp, }: DialogProps): import("react/jsx-runtime").JSX.Element;
type BaseDialogRootProps = ComponentPropsWithoutRef<typeof DialogBase.Root>;
type BaseAlertDialogRootProps = ComponentPropsWithoutRef<typeof AlertDialogBase.Root>;
type StandardDialogRootProps = BaseDialogRootProps & {
    /**
     * The ARIA role for the dialog.
     * - `"dialog"` — Standard dialog for general-purpose modals. Dismissible via outside click by default.
     * - `"alertdialog"` — Alert dialog for destructive or confirmation flows. Not dismissible via outside click.
     *
     * Use `role="alertdialog"` for:
     * - Destructive actions (delete, discard, remove)
     * - Confirmation dialogs requiring explicit user acknowledgment
     * - Actions that cannot be undone
     *
     * @default "dialog"
     */
    role?: "dialog";
};
type AlertDialogRootProps = BaseAlertDialogRootProps & {
    role: "alertdialog";
};
export type DialogRootProps = StandardDialogRootProps | AlertDialogRootProps;
declare function DialogRoot(props: DialogRootProps): import("react/jsx-runtime").JSX.Element;
declare namespace DialogRoot {
    var displayName: string;
}
type BaseDialogTriggerProps = ComponentPropsWithoutRef<typeof DialogBase.Trigger>;
type BaseAlertDialogTriggerProps = ComponentPropsWithoutRef<typeof AlertDialogBase.Trigger>;
export type DialogTriggerProps = BaseDialogTriggerProps | BaseAlertDialogTriggerProps;
declare function DialogTrigger({ children, ...props }: DialogTriggerProps): import("react/jsx-runtime").JSX.Element;
declare namespace DialogTrigger {
    var displayName: string;
}
type BaseDialogTitleProps = ComponentPropsWithoutRef<typeof DialogBase.Title>;
export type DialogTitleProps = BaseDialogTitleProps;
declare function DialogTitle({ className, ...props }: DialogTitleProps): import("react/jsx-runtime").JSX.Element;
declare namespace DialogTitle {
    var displayName: string;
}
type BaseDialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogBase.Description>;
export type DialogDescriptionProps = BaseDialogDescriptionProps;
declare function DialogDescription({ className, ...props }: DialogDescriptionProps): import("react/jsx-runtime").JSX.Element;
declare namespace DialogDescription {
    var displayName: string;
}
type BaseDialogCloseProps = ComponentPropsWithoutRef<typeof DialogBase.Close>;
export type DialogCloseProps = BaseDialogCloseProps;
declare function DialogClose({ children, ...props }: DialogCloseProps): import("react/jsx-runtime").JSX.Element;
declare namespace DialogClose {
    var displayName: string;
}
declare const Dialog: typeof DialogContent & {
    Root: typeof DialogRoot;
    Trigger: typeof DialogTrigger;
    Title: typeof DialogTitle;
    Description: typeof DialogDescription;
    Close: typeof DialogClose;
};
export { Dialog, DialogRoot, DialogTrigger, DialogTitle, DialogDescription, DialogClose, };
//# sourceMappingURL=dialog.d.ts.map