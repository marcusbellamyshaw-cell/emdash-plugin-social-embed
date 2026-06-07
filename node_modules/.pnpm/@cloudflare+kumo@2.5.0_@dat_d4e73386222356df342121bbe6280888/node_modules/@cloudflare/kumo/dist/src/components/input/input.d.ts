import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import { FieldErrorMatch } from '../field/field';
/** Input size and variant definitions mapping names to their Tailwind classes. */
export declare const KUMO_INPUT_VARIANTS: {
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
export declare const KUMO_INPUT_DEFAULT_VARIANTS: {
    readonly size: "base";
    readonly variant: "default";
};
export declare const KUMO_INPUT_STYLING: {
    readonly dimensions: {
        readonly xs: {
            readonly height: 20;
            readonly paddingX: 6;
            readonly fontSize: 12;
            readonly borderRadius: 2;
            readonly width: 160;
        };
        readonly sm: {
            readonly height: 26;
            readonly paddingX: 8;
            readonly fontSize: 12;
            readonly borderRadius: 6;
            readonly width: 200;
        };
        readonly base: {
            readonly height: 36;
            readonly paddingX: 12;
            readonly fontSize: 16;
            readonly borderRadius: 8;
            readonly width: 280;
        };
        readonly lg: {
            readonly height: 40;
            readonly paddingX: 16;
            readonly fontSize: 16;
            readonly borderRadius: 8;
            readonly width: 320;
        };
    };
    readonly baseTokens: {
        readonly background: "color-secondary";
        readonly text: "text-color-surface";
        readonly placeholder: "text-color-muted";
        readonly ring: "color-border";
    };
    readonly stateTokens: {
        readonly focus: {
            readonly ring: "color-active";
        };
        readonly error: {
            readonly ring: "color-error";
        };
        readonly disabled: {
            readonly opacity: 0.5;
            readonly text: "text-color-muted";
        };
    };
};
export type KumoInputSize = keyof typeof KUMO_INPUT_VARIANTS.size;
export type KumoInputVariant = keyof typeof KUMO_INPUT_VARIANTS.variant;
export interface KumoInputVariantsProps {
    /**
     * Input size.
     * - `"xs"` — Extra small for compact UIs
     * - `"sm"` — Small for secondary fields
     * - `"base"` — Default size
     * - `"lg"` — Large for prominent fields
     * @default "base"
     */
    size?: KumoInputSize;
    /**
     * Visual variant.
     * - `"default"` — Standard input
     * - `"error"` — Error state for validation failures
     * @default "default"
     */
    variant?: KumoInputVariant;
    parentFocusIndicator?: boolean;
    focusIndicator?: boolean;
}
type BaseInputProps = Omit<ComponentPropsWithoutRef<typeof BaseInput>, "size">;
export declare function inputVariants({ variant, size, parentFocusIndicator, focusIndicator, }?: KumoInputVariantsProps): string;
export declare const Input: import('react').ForwardRefExoticComponent<Pick<KumoInputVariantsProps, "variant" | "size"> & BaseInputProps & {
    /** Label content for the input (enables Field wrapper) - can be a string or any React node */
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
    /** Suppress browser extension password manager overlays on non-credential inputs. */
    passwordManagerIgnore?: boolean;
} & import('react').RefAttributes<HTMLInputElement>>;
/**
 * Input component props with accessibility guidance.
 *
 * **Accessible Name Required:** Input should have one of:
 * 1. `label` prop (recommended) - enables Field wrapper with label/description/error
 * 2. `placeholder` + `aria-label` - for bare inputs with visual placeholder
 * 3. `aria-labelledby` - for custom label association
 *
 * Missing accessible names will trigger console warnings in development.
 *
 * @example
 * // Recommended: Built-in Field wrapper
 * <Input label="Email" placeholder="you@example.com" />
 *
 * @example
 * // Bare input with placeholder and aria-label
 * <Input placeholder="Search..." aria-label="Search products" />
 *
 * @example
 * // Custom label association
 * <label id="email-label">Email</label>
 * <Input aria-labelledby="email-label" />
 *
 * @example
 * // With description and error
 * <Input
 *   label="Password"
 *   description="Must be at least 8 characters"
 *   error="Password is too short"
 * />
 */
export type InputProps = Pick<KumoInputVariantsProps, "size" | "variant"> & BaseInputProps & {
    /** Label content for the input (enables Field wrapper) - can be a string or any React node */
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
    /** Suppress browser extension password manager overlays on non-credential inputs. */
    passwordManagerIgnore?: boolean;
};
export {};
//# sourceMappingURL=input.d.ts.map