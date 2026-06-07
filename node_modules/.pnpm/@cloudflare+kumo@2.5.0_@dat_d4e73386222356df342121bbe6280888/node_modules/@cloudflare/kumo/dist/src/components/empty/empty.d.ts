/** Empty state size variant definitions mapping sizes to their Tailwind classes. */
export declare const KUMO_EMPTY_VARIANTS: {
    readonly size: {
        readonly sm: {
            readonly classes: "px-6 py-8 gap-4";
            readonly description: "Compact empty state for smaller containers";
        };
        readonly base: {
            readonly classes: "px-10 py-16 gap-6";
            readonly description: "Default empty state size";
        };
        readonly lg: {
            readonly classes: "px-12 py-20 gap-8";
            readonly description: "Large empty state for prominent placement";
        };
    };
};
export declare const KUMO_EMPTY_DEFAULT_VARIANTS: {
    readonly size: "base";
};
export type KumoEmptySize = keyof typeof KUMO_EMPTY_VARIANTS.size;
export interface KumoEmptyVariantsProps {
    /**
     * Size of the empty state container.
     * - `"sm"` — Compact empty state for smaller containers
     * - `"base"` — Default empty state size
     * - `"lg"` — Large empty state for prominent placement
     * @default "base"
     */
    size?: KumoEmptySize;
}
export declare function emptyVariants({ size, }?: KumoEmptyVariantsProps): string;
/**
 * Empty state component props.
 *
 * @example
 * ```tsx
 * <Empty
 *   icon={<PackageIcon size={48} />}
 *   title="No packages found"
 *   description="Get started by installing your first package."
 *   commandLine="npm install @cloudflare/kumo"
 * />
 * ```
 */
export interface EmptyProps extends KumoEmptyVariantsProps {
    /** Decorative icon displayed above the title (e.g. from `@phosphor-icons/react`). */
    icon?: React.ReactNode;
    /** Primary heading text for the empty state. */
    title: string;
    /** Secondary description text displayed below the title. */
    description?: string;
    /** Shell command displayed in a copyable code block. */
    commandLine?: string;
    /** Additional content (buttons, links) rendered below the description. */
    contents?: React.ReactNode;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
}
/**
 * Placeholder shown when a list, table, or page has no content to display.
 *
 * @example
 * ```tsx
 * <Empty title="No results found" description="Try adjusting your search." />
 * ```
 */
export declare function Empty({ icon, title, description, commandLine, contents, size, className, }: EmptyProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=empty.d.ts.map