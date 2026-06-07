import { CSSProperties, ComponentPropsWithoutRef, ElementRef, ForwardedRef } from 'react';
/** Text variant and size definitions mapping names to their Tailwind classes. */
export declare const KUMO_TEXT_VARIANTS: {
    readonly variant: {
        readonly heading1: {
            readonly classes: "text-3xl font-semibold";
            readonly description: "Large heading for page titles";
        };
        readonly heading2: {
            readonly classes: "text-2xl font-semibold";
            readonly description: "Medium heading for section titles";
        };
        readonly heading3: {
            readonly classes: "text-lg font-semibold";
            readonly description: "Small heading for subsections";
        };
        readonly body: {
            readonly classes: "text-kumo-default";
            readonly description: "Default body text";
        };
        readonly secondary: {
            readonly classes: "text-kumo-subtle";
            readonly description: "Muted text for secondary information";
        };
        readonly success: {
            readonly classes: "text-kumo-link";
            readonly description: "Success state text";
        };
        readonly error: {
            readonly classes: "text-kumo-danger";
            readonly description: "Error state text";
        };
        readonly mono: {
            readonly classes: "font-mono";
            readonly description: "Monospace text for code";
        };
        readonly "mono-secondary": {
            readonly classes: "font-mono text-kumo-subtle";
            readonly description: "Muted monospace text";
        };
    };
    readonly size: {
        readonly xs: {
            readonly classes: "text-xs";
            readonly description: "Extra small text";
        };
        readonly sm: {
            readonly classes: "text-sm";
            readonly description: "Small text";
        };
        readonly base: {
            readonly classes: "text-base";
            readonly description: "Default text size";
        };
        readonly lg: {
            readonly classes: "text-lg";
            readonly description: "Large text";
        };
    };
};
export declare const KUMO_TEXT_DEFAULT_VARIANTS: {
    readonly variant: "body";
    readonly size: "base";
};
/**
 * KUMO_TEXT_STYLING - Typography metadata for Figma generator
 *
 * This export provides structured styling information extracted from text.tsx
 * for use by the Figma plugin generator. It documents font sizes, weights,
 * colors, and font families used across all Text variants.
 *
 * Source of truth chain:
 * text.tsx (this file) → component-registry.json → text.ts (Figma generator)
 */
export declare const KUMO_TEXT_STYLING: {
    readonly fontSizes: {
        readonly xs: 12;
        readonly sm: 14;
        readonly base: 16;
        readonly lg: 18;
        readonly xl: 20;
        readonly "2xl": 24;
        readonly "3xl": 30;
    };
    readonly fontWeights: {
        readonly normal: 400;
        readonly medium: 500;
        readonly semibold: 600;
    };
    readonly baseColor: "text-kumo-default";
    readonly variantColors: {
        readonly body: "text-kumo-default";
        readonly secondary: "text-kumo-subtle";
        readonly success: "text-kumo-link";
        readonly error: "text-kumo-danger";
        readonly mono: "text-kumo-default";
        readonly "mono-secondary": "text-kumo-subtle";
    };
    readonly fontFamilies: {
        readonly default: "sans-serif";
        readonly mono: "monospace";
    };
};
export type KumoTextVariant = keyof typeof KUMO_TEXT_VARIANTS.variant;
export type KumoTextSize = keyof typeof KUMO_TEXT_VARIANTS.size;
export interface KumoTextVariantsProps {
    variant?: KumoTextVariant;
    size?: KumoTextSize;
}
export declare function textVariants({ variant, size, }?: KumoTextVariantsProps): string;
type Heading = "heading1" | "heading2" | "heading3";
type Copy = "body" | "secondary" | "success" | "error";
type Monospace = "mono" | "mono-secondary";
type TextSize = KumoTextSize;
type TextVariant = KumoTextVariant;
/** Valid HTML elements for the Text component's `as` prop. */
export type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "dt" | "dd" | "li" | "figcaption" | "legend" | "pre" | "code" | "em" | "strong" | "small" | "abbr" | "time";
type BaseTextProps = Omit<ComponentPropsWithoutRef<"span">, "className" | "style"> & {
    DANGEROUS_className?: string;
    DANGEROUS_style?: CSSProperties;
};
type TextPropsInternal<Variant extends TextVariant = "body"> = BaseTextProps & (Variant extends Copy ? {
    variant?: Variant;
    bold?: boolean;
    size?: TextSize;
    truncate?: boolean;
    /** Optional element override. Defaults to `<p>`. */
    as?: TextElement;
} : Variant extends Monospace ? {
    variant?: Variant;
    bold?: never;
    size?: "lg";
    truncate?: boolean;
    /** Optional element override. Defaults to `<span>`. */
    as?: TextElement;
} : Variant extends Heading ? {
    variant: Variant;
    bold?: never;
    size?: never;
    truncate?: boolean;
    /**
     * Required for heading variants. Pick the element that reflects
     * this text's place in the document outline (`"h1"` for a page
     * title, `"h2"` for a section title, etc.) or `"span"` for
     * decorative heading-styled text that is NOT a section heading.
     *
     * Previously optional (defaulted to `<span>`), which silently
     * excluded real section headings from the document outline.
     * Making it required surfaces the decision at the type level.
     */
    as: TextElement;
} : never);
/**
 * Text component props.
 *
 * @example
 * ```tsx
 * <Text variant="heading1" as="h1">Page Title</Text>
 * <Text variant="body">Default paragraph text.</Text>
 * <Text variant="secondary" size="sm">Muted helper text</Text>
 * <Text variant="error">Something went wrong</Text>
 * <Text variant="mono">console.log("code")</Text>
 * ```
 */
export interface TextProps {
    /**
     * Text style variant. Determines color, font, and weight.
     * - `"heading1"` — Large page title (30px, semibold)
     * - `"heading2"` — Section title (24px, semibold)
     * - `"heading3"` — Subsection title (18px, semibold)
     * - `"body"` — Default body text
     * - `"secondary"` — Muted text for secondary information
     * - `"success"` — Success state text
     * - `"error"` — Error state text
     * - `"mono"` — Monospace text for code
     * - `"mono-secondary"` — Muted monospace text
     * @default "body"
     */
    variant?: KumoTextVariant;
    /**
     * Text size (only applies to body/secondary/success/error variants).
     * - `"xs"` — 12px
     * - `"sm"` — 14px
     * - `"base"` — 16px
     * - `"lg"` — 18px
     * @default "base"
     */
    size?: KumoTextSize;
    /** Whether to use bold font weight (only applies to body variants). */
    bold?: boolean;
    /** Whether to truncate overflowing text with an ellipsis. Adds `truncate min-w-0` classes. */
    truncate?: boolean;
    /**
     * The HTML element to render. Accepts headings (`"h1"`–`"h6"`), block text
     * (`"p"`, `"pre"`), inline text (`"span"`, `"code"`, `"em"`, `"strong"`,
     * `"small"`, `"abbr"`, `"time"`), form-related (`"label"`, `"legend"`),
     * list/definition (`"dt"`, `"dd"`, `"li"`), and `"figcaption"`.
     *
     * - **Required** for heading variants (`"heading1"`, `"heading2"`,
     *   `"heading3"`) — pick the element that reflects this text's place in
     *   the document outline, or `"span"` for decorative heading-styled text
     *   that is not a section heading.
     * - **Optional** for body variants (defaults to `"p"`) and monospace
     *   variants (defaults to `"span"`).
     */
    as?: TextElement;
    /** Text content. */
    children?: React.ReactNode;
}
export declare const Text: <Variant extends TextVariant = "body">(props: TextPropsInternal<Variant> & {
    ref?: ForwardedRef<ElementRef<"span">>;
}) => React.ReactElement;
export {};
//# sourceMappingURL=text.d.ts.map