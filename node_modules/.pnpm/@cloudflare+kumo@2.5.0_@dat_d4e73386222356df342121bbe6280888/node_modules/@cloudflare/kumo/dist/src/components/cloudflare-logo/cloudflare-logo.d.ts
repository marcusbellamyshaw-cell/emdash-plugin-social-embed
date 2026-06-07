export declare const KUMO_CLOUDFLARE_LOGO_VARIANTS: {
    readonly variant: {
        readonly glyph: {
            readonly description: "Cloud glyph only (logomark)";
        };
        readonly full: {
            readonly description: "Full logo with cloud glyph and wordmark stacked";
        };
    };
    readonly color: {
        readonly color: {
            readonly description: "Brand colors (orange/yellow gradient cloud, dark gray text)";
        };
        readonly black: {
            readonly description: "Solid black logo";
        };
        readonly white: {
            readonly description: "Solid white logo (for dark backgrounds)";
        };
    };
};
export declare const KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS: {
    readonly variant: "full";
    readonly color: "color";
};
export type CloudflareLogoVariant = keyof typeof KUMO_CLOUDFLARE_LOGO_VARIANTS.variant;
export type CloudflareLogoColor = keyof typeof KUMO_CLOUDFLARE_LOGO_VARIANTS.color;
export interface CloudflareLogoProps extends React.SVGAttributes<SVGSVGElement> {
    /**
     * Logo variant
     * - `glyph`: Cloud icon only
     * - `full`: Cloud icon with "CLOUDFLARE" wordmark below
     * @default "full"
     */
    variant?: CloudflareLogoVariant;
    /**
     * Color scheme
     * - `color`: Brand colors (orange/yellow cloud, dark gray wordmark)
     * - `black`: Solid black
     * - `white`: Solid white (for dark backgrounds)
     * @default "color"
     */
    color?: CloudflareLogoColor;
}
/**
 * Cloudflare logo component.
 *
 * @example Glyph only (cloud icon)
 * ```tsx
 * <CloudflareLogo variant="glyph" className="w-12" />
 * ```
 *
 * @example Full logo with wordmark
 * ```tsx
 * <CloudflareLogo variant="full" className="w-40" />
 * ```
 *
 * @example White logo for dark backgrounds
 * ```tsx
 * <CloudflareLogo color="white" className="w-32" />
 * ```
 *
 * @example Black logo
 * ```tsx
 * <CloudflareLogo color="black" className="w-32" />
 * ```
 */
export declare const CloudflareLogo: import('react').ForwardRefExoticComponent<CloudflareLogoProps & import('react').RefAttributes<SVGSVGElement>>;
export interface PoweredByCloudflareProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Color scheme for the logo and text
     * @default "color"
     */
    color?: CloudflareLogoColor;
}
/**
 * "Powered by Cloudflare" badge component.
 *
 * Renders a link to cloudflare.com with the Cloudflare glyph and "Powered by Cloudflare" text.
 *
 * @example Basic usage
 * ```tsx
 * <PoweredByCloudflare />
 * ```
 *
 * @example White variant for dark backgrounds
 * ```tsx
 * <PoweredByCloudflare color="white" />
 * ```
 *
 * @example Custom link
 * ```tsx
 * <PoweredByCloudflare href="https://cloudflare.com/products/workers" />
 * ```
 */
export declare const PoweredByCloudflare: import('react').ForwardRefExoticComponent<PoweredByCloudflareProps & import('react').RefAttributes<HTMLAnchorElement>>;
export type CloudflareLogoSvgVariant = "glyph" | "full";
export type CloudflareLogoSvgColor = "color" | "black" | "white";
export interface GenerateCloudflareLogoSvgOptions {
    /**
     * Logo variant
     * - `glyph`: Cloud icon only
     * - `full`: Cloud icon with "CLOUDFLARE" wordmark
     * @default "full"
     */
    variant?: CloudflareLogoSvgVariant;
    /**
     * Color scheme
     * - `color`: Brand colors (orange/yellow cloud, dark gray wordmark)
     * - `black`: Solid black
     * - `white`: Solid white
     * @default "color"
     */
    color?: CloudflareLogoSvgColor;
}
/**
 * Generates SVG markup string for the Cloudflare logo.
 *
 * Useful for copying to clipboard or embedding in non-React contexts.
 *
 * @example Copy glyph SVG to clipboard
 * ```tsx
 * const svg = generateCloudflareLogoSvg({ variant: "glyph" });
 * await navigator.clipboard.writeText(svg);
 * ```
 *
 * @example Generate full logo in black
 * ```tsx
 * const svg = generateCloudflareLogoSvg({ variant: "full", color: "black" });
 * ```
 */
export declare function generateCloudflareLogoSvg(options?: GenerateCloudflareLogoSvgOptions): string;
//# sourceMappingURL=cloudflare-logo.d.ts.map