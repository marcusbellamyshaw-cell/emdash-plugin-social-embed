import { HTMLAttributes, ReactNode } from 'react';
import { KumoInputSize } from '../input/input';
import { FieldProps } from '../field/field';
export interface InputGroupSizeTokens {
    /** Full outer padding — matches standalone Input (e.g. px-3). */
    inputOuter: string;
    /**
     * Directional outer padding for Addon at the container edge.
     *
     * These MUST be static pl-/pr- strings (not derived at runtime via
     * `"px-N".replace(…)`) so Tailwind JIT can detect them during its
     * source-file scan. Dynamic string construction produces class names
     * that never appear as literals, so Tailwind never generates the CSS.
     */
    addonOuterStart: string;
    addonOuterEnd: string;
    /**
     * Reduced outer padding when the Addon contains a Button.
     * Buttons have their own internal padding, so the Addon can use
     * less outer padding to keep the visual gap balanced.
     */
    addonButtonOuterStart: string;
    addonButtonOuterEnd: string;
    /** pr- for suffix when no end addon. */
    suffixPad: string;
    fontSize: string;
    /** Icon size in px. */
    iconSize: number;
}
export declare const INPUT_GROUP_SIZE: Record<KumoInputSize, InputGroupSizeTokens>;
export declare const INPUT_GROUP_HAS_CLASSES: Record<KumoInputSize, string>;
/**
 * Props for `InputGroup.Root`. Focus mode is auto-detected from children
 * (see `detectFocusMode`), so it is not part of the public or internal API.
 */
export interface InputGroupRootPropsInternal extends HTMLAttributes<HTMLElement>, Partial<Pick<FieldProps, "label" | "description" | "error" | "required" | "labelTooltip">> {
    size?: KumoInputSize | undefined;
    disabled?: boolean;
}
/** Public InputGroup.Root props — identical to the internal type. */
export type InputGroupRootProps = InputGroupRootPropsInternal;
export interface InputGroupContextValue {
    size?: KumoInputSize;
    focusMode: "container" | "individual" | "hybrid";
    disabled: boolean;
    error?: FieldProps["error"];
    /** Auto-generated id for the input element; used by the invisible label overlay. */
    inputId: string;
}
export declare const InputGroupContext: import('react').Context<InputGroupContextValue | null>;
/**
 * Set to `true` by `InputGroup.Addon` so that `InputGroup.Button` can detect
 * whether it's wrapped in an Addon. Ghost buttons should always live inside
 * an Addon for correct spacing.
 */
export declare const InputGroupAddonContext: import('react').Context<boolean>;
/**
 * Reads InputGroupContext and warns in development when the context is null
 * (i.e. when a sub-component is rendered outside of `<InputGroup>`).
 */
export declare function useInputGroupContext(componentName: string): InputGroupContextValue | null;
/**
 * Partitions InputGroup children for hybrid focus mode.
 *
 * Container zone: Addon, Input, Suffix, text nodes — everything that should
 * share a single container-style border.
 *
 * Individual zone: Direct `InputGroup.Button` elements that manage their own
 * border and focus ring.
 *
 * Uses `displayName` comparison to identify elements, avoiding circular
 * imports between `context.ts` and the sub-component files.
 */
export declare function partitionChildren(children: ReactNode): {
    containerZone: ReactNode[];
    individualZone: ReactNode[];
};
/**
 * Analyzes the direct children of `InputGroup` to determine the focus mode.
 *
 * Returns `"hybrid"` when BOTH an `InputGroup.Addon` AND a non-ghost direct
 * `InputGroup.Button` are present. In hybrid mode, Addon+Input share a
 * container-style border while Buttons get individual borders.
 *
 * Returns `"individual"` when a non-ghost direct `InputGroup.Button` is
 * present WITHOUT any `InputGroup.Addon`. This signals a toolbar/pagination
 * layout where each element manages its own focus ring.
 *
 * Returns `"container"` (default) in all other cases — the container owns a
 * single shared focus ring.
 *
 * Uses `displayName` comparison to identify elements, avoiding circular
 * imports between `context.ts` and the sub-component files.
 */
export declare function detectFocusMode(children: ReactNode): "container" | "individual" | "hybrid";
//# sourceMappingURL=context.d.ts.map