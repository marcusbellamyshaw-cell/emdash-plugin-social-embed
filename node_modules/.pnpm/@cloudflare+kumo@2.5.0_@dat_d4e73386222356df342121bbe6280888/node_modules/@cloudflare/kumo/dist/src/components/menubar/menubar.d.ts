import { default as React } from 'react';
/** MenuBar variant definitions (currently empty, reserved for future additions). */
export declare const KUMO_MENUBAR_VARIANTS: {};
export declare const KUMO_MENUBAR_DEFAULT_VARIANTS: {};
export interface KumoMenuBarVariantsProps {
}
export declare function menuBarVariants(_props?: KumoMenuBarVariantsProps): string;
/** Props for an individual menu option within a MenuBar. */
type MenuOptionProps = {
    /** Icon element (typically from `@phosphor-icons/react`) rendered at 18px */
    icon: React.ReactNode;
    /** Unique identifier for the option (used when `optionIds` is true) */
    id?: number | string;
    /** Currently active value from the parent MenuBar */
    isActive?: number | boolean | string | undefined;
    /** Callback when this option is clicked */
    onClick: () => void;
    /** Tooltip text shown on hover */
    tooltip: string;
};
/**
 * MenuBar component props.
 *
 * Horizontal icon-button toolbar with keyboard navigation and tooltip labels.
 *
 * @example
 * ```tsx
 * <MenuBar
 *   isActive={activeIndex}
 *   options={[
 *     { icon: <ListIcon />, tooltip: "List view", onClick: () => setView("list") },
 *     { icon: <GridFourIcon />, tooltip: "Grid view", onClick: () => setView("grid") },
 *   ]}
 * />
 * ```
 */
type MenuBarProps = {
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** The currently active option value — matched against option index or `id`. */
    isActive: number | boolean | string | undefined;
    /** Array of menu option configurations. */
    options: MenuOptionProps[];
    /** When true, each option's `id` field is used for matching instead of its array index. */
    optionIds?: boolean;
};
/**
 * MenuBar — horizontal icon-button toolbar with keyboard arrow-key navigation.
 *
 * Each option renders as a `<button>` with a Tooltip. The active option is
 * visually highlighted with an elevated background.
 *
 * @example
 * ```tsx
 * <MenuBar
 *   isActive={0}
 *   options={[
 *     { icon: <ListIcon />, tooltip: "List", onClick: () => {} },
 *     { icon: <GridFourIcon />, tooltip: "Grid", onClick: () => {} },
 *   ]}
 * />
 * ```
 */
export declare const MenuBar: ({ className, isActive, options, optionIds, }: MenuBarProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=menubar.d.ts.map