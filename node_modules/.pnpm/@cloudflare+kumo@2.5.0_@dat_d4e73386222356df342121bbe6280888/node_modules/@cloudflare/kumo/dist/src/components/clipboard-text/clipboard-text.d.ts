/** ClipboardText size variant definitions mapping sizes to their Tailwind classes. */
export declare const KUMO_CLIPBOARD_TEXT_VARIANTS: {
    readonly size: {
        readonly sm: {
            readonly classes: "text-xs";
            readonly buttonSize: "sm";
            readonly description: "Small clipboard text for compact UIs";
        };
        readonly base: {
            readonly classes: "text-sm";
            readonly buttonSize: "base";
            readonly description: "Default clipboard text size";
        };
        readonly lg: {
            readonly classes: "text-sm";
            readonly buttonSize: "lg";
            readonly description: "Large clipboard text for prominent display";
        };
    };
};
export declare const KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS: {
    readonly size: "lg";
};
export type KumoClipboardTextSize = keyof typeof KUMO_CLIPBOARD_TEXT_VARIANTS.size;
export interface KumoClipboardTextVariantsProps {
    /**
     * Size of the clipboard text field.
     * - `"sm"` — Small clipboard text for compact UIs
     * - `"base"` — Default clipboard text size
     * - `"lg"` — Large clipboard text for prominent display
     * @default "lg"
     */
    size?: KumoClipboardTextSize;
}
export declare function clipboardTextVariants({ size, }?: KumoClipboardTextVariantsProps): string;
export type ClipboardTextSize = KumoClipboardTextSize;
/**
 * ClipboardText component props.
 *
 * @example
 * ```tsx
 * <ClipboardText text="sk_live_abc123" />
 * <ClipboardText text="npm install @cloudflare/kumo" size="sm" />
 * ```
 */
export interface ClipboardTextProps extends KumoClipboardTextVariantsProps {
    /** The text to display and copy to clipboard. */
    text: string;
    /** If provided, this text will be copied to clipboard instead of the `text` prop. */
    textToCopy?: string;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** Callback fired after text is copied to clipboard. */
    onCopy?: () => void;
    /**
     * Tooltip config. Shows tooltip on hover, anchored toast on click.
     * @example
     * ```tsx
     * <ClipboardText
     *   text="abc123"
     *   tooltip={{ text: "Copy", copiedText: "Copied!", side: "top" }}
     * />
     * ```
     */
    tooltip?: {
        /** Text shown in tooltip on hover. @default "Copy" */
        text?: string;
        /** Text shown in toast after copying. @default "Copied" */
        copiedText?: string;
        /** Tooltip/toast placement. @default "top" */
        side?: "top" | "bottom" | "left" | "right";
    };
    /** Accessible labels for i18n. */
    labels?: {
        /** @default "Copy to clipboard" */
        copyAction?: string;
    };
}
/**
 * Read-only text field with a one-click copy-to-clipboard button.
 *
 * @example
 * ```tsx
 * <ClipboardText text="0c239dd2" />
 * ```
 */
export declare const ClipboardText: import('react').ForwardRefExoticComponent<ClipboardTextProps & import('react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=clipboard-text.d.ts.map