/** Loader size variant definitions mapping sizes to their pixel values. */
export declare const KUMO_LOADER_VARIANTS: {
    readonly size: {
        readonly sm: {
            readonly value: 16;
            readonly description: "Small loader for inline use";
        };
        readonly base: {
            readonly value: 24;
            readonly description: "Default loader size";
        };
        readonly lg: {
            readonly value: 32;
            readonly description: "Large loader for prominent loading states";
        };
    };
};
export declare const KUMO_LOADER_DEFAULT_VARIANTS: {
    readonly size: "base";
};
export type KumoLoaderSize = keyof typeof KUMO_LOADER_VARIANTS.size;
export interface KumoLoaderVariantsProps {
    /**
     * Size of the loader. Use a preset name or a custom pixel number.
     * - `"sm"` — 16px, small loader for inline use
     * - `"base"` — 24px, default loader size
     * - `"lg"` — 32px, large loader for prominent loading states
     * @default "base"
     */
    size?: KumoLoaderSize | number;
}
export declare function loaderVariants({ size, }?: KumoLoaderVariantsProps): number;
/**
 * Loader component props.
 *
 * @example
 * ```tsx
 * <Loader />
 * <Loader size="sm" />
 * <Loader size={24} />
 * ```
 */
export interface LoaderProps {
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /**
     * Size of the spinner. Use a preset name or a custom pixel number.
     * - `"sm"` — 16px, for inline use
     * - `"base"` — 24px, default size
     * - `"lg"` — 32px, for prominent loading states
     * @default "base"
     */
    size?: KumoLoaderSize | number;
    /**
     * Accessible label for the loader, announced by screen readers.
     * Pass a translated string for internationalization.
     * @default "Loading"
     */
    "aria-label"?: string;
}
/**
 * Animated circular spinner for indicating loading states.
 *
 * @example
 * ```tsx
 * <Loader />
 * ```
 */
export declare const Loader: ({ className, size, "aria-label": ariaLabel, }: LoaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=loader.d.ts.map