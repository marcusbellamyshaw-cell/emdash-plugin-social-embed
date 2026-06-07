import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { KumoInputSize, KumoInputVariant } from '../input/input';
import { FieldErrorMatch } from '../field/field';
export declare const KUMO_SENSITIVE_INPUT_VARIANTS: {
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
    readonly variant: {
        readonly default: {
            readonly classes: "focus:ring-kumo-focus/50 focus:ring-[1.5px]";
            readonly description: "Default input appearance";
        };
        readonly error: {
            readonly classes: "!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]";
            readonly description: "Error state for validation failures";
        };
    };
};
export declare const KUMO_SENSITIVE_INPUT_DEFAULT_VARIANTS: {
    readonly size: "base";
    readonly variant: "default";
};
/**
 * SensitiveInput component props.
 *
 * @example
 * ```tsx
 * <SensitiveInput label="API Key" defaultValue="sk_live_abc123xyz789" />
 * <SensitiveInput label="Secret" value={secret} onValueChange={setSecret} />
 * ```
 */
export interface SensitiveInputProps extends Omit<ComponentPropsWithoutRef<"input">, "size" | "type" | "value" | "defaultValue"> {
    /** Controlled value */
    value?: string;
    /** Uncontrolled default value */
    defaultValue?: string;
    /** Simplified change handler receiving just the value */
    onValueChange?: (value: string) => void;
    /** Callback fired after value is copied to clipboard */
    onCopy?: () => void;
    /**
     * Size of the input.
     * - `"xs"` — Extra small for compact UIs
     * - `"sm"` — Small for secondary fields
     * - `"base"` — Default input size
     * - `"lg"` — Large for prominent fields
     * @default "base"
     */
    size?: KumoInputSize;
    /**
     * Style variant of the input.
     * - `"default"` — Default input appearance
     * - `"error"` — Error state for validation failures
     * @default "default"
     */
    variant?: KumoInputVariant;
    /** Label content for the input (enables Field wrapper and sets masked state label) - can be a string or any React node */
    label?: ReactNode;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /** Helper text displayed below the input */
    description?: ReactNode;
    /** Error message or validation error object */
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
}
/**
 * Password/secret input that masks its value by default and reveals on click.
 * Includes a built-in copy-to-clipboard button on hover.
 *
 * @example
 * ```tsx
 * <SensitiveInput label="API Key" defaultValue="sk_live_abc123xyz789" />
 * ```
 */
export declare const SensitiveInput: import('react').ForwardRefExoticComponent<SensitiveInputProps & import('react').RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=sensitive-input.d.ts.map