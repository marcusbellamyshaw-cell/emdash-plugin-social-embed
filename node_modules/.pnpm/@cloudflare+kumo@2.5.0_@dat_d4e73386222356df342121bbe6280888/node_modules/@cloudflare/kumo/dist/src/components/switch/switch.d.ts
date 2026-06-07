import { ButtonHTMLAttributes, ReactNode } from 'react';
/** Switch size and variant definitions mapping names to their Tailwind classes. */
export declare const KUMO_SWITCH_VARIANTS: {
    readonly size: {
        readonly sm: {
            readonly classes: "h-5.5 w-8.5";
            readonly description: "Small switch for compact UIs";
        };
        readonly base: {
            readonly classes: "h-6.5 w-10.5";
            readonly description: "Default switch size";
        };
        readonly lg: {
            readonly classes: "h-7.5 w-12.5";
            readonly description: "Large switch for prominent toggles";
        };
    };
    readonly variant: {
        readonly default: {
            readonly classes: "";
            readonly description: "Default switch with squircle shape and brand blue color";
        };
        readonly neutral: {
            readonly classes: "";
            readonly description: "Monochrome switch with squircle shape for subtle toggles";
        };
    };
};
export declare const KUMO_SWITCH_DEFAULT_VARIANTS: {
    readonly size: "base";
    readonly variant: "default";
};
export type KumoSwitchSize = keyof typeof KUMO_SWITCH_VARIANTS.size;
export type KumoSwitchVariant = keyof typeof KUMO_SWITCH_VARIANTS.variant;
export interface KumoSwitchVariantsProps {
    /**
     * Switch size.
     * - `"sm"` — Small for compact UIs
     * - `"base"` — Default size
     * - `"lg"` — Large for prominent toggles
     * @default "base"
     */
    size?: KumoSwitchSize;
    /**
     * Visual variant.
     * - `"default"` — Standard switch appearance
     * - `"error"` — Error state for validation failures
     * @default "default"
     */
    variant?: KumoSwitchVariant;
}
export declare function switchVariants({ size, variant, }?: KumoSwitchVariantsProps): string;
export type SwitchSize = KumoSwitchSize;
export type SwitchVariant = KumoSwitchVariant;
/**
 * Single switch component props (with built-in Field)
 *
 * Usage patterns:
 *
 * Basic usage:
 * ```tsx
 * <Switch label="Enable notifications" checked={true} onCheckedChange={setChecked} />
 * ```
 *
 * Label first layout:
 * ```tsx
 * <Switch label="Dark mode" checked={false} onCheckedChange={setChecked} controlFirst={false} />
 * ```
 *
 * Neutral variant (monochrome, squircle shape):
 * ```tsx
 * <Switch label="Setting" variant="neutral" checked={false} onCheckedChange={setChecked} />
 * ```
 *
 * @property {string} label - Label text for the switch (Field wrapper is built-in)
 * @property {boolean} [controlFirst] - When true (default), switch appears before label
 */
export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    /** Visual variant: "default" (pill, brand color) or "neutral" (squircle, monochrome) */
    variant?: SwitchVariant;
    /** Label content for the switch (Field wrapper is built-in) - can be a string or any React node. Optional when used standalone for visual-only purposes. */
    label?: ReactNode;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /**
     * Whether the switch is required.
     * When explicitly false, shows "(optional)" text after the label.
     */
    required?: boolean;
    /** When true (default), switch appears before label. When false, label appears before switch. */
    controlFirst?: boolean;
    size?: KumoSwitchSize;
    checked?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    transitioning?: boolean;
};
/**
 * Switch group component props (with built-in Fieldset)
 *
 * Usage:
 * ```tsx
 * <Switch.Group
 *   legend="Notification settings"
 *   error="You must enable at least one notification type"
 * >
 *   <Switch.Item label="Email notifications" value="email" />
 *   <Switch.Item label="SMS notifications" value="sms" />
 * </Switch.Group>
 * ```
 */
/**
 * Props for Switch.Legend — a composable sub-component for labeling a Switch.Group.
 *
 * Place as a direct child of `<Switch.Group>` to provide a styled, accessible legend.
 * Accepts `className` for full styling control (e.g. `className="sr-only"` to visually hide).
 *
 * @example
 * ```tsx
 * <Switch.Group>
 *   <Switch.Legend className="sr-only">Notification settings</Switch.Legend>
 *   <Switch.Item label="Email" value="email" />
 * </Switch.Group>
 * ```
 */
export interface SwitchLegendProps {
    /** Legend content */
    children: ReactNode;
    /** Additional CSS classes (e.g. "sr-only" to visually hide the legend) */
    className?: string;
}
export interface SwitchGroupProps {
    /**
     * Legend text for the group.
     * For more control over legend styling, omit this prop and use `<Switch.Legend>` as a child instead.
     */
    legend?: string;
    /** Child Switch.Item components (and optionally a Switch.Legend) */
    children: ReactNode;
    /** Error message for the group (only appears in groups, not single switches) */
    error?: string;
    /** Helper text for the group */
    description?: ReactNode;
    /** Whether all switches in the group are disabled */
    disabled?: boolean;
    /** When true (default), switch appears before label. When false, label appears before switch. */
    controlFirst?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/**
 * Individual switch item within a group
 */
export type SwitchItemProps = {
    /** Visual variant: "default" or "error" for validation failures */
    variant?: SwitchVariant;
    /** Label text displayed next to switch */
    label: string;
    /** Additional CSS classes for the label wrapper */
    className?: string;
    checked?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: KumoSwitchSize;
    transitioning?: boolean;
};
declare function SwitchLegend({ children, className }: SwitchLegendProps): import("react/jsx-runtime").JSX.Element;
declare namespace SwitchLegend {
    var displayName: string;
}
declare function SwitchGroup({ legend, children, error, description, disabled, controlFirst, className, }: SwitchGroupProps): import("react/jsx-runtime").JSX.Element;
export declare const Switch: import('react').ForwardRefExoticComponent<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    /** Visual variant: "default" (pill, brand color) or "neutral" (squircle, monochrome) */
    variant?: SwitchVariant;
    /** Label content for the switch (Field wrapper is built-in) - can be a string or any React node. Optional when used standalone for visual-only purposes. */
    label?: ReactNode;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /**
     * Whether the switch is required.
     * When explicitly false, shows "(optional)" text after the label.
     */
    required?: boolean;
    /** When true (default), switch appears before label. When false, label appears before switch. */
    controlFirst?: boolean;
    size?: KumoSwitchSize;
    checked?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    transitioning?: boolean;
} & import('react').RefAttributes<HTMLButtonElement>> & {
    Item: import('react').ForwardRefExoticComponent<SwitchItemProps & import('react').RefAttributes<HTMLButtonElement>>;
    Group: typeof SwitchGroup;
    Legend: typeof SwitchLegend;
};
export {};
//# sourceMappingURL=switch.d.ts.map