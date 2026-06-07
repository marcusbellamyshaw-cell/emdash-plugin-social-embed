import { ReactNode } from 'react';
/** Base styles applied to all badge variants. */
export declare const KUMO_BADGE_BASE_STYLES = "inline-flex w-fit flex-none shrink-0 items-center justify-self-start rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap";
/** Badge variant definitions mapping variant names to their Tailwind classes and descriptions. */
export declare const KUMO_BADGE_VARIANTS: {
    readonly variant: {
        /** Semantic token badges */
        readonly primary: {
            readonly classes: "bg-kumo-badge-inverted text-kumo-badge-inverted";
            readonly description: "Primary badge";
        };
        readonly secondary: {
            readonly classes: "bg-kumo-fill text-kumo-badge-neutral-subtle";
            readonly description: "Secondary badge";
        };
        readonly error: {
            readonly classes: "bg-kumo-danger-tint/60 text-kumo-danger";
            readonly description: "Error badge";
        };
        readonly warning: {
            readonly classes: "bg-kumo-warning-tint/70 text-kumo-warning";
            readonly description: "Warning badge";
        };
        readonly success: {
            readonly classes: "bg-kumo-success-tint/70 text-kumo-success";
            readonly description: "Success badge";
        };
        readonly destructive: {
            readonly classes: "bg-kumo-badge-red text-white";
            readonly description: "Deprecated. Use red instead.";
        };
        readonly info: {
            readonly classes: "bg-kumo-info-tint/70 text-kumo-info";
            readonly description: "Info badge";
        };
        readonly beta: {
            readonly classes: "border border-dashed border-kumo-brand bg-transparent text-kumo-link";
            readonly description: "Indicates beta or experimental features";
        };
        readonly outline: {
            readonly classes: "border border-kumo-fill bg-transparent text-kumo-default";
            readonly description: "Bordered badge with transparent background";
        };
        /** Other color token variants */
        readonly red: {
            readonly classes: "bg-kumo-badge-red text-white";
            readonly description: "Red badge";
        };
        readonly green: {
            readonly classes: "bg-kumo-badge-green text-white";
            readonly description: "Green badge";
        };
        readonly neutral: {
            readonly classes: "bg-kumo-badge-neutral text-white";
            readonly description: "Neutral badge";
        };
        readonly orange: {
            readonly classes: "bg-kumo-badge-orange text-black";
            readonly description: "Orange badge";
        };
        readonly purple: {
            readonly classes: "bg-kumo-badge-purple text-white";
            readonly description: "Purple badge";
        };
        readonly teal: {
            readonly classes: "bg-kumo-badge-teal text-white";
            readonly description: "Teal badge";
        };
        readonly "teal-subtle": {
            readonly classes: "bg-kumo-badge-teal-subtle text-kumo-badge-teal-subtle";
            readonly description: "Subtle teal badge";
        };
        readonly blue: {
            readonly classes: "bg-kumo-badge-blue text-white";
            readonly description: "Blue badge";
        };
    };
    readonly appearance: {
        readonly filled: {
            readonly classes: "";
            readonly description: "Filled badge with background color (default)";
        };
        readonly dot: {
            readonly classes: "gap-1.5 bg-transparent text-kumo-default ring ring-kumo-hairline";
            readonly description: "Outlined badge with a colored circle dot indicating status";
        };
    };
    readonly dotColor: {
        readonly none: {
            readonly classes: "";
            readonly description: "No dot indicator (used when appearance is not dot, or variant has no dot color)";
        };
        readonly success: {
            readonly classes: "bg-kumo-success";
            readonly description: "Green dot for success status";
        };
        readonly warning: {
            readonly classes: "bg-kumo-badge-orange";
            readonly description: "Orange dot for warning status";
        };
        readonly error: {
            readonly classes: "bg-kumo-badge-red";
            readonly description: "Red dot for error status";
        };
        readonly neutral: {
            readonly classes: "bg-kumo-badge-neutral";
            readonly description: "Neutral dot for informational status";
        };
    };
};
export declare const KUMO_BADGE_DEFAULT_VARIANTS: {
    readonly variant: "primary";
    readonly appearance: "filled";
    readonly dotColor: "none";
};
export type KumoBadgeVariant = keyof typeof KUMO_BADGE_VARIANTS.variant;
export type KumoBadgeAppearance = keyof typeof KUMO_BADGE_VARIANTS.appearance;
export type KumoBadgeDotColor = keyof typeof KUMO_BADGE_VARIANTS.dotColor;
export interface KumoBadgeVariantsProps {
    variant?: KumoBadgeVariant;
    appearance?: KumoBadgeAppearance;
}
export declare function badgeVariants({ variant, appearance, }?: KumoBadgeVariantsProps): string;
export type BadgeVariant = KumoBadgeVariant;
/**
 * Badge component props.
 *
 * @example
 * ```tsx
 * <Badge variant="green">Active</Badge>
 * <Badge variant="red">Error</Badge>
 * <Badge variant="neutral">Inactive</Badge>
 * <Badge variant="success" appearance="dot">Healthy</Badge>
 * ```
 */
export interface BadgeProps {
    /**
     * Color variant of the badge.
     * Recommended semantic variants:
     * - `"primary"` — Primary badge
     * - `"secondary"` — Secondary badge
     * - `"error"` — Error badge
     * - `"warning"` — Warning badge
     * - `"success"` — Success badge
     * - `"info"` — Info badge
     *
     * Additional token variants:
     * - `"red"`, `"orange"`, `"green"`, `"teal"`, `"blue"`, `"purple"`, `"neutral"`
     * - `"teal-subtle"`, `"neutral-subtle"`
     * - `"inverted"`
     * - `"outline"` — Bordered badge with transparent background
     * - `"beta"` — Dashed-border badge for beta/experimental features
     * @default "primary"
     */
    variant?: KumoBadgeVariant;
    /**
     * Visual appearance of the badge.
     * - `"filled"` — Filled background using the variant color (default)
     * - `"dot"` — Outlined badge with a colored circle dot. Only `success`,
     *   `warning`, `error`, and `neutral` variants show a dot; other variants
     *   render the badge without a dot.
     * @default "filled"
     */
    appearance?: KumoBadgeAppearance;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** Content rendered inside the badge. */
    children: ReactNode;
}
/**
 * Small status label for categorizing or highlighting content.
 *
 * @example
 * ```tsx
 * <Badge variant="green">Active</Badge>
 * <Badge variant="success" appearance="dot">Healthy</Badge>
 * ```
 */
export declare function Badge({ variant, appearance, className, children, }: BadgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=badge.d.ts.map