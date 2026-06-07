import { ReactNode } from 'react';
/**
 * Labels for internationalization of Pagination component.
 * All labels have English defaults and can be overridden for other locales.
 *
 * Note: To customize the "Showing X-Y of Z" text, use the `children` render prop
 * on `Pagination.Info` instead. To customize the "Per page:" label, use the
 * `label` prop on `Pagination.PageSize`.
 */
export interface PaginationLabels {
    /** Aria label for the navigation landmark. @default "Pagination" */
    navigation?: string;
    /** Aria label for the first page button. @default "First page" */
    firstPage?: string;
    /** Aria label for the previous page button. @default "Previous page" */
    previousPage?: string;
    /** Aria label for the next page button. @default "Next page" */
    nextPage?: string;
    /** Aria label for the last page button. @default "Last page" */
    lastPage?: string;
    /** Aria label for the page number input/select. @default "Page number" */
    pageNumber?: string;
    /** Aria label for the page size select. @default "Page size" */
    pageSize?: string;
}
/** Pagination controls variant definitions. */
export declare const KUMO_PAGINATION_VARIANTS: {
    readonly controls: {
        readonly full: {
            readonly classes: "";
            readonly description: "Full pagination controls with first, previous, page input, next, and last buttons";
        };
        readonly simple: {
            readonly classes: "";
            readonly description: "Simple pagination controls with only previous and next buttons";
        };
    };
};
export type KumoPaginationControls = keyof typeof KUMO_PAGINATION_VARIANTS.controls;
export declare const KUMO_PAGINATION_DEFAULT_VARIANTS: {
    readonly controls: "full";
};
export interface KumoPaginationVariantsProps {
    controls?: KumoPaginationControls;
}
export declare function paginationVariants({ controls, }?: KumoPaginationVariantsProps): string;
export interface PaginationInfoProps {
    /** Custom render function for the info text */
    children?: (props: {
        page: number;
        perPage?: number;
        totalCount?: number;
        pageShowingRange: string;
    }) => ReactNode;
    /** Additional CSS classes */
    className?: string;
}
declare function PaginationInfo({ children, className }: PaginationInfoProps): import("react/jsx-runtime").JSX.Element;
declare namespace PaginationInfo {
    var displayName: string;
}
export interface PaginationPageSizeProps {
    /** Current page size value */
    value: number;
    /** Callback when page size changes */
    onChange: (size: number) => void;
    /** Available page size options */
    options?: number[];
    /**
     * Label text shown before the selector.
     * @default "Per page:"
     */
    label?: ReactNode;
    /** Additional CSS classes */
    className?: string;
}
declare function PaginationPageSize({ value, onChange, options, label, className, }: PaginationPageSizeProps): import("react/jsx-runtime").JSX.Element;
declare namespace PaginationPageSize {
    var displayName: string;
}
export interface PaginationControlsProps extends KumoPaginationVariantsProps {
    /**
     * How the page number selector is rendered in "full" controls mode.
     * - `"input"` (default): A text input where users type a page number.
     * - `"dropdown"`: A dropdown select with all page numbers as options.
     *
     * **Note:** `"dropdown"` renders an option for every page, so it is best
     * suited for small page counts. For large datasets (hundreds of pages or
     * more) prefer `"input"` to avoid rendering performance overhead.
     */
    pageSelector?: "input" | "dropdown";
    /** Additional CSS classes */
    className?: string;
}
declare function PaginationControls({ controls, pageSelector, className, }: PaginationControlsProps): import("react/jsx-runtime").JSX.Element;
declare namespace PaginationControls {
    var displayName: string;
}
export interface PaginationSeparatorProps {
    /** Additional CSS classes */
    className?: string;
}
declare function PaginationSeparator({ className }: PaginationSeparatorProps): import("react/jsx-runtime").JSX.Element;
declare namespace PaginationSeparator {
    var displayName: string;
}
/** Base props shared by both compound and legacy Pagination APIs */
interface PaginationBaseProps {
    /** Callback fired when the current page changes. */
    setPage: (page: number) => void;
    /**
     * Current page number (1-indexed).
     * @default 1
     */
    page?: number;
    /** Number of items displayed per page. */
    perPage?: number;
    /** Total number of items across all pages. */
    totalCount?: number;
    /** Additional CSS classes for the container */
    className?: string;
    /**
     * Labels for internationalization of aria-labels. All labels have English defaults.
     *
     * For visible text like "Showing X of Y", use render props on sub-components:
     * - `Pagination.Info` children for the info text
     * - `Pagination.PageSize` label prop for the "Per page:" text
     *
     * @example
     * ```tsx
     * <Pagination
     *   labels={{
     *     firstPage: "Première page",
     *     previousPage: "Page précédente",
     *     nextPage: "Page suivante",
     *     lastPage: "Dernière page",
     *     pageNumber: "Numéro de page",
     *     pageSize: "Taille de page",
     *   }}
     *   // ...
     * />
     * ```
     */
    labels?: PaginationLabels;
}
/**
 * Props for the compound component API (recommended).
 *
 * @example
 * ```tsx
 * <Pagination page={page} setPage={setPage} perPage={perPage} totalCount={500}>
 *   <Pagination.Info />
 *   <Pagination.PageSize value={perPage} onChange={setPerPage} />
 *   <Pagination.Controls />
 * </Pagination>
 * ```
 */
export interface PaginationCompoundProps extends PaginationBaseProps {
    /**
     * Compound component children for custom layouts.
     * Use Pagination.Info, Pagination.PageSize, Pagination.Controls, and Pagination.Separator.
     */
    children: ReactNode;
    controls?: never;
    text?: never;
}
/**
 * Props for the legacy API (deprecated, use compound components instead).
 *
 * @deprecated Use the compound component API with children instead:
 * ```tsx
 * <Pagination page={page} setPage={setPage} perPage={perPage} totalCount={500}>
 *   <Pagination.Info />
 *   <Pagination.Controls />
 * </Pagination>
 * ```
 *
 * @example
 * ```tsx
 * // Legacy usage (deprecated)
 * <Pagination page={page} setPage={setPage} perPage={10} totalCount={100} />
 * ```
 */
export interface PaginationLegacyProps extends PaginationBaseProps, KumoPaginationVariantsProps {
    children?: never;
    /** @deprecated Use Pagination.Info with children prop instead */
    text?: (props: {
        page?: number;
        perPage?: number;
        totalCount?: number;
        pageShowingRange: string;
    }) => ReactNode;
}
/**
 * Pagination component props.
 *
 * Prefer the compound component API for new code:
 * @example
 * ```tsx
 * <Pagination page={page} setPage={setPage} perPage={perPage} totalCount={500}>
 *   <Pagination.Info />
 *   <Pagination.PageSize value={perPage} onChange={setPerPage} />
 *   <Pagination.Controls />
 * </Pagination>
 * ```
 */
export type PaginationProps = PaginationCompoundProps | PaginationLegacyProps;
/**
 * Page navigation controls with page count display.
 *
 * Supports both compound component and legacy patterns. Prefer compound components for new code:
 *
 * @example
 * // Compound component (recommended)
 * ```tsx
 * <Pagination page={page} setPage={setPage} perPage={perPage} totalCount={500}>
 *   <Pagination.Info />
 *   <Pagination.Separator />
 *   <Pagination.PageSize value={perPage} onChange={setPerPage} />
 *   <Pagination.Controls />
 * </Pagination>
 * ```
 *
 * @example
 * // Legacy (deprecated)
 * ```tsx
 * <Pagination page={page} setPage={setPage} perPage={10} totalCount={100} />
 * ```
 */
declare function PaginationRoot(props: PaginationProps): import("react/jsx-runtime").JSX.Element;
declare namespace PaginationRoot {
    var displayName: string;
}
export declare const Pagination: typeof PaginationRoot & {
    Info: typeof PaginationInfo;
    PageSize: typeof PaginationPageSize;
    Controls: typeof PaginationControls;
    Separator: typeof PaginationSeparator;
};
export { PaginationInfo, PaginationPageSize, PaginationControls, PaginationSeparator, };
//# sourceMappingURL=pagination.d.ts.map