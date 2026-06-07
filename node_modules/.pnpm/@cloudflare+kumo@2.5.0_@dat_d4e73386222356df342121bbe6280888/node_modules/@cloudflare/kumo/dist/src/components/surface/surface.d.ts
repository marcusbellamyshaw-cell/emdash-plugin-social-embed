import { ElementType } from 'react';
import { LayerCardProps } from '../layer-card/layer-card';
/** Surface color variant definitions. */
export declare const KUMO_SURFACE_VARIANTS: {
    readonly color: {
        readonly primary: {
            readonly classes: "";
            readonly description: "Primary surface color";
        };
        readonly secondary: {
            readonly classes: "";
            readonly description: "Secondary surface color";
        };
    };
};
export declare const KUMO_SURFACE_DEFAULT_VARIANTS: {
    readonly color: "primary";
};
export type KumoSurfaceColor = keyof typeof KUMO_SURFACE_VARIANTS.color;
export interface KumoSurfaceVariantsProps {
    /**
     * Surface color variant.
     * - `"primary"` — Primary surface color
     * - `"secondary"` — Secondary surface color
     * @default "primary"
     */
    color?: KumoSurfaceColor;
}
export declare function surfaceVariants({ color, }?: KumoSurfaceVariantsProps): "";
/**
 * Surface component props.
 *
 * @deprecated Use `LayerCard` instead. `Surface` is now a compatibility wrapper
 * around `LayerCard` for simple one-layer card containers.
 *
 * @example
 * ```tsx
 * <Surface className="rounded-lg p-4">Card content</Surface>
 * <Surface render={<section />} className="rounded-lg p-6">Section content</Surface>
 * ```
 */
export type SurfaceProps = LayerCardProps & KumoSurfaceVariantsProps & {
    /**
     * @deprecated Use the `render` prop instead.
     * @example `<Surface render={<section />}>` instead of `<Surface as="section">`
     */
    as?: ElementType;
};
/**
 * @deprecated Use `LayerCard` instead.
 *
 * Polymorphic compatibility wrapper that preserves the `Surface` API while
 * delegating rendering and styling to `LayerCard`.
 *
 * @example
 * ```tsx
 * <LayerCard className="rounded-lg p-4">Card content</LayerCard>
 * ```
 */
export declare const Surface: {
    ({ color, className, render, as, ...props }: SurfaceProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=surface.d.ts.map