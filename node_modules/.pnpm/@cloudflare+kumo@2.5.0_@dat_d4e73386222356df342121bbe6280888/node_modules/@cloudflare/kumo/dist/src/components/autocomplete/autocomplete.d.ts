import { Autocomplete as AutocompleteBase } from '@base-ui/react/autocomplete';
import { ReactNode } from 'react';
import { FieldErrorMatch } from '../field/field';
/** Autocomplete variant definitions. */
export declare const KUMO_AUTOCOMPLETE_VARIANTS: {
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
export declare const KUMO_AUTOCOMPLETE_DEFAULT_VARIANTS: {
    readonly size: "base";
};
export type KumoAutocompleteSize = keyof typeof KUMO_AUTOCOMPLETE_VARIANTS.size;
export interface KumoAutocompleteVariantsProps {
    /**
     * Size of the autocomplete input. Matches Input component sizes.
     * - `"xs"` — Extra small for compact UIs (h-5 / 20px)
     * - `"sm"` — Small for secondary fields (h-6.5 / 26px)
     * - `"base"` — Default size (h-9 / 36px)
     * - `"lg"` — Large for prominent fields (h-10 / 40px)
     * @default "base"
     */
    size?: KumoAutocompleteSize;
}
export declare function autocompleteVariants({ size, }?: KumoAutocompleteVariantsProps): string;
/**
 * Autocomplete component props.
 *
 * Autocomplete provides a free-form text input with optional suggestions in a
 * filterable dropdown. Unlike Combobox, the input value is not constrained to
 * the suggestion list items.
 *
 * @example
 * ```tsx
 * <Autocomplete label="Country" items={countries}>
 *   <Autocomplete.InputGroup />
 *   <Autocomplete.Content>
 *     <Autocomplete.List>
 *       {(item) => <Autocomplete.Item value={item}>{item}</Autocomplete.Item>}
 *     </Autocomplete.List>
 *   </Autocomplete.Content>
 * </Autocomplete>
 * ```
 */
export interface AutocompleteProps {
    /** Array of items to display in the dropdown */
    items: unknown[];
    /** The controlled input value */
    value?: string | number | string[];
    /** The uncontrolled default input value */
    defaultValue?: string | number | string[];
    /** Callback when the input value changes */
    onValueChange?: AutocompleteBase.Root.Props<unknown>["onValueChange"];
    /** Whether the popup is open (controlled) */
    open?: boolean;
    /** Callback when the popup opens or closes */
    onOpenChange?: AutocompleteBase.Root.Props<unknown>["onOpenChange"];
    /** Autocomplete content (input group, popup content) */
    children: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Label content (enables Field wrapper) */
    label?: ReactNode;
    /** Whether the field is required */
    required?: boolean;
    /** Tooltip content to display next to the label */
    labelTooltip?: ReactNode;
    /** Helper text displayed below the field */
    description?: ReactNode;
    /** Error message or validation error object */
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
}
declare function Root<ItemValue>({ label, required, labelTooltip, description, error, children, ...props }: AutocompleteBase.Root.Props<ItemValue> & {
    label?: ReactNode;
    required?: boolean;
    labelTooltip?: ReactNode;
    description?: ReactNode;
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
}): import("react/jsx-runtime").JSX.Element;
declare namespace Root {
    var displayName: string;
}
declare function InputGroup({ className, size, placeholder, }: {
    className?: string;
    size?: KumoAutocompleteSize;
    placeholder?: string;
}): import("react/jsx-runtime").JSX.Element;
declare namespace InputGroup {
    var displayName: string;
}
declare function Content({ children, className, align, sideOffset, alignOffset, side, }: {
    children?: ReactNode;
    className?: string;
    align?: AutocompleteBase.Positioner.Props["align"];
    alignOffset?: AutocompleteBase.Positioner.Props["alignOffset"];
    side?: AutocompleteBase.Positioner.Props["side"];
    sideOffset?: AutocompleteBase.Positioner.Props["sideOffset"];
}): import("react/jsx-runtime").JSX.Element;
declare namespace Content {
    var displayName: string;
}
declare function List({ className, ...props }: AutocompleteBase.List.Props & {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function Item({ children, ...props }: AutocompleteBase.Item.Props): import("react/jsx-runtime").JSX.Element;
declare namespace Item {
    var displayName: string;
}
declare function GroupLabel(props: AutocompleteBase.GroupLabel.Props): import("react/jsx-runtime").JSX.Element;
declare namespace GroupLabel {
    var displayName: string;
}
declare function Group(props: AutocompleteBase.Group.Props): import("react/jsx-runtime").JSX.Element;
declare namespace Group {
    var displayName: string;
}
declare function Separator(props: AutocompleteBase.Separator.Props): import("react/jsx-runtime").JSX.Element;
declare namespace Separator {
    var displayName: string;
}
/**
 * Autocomplete — free-form text input with an optional filtered suggestion list.
 *
 * Unlike Combobox, the input value is not restricted to items in the list.
 * Use Combobox when the selected value must come from the list.
 *
 * Compound component: `Autocomplete` (Root), `.InputGroup`, `.Content`, `.Item`,
 * `.GroupLabel`, `.Group`, `.Separator`, `.List`, `.Collection`.
 *
 * `InputGroup` renders the text input with Input component styling.
 * Pass a `size` prop to `InputGroup` to match the Input component sizes.
 *
 * @example
 * ```tsx
 * <Autocomplete items={fruits} label="Fruit">
 *   <Autocomplete.InputGroup size="base" />
 *   <Autocomplete.Content>
 *     <Autocomplete.List>
 *       {(item) => <Autocomplete.Item value={item}>{item}</Autocomplete.Item>}
 *     </Autocomplete.List>
 *   </Autocomplete.Content>
 * </Autocomplete>
 * ```
 *
 * @see https://base-ui.com/react/components/autocomplete
 */
export declare const Autocomplete: typeof Root & {
    InputGroup: typeof InputGroup;
    Content: typeof Content;
    Item: typeof Item;
    GroupLabel: typeof GroupLabel;
    Group: typeof Group;
    Separator: typeof Separator;
    List: typeof List;
    Empty: import('react').ForwardRefExoticComponent<Omit<import('@base-ui/react').AutocompleteEmptyProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
    Collection: typeof AutocompleteBase.Collection;
    useFilter: typeof import('@base-ui/react/internals/filter').getFilter;
};
export {};
//# sourceMappingURL=autocomplete.d.ts.map