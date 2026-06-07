import { Combobox as ComboboxBase } from '@base-ui/react/combobox';
import { PropsWithChildren, ReactNode } from 'react';
import { FieldErrorMatch } from '../field/field';
import { PortalContainer } from '../../utils/portal-provider';
/** Combobox variant definitions. */
export declare const KUMO_COMBOBOX_VARIANTS: {
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
    readonly inputSide: {
        readonly right: {
            readonly classes: "";
            readonly description: "Input positioned inline to the right of chips";
        };
        readonly top: {
            readonly classes: "";
            readonly description: "Input positioned above chips";
        };
    };
};
export declare const KUMO_COMBOBOX_DEFAULT_VARIANTS: {
    readonly size: "base";
    readonly inputSide: "right";
};
export type KumoComboboxSize = keyof typeof KUMO_COMBOBOX_VARIANTS.size;
export type KumoComboboxInputSide = keyof typeof KUMO_COMBOBOX_VARIANTS.inputSide;
export interface KumoComboboxVariantsProps {
    /**
     * Size of the combobox trigger. Matches Input component sizes.
     * - `"xs"` — Extra small for compact UIs (h-5 / 20px)
     * - `"sm"` — Small for secondary fields (h-6.5 / 26px)
     * - `"base"` — Default size (h-9 / 36px)
     * - `"lg"` — Large for prominent fields (h-10 / 40px)
     * @default "base"
     */
    size?: KumoComboboxSize;
    /**
     * Position of the text input relative to chips in multi-select mode.
     * - `"right"` — Input inline to the right of chips
     * - `"top"` — Input above chips
     * @default "right"
     */
    inputSide?: KumoComboboxInputSide;
}
export declare function comboboxVariants({ inputSide, }?: KumoComboboxVariantsProps): string;
export type ComboboxInputSide = KumoComboboxInputSide;
export type ComboboxSize = KumoComboboxSize;
export type ComboboxRootProps<Value = unknown, Multiple extends boolean | undefined = false> = ComboboxBase.Root.Props<Value, Multiple>;
/**
 * Combobox component props (simplified for documentation; the actual Root is generic).
 *
 * Combobox provides an autocomplete/typeahead input with a filterable dropdown.
 * Supports single-select, multi-select with chips, grouped items, and Field wrapper integration.
 *
 * @example
 * ```tsx
 * // Single-select with search input
 * <Combobox value={value} onValueChange={setValue} items={options}>
 *   <Combobox.TriggerInput placeholder="Search…" />
 *   <Combobox.Content>
 *     <Combobox.List>
 *       {(item) => <Combobox.Item value={item}>{item.label}</Combobox.Item>}
 *     </Combobox.List>
 *     <Combobox.Empty>No results</Combobox.Empty>
 *   </Combobox.Content>
 * </Combobox>
 *
 * // Multi-select with chips
 * <Combobox multiple items={options} label="Tags">
 *   <Combobox.TriggerMultipleWithInput
 *     placeholder="Add tag…"
 *     renderItem={(item) => <Combobox.Chip value={item}>{item.label}</Combobox.Chip>}
 *   />
 *   <Combobox.Content>
 *     <Combobox.List>
 *       {(item) => <Combobox.Item value={item}>{item.label}</Combobox.Item>}
 *     </Combobox.List>
 *   </Combobox.Content>
 * </Combobox>
 * ```
 */
export interface ComboboxProps extends KumoComboboxVariantsProps {
    /** Array of items to display in the dropdown */
    items: unknown[];
    /** Currently selected value(s) */
    value?: unknown;
    /** Callback when selection changes */
    onValueChange?: (value: unknown) => void;
    /** Enable multi-select mode */
    multiple?: boolean;
    /** Combobox content (trigger, content, items) */
    children: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Label content for the combobox (enables Field wrapper) - can be a string or any React node */
    label?: ReactNode;
    /** Whether the combobox is required */
    required?: boolean;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /** Helper text displayed below the combobox */
    description?: ReactNode;
    /** Error message or validation error object */
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
}
declare function Root<Value, Multiple extends boolean | undefined = false>({ label, required, labelTooltip, description, error, children, size, ...props }: ComboboxBase.Root.Props<Value, Multiple> & {
    label?: ReactNode;
    required?: boolean;
    labelTooltip?: ReactNode;
    description?: ReactNode;
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
    size?: KumoComboboxSize;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Root {
    var displayName: string;
}
declare function Content({ children, className, align, sideOffset, alignOffset, side, container: containerProp, }: PropsWithChildren<{
    className?: string;
    align?: ComboboxBase.Positioner.Props["align"];
    alignOffset?: ComboboxBase.Positioner.Props["alignOffset"];
    side?: ComboboxBase.Positioner.Props["side"];
    sideOffset?: ComboboxBase.Positioner.Props["sideOffset"];
    /**
     * Container element for the portal. Use this to render the combobox inside
     * a Shadow DOM or custom container. Overrides `KumoPortalProvider` context.
     * @default document.body (or KumoPortalProvider container if set)
     */
    container?: PortalContainer;
}>): import("react/jsx-runtime").JSX.Element;
declare namespace Content {
    var displayName: string;
}
declare function TriggerValue({ className, ...props }: ComboboxBase.Value.Props & {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare namespace TriggerValue {
    var displayName: string;
}
declare function TriggerInput({ clearLabel, showOptionsLabel, ...props }: ComboboxBase.Input.Props & {
    /** Accessible label for the clear button. Pass a translated string for i18n.
     * @default "Clear selection"
     */
    clearLabel?: string;
    /** Accessible label for the dropdown trigger. Pass a translated string for i18n.
     * @default "Show options"
     */
    showOptionsLabel?: string;
}): import("react/jsx-runtime").JSX.Element;
declare namespace TriggerInput {
    var displayName: string;
}
declare function Item({ children, className, ...props }: ComboboxBase.Item.Props & {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Item {
    var displayName: string;
}
declare function Empty(props: ComboboxBase.Empty.Props): import("react/jsx-runtime").JSX.Element;
declare function Input(props: ComboboxBase.Input.Props): import("react/jsx-runtime").JSX.Element;
declare function List({ className, ...props }: ComboboxBase.List.Props & {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function GroupLabel(props: ComboboxBase.GroupLabel.Props): import("react/jsx-runtime").JSX.Element;
declare function Group(props: ComboboxBase.Group.Props): import("react/jsx-runtime").JSX.Element;
declare function Chip({ removeLabel, ...props }: ComboboxBase.Chip.Props & {
    /** Accessible label for the chip remove button. Pass a translated string for i18n.
     * @default "Remove"
     */
    removeLabel?: string;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Chip {
    var displayName: string;
}
declare function TriggerMultipleWithInput<ValueType>({ placeholder, renderItem, className, inputSide, value: controlledValue, }: {
    placeholder?: string;
    renderItem: (value: ValueType) => React.ReactNode;
    className?: string;
    inputSide?: "right" | "top";
    /** Optional controlled value for rendering chips (use when pre-selecting values) */
    value?: ValueType[];
}): import("react/jsx-runtime").JSX.Element;
declare namespace TriggerMultipleWithInput {
    var displayName: string;
}
/**
 * Combobox — autocomplete input with filterable dropdown list.
 *
 * Compound component: `Combobox` (Root), `.TriggerInput`, `.TriggerValue`,
 * `.TriggerMultipleWithInput`, `.Content`, `.Item`, `.Chip`, `.Input`,
 * `.Empty`, `.GroupLabel`, `.Group`, `.List`, `.Collection`.
 *
 * @example
 * ```tsx
 * <Combobox items={fruits} label="Fruit">
 *   <Combobox.TriggerInput placeholder="Pick a fruit…" />
 *   <Combobox.Content>
 *     <Combobox.List>
 *       {(item) => <Combobox.Item value={item}>{item}</Combobox.Item>}
 *     </Combobox.List>
 *   </Combobox.Content>
 * </Combobox>
 * ```
 *
 * @see https://base-ui.com/react/components/combobox
 */
export declare const Combobox: typeof Root & {
    Content: typeof Content;
    TriggerValue: typeof TriggerValue;
    TriggerInput: typeof TriggerInput;
    TriggerMultipleWithInput: typeof TriggerMultipleWithInput;
    Chip: typeof Chip;
    Item: typeof Item;
    Input: typeof Input;
    Empty: typeof Empty;
    GroupLabel: typeof GroupLabel;
    Group: typeof Group;
    List: typeof List;
    Collection: typeof ComboboxBase.Collection;
    Trigger: import('react').ForwardRefExoticComponent<Omit<import('@base-ui/react').ComboboxTriggerProps, "ref"> & import('react').RefAttributes<HTMLButtonElement>>;
    Value: typeof ComboboxBase.Value;
    Icon: import('react').ForwardRefExoticComponent<Omit<import('@base-ui/react').AutocompleteIconProps, "ref"> & import('react').RefAttributes<HTMLSpanElement>>;
    useFilter: typeof ComboboxBase.useFilter;
};
export {};
//# sourceMappingURL=combobox.d.ts.map