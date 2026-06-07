/**
 * Categorical colors for light mode — used when assigning colors to data series
 * by index (e.g. the first series gets Blue, the second gets Violet, etc.).
 */
declare enum ChartCategoricalLightColors {
    Blue = "#4290F0",
    Yellow = "#F5B647",
    Pink = "#E8649D",
    Purple = "#8D58EE",
    Teal = "#50C3B6",
    Orange = "#D37536"
}
/**
 * Categorical colors for dark mode
 */
declare enum ChartCategoricalDarkColors {
    Blue = "#4290F0",
    Yellow = "#EEB720",
    Pink = "#E8649D",
    Purple = "#8D58EE",
    Teal = "#50C3B6",
    Orange = "#D37536"
}
export type ChartSemanticColorName = "Attention" | "Warning" | "Success" | "Neutral" | "Disabled" | "Skeleton";
/**
 * Sequential color palettes for light mode with the colour in position #2 of the array as the base.
 */
declare const sequentialLight: {
    blues: string[];
};
/**
 * Ordered list of categorical colors for light mode, indexed by series position.
 * Used as the default ECharts color palette when `isDarkMode` is `false`.
 */
export declare const CHART_LIGHT_COLORS: ChartCategoricalLightColors[];
/**
 * Ordered list of categorical colors for dark mode, indexed by series position.
 * Used as the default ECharts color palette when `isDarkMode` is `true`.
 */
export declare const CHART_DARK_COLORS: ChartCategoricalDarkColors[];
/**
 * Utilities for resolving Kumo chart colors by semantic name or series index.
 * All functions accept an `isDarkMode` flag and return the appropriate color string.
 */
export declare namespace ChartPalette {
    /**
     * Returns the hex color for a named semantic value (status, severity, etc.).
     *
     * @example
     * ```ts
     * ChartPalette.semantic("Attention")           // "#FC574A" (light)
     * ChartPalette.semantic("Warning", true)       // "#F8A054" (dark)
     * ```
     */
    function semantic(name: ChartSemanticColorName, isDarkMode?: boolean): string;
    /**
     * Returns the categorical color for a given series index.
     * Wraps around via modulo when `index` exceeds the palette length (6 colors).
     *
     * @example
     * ```ts
     * ChartPalette.categorical(0)        // Blue (light)
     * ChartPalette.categorical(0, true)  // Blue (dark)
     * ChartPalette.categorical(6)        // wraps back to Blue
     * ```
     */
    function categorical(index: number, isDarkMode?: boolean): string;
    /**
     * Returns all steps of a named sequential palette as an array.
     *
     * @example
     * ```ts
     * ChartPalette.sequential("blues")        // 5-step array (light)
     * ChartPalette.sequential("blues", true)  // 5-step array (dark)
     * ```
     */
    function sequential(palette: keyof typeof sequentialLight, isDarkMode?: boolean): string[];
    /**
     * Returns the hex color for chart text/labels.
     *
     * @example
     * ```ts
     * ChartPalette.text("primary")        // "#6B7280" (light)
     * ChartPalette.text("primary", true)  // "#9CA3AF" (dark)
     * ChartPalette.text("secondary")      // "#9CA3AF" (light)
     * ```
     */
    function text(variant: "primary" | "secondary", isDarkMode?: boolean): string;
}
export {};
//# sourceMappingURL=Color.d.ts.map