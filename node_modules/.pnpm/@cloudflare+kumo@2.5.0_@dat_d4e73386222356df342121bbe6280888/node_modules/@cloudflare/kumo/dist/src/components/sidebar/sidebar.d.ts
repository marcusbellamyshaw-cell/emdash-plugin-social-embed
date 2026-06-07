import { default as React, ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
/** Sidebar variant definitions mapping layout, collapse, and side options. */
export declare const KUMO_SIDEBAR_VARIANTS: {
    readonly variant: {
        readonly sidebar: {
            readonly classes: "";
            readonly description: "Standard sidebar with border separator";
        };
        readonly floating: {
            readonly classes: "";
            readonly description: "Floating sidebar with shadow and rounded corners";
        };
        readonly inset: {
            readonly classes: "";
            readonly description: "Inset sidebar within the content area";
        };
    };
    readonly collapsible: {
        readonly icon: {
            readonly classes: "";
            readonly description: "Collapses to show icons only";
        };
        readonly offcanvas: {
            readonly classes: "";
            readonly description: "Slides off screen when collapsed";
        };
        readonly none: {
            readonly classes: "";
            readonly description: "Cannot be collapsed";
        };
    };
    readonly side: {
        readonly left: {
            readonly classes: "";
            readonly description: "Left-aligned sidebar";
        };
        readonly right: {
            readonly classes: "";
            readonly description: "Right-aligned sidebar";
        };
    };
};
export declare const KUMO_SIDEBAR_DEFAULT_VARIANTS: {
    readonly variant: "sidebar";
    readonly collapsible: "icon";
    readonly side: "left";
};
export declare const KUMO_SIDEBAR_STYLING: {
    readonly width: {
        readonly expanded: "16.25rem";
        readonly icon: "57px";
    };
    readonly mobile: {
        readonly breakpoint: 768;
    };
};
export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "icon" | "offcanvas" | "none";
export type SidebarState = "expanded" | "collapsed" | "peeking";
export interface SidebarContextValue {
    state: SidebarState;
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
    variant: "sidebar" | "floating" | "inset";
    side: "left" | "right";
    collapsible: "icon" | "offcanvas" | "none";
    width: number;
    resizable: boolean;
    minWidth: number;
    maxWidth: number;
    isResizing: boolean;
    setIsResizing: (resizing: boolean) => void;
    setWidth: (width: number) => void;
    isPeeking: boolean;
    peekable: boolean;
    startPeek: () => void;
    stopPeek: () => void;
    contained: boolean;
    animationDuration: number;
}
/**
 * Hook to access sidebar state and actions from any descendant component.
 *
 * @example
 * ```tsx
 * const { state, open, toggleSidebar, isMobile } = useSidebar();
 * ```
 *
 * @throws Error if used outside a `Sidebar.Provider`.
 */
export declare function useSidebar(): SidebarContextValue;
export interface SidebarProviderProps {
    /** Initial open state when uncontrolled. @default true */
    defaultOpen?: boolean;
    /** Controlled open state. */
    open?: boolean;
    /** Callback when open state changes (controlled mode). */
    onOpenChange?: (open: boolean) => void;
    /** Sidebar layout variant. @default "sidebar" */
    variant?: SidebarVariant;
    /** Which side the sidebar is on. @default "left" */
    side?: SidebarSide;
    collapsible?: "icon" | "offcanvas" | "none";
    /** Enable drag-to-resize on the sidebar edge. @default false */
    resizable?: boolean;
    /** Initial width in pixels when resizable. @default 256 */
    defaultWidth?: number;
    /** Minimum width in pixels when resizing. @default 200 */
    minWidth?: number;
    /** Maximum width in pixels when resizing. @default 480 */
    maxWidth?: number;
    /** Callback when width changes during resize. */
    onWidthChange?: (width: number) => void;
    /**
     * When true, the collapsed sidebar uses absolute positioning instead of fixed,
     * keeping it scoped inside a bounded parent. Useful for demos and embedded sidebars.
     * @default false
     */
    contained?: boolean;
    /**
     * When true, hovering or focusing the collapsed sidebar temporarily expands it.
     * The `state` will be `"peeking"` during the peek. Moving away collapses it back.
     * @default false
     */
    peekable?: boolean;
    /**
     * Duration of sidebar expand/collapse animation in milliseconds.
     * @default 250
     */
    animationDuration?: number;
    /**
     * Viewport width (in px) below which the sidebar renders as a mobile dialog
     * sheet instead of the desktop aside rail.
     * @default 768
     */
    mobileBreakpoint?: number;
    /** Content — typically `<Sidebar>` + main content. */
    children: ReactNode;
    /** Additional CSS classes for the wrapper div. */
    className?: string;
    /** Inline styles for the wrapper div. */
    style?: CSSProperties;
}
declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange: setOpenProp, variant, side, collapsible, resizable, defaultWidth, minWidth, maxWidth, onWidthChange, contained, peekable, animationDuration, mobileBreakpoint, children, className, style, }: SidebarProviderProps): import("react/jsx-runtime").JSX.Element;
declare namespace SidebarProvider {
    var displayName: string;
}
export interface SidebarRootProps extends ComponentPropsWithoutRef<"aside"> {
    /** Additional CSS classes for the sidebar element. */
    className?: string;
    /** Additional CSS classes for the inner content container. */
    contentClassName?: string;
    /** Sidebar content — Header, Content, Footer, etc. */
    children: ReactNode;
}
/**
 * Main sidebar container. Renders as `<aside>` on desktop, modal sidebar sheet on mobile.
 * Must be used inside `Sidebar.Provider`.
 *
 * @example
 * ```tsx
 * <Sidebar.Provider>
 *   <Sidebar>
 *     <Sidebar.Header>...</Sidebar.Header>
 *     <Sidebar.Content>...</Sidebar.Content>
 *     <Sidebar.Footer>...</Sidebar.Footer>
 *   </Sidebar>
 * </Sidebar.Provider>
 * ```
 */
declare const SidebarRoot: React.ForwardRefExoticComponent<SidebarRootProps & React.RefAttributes<HTMLElement>>;
/**
 * Top section of the sidebar. Typically contains a logo, title, and action button.
 *
 * @example
 * ```tsx
 * <Sidebar.Header>
 *   <CloudflareLogo />
 *   <span>Design Engineering</span>
 *   <Button shape="square" icon={CaretUpDownIcon} aria-label="Switch" />
 * </Sidebar.Header>
 * ```
 */
declare const SidebarHeader: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Scrollable middle section of the sidebar. Contains nav groups and menus.
 *
 * @example
 * ```tsx
 * <Sidebar.Content>
 *   <Sidebar.Group>...</Sidebar.Group>
 * </Sidebar.Content>
 * ```
 */
declare const SidebarContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Bottom-pinned section of the sidebar. Rendered outside the peek zone
 * so hovering the footer doesn't trigger a peek. Tracks sidebar width
 * to stay aligned with the content container.
 *
 * @example
 * ```tsx
 * <Sidebar.Footer>
 *   <Sidebar.Trigger />
 * </Sidebar.Footer>
 * ```
 */
declare const SidebarFooter: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Groups related menu items with an optional label.
 *
 * @example
 * ```tsx
 * <Sidebar.Group>
 *   <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
 *   <Sidebar.Menu>...</Sidebar.Menu>
 * </Sidebar.Group>
 * ```
 */
declare const SidebarGroup: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Section label for a sidebar group (e.g., "Build", "Protect & Connect").
 * When the sidebar is collapsed, renders as a thin horizontal divider.
 * When it's the first group, the divider is hidden (nothing above to separate from).
 *
 * @example
 * ```tsx
 * <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
 * ```
 */
declare const SidebarGroupLabel: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Navigation menu list. Renders as `<ul>`.
 *
 * `MenuButton` auto-wraps in `<li>` so `MenuItem` is optional for simple items.
 *
 * @example Simple usage
 * ```tsx
 * <Sidebar.Menu>
 *   <Sidebar.MenuButton icon={HouseIcon} active>Account home</Sidebar.MenuButton>
 *   <Sidebar.MenuButton icon={GlobeIcon}>Domains</Sidebar.MenuButton>
 * </Sidebar.Menu>
 * ```
 *
 * @example With explicit MenuItem (needed for Collapsible wrapper)
 * ```tsx
 * <Sidebar.Menu>
 *   <Sidebar.MenuItem>
 *     <Sidebar.Collapsible>...</Sidebar.Collapsible>
 *   </Sidebar.MenuItem>
 * </Sidebar.Menu>
 * ```
 */
declare const SidebarMenu: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
/**
 * Individual menu list item. Renders as `<li>`.
 *
 * **Optional when using `MenuButton` directly** — `MenuButton` auto-wraps
 * itself in a `<li>` when not already inside a `MenuItem`. Use `MenuItem`
 * explicitly when wrapping a `Collapsible`.
 *
 * @example Explicit usage (wrapping a Collapsible)
 * ```tsx
 * <Sidebar.MenuItem>
 *   <Sidebar.Collapsible>...</Sidebar.Collapsible>
 * </Sidebar.MenuItem>
 * ```
 */
declare const SidebarMenuItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
export type SidebarMenuButtonSize = "base" | "sm";
export interface SidebarMenuButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
    icon?: React.ComponentType<{
        className?: string;
    }> | React.ReactNode;
    active?: boolean;
    /**
     * Button size.
     * - `"base"` — Standard nav item
     * - `"sm"` — Compact nav item
     * @default "base"
     */
    size?: SidebarMenuButtonSize;
    href?: string;
    /** Link target — only meaningful when `href` is provided. */
    target?: React.HTMLAttributeAnchorTarget;
    tooltip?: string;
    className?: string;
    children?: ReactNode;
}
/**
 * Primary interactive element inside a menu item. Renders as a `<button>` or link.
 * Supports icons, active state, and auto-tooltip when the sidebar is collapsed.
 *
 * **Auto-wraps in `<li>`** when not already inside a `Sidebar.MenuItem`.
 * Use `MenuItem` explicitly only when wrapping a `Collapsible`.
 *
 * @example Simple usage (auto-wrapped in `<li>`)
 * ```tsx
 * <Sidebar.Menu>
 *   <Sidebar.MenuButton icon={GlobeIcon} active>Domains</Sidebar.MenuButton>
 *   <Sidebar.MenuButton icon={ClockIcon} href="/recents">Recents</Sidebar.MenuButton>
 * </Sidebar.Menu>
 * ```
 *
 * @example With Collapsible (explicit MenuItem needed)
 * ```tsx
 * <Sidebar.MenuItem>
 *   <Sidebar.Collapsible>
 *     <Sidebar.CollapsibleTrigger render={<Sidebar.MenuButton icon={CodeIcon}>Compute<Sidebar.MenuChevron /></Sidebar.MenuButton>} />
 *     <Sidebar.CollapsibleContent>...</Sidebar.CollapsibleContent>
 *   </Sidebar.Collapsible>
 * </Sidebar.MenuItem>
 * ```
 */
declare const SidebarMenuButton: React.ForwardRefExoticComponent<SidebarMenuButtonProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * Badge pill displayed inside a menu button (e.g., "Beta", "New").
 * Uses dashed border styling matching the Cloudflare design system.
 *
 * @example
 * ```tsx
 * <Sidebar.MenuSubButton>
 *   Containers
 *   <Sidebar.MenuBadge>Beta</Sidebar.MenuBadge>
 * </Sidebar.MenuSubButton>
 * ```
 */
declare const SidebarMenuBadge: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
/**
 * Indented sub-menu container for child navigation items. Renders as `<ul>` with
 * a left border accent for visual hierarchy.
 *
 * `MenuSubButton` auto-wraps in `<li>` so `MenuSubItem` is optional.
 *
 * @example
 * ```tsx
 * <Sidebar.MenuSub>
 *   <Sidebar.MenuSubButton active>Workers & Pages</Sidebar.MenuSubButton>
 *   <Sidebar.MenuSubButton>Durable Objects</Sidebar.MenuSubButton>
 * </Sidebar.MenuSub>
 * ```
 */
declare const SidebarMenuSub: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
/**
 * Individual item inside a sub-menu. Renders as `<li>`.
 *
 * **Optional when using `MenuSubButton` directly** — `MenuSubButton` auto-wraps
 * itself in a `<li>` when not already inside a `MenuSubItem`.
 */
declare const SidebarMenuSubItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
export interface SidebarMenuSubButtonProps extends ComponentPropsWithoutRef<"button"> {
    /** Marks this sub-item as currently active/selected. @default false */
    active?: boolean;
    /** Navigation URL. When set, renders as a link via LinkProvider. */
    href?: string;
}
/**
 * Button inside a sub-menu item. Does not render an icon (sub-items are
 * indented instead). Supports active state and link rendering.
 *
 * **Auto-wraps in `<li>`** when not already inside a `Sidebar.MenuSubItem`.
 *
 * @example Simple usage (auto-wrapped in `<li>`)
 * ```tsx
 * <Sidebar.MenuSub>
 *   <Sidebar.MenuSubButton active>Workers & Pages</Sidebar.MenuSubButton>
 *   <Sidebar.MenuSubButton href="/observability">Observability</Sidebar.MenuSubButton>
 * </Sidebar.MenuSub>
 * ```
 */
declare const SidebarMenuSubButton: React.ForwardRefExoticComponent<SidebarMenuSubButtonProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * Horizontal divider line between sidebar sections.
 */
declare const SidebarSeparator: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Button that toggles the sidebar open/collapsed. Uses `toggleSidebar()` from context.
 * Defaults to an animated `SidebarPanelIcon`.
 *
 * @example
 * ```tsx
 * <Sidebar.Trigger />
 * ```
 */
declare const SidebarTrigger: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
/**
 * Invisible interaction strip at the sidebar edge for click-to-toggle.
 * Renders a thin hover-sensitive area between the sidebar and main content.
 */
declare const SidebarRail: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
/**
 * Drag handle for resizing the sidebar. Renders when `resizable` is true in
 * both expanded and collapsed states.
 *
 * - **Expanded → drag inward past `minWidth`**: auto-collapses to icon-only.
 * - **Collapsed → drag outward past `minWidth`**: auto-expands and begins
 *   tracking width from `minWidth`.
 */
declare const SidebarResizeHandle: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export interface SidebarCollapsibleProps extends ComponentPropsWithoutRef<"div"> {
    /** Initial open state (uncontrolled). @default false */
    defaultOpen?: boolean;
    /** Controlled open state. */
    open?: boolean;
    /** Callback when open state changes. */
    onOpenChange?: (open: boolean) => void;
    /** Scroll the expanded content into view after opening. @default false */
    autoScrollOnOpen?: boolean;
}
/**
 * Collapsible wrapper for sidebar sub-menu expand/collapse.
 * Manages open/close state and provides context to Trigger and Content children.
 *
 * Keyboard behaviour: when a child receives keyboard focus (`focus-visible`)
 * while collapsed, the section auto-expands. It collapses again on blur
 * unless it was explicitly opened via click or a child has `data-active`.
 *
 * @example
 * ```tsx
 * <Sidebar.MenuItem>
 *   <Sidebar.Collapsible defaultOpen>
 *     <Sidebar.CollapsibleTrigger
 *       render={<Sidebar.MenuButton icon={CodeIcon}>Compute<Sidebar.MenuChevron /></Sidebar.MenuButton>}
 *     />
 *     <Sidebar.CollapsibleContent>
 *       <Sidebar.MenuSub>...</Sidebar.MenuSub>
 *     </Sidebar.CollapsibleContent>
 *   </Sidebar.Collapsible>
 * </Sidebar.MenuItem>
 * ```
 */
declare const SidebarCollapsible: React.ForwardRefExoticComponent<SidebarCollapsibleProps & React.RefAttributes<HTMLDivElement>>;
export interface SidebarCollapsibleTriggerProps {
    /** Element to render as the trigger. Gets aria-expanded, aria-controls, and onClick merged. */
    render: React.ReactElement;
}
/**
 * Trigger for a sidebar collapsible section. Uses `render` prop to compose
 * with `Sidebar.MenuButton` or `Sidebar.MenuSubButton`.
 *
 * @example
 * ```tsx
 * <Sidebar.CollapsibleTrigger
 *   render={
 *     <Sidebar.MenuButton icon={CodeIcon}>
 *       Compute
 *       <Sidebar.MenuChevron />
 *     </Sidebar.MenuButton>
 *   }
 * />
 * ```
 */
declare function SidebarCollapsibleTrigger({ render }: SidebarCollapsibleTriggerProps): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
declare namespace SidebarCollapsibleTrigger {
    var displayName: string;
}
/**
 * Animated collapsible content panel. Uses CSS grid-rows for smooth
 * height transitions without measuring DOM height.
 *
 * Always mounted (no unmount on close) so exit animations play.
 */
declare const SidebarCollapsibleContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Auto-rotating chevron for collapsible menu items. Reads open state from
 * the nearest `SidebarCollapseContext` and rotates accordingly.
 *
 * @example
 * ```tsx
 * <Sidebar.CollapsibleTrigger
 *   render={<Sidebar.MenuButton icon={CodeIcon}>Compute<Sidebar.MenuChevron /></Sidebar.MenuButton>}
 * />
 * ```
 */
declare function SidebarMenuChevron({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SidebarMenuChevron {
    var displayName: string;
}
export interface SidebarSlidingViewsProps extends ComponentPropsWithoutRef<"div"> {
    /** Key of the currently active view. Must match a child `SlidingView` value. */
    activeKey: string;
    /**
     * Slide direction for the transition.
     * - `"left"`: new view slides in from the right
     * - `"right"`: new view slides in from the left
     * @default "left"
     */
    direction?: "left" | "right";
}
/**
 * Container for animated horizontal transitions between navigation surfaces
 * (e.g., account ↔ zone). Inactive views are marked `aria-hidden` and `inert`.
 *
 * Animation respects `prefers-reduced-motion`.
 *
 * @example
 * ```tsx
 * <Sidebar.SlidingViews activeKey={surface} direction="left">
 *   <Sidebar.SlidingView value="account">
 *     <Sidebar.Content>...account nav...</Sidebar.Content>
 *   </Sidebar.SlidingView>
 *   <Sidebar.SlidingView value="zone">
 *     <Sidebar.Content>...zone nav...</Sidebar.Content>
 *   </Sidebar.SlidingView>
 * </Sidebar.SlidingViews>
 * ```
 */
declare const SidebarSlidingViews: React.ForwardRefExoticComponent<SidebarSlidingViewsProps & React.RefAttributes<HTMLDivElement>>;
export interface SidebarSlidingViewProps extends ComponentPropsWithoutRef<"div"> {
    /** Unique key matching this view. Must correspond to `activeKey` on `SlidingViews`. */
    value: string;
}
/**
 * Individual panel inside `SlidingViews`. Inactive views are automatically
 * marked `aria-hidden` and `inert` so they're unreachable by keyboard/screen readers.
 */
declare const SidebarSlidingView: React.ForwardRefExoticComponent<SidebarSlidingViewProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Sidebar — responsive navigation panel with expand/collapse support.
 *
 * Compound component: `Sidebar` (root `<aside>`), `.Provider`, `.Header`,
 * `.Content`, `.Footer`, `.Group`, `.GroupLabel`,
 * `.Menu`, `.MenuItem`, `.MenuButton`, `.MenuBadge`,
 * `.MenuSub`, `.MenuSubItem`, `.MenuSubButton`, `.Separator`,
 * `.Trigger`, `.Rail`, `.MenuChevron`,
 * `.Collapsible`, `.CollapsibleTrigger`, `.CollapsibleContent`.
 *
 * @example
 * ```tsx
 * <Sidebar.Provider defaultOpen>
 *   <Sidebar>
 *     <Sidebar.Content>
 *       <Sidebar.Group>
 *         <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
 *         <Sidebar.Menu>
 *           <Sidebar.MenuButton icon={HouseIcon} active>Home</Sidebar.MenuButton>
 *           <Sidebar.MenuButton icon={GlobeIcon}>Domains</Sidebar.MenuButton>
 *         </Sidebar.Menu>
 *       </Sidebar.Group>
 *     </Sidebar.Content>
 *     <Sidebar.Footer>
 *       <Sidebar.Trigger />
 *     </Sidebar.Footer>
 *   </Sidebar>
 * </Sidebar.Provider>
 * ```
 */
export declare const Sidebar: React.ForwardRefExoticComponent<SidebarRootProps & React.RefAttributes<HTMLElement>> & {
    Provider: typeof SidebarProvider;
    Header: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Footer: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Group: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    GroupLabel: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Menu: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
    MenuItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
    MenuButton: React.ForwardRefExoticComponent<SidebarMenuButtonProps & React.RefAttributes<HTMLButtonElement>>;
    MenuBadge: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
    MenuSub: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
    MenuSubItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
    MenuSubButton: React.ForwardRefExoticComponent<SidebarMenuSubButtonProps & React.RefAttributes<HTMLButtonElement>>;
    Separator: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Trigger: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
    Rail: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
    ResizeHandle: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
    MenuChevron: typeof SidebarMenuChevron;
    Collapsible: React.ForwardRefExoticComponent<SidebarCollapsibleProps & React.RefAttributes<HTMLDivElement>>;
    CollapsibleTrigger: typeof SidebarCollapsibleTrigger;
    CollapsibleContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    SlidingViews: React.ForwardRefExoticComponent<SidebarSlidingViewsProps & React.RefAttributes<HTMLDivElement>>;
    SlidingView: React.ForwardRefExoticComponent<SidebarSlidingViewProps & React.RefAttributes<HTMLDivElement>>;
};
export { SidebarProvider, SidebarRoot, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarSeparator, SidebarTrigger, SidebarRail, SidebarResizeHandle, SidebarMenuChevron, SidebarCollapsible, SidebarCollapsibleTrigger, SidebarCollapsibleContent, SidebarSlidingViews, SidebarSlidingView, };
//# sourceMappingURL=sidebar.d.ts.map