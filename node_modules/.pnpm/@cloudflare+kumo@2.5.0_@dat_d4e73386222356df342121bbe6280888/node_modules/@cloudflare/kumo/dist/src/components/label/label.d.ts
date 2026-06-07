import { ReactNode } from 'react';
/** Label variant definitions (currently empty, reserved for future additions). */
export declare const KUMO_LABEL_VARIANTS: {};
export declare const KUMO_LABEL_DEFAULT_VARIANTS: {};
export interface KumoLabelVariantsProps {
}
export declare function labelVariants(_props?: KumoLabelVariantsProps): string;
export declare function labelContentVariants(): string;
/**
 * Label component props.
 *
 * @example
 * ```tsx
 * <Label>Email</Label>
 * <Label showOptional>Middle Name</Label>
 * <Label tooltip="We'll use this to send you updates">Email</Label>
 * ```
 */
export interface LabelProps extends KumoLabelVariantsProps {
    /** The label content — can be a string or any React node. */
    children: ReactNode;
    /** When `true`, shows gray "(optional)" text after the label. */
    showOptional?: boolean;
    /** Tooltip content displayed next to the label via an info icon. */
    tooltip?: ReactNode;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** The id of the form element this label is associated with */
    htmlFor?: string;
    /**
     * When true, only renders the inline content (indicators, tooltip) without
     * the outer label element with font styling. Useful when composed inside another
     * label element that already provides the text styling.
     * @default false
     */
    asContent?: boolean;
}
/**
 * Label component for form fields.
 *
 * Provides a standardized way to display labels with optional indicators:
 * - Optional indicator: gray "(optional)" text when `showOptional={true}`
 * - Tooltip: info icon with hover tooltip for additional context
 *
 * @example
 * // Basic label
 * <Label>Email</Label>
 *
 * @example
 * // Optional field with indicator
 * <Label showOptional>Middle Name</Label>
 *
 * @example
 * // With tooltip
 * <Label tooltip="We'll use this to send you updates">Email</Label>
 *
 * @example
 * // With ReactNode children
 * <Label>
 *   <span>Custom label with <strong>bold</strong> text</span>
 * </Label>
 */
export declare function Label({ children, showOptional, tooltip, className, htmlFor, asContent, }: LabelProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Label {
    var displayName: string;
}
//# sourceMappingURL=label.d.ts.map