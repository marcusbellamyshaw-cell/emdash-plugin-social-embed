import { Menu as DropdownMenuPrimitive } from '@base-ui/react/menu';
import { PortalContainer } from '../../utils/portal-provider';
import { Icon } from '@phosphor-icons/react';
import * as React from "react";
/** Dropdown item variant definitions (default and danger styles). */
export declare const KUMO_DROPDOWN_VARIANTS: {
    readonly variant: {
        readonly default: {
            readonly classes: "";
            readonly description: "Default dropdown item appearance";
        };
        readonly danger: {
            readonly classes: "text-kumo-danger data-highlighted:bg-kumo-danger/5 data-highlighted:text-kumo-danger";
            readonly description: "Destructive action item";
        };
    };
};
export declare const KUMO_DROPDOWN_DEFAULT_VARIANTS: {
    readonly variant: "default";
};
export type KumoDropdownVariant = keyof typeof KUMO_DROPDOWN_VARIANTS.variant;
export interface KumoDropdownVariantsProps {
    /**
     * Visual style of the dropdown item.
     * - `"default"` — Standard item appearance
     * - `"danger"` — Destructive action with red text
     * @default "default"
     */
    variant?: KumoDropdownVariant;
}
export declare function dropdownVariants({ variant, }?: KumoDropdownVariantsProps): string;
/**
 * DropdownMenu — accessible dropdown menu anchored to a trigger.
 *
 * Compound component: `DropdownMenu` (Root), `.Trigger`, `.Content`, `.Item`,
 * `.LinkItem`, `.CheckboxItem`, `.RadioGroup`, `.RadioItem`, `.RadioItemIndicator`,
 * `.Sub`, `.SubTrigger`, `.SubContent`, `.Label`, `.Separator`, `.Shortcut`, `.Group`.
 *
 * Built on `@base-ui/react/menu`.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenu.Trigger>
 *     <Button>Actions</Button>
 *   </DropdownMenu.Trigger>
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item>Edit</DropdownMenu.Item>
 *     <DropdownMenu.Item icon={CopyIcon}>Duplicate</DropdownMenu.Item>
 *     <DropdownMenu.LinkItem href="/settings" icon={GearIcon}>Settings</DropdownMenu.LinkItem>
 *     <DropdownMenu.Separator />
 *     <DropdownMenu.Item variant="danger">Delete</DropdownMenu.Item>
 *   </DropdownMenu.Content>
 * </DropdownMenu>
 * ```
 *
 * @see https://base-ui.com/react/components/menu
 */
export declare const DropdownMenu: (<Payload>(props: DropdownMenuPrimitive.Root.Props<Payload>) => import("react/jsx-runtime").JSX.Element) & {
    Trigger: React.ForwardRefExoticComponent<Omit<import('@base-ui/react').MenuTriggerProps<unknown> & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
    Portal: React.ForwardRefExoticComponent<Omit<import('@base-ui/react').ContextMenuPortalProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Sub: typeof DropdownMenuPrimitive.SubmenuRoot;
    SubTrigger: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuSubmenuTriggerProps, "ref"> & React.RefAttributes<HTMLElement>, "ref"> & {
        inset?: boolean;
        icon?: Icon;
    } & React.RefAttributes<HTMLElement>>;
    SubContent: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuPositionerProps, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & {
        /**
         * Container element for the portal. Use this to render the dropdown inside
         * a Shadow DOM or custom container. Overrides `KumoPortalProvider` context.
         * @default document.body (or KumoPortalProvider container if set)
         */
        container?: PortalContainer;
    } & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuPositionerProps, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & {
        /**
         * Container element for the portal. Use this to render the dropdown inside
         * a Shadow DOM or custom container. Overrides `KumoPortalProvider` context.
         * @default document.body (or KumoPortalProvider container if set)
         */
        container?: PortalContainer;
    } & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuItemProps, "ref"> & React.RefAttributes<HTMLElement>, "ref"> & {
        inset?: boolean;
        icon?: Icon | React.ReactNode;
        selected?: boolean;
        /**
         * @deprecated Use `DropdownMenu.LinkItem` instead for navigation links.
         * This prop will be removed in a future major version.
         */
        href?: string;
        variant?: "default" | "danger";
    } & React.RefAttributes<HTMLElement>>;
    LinkItem: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuLinkItemProps, "ref"> & React.RefAttributes<Element>, "ref"> & {
        inset?: boolean;
        icon?: Icon | React.ReactNode;
        variant?: "default" | "danger";
    } & React.RefAttributes<Element>>;
    CheckboxItem: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuCheckboxItemProps, "ref"> & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
    RadioGroup: React.NamedExoticComponent<Omit<import('@base-ui/react').ContextMenuRadioGroupProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
    RadioItem: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuRadioItemProps, "ref"> & React.RefAttributes<HTMLElement>, "ref"> & {
        inset?: boolean;
        icon?: Icon | React.ReactNode;
    } & React.RefAttributes<HTMLElement>>;
    RadioItemIndicator: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuRadioItemIndicatorProps, "ref"> & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
    Label: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').ContextMenuGroupLabelProps, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & {
        inset?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
    Separator: React.ForwardRefExoticComponent<Omit<Omit<import('@base-ui/react').SeparatorProps, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Shortcut: {
        ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    Group: React.ForwardRefExoticComponent<Omit<import('@base-ui/react').ContextMenuGroupProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
};
//# sourceMappingURL=dropdown.d.ts.map