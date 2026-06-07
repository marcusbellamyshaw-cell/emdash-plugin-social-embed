import { SVGProps } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { LinkComponentProps } from '../../utils/link-provider';
/** Link variant definitions mapping variant names to their Tailwind classes. */
export declare const KUMO_LINK_VARIANTS: {
    readonly variant: {
        readonly inline: {
            readonly classes: "text-kumo-link underline underline-offset-[0.15em] decoration-[0.0625em] link-current transition-colors";
            readonly description: "Inline text link that flows with content";
        };
        readonly current: {
            readonly classes: "text-current underline underline-offset-[0.15em] decoration-[0.0625em] link-current transition-colors";
            readonly description: "Link that inherits color from parent text";
        };
        readonly plain: {
            readonly classes: "text-kumo-link hover:text-kumo-link/70 transition-colors";
            readonly description: "Link without underline decoration";
        };
    };
};
export declare const KUMO_LINK_DEFAULT_VARIANTS: {
    readonly variant: "inline";
};
export type KumoLinkVariant = keyof typeof KUMO_LINK_VARIANTS.variant;
export interface KumoLinkVariantsProps {
    /**
     * Visual style of the link.
     * - `"inline"` — Inline text link that flows with content
     * - `"current"` — Link that inherits color from parent text
     * - `"plain"` — Link without underline decoration
     * @default "inline"
     */
    variant?: KumoLinkVariant;
}
export declare function linkVariants({ variant, }?: KumoLinkVariantsProps): string;
/**
 * Link component props.
 *
 * Use `href` for the link destination. For framework-specific routing, use the
 * `render` prop or configure a `LinkProvider` at the app root.
 *
 * @example Internal link
 * ```tsx
 * <Link href="/docs">Learn more</Link>
 * ```
 *
 * @example External link
 * ```tsx
 * <Link href="https://cloudflare.com" target="_blank" rel="noopener noreferrer">
 *   Visit Cloudflare <Link.ExternalIcon />
 * </Link>
 * ```
 *
 * @example Composition with render prop
 * ```tsx
 * <Link render={<RouterLink to="/dashboard" />}>Dashboard</Link>
 * ```
 */
export type LinkProps = useRender.ComponentProps<"a"> & LinkComponentProps & KumoLinkVariantsProps;
export declare const Link: import('react').ForwardRefExoticComponent<Omit<LinkProps, "ref"> & import('react').RefAttributes<HTMLAnchorElement>> & {
    ExternalIcon: {
        (props: SVGProps<SVGSVGElement>): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
};
//# sourceMappingURL=link.d.ts.map