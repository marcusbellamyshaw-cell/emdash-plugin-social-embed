import { ReactNode } from 'react';
/**
 * Normalizes an error prop that may be a string or structured object
 * into the `{ message, match }` shape expected by `<Field>`.
 *
 * Returns `undefined` when the input is falsy.
 */
export declare function normalizeFieldError(error: string | {
    message: ReactNode;
    match: FieldErrorMatch;
} | undefined): {
    message: ReactNode;
    match: FieldErrorMatch;
} | undefined;
/** Field variant definitions (currently empty, reserved for future additions). */
export declare const KUMO_FIELD_VARIANTS: {};
export declare const KUMO_FIELD_DEFAULT_VARIANTS: {};
export interface KumoFieldVariantsProps {
    /**
     * When true, places the control (checkbox/switch) before the label visually.
     * When false (default), places the label before the control.
     * Used to support different layout patterns (e.g., iOS-style toggles on the right).
     */
    controlFirst?: boolean;
}
export declare function fieldVariants({ controlFirst, }?: KumoFieldVariantsProps): string;
/**
 * Match type for field validation errors.
 * Can be a boolean or a key from the browser's ValidityState interface.
 * Source: BaseErrorProps["match"] (ComponentPropsWithoutRef<typeof FieldBase.Error>)
 */
export type FieldErrorMatch = boolean | "badInput" | "customError" | "patternMismatch" | "rangeOverflow" | "rangeUnderflow" | "stepMismatch" | "tooLong" | "tooShort" | "typeMismatch" | "valid" | "valueMissing";
/**
 * Field component props — wraps a form control with label, description, and error message.
 *
 * @example
 * ```tsx
 * <Field label="Email" required>
 *   <Input placeholder="you@example.com" />
 * </Field>
 *
 * <Field label="Phone" required={false} description="We'll only use this for account recovery.">
 *   <Input placeholder="+1 555-0000" />
 * </Field>
 * ```
 */
export interface FieldProps extends KumoFieldVariantsProps {
    /** The form control element(s) to wrap (Input, Select, Checkbox, etc.). */
    children: ReactNode;
    /** The label content — can be a string or any React node. */
    label: ReactNode;
    /**
     * When explicitly `false`, shows gray "(optional)" text after the label.
     * When `true` or `undefined`, no indicator is shown.
     */
    required?: boolean;
    /** Tooltip content displayed next to the label via an info icon. */
    labelTooltip?: ReactNode;
    /** Validation error with a message and a browser `ValidityState` match key. */
    error?: {
        message: ReactNode;
        match: FieldErrorMatch;
    };
    /** Helper text displayed below the control (hidden when `error` is present). */
    description?: ReactNode;
    /** When `true`, places the control before the label (for checkbox/switch layouts). */
    controlFirst?: boolean;
    /**
     * When `true`, Field renders layout, description, and error but skips
     * the `<label>` element. Use when the child component provides its own
     * accessible label (e.g. Select uses Base UI's `Select.Label` to avoid
     * hover/focus coupling from native `<label>`).
     * @default false
     */
    hideLabel?: boolean;
}
/**
 * Form field wrapper that provides a label, optional description, and error display
 * around any form control. Built on Base UI Field primitives.
 *
 * @example
 * ```tsx
 * <Field label="Username">
 *   <Input placeholder="Choose a username" />
 * </Field>
 * ```
 */
export declare function Field({ children, label, required, labelTooltip, error, description, controlFirst, hideLabel, }: FieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=field.d.ts.map