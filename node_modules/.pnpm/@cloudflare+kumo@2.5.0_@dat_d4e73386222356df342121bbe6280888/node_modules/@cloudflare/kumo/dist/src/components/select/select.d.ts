import { Select as SelectBase } from '@base-ui/react/select';
import { ReactNode } from 'react';
import { FieldErrorMatch } from '../field/field';
import { PortalContainer } from '../../utils/portal-provider';
/** Select variant definitions. */
export declare const KUMO_SELECT_VARIANTS: {
    readonly size: {
        readonly xs: {
            readonly classes: "h-5 gap-1 rounded-sm px-1.5 text-xs";
            readonly description: "Extra small input for compact UIs";
        };
        readonly sm: {
            readonly classes: "h-6.5 gap-1 rounded-md px-2 text-xs";
            readonly description: "Small input for secondary fields";
        };
        readonly base: {
            readonly classes: "h-9 gap-1.5 rounded-lg px-3 text-base";
            readonly description: "Default input size";
        };
        readonly lg: {
            readonly classes: "h-10 gap-2 rounded-lg px-4 text-base";
            readonly description: "Large input for prominent fields";
        };
    };
};
export declare const KUMO_SELECT_DEFAULT_VARIANTS: {
    readonly size: "base";
};
/**
 * Select component styling metadata for Figma plugin code generation
 * Extracted from select.tsx implementation (source of truth)
 */
export declare const KUMO_SELECT_STYLING: {
    readonly trigger: {
        readonly height: 36;
        readonly paddingX: 12;
        readonly borderRadius: 8;
        readonly background: "bg-kumo-elevated";
        readonly text: "text-color-surface";
        readonly ring: "color-border";
        readonly fontSize: 16;
        readonly fontWeight: 400;
    };
    readonly stateTokens: {
        readonly focus: {
            readonly ring: "color-active";
        };
        readonly disabled: {
            readonly opacity: 0.5;
        };
    };
    readonly icons: {
        readonly caret: {
            readonly name: "ph-caret-up-down";
            readonly size: 20;
        };
        readonly check: {
            readonly name: "ph-check";
            readonly size: 20;
        };
    };
    readonly popup: {
        readonly background: "bg-kumo-elevated";
        readonly ring: "border-kumo-line";
        readonly borderRadius: 8;
        readonly padding: 6;
    };
    readonly option: {
        readonly paddingX: 8;
        readonly paddingY: 6;
        readonly borderRadius: 4;
        readonly fontSize: 16;
        readonly highlightBackground: "color-surface-secondary";
    };
};
export type KumoSelectSize = keyof typeof KUMO_SELECT_VARIANTS.size;
export interface KumoSelectVariantsProps {
    /**
     * Size of the select trigger. Matches Input component sizes.
     * - `"xs"` — Extra small for compact UIs (h-5 / 20px)
     * - `"sm"` — Small for secondary fields (h-6.5 / 26px)
     * - `"base"` — Default size (h-9 / 36px)
     * - `"lg"` — Large for prominent fields (h-10 / 40px)
     * @default "base"
     */
    size?: KumoSelectSize;
}
export declare function selectVariants({ size, }?: KumoSelectVariantsProps): string;
/**
 * Shape for items that carry extra metadata (disabled state, tooltip).
 * Plain `ReactNode` values are still supported for backward compatibility.
 */
export interface SelectItemDescriptor {
    /** Display label for the option. */
    label: ReactNode;
    /** When `true`, the option cannot be selected. */
    disabled?: boolean;
}
/** Value type accepted by the `items` object-map prop. */
export type SelectItemValue = ReactNode | SelectItemDescriptor;
type SelectPropsGeneric<T, Multiple extends boolean | undefined = false> = Omit<SelectBase.Root.Props<T, Multiple>, "items"> & KumoSelectVariantsProps & {
    multiple?: Multiple;
    /**
     * A function that returns a `ReactNode` to format the selected value.
     * Only called when a value is selected — use `placeholder` for the empty state.
     * @example
     * ```tsx
     * <Select
     *   placeholder="Select a user..."
     *   renderValue={(user) => user.name}
     * />
     * ```
     */
    renderValue?: (value: Multiple extends true ? T[] : T) => ReactNode;
    className?: string;
    /**
     * Data structure of items rendered in the popup.
     * Accepts a plain object map (`{ key: "Label" }`) or an array of `{ label, value }`.
     *
     * Object-map values can be a `ReactNode` (backward-compatible) **or** a
     * `SelectItemDescriptor` for extra metadata:
     *
     * ```tsx
     * items={{
     *   apple: "Apple",
     *   banana: { label: "Banana", disabled: true, disabledReason: "Out of season" },
     * }}
     * ```
     */
    items?: Record<string, SelectItemValue> | ReadonlyArray<{
        label: ReactNode;
        value: T;
    }>;
    /**
     * Label content for the select.
     * When provided, enables the Field wrapper with a visible label.
     * For accessibility without a visible label, use `aria-label` instead.
     */
    label?: ReactNode;
    /**
     * @deprecated Use `aria-label` for hidden labels instead of `label` + `hideLabel={true}`.
     * When `label` is provided without `hideLabel`, the label is now visible by default (matching Input behavior).
     * This prop will be removed in a future version.
     */
    hideLabel?: boolean;
    placeholder?: string;
    loading?: boolean;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /** Helper text displayed below the select */
    description?: ReactNode;
    /** Error message or validation error object */
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
    /**
     * Container element for the portal. Use this to render the select inside
     * a Shadow DOM or custom container. Overrides `KumoPortalProvider` context.
     * @default document.body (or KumoPortalProvider container if set)
     */
    container?: PortalContainer;
};
/**
 * Select component props.
 *
 * **Accessible Name Required:** Select should have one of:
 * 1. `label` prop (recommended) - enables Field wrapper with visible label
 * 2. `aria-label` - for selects without visible label (accessibility-only)
 * 3. `aria-labelledby` - for custom label association
 *
 * @example
 * ```tsx
 * // With visible label (recommended)
 * <Select label="Country" onValueChange={setValue}>
 *   <Select.Option value="us">United States</Select.Option>
 *   <Select.Option value="uk">United Kingdom</Select.Option>
 * </Select>
 *
 * // Without visible label (use aria-label for accessibility)
 * <Select aria-label="Select a country" onValueChange={setValue}>
 *   <Select.Option value="us">United States</Select.Option>
 * </Select>
 * ```
 */
export interface SelectProps {
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** Size of the select trigger. Matches Input component sizes. */
    size?: KumoSelectSize;
    /**
     * Label content for the select.
     * When provided, enables the Field wrapper with a visible label above the select.
     * For accessibility without a visible label, use `aria-label` instead.
     */
    label?: ReactNode;
    /**
     * @deprecated Use `aria-label` for hidden labels instead of `label` + `hideLabel={true}`.
     * When `label` is provided without `hideLabel`, the label is now visible by default (matching Input behavior).
     * This prop will be removed in a future version.
     */
    hideLabel?: boolean;
    /** Placeholder text shown when no value is selected. */
    placeholder?: string;
    /** When `true`, shows a skeleton loader in place of the selected value. */
    loading?: boolean;
    /** Whether the select is disabled. */
    disabled?: boolean;
    /** Whether the select is required. When `false`, shows "(optional)" text. */
    required?: boolean;
    /** Tooltip content displayed next to the label via an info icon. */
    labelTooltip?: ReactNode;
    /** Currently selected value (controlled mode). */
    value?: unknown;
    /** Initial value for uncontrolled mode. */
    defaultValue?: unknown;
    /** Callback fired when the selected value changes. */
    onValueChange?: (value: unknown) => void;
    /** Enable multi-select mode. */
    multiple?: boolean;
    /** `Select.Option` elements to render in the dropdown. */
    children?: ReactNode;
    /** Helper text displayed below the select. */
    description?: ReactNode;
    /** Error message string or validation error object with `match` key. */
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
}
/**
 * Select.Option component props.
 */
export interface SelectOptionProps {
    /** The option content. */
    children: ReactNode;
    /** The value associated with this option. */
    value: unknown;
    /** When `true`, the option cannot be selected. */
    disabled?: boolean;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
}
/**
 * Dropdown for selecting a value from a list of options.
 * Wraps Base UI Select with Kumo styling and optional Field integration.
 *
 * @example
 * ```tsx
 * <Select label="Fruit" onValueChange={setFruit}>
 *   <Select.Option value="apple">Apple</Select.Option>
 *   <Select.Option value="banana">Banana</Select.Option>
 * </Select>
 * ```
 */
export declare function Select<T, Multiple extends boolean | undefined = false>({ children, className, renderValue, label, hideLabel, placeholder, loading, size, labelTooltip, description, error, required, container: containerProp, ...props }: SelectPropsGeneric<T, Multiple> & {
    required?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export declare namespace Select {
    var Option: <T>({ children, value, disabled, className }: OptionProps<T>) => import("react/jsx-runtime").JSX.Element;
    var Group: import("react").ForwardRefExoticComponent<GroupProps & import("react").RefAttributes<HTMLDivElement>>;
    var GroupLabel: import("react").ForwardRefExoticComponent<GroupLabelProps & import("react").RefAttributes<HTMLDivElement>>;
    var Separator: import("react").ForwardRefExoticComponent<SeparatorProps & import("react").RefAttributes<HTMLDivElement>>;
}
type OptionProps<T> = {
    children: ReactNode;
    value: T;
    /** When `true`, the option cannot be selected. */
    disabled?: boolean;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
};
type GroupProps = {
    children: ReactNode;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
};
type GroupLabelProps = {
    children: ReactNode;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
};
type SeparatorProps = {
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
};
export {};
//# sourceMappingURL=select.d.ts.map