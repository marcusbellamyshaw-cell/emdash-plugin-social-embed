import { ReactNode } from 'react';
import { TabsTab } from '@base-ui/react/tabs';
/** Tabs variant definitions. */
export declare const KUMO_TABS_VARIANTS: {
    readonly variant: readonly ["segmented", "underline"];
    readonly size: readonly ["base", "sm"];
};
export declare const KUMO_TABS_DEFAULT_VARIANTS: {
    readonly variant: "segmented";
    readonly size: "base";
};
export declare const KUMO_TABS_STYLING: {
    readonly container: {
        readonly height: 34;
        readonly borderRadius: 8;
        readonly background: "color-accent";
        readonly padding: 1;
    };
    readonly tab: {
        readonly paddingX: 10;
        readonly verticalMargin: 1;
        readonly fontSize: 16;
        readonly fontWeight: 500;
        readonly borderRadius: 8;
        readonly activeColor: "text-color-surface";
        readonly inactiveColor: "text-color-label";
    };
    readonly indicator: {
        readonly background: "color-surface-secondary";
        readonly ring: "color-color-2";
        readonly borderRadius: 6;
        readonly shadow: "shadow-sm";
    };
};
export interface KumoTabsVariantsProps {
    /**
     * Tab style.
     * - `"segmented"` — Pill-shaped indicator on a filled track
     * - `"underline"` — Underline indicator below tab text
     * @default "segmented"
     */
    variant?: (typeof KUMO_TABS_VARIANTS.variant)[number];
    /**
     * Tab size.
     * - `"base"` — Default size (h-9, text-base)
     * - `"sm"` — Compact size (h-6.5, text-xs) — matches Input size="sm"
     * @default "base"
     */
    size?: (typeof KUMO_TABS_VARIANTS.size)[number];
}
/** Configuration for a single tab within the Tabs component. */
export type TabsItem = {
    /** Unique identifier for the tab, used as the controlled value. */
    value: string;
    /** Display content for the tab trigger. */
    label: ReactNode;
    /** Additional CSS classes for this tab trigger. */
    className?: string;
    /**
     * Custom render function or element to replace the tab element (e.g. for link-based tabs).
     * When using a function, it receives the props to spread on the element and the tab's state.
     */
    render?: TabsTab.Props["render"];
};
/**
 * Tabs component props.
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { value: "overview", label: "Overview" },
 *     { value: "settings", label: "Settings" },
 *   ]}
 *   value={activeTab}
 *   onValueChange={setActiveTab}
 * />
 * ```
 */
export type TabsProps = KumoTabsVariantsProps & {
    /** Array of tab items to render. */
    tabs?: TabsItem[];
    /** Controlled value. When set, component becomes controlled. */
    value?: string;
    /** Default selected value for uncontrolled mode. Ignored when `value` is set. */
    selectedValue?: string;
    /** Callback fired when the active tab changes. */
    onValueChange?: (value: string) => void;
    /**
     * When `true`, tabs are activated immediately upon receiving focus via arrow keys.
     * When `false` (default), tabs receive focus but require Enter/Space to activate.
     */
    activateOnFocus?: boolean;
    /** Additional CSS classes for the root element. */
    className?: string;
    /** Additional CSS classes for the tab list element. */
    listClassName?: string;
    /** Additional CSS classes for the indicator element. */
    indicatorClassName?: string;
};
/**
 * Tab navigation component with segmented or underline style.
 * Built on Base UI Tabs with animated active indicator.
 *
 * @example
 * ```tsx
 * <Tabs
 *   variant="segmented"
 *   tabs={[{ value: "tab1", label: "Tab 1" }, { value: "tab2", label: "Tab 2" }]}
 *   value={active}
 *   onValueChange={setActive}
 * />
 * ```
 */
export declare function Tabs({ tabs, value, selectedValue, onValueChange, activateOnFocus, className, listClassName, indicatorClassName, variant, size, }: TabsProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=tabs.d.ts.map