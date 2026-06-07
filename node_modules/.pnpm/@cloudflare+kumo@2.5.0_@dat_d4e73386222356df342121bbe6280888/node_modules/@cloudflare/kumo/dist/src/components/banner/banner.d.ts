import { HTMLAttributes, ReactNode } from 'react';
/** Base styles applied to all banner variants. */
export declare const KUMO_BANNER_BASE_STYLES = "flex w-full items-start gap-3 rounded-lg px-4 py-3 text-base";
/** Banner variant definitions mapping style options to their Tailwind classes and descriptions. */
export declare const KUMO_BANNER_VARIANTS: {
    readonly variant: {
        readonly default: {
            readonly classes: "bg-kumo-banner-info text-kumo-info";
            readonly iconClasses: "text-kumo-info";
            readonly description: "Informational banner for general messages";
        };
        readonly alert: {
            readonly classes: "bg-kumo-banner-warning text-kumo-warning";
            readonly iconClasses: "text-kumo-warning";
            readonly description: "Warning banner for cautionary messages";
        };
        readonly error: {
            readonly classes: "bg-kumo-danger-tint/60 text-kumo-danger";
            readonly iconClasses: "text-kumo-danger";
            readonly description: "Error banner for critical issues";
        };
        readonly secondary: {
            readonly classes: "bg-kumo-contrast/5 text-kumo-subtle";
            readonly iconClasses: "text-kumo-subtle";
            readonly description: "Neutral banner for secondary messages";
        };
    };
};
export declare const KUMO_BANNER_DEFAULT_VARIANTS: {
    readonly variant: "default";
};
export type KumoBannerVariant = keyof typeof KUMO_BANNER_VARIANTS.variant;
export interface KumoBannerVariantsProps {
    /**
     * Visual style of the banner.
     * - `"default"` — Informational banner for general messages
     * - `"alert"` — Warning banner for cautionary messages
     * - `"error"` — Error banner for critical issues
     * - `"secondary"` — Neutral banner for secondary messages
     * @default "default"
     */
    variant?: KumoBannerVariant;
}
export declare function bannerVariants({ variant, }?: KumoBannerVariantsProps): string;
export declare enum BannerVariant {
    DEFAULT = 0,
    ALERT = 1,
    ERROR = 2
}
/**
 * Banner component props.
 *
 * @example
 * ```tsx
 * <Banner title="Update available" description="A new version is ready to install." />
 * <Banner variant="alert" title="Session expiring" description="Your session will expire soon." />
 * <Banner variant="error" title="Save failed" description="We couldn't save your changes." />
 * ```
 */
export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    /** Icon element rendered before the banner content (e.g. from `@phosphor-icons/react`). */
    icon?: ReactNode;
    /** Primary heading text for the banner. Use for i18n string injection. */
    title?: string;
    /** Secondary description text displayed below the title. Use for i18n string injection. */
    description?: ReactNode;
    /** Action slot rendered at the trailing end of the banner (e.g. a CTA button or link). Only used in structured mode (with `title` or `description`). */
    action?: ReactNode;
    /** @deprecated Use `title` and `description` instead. Will be removed in a future major version. */
    text?: string;
    /** @deprecated Use `title` and `description` instead for better i18n support. */
    children?: ReactNode;
    /**
     * Visual style of the banner.
     * - `"default"` — Informational blue banner for general messages
     * - `"alert"` — Warning yellow banner for cautionary messages
     * - `"error"` — Error red banner for critical issues
     * - `"secondary"` — Neutral banner for secondary messages
     * @default "default"
     */
    variant?: KumoBannerVariant;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
}
/**
 * Full-width message bar for informational, warning, or error notices.
 * Supports structured title/description for i18n, or simple children for basic usage.
 *
 * @example
 * ```tsx
 * // Structured (recommended for i18n)
 * <Banner
 *   variant="alert"
 *   icon={<WarningCircle />}
 *   title="Review required"
 *   description="Please review your billing information."
 * />
 *
 * // Simple (backwards compatible)
 * <Banner variant="alert" icon={<WarningCircle />}>
 *   Review your billing information.
 * </Banner>
 * ```
 */
export declare const Banner: import('react').ForwardRefExoticComponent<BannerProps & import('react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=banner.d.ts.map