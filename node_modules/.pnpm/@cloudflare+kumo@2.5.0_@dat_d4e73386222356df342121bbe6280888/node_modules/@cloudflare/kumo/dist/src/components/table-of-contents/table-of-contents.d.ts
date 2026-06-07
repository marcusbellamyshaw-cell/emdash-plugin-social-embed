/** TableOfContents item state variant definitions. */
export declare const KUMO_TABLE_OF_CONTENTS_VARIANTS: {
    readonly state: {
        readonly default: {
            readonly classes: "text-kumo-subtle hover:border-kumo-line hover:text-kumo-default hover:font-medium";
            readonly description: "Inactive section link";
        };
        readonly active: {
            readonly classes: "border-kumo-brand font-medium text-kumo-default";
            readonly description: "Currently visible / active section";
        };
    };
};
export declare const KUMO_TABLE_OF_CONTENTS_DEFAULT_VARIANTS: {
    readonly state: "default";
};
export type KumoTableOfContentsState = keyof typeof KUMO_TABLE_OF_CONTENTS_VARIANTS.state;
export type TableOfContentsProps = React.HTMLAttributes<HTMLElement>;
export type TableOfContentsTitleProps = React.HTMLAttributes<HTMLParagraphElement>;
export type TableOfContentsListProps = React.HTMLAttributes<HTMLUListElement>;
export interface TableOfContentsItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Whether this item represents the currently active section. */
    active?: boolean;
    /**
     * Custom element to render as the link. Use this to integrate with
     * framework routers (e.g., Next.js `<Link>`, React Router `<NavLink>`).
     * The element receives all anchor props including `href`, `className`, and `children`.
     *
     * @example
     * ```tsx
     * <TableOfContents.Item render={<Link />} href="/intro" active>
     *   Introduction
     * </TableOfContents.Item>
     * ```
     */
    render?: React.ReactElement;
}
export interface TableOfContentsGroupProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
    /** Label displayed above the group's items. */
    label: string;
    /** URL the group label links to. When provided, the label renders as a clickable link with item styling. */
    href?: string;
    /** Whether this group's label represents the currently active section. Only applies when `href` is provided. */
    active?: boolean;
}
/**
 * TableOfContents — presentational compound component for section navigation.
 *
 * Purely visual; all interaction logic (scroll tracking, active state management)
 * is left to the consumer.
 *
 * @example
 * ```tsx
 * <TableOfContents>
 *   <TableOfContents.Title>On this page</TableOfContents.Title>
 *   <TableOfContents.List>
 *     <TableOfContents.Item href="#intro" active>Introduction</TableOfContents.Item>
 *     <TableOfContents.Group label="Getting Started">
 *       <TableOfContents.Item href="#install">Installation</TableOfContents.Item>
 *       <TableOfContents.Item href="#setup">Setup</TableOfContents.Item>
 *     </TableOfContents.Group>
 *   </TableOfContents.List>
 * </TableOfContents>
 * ```
 */
export declare const TableOfContents: import('react').ForwardRefExoticComponent<TableOfContentsProps & import('react').RefAttributes<HTMLElement>> & {
    Title: import('react').ForwardRefExoticComponent<TableOfContentsTitleProps & import('react').RefAttributes<HTMLParagraphElement>>;
    List: import('react').ForwardRefExoticComponent<TableOfContentsListProps & import('react').RefAttributes<HTMLUListElement>>;
    Item: import('react').ForwardRefExoticComponent<TableOfContentsItemProps & import('react').RefAttributes<HTMLAnchorElement>>;
    Group: import('react').ForwardRefExoticComponent<TableOfContentsGroupProps & import('react').RefAttributes<HTMLLIElement>>;
};
//# sourceMappingURL=table-of-contents.d.ts.map