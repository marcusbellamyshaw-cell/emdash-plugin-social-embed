import { CheckboxChangeEventDetails } from '../checkbox';
/** Table layout and row variant definitions mapping names to their Tailwind classes. */
export declare const KUMO_TABLE_VARIANTS: {
    readonly layout: {
        readonly auto: {
            readonly classes: "";
            readonly description: "Auto table layout - columns resize based on content";
        };
        readonly fixed: {
            readonly classes: "table-fixed";
            readonly description: "Fixed table layout - columns have equal width, controlled via colgroup";
        };
    };
    readonly variant: {
        readonly default: {
            readonly classes: "";
            readonly description: "Default row variant";
        };
        readonly selected: {
            readonly classes: "bg-kumo-tint";
            readonly description: "Selected row variant";
        };
    };
    readonly sticky: {
        readonly left: {
            readonly classes: "sticky left-0";
            readonly description: "Pin column to the left edge of the scroll container";
        };
        readonly right: {
            readonly classes: "sticky right-0";
            readonly description: "Pin column to the right edge of the scroll container";
        };
    };
};
export type KumoTableStickyColumn = keyof typeof KUMO_TABLE_VARIANTS.sticky;
export declare const KUMO_TABLE_DEFAULT_VARIANTS: {
    readonly layout: "auto";
    readonly variant: "default";
};
export type KumoTableRowVariant = keyof typeof KUMO_TABLE_VARIANTS.variant;
export type KumoTableLayout = keyof typeof KUMO_TABLE_VARIANTS.layout;
/**
 * Table — semantic HTML table with styled rows, cells, and selection support.
 *
 * Compound component: `Table` (Root), `.Header`, `.Head`, `.Body`, `.Row`,
 * `.Cell`, `.Footer`, `.CheckCell`, `.CheckHead`, `.ResizeHandle`.
 *
 * @example
 * ```tsx
 * <Table>
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.CheckHead checked={allSelected} onCheckedChange={toggleAll} />
 *       <Table.Head>Name</Table.Head>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     {rows.map((row) => (
 *       <Table.Row key={row.id} variant={selected.has(row.id) ? "selected" : "default"}>
 *         <Table.CheckCell checked={selected.has(row.id)} onCheckedChange={() => toggle(row.id)} />
 *         <Table.Cell>{row.name}</Table.Cell>
 *       </Table.Row>
 *     ))}
 *   </Table.Body>
 * </Table>
 * ```
 */
export declare const Table: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLTableElement> & {
    /**
     * Table layout algorithm.
     * - `"auto"` — columns resize based on content
     * - `"fixed"` — equal-width columns, controlled via `<colgroup>`
     * @default "auto"
     */
    layout?: KumoTableLayout;
} & import('react').RefAttributes<HTMLTableElement>> & {
    Header: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLTableSectionElement> & {
        variant?: "default" | "compact";
        /**
         * Make the header row stick to the top of the scroll container.
         * Requires the table's parent to have a constrained height with
         * `overflow-y: auto`.
         */
        sticky?: boolean;
    } & import('react').RefAttributes<HTMLTableSectionElement>>;
    Head: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLTableCellElement> & {
        /**
         * Pin this header cell to the left or right edge of the scroll container.
         * Adds `position: sticky`, an opaque background, and a gradient fade on the
         * inner edge. Sticky header columns render at `z-2` so they sit above both
         * normal cells and sticky body cells (`z-1`).
         */
        sticky?: KumoTableStickyColumn;
    } & import('react').RefAttributes<HTMLTableCellElement>>;
    Row: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLTableRowElement> & {
        variant?: KumoTableRowVariant;
    } & import('react').RefAttributes<HTMLTableRowElement>>;
    Body: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLTableSectionElement> & import('react').RefAttributes<HTMLTableSectionElement>>;
    Cell: import('react').ForwardRefExoticComponent<import('react').TdHTMLAttributes<HTMLTableCellElement> & {
        /**
         * Pin this cell to the left or right edge of the scroll container.
         * Adds `position: sticky`, an opaque background, and a gradient fade on
         * the inner edge. Requires the table's parent to have `overflow-x: auto`.
         */
        sticky?: KumoTableStickyColumn;
    } & import('react').RefAttributes<HTMLTableCellElement>>;
    CheckCell: import('react').ForwardRefExoticComponent<import('react').TdHTMLAttributes<HTMLTableCellElement> & {
        checked?: boolean;
        indeterminate?: boolean;
        /**
         * Called when the checkbox's checked state changes. The optional second
         * argument exposes event details from the underlying Checkbox, matching
         * the Checkbox component's signature.
         */
        onCheckedChange?: (checked: boolean, eventDetails?: CheckboxChangeEventDetails) => void;
        /** @deprecated Use `onCheckedChange` instead. Will be removed in a future major version. */
        onValueChange?: (checked: boolean) => void;
        label?: string;
        disabled?: boolean;
    } & import('react').RefAttributes<HTMLTableCellElement>>;
    CheckHead: import('react').ForwardRefExoticComponent<import('react').ThHTMLAttributes<HTMLTableCellElement> & {
        checked?: boolean;
        indeterminate?: boolean;
        /**
         * Called when the checkbox's checked state changes. The optional second
         * argument exposes event details from the underlying Checkbox, matching
         * the Checkbox component's signature.
         */
        onCheckedChange?: (checked: boolean, eventDetails?: CheckboxChangeEventDetails) => void;
        /** @deprecated Use `onCheckedChange` instead. Will be removed in a future major version. */
        onValueChange?: (checked: boolean) => void;
        label?: string;
        disabled?: boolean;
    } & import('react').RefAttributes<HTMLTableCellElement>>;
    Footer: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLTableSectionElement> & import('react').RefAttributes<HTMLTableSectionElement>>;
    ResizeHandle: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLButtonElement> & import('react').RefAttributes<HTMLButtonElement>>;
};
//# sourceMappingURL=table.d.ts.map