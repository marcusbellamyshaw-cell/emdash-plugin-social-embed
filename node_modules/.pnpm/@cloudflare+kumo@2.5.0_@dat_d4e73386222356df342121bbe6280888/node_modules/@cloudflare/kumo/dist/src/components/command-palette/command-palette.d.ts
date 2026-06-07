import { Autocomplete } from '@base-ui/react/autocomplete';
import { PortalContainer } from '../../utils/portal-provider';
import { HighlightRange, CommandPaletteRootProps, CommandPaletteInputProps, CommandPaletteListProps, CommandPaletteGroupProps, CommandPaletteGroupLabelProps, CommandPaletteItemProps, CommandPaletteEmptyProps, CommandPaletteLoadingProps, CommandPaletteFooterProps, CommandPaletteResultItemProps } from './types';
/**
 * Props for the Dialog component
 */
interface DialogProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Callback when the open state changes */
    onOpenChange: (open: boolean) => void;
    /**
     * Optional callback when backdrop is clicked.
     * Receives the mouse event for position tracking (e.g., for ripple effects).
     * If not provided, backdrop click calls onOpenChange(false).
     */
    onBackdropClick?: (e: React.MouseEvent) => void;
    /** Child content - typically one or more Panel components */
    children: React.ReactNode;
    /**
     * Container element for the portal. Use this to render the command palette inside
     * a Shadow DOM or custom container. Overrides `KumoPortalProvider` context.
     * @default document.body (or KumoPortalProvider container if set)
     */
    container?: PortalContainer;
}
/**
 * Dialog component - Modal wrapper for command palette content.
 *
 * Use this when you need a dialog that can swap between different Panel contents
 * without re-mounting (e.g., drill-down navigation).
 *
 * @example
 * ```tsx
 * <CommandPalette.Dialog open={open} onOpenChange={setOpen}>
 *   {showDrillDown ? (
 *     <ZonePicker />
 *   ) : (
 *     <CommandPalette.Panel items={results} ...>
 *       ...
 *     </CommandPalette.Panel>
 *   )}
 * </CommandPalette.Dialog>
 * ```
 */
declare function Dialog({ open, onOpenChange, onBackdropClick, children, container: containerProp, }: DialogProps): import("react/jsx-runtime").JSX.Element;
/**
 * Root component - Dialog + Panel combined for simple use cases.
 *
 * For cases where you need to swap content inside the dialog without
 * re-mounting (e.g., drill-down navigation), use Dialog + Panel separately.
 *
 * Keyboard navigation is always enabled:
 * - Arrow keys (up/down) move highlight
 * - Enter selects highlighted item
 * - Cmd/Ctrl+Enter selects with newTab: true
 * - First item is auto-highlighted when results change
 */
declare function Root<TGroup, TItem = TGroup>({ open, onOpenChange, onBackdropClick, children, items, value, onValueChange, onItemHighlighted, itemToStringValue, filter, onSelect, getSelectableItems, container, }: CommandPaletteRootProps<TGroup, TItem>): import("react/jsx-runtime").JSX.Element;
/**
 * Group component - Category grouping
 *
 * Re-export of Autocomplete.Group with default styling.
 */
declare function Group({ children, className, ...props }: CommandPaletteGroupProps & {
    className?: string;
    items?: unknown[];
}): import("react/jsx-runtime").JSX.Element;
/**
 * GroupLabel component - Section header text
 *
 * Re-export of Autocomplete.GroupLabel with styling matching SectionHeader.
 */
declare function GroupLabel({ children, className, }: CommandPaletteGroupLabelProps & {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Item component - Individual result item
 *
 * Re-export of Autocomplete.Item with styling matching SearchResultItem.
 * Note: Use onClick for selection handling, matching the existing CommandPalette pattern.
 */
declare function Item<T>({ value, disabled, children, className, onClick, }: CommandPaletteItemProps<T> & {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Empty component - Empty state when no results
 *
 * Re-export of Autocomplete.Empty with default styling.
 */
declare function Empty({ children }: CommandPaletteEmptyProps): import("react/jsx-runtime").JSX.Element;
/**
 * Loading component - Loading spinner state
 *
 * Centered loading spinner using Kumo Loader.
 */
declare function Loading({ children }: CommandPaletteLoadingProps): import("react/jsx-runtime").JSX.Element;
/**
 * Footer component - Styled container for keyboard hints or other footer content.
 *
 * Children are required - this is just a styled container.
 * Consumers should provide their own keyboard hints with proper i18n.
 */
declare function Footer({ children }: CommandPaletteFooterProps): import("react/jsx-runtime").JSX.Element;
/**
 * HighlightedText - Renders text with highlighted portions based on match indices.
 * Highlighted text is shown with a background color to indicate matches.
 */
declare function HighlightedText({ text, highlights, className, }: {
    text: string;
    highlights?: HighlightRange[];
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * ResultItem - Rich item component with breadcrumbs, highlights, icons, and external indicators.
 *
 * Use this for search result items that need breadcrumb navigation, text highlighting,
 * or external link indicators. For simple items, use Item instead.
 */
declare function ResultItem<T>({ title, breadcrumbs, titleHighlights, breadcrumbHighlights, description, icon, value, onClick, showArrow, external, nonInteractive, }: CommandPaletteResultItemProps<T>): import("react/jsx-runtime").JSX.Element;
/**
 * Props for the Panel component
 */
interface PanelProps<TGroup, TItem = TGroup> {
    /** Child components (Input, List, Footer, etc.) */
    children: React.ReactNode;
    /** Items for the autocomplete */
    items: TGroup[];
    /** Controlled input value */
    value?: string;
    /** Callback when input value changes */
    onValueChange?: (value: string) => void;
    /** Callback when an item is highlighted */
    onItemHighlighted?: (item: TGroup | undefined, details: {
        reason: string;
        event: Event;
        index: number;
    }) => void;
    /** Convert item to string for accessibility */
    itemToStringValue?: (item: TGroup) => string;
    /** Custom filter function */
    filter?: (item: TGroup, query: string) => boolean;
    /** Whether the panel is active/open (for autocomplete state) */
    open?: boolean;
    /** Optional className for the container */
    className?: string;
    /**
     * Callback when an item is selected via Cmd/Ctrl+Enter.
     * Requires getSelectableItems to be provided.
     */
    onSelect?: (item: TItem, options: {
        newTab: boolean;
    }) => void;
    /**
     * Function to get flat list of selectable items from groups.
     * Required when items are grouped and onSelect is used.
     */
    getSelectableItems?: (items: TGroup[]) => TItem[];
}
declare function Panel<TGroup, TItem = TGroup>({ children, items, value, onValueChange, onItemHighlighted, itemToStringValue, filter, open, className, onSelect, getSelectableItems, }: PanelProps<TGroup, TItem>): import("react/jsx-runtime").JSX.Element;
/**
 * PanelInput component - Input that works inside Panel.
 *
 * Similar to Input but designed for use with Panel instead of Root.
 * Automatically wires up Cmd/Ctrl+Enter handling from Panel.
 */
declare function PanelInput({ autoFocus, placeholder, className, onKeyDown: onKeyDownProp, leading, trailing, ...props }: CommandPaletteInputProps): import("react/jsx-runtime").JSX.Element;
/**
 * Render prop iterators - wrap base-ui primitives with cleaner names.
 */
/**
 * Results component - Render prop iterator for groups.
 *
 * Wraps Autocomplete.List with default spacing between groups.
 */
declare function Results({ children, className, }: React.ComponentProps<typeof Autocomplete.List> & {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/** CommandPalette variant definitions (no user-facing variants; structure reserved for future use). */
export declare const KUMO_COMMAND_PALETTE_VARIANTS: {};
export declare const KUMO_COMMAND_PALETTE_DEFAULT_VARIANTS: {};
/**
 * CommandPalette — accessible command palette / spotlight search overlay.
 *
 * Compound component: `CommandPalette.Root` (or `.Dialog` + `.Panel`),
 * `.Input`, `.List`, `.Results`, `.Items`, `.Group`, `.GroupLabel`,
 * `.Item`, `.ResultItem`, `.HighlightedText`, `.Empty`, `.Loading`, `.Footer`.
 *
 * Built on `@base-ui/react/autocomplete` + `@base-ui/react/dialog`.
 *
 * @example
 * ```tsx
 * <CommandPalette.Root
 *   open={open}
 *   onOpenChange={setOpen}
 *   items={results}
 *   value={query}
 *   onValueChange={setQuery}
 *   itemToStringValue={(g) => g.label}
 *   onSelect={(item, { newTab }) => navigate(item, newTab)}
 *   getSelectableItems={(groups) => groups.flatMap((g) => g.items)}
 * >
 *   <CommandPalette.Input placeholder="Search…" />
 *   <CommandPalette.List>
 *     <CommandPalette.Results>
 *       {(group) => (
 *         <CommandPalette.Group items={group.items}>
 *           <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
 *           <CommandPalette.Items>
 *             {(item) => (
 *               <CommandPalette.ResultItem title={item.title} value={item} onClick={…} />
 *             )}
 *           </CommandPalette.Items>
 *         </CommandPalette.Group>
 *       )}
 *     </CommandPalette.Results>
 *     <CommandPalette.Empty>No results found</CommandPalette.Empty>
 *   </CommandPalette.List>
 *   <CommandPalette.Footer>…keyboard hints…</CommandPalette.Footer>
 * </CommandPalette.Root>
 * ```
 */
export declare const CommandPalette: {
    /** Modal dialog wrapper - use with Panel for content that can swap */
    Dialog: typeof Dialog;
    /** Dialog + Panel combined - for simple single-view command palettes */
    Root: typeof Root;
    /** Autocomplete panel without dialog - use inside Dialog for swappable content */
    Panel: typeof Panel;
    /** Input for use inside Panel */
    Input: typeof PanelInput;
    /** Scrollable results container */
    List: import('react').ForwardRefExoticComponent<CommandPaletteListProps & {
        className?: string;
    } & import('react').RefAttributes<HTMLDivElement>>;
    /** Category grouping */
    Group: typeof Group;
    /** Section header text */
    GroupLabel: typeof GroupLabel;
    /** Basic item */
    Item: typeof Item;
    /** Rich item with breadcrumbs, highlights, icons */
    ResultItem: typeof ResultItem;
    /** Text with highlighted portions */
    HighlightedText: typeof HighlightedText;
    /** Empty state */
    Empty: typeof Empty;
    /** Loading state */
    Loading: typeof Loading;
    /** Footer for keyboard hints */
    Footer: typeof Footer;
    /** Render prop iterator for groups */
    Results: typeof Results;
    /** Render prop iterator for items within a group */
    Items: typeof Autocomplete.Collection;
};
export {};
//# sourceMappingURL=command-palette.d.ts.map