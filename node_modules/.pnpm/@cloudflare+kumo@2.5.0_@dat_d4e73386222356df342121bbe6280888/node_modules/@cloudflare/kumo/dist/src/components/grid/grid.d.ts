import { default as React } from 'react';
/** Grid variant and gap definitions mapping layout names to their responsive Tailwind classes. */
export declare const KUMO_GRID_VARIANTS: {
    readonly variant: {
        readonly "2up": {
            readonly classes: "grid-cols-1 md:grid-cols-2";
            readonly description: "Grid items stack on small screens, display side-by-side on medium screens and up";
        };
        readonly "side-by-side": {
            readonly classes: "grid-cols-2";
            readonly description: "Grid items always displayed side-by-side";
        };
        readonly "2-1": {
            readonly classes: "grid-cols-1 md:grid-cols-[2fr_1fr]";
            readonly description: "Two-thirds / one-third split (66%/33%) on medium screens and up";
        };
        readonly "1-2": {
            readonly classes: "grid-cols-1 md:grid-cols-[1fr_2fr]";
            readonly description: "One-third / two-thirds split (33%/66%) on medium screens and up";
        };
        readonly "1-3up": {
            readonly classes: "grid-cols-1 lg:grid-cols-3";
            readonly description: "Grid items stack on small screens, expand to 3 across on large screens";
        };
        readonly "3up": {
            readonly classes: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
            readonly description: "Grid items stack on small screens, 2 across on medium, 3 across on large";
        };
        readonly "4up": {
            readonly classes: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
            readonly description: "Grid items stack on small screens, progressively increase columns at larger breakpoints";
        };
        readonly "6up": {
            readonly classes: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";
            readonly description: "Grid items start at 2 across, expand to 6 across on XL";
        };
        readonly "1-2-4up": {
            readonly classes: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
            readonly description: "Grid items stack on small screens, 2 across on medium, 4 across on large";
        };
    };
    readonly gap: {
        readonly none: {
            readonly classes: "gap-0";
            readonly description: "No gap between grid items";
        };
        readonly sm: {
            readonly classes: "gap-3";
            readonly description: "Small gap between grid items";
        };
        readonly base: {
            readonly classes: "gap-2 md:gap-6 lg:gap-8";
            readonly description: "Default responsive gap between grid items";
        };
        readonly lg: {
            readonly classes: "gap-8";
            readonly description: "Large gap between grid items";
        };
    };
};
export declare const KUMO_GRID_DEFAULT_VARIANTS: {
    readonly gap: "base";
};
export type KumoGridVariant = keyof typeof KUMO_GRID_VARIANTS.variant;
export type KumoGridGap = keyof typeof KUMO_GRID_VARIANTS.gap;
/**
 * Grid component props.
 *
 * @example
 * ```tsx
 * <Grid variant="3up" gap="sm">
 *   <GridItem><Surface className="p-4">1</Surface></GridItem>
 *   <GridItem><Surface className="p-4">2</Surface></GridItem>
 *   <GridItem><Surface className="p-4">3</Surface></GridItem>
 * </Grid>
 * ```
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Grid items to render. */
    children?: React.ReactNode;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** Show dividers between grid items on mobile (only works with `"4up"` variant). */
    mobileDivider?: boolean;
    /**
     * Gap size between grid items.
     * - `"none"` — No gap
     * - `"sm"` — 12px gap
     * - `"base"` — Responsive gap (8px → 24px → 32px)
     * - `"lg"` — 32px gap
     * @default "base"
     */
    gap?: KumoGridGap;
    /**
     * Responsive column layout variant.
     * - `"2up"` — 1 col → 2 cols at md
     * - `"side-by-side"` — Always 2 cols
     * - `"2-1"` — 66%/33% split at md
     * - `"1-2"` — 33%/66% split at md
     * - `"3up"` — 1 → 2 → 3 cols
     * - `"4up"` — 1 → 2 → 3 → 4 cols
     * - `"6up"` — 2 → 3 → 4 → 6 cols
     * - `"1-2-4up"` — 1 → 2 → 4 cols
     */
    variant?: KumoGridVariant;
}
/** GridItem component props — a single cell within a Grid. */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Content for this grid cell. */
    children?: React.ReactNode;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
}
export declare function gridVariants({ variant, gap, }?: {
    variant?: KumoGridVariant;
    gap?: KumoGridGap;
}): string;
export declare function gridItemVariants({ variant, mobileDivider, }?: {
    variant?: KumoGridVariant;
    mobileDivider?: boolean;
}): string;
/**
 * Responsive CSS grid layout container with preset column configurations.
 *
 * @example
 * ```tsx
 * <Grid variant="2up" gap="base">
 *   <GridItem>Left</GridItem>
 *   <GridItem>Right</GridItem>
 * </Grid>
 * ```
 */
export declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export declare const GridItem: React.ForwardRefExoticComponent<GridItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=grid.d.ts.map