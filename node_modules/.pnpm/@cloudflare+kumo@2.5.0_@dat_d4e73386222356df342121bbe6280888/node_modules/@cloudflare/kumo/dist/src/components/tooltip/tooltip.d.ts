import { Tooltip as TooltipBase } from '@base-ui/react/tooltip';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { PortalContainer } from '../../utils/portal-provider';
/** Tooltip side variant definitions mapping positions to their Tailwind classes. */
export declare const KUMO_TOOLTIP_VARIANTS: {
    readonly side: {
        readonly top: {
            readonly classes: "";
            readonly description: "Tooltip appears above the trigger";
        };
        readonly bottom: {
            readonly classes: "";
            readonly description: "Tooltip appears below the trigger";
        };
        readonly left: {
            readonly classes: "";
            readonly description: "Tooltip appears to the left of the trigger";
        };
        readonly right: {
            readonly classes: "";
            readonly description: "Tooltip appears to the right of the trigger";
        };
    };
};
export declare const KUMO_TOOLTIP_DEFAULT_VARIANTS: {
    readonly side: "top";
};
export type KumoTooltipSide = keyof typeof KUMO_TOOLTIP_VARIANTS.side;
export interface KumoTooltipVariantsProps {
    /**
     * Preferred side of the trigger to render the tooltip.
     * - `"top"` — Tooltip appears above the trigger
     * - `"bottom"` — Tooltip appears below the trigger
     * - `"left"` — Tooltip appears to the left of the trigger
     * - `"right"` — Tooltip appears to the right of the trigger
     * @default "top"
     */
    side?: KumoTooltipSide;
}
export declare function tooltipVariants({ side, }?: KumoTooltipVariantsProps): string;
export declare const TooltipProvider: import('react').FC<import('@base-ui/react').TooltipProviderProps>;
type BaseTooltipProps = ComponentPropsWithoutRef<typeof TooltipBase.Root>;
type TriggerProps = ComponentPropsWithoutRef<typeof TooltipBase.Trigger>;
/** Alignment options for tooltip positioning. Source: PositionerProps["align"] */
type TooltipAlign = "start" | "center" | "end";
/**
 * Tooltip component props.
 *
 * @example
 * ```tsx
 * <Tooltip content="Add new item" render={<Button shape="square" icon={PlusIcon} />}>
 *   Add
 * </Tooltip>
 * ```
 */
export type TooltipProps = BaseTooltipProps & KumoTooltipVariantsProps & {
    /**
     * Alignment on the axis perpendicular to `side`.
     * - `"start"` — Align to the start edge
     * - `"center"` — Center-aligned
     * - `"end"` — Align to the end edge
     */
    align?: TooltipAlign;
    /**
     * @deprecated Use the `render` prop instead.
     * @example `<Tooltip render={<Button />}>Label</Tooltip>` instead of `<Tooltip asChild><Button>Label</Button></Tooltip>`
     */
    asChild?: boolean;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** Content to display inside the tooltip popup. */
    content: ReactNode;
    /**
     * Container element for the portal. Use this to render the tooltip inside
     * a Shadow DOM or custom container. Overrides `KumoPortalProvider` context.
     * @default document.body (or KumoPortalProvider container if set)
     */
    container?: PortalContainer;
    /**
     * How long to wait before closing the tooltip. Specified in milliseconds.
     * @default 0
     */
    closeDelay?: number;
    /**
     * How long to wait before opening the tooltip. Specified in milliseconds.
     * @default 600
     */
    delay?: number;
    /**
     * Element to render as the tooltip trigger. Children are passed to this element.
     * @example `<Tooltip content="Save" render={<Button />}>Save</Tooltip>`
     */
    render?: TriggerProps["render"];
};
/**
 * Accessible popup that shows additional information on hover/focus.
 * Wrap your app or section with `<TooltipProvider>` to enable delay grouping.
 *
 * @example
 * ```tsx
 * <Tooltip content="Save changes" render={<Button variant="primary" />}>
 *   Save
 * </Tooltip>
 * ```
 */
export declare function Tooltip({ content, children, align, asChild, render, side, className, container: containerProp, closeDelay, delay, ...props }: TooltipProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=tooltip.d.ts.map