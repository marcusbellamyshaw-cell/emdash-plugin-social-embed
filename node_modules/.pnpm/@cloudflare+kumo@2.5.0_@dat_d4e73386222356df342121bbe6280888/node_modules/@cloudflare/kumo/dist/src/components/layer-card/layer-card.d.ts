import { ComponentPropsWithoutRef } from 'react';
import { useRender } from '@base-ui/react/use-render';
/** LayerCard variant definitions (currently empty, reserved for future additions). */
export declare const KUMO_LAYER_CARD_VARIANTS: {};
export declare const KUMO_LAYER_CARD_DEFAULT_VARIANTS: {};
export interface KumoLayerCardVariantsProps {
}
export declare function layerCardVariants(_props?: KumoLayerCardVariantsProps): string;
/**
 * LayerCard component props.
 *
 * @example
 * ```tsx
 * <LayerCard className="p-4">
 *   Get started with Kumo
 * </LayerCard>
 *
 * <LayerCard>
 *   <LayerCard.Secondary>Next Steps</LayerCard.Secondary>
 *   <LayerCard.Primary>Get started with Kumo</LayerCard.Primary>
 * </LayerCard>
 * ```
 */
export type LayerCardProps = useRender.ComponentProps<"div"> & KumoLayerCardVariantsProps;
export type LayerCardSectionProps = ComponentPropsWithoutRef<"div">;
/**
 * Card container for both simple surfaces and layered layouts.
 *
 * Render children directly for a single-surface card, or use
 * `LayerCard.Secondary` and `LayerCard.Primary` for the layered card treatment.
 *
 * @example
 * ```tsx
 * <LayerCard className="rounded-lg p-4">Card content</LayerCard>
 * ```
 *
 * @example
 * ```tsx
 * <LayerCard>
 *   <LayerCard.Secondary>Getting Started</LayerCard.Secondary>
 *   <LayerCard.Primary>Quick start guide</LayerCard.Primary>
 * </LayerCard>
 * ```
 */
declare const LayerCardRoot: import('react').ForwardRefExoticComponent<Omit<LayerCardProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
declare function LayerCardSecondary({ children, className, ...props }: LayerCardSectionProps): import("react/jsx-runtime").JSX.Element;
declare namespace LayerCardSecondary {
    var displayName: string;
}
declare function LayerCardPrimary({ children, className, ...props }: LayerCardSectionProps): import("react/jsx-runtime").JSX.Element;
declare namespace LayerCardPrimary {
    var displayName: string;
}
type LayerCardComponent = typeof LayerCardRoot & {
    Primary: typeof LayerCardPrimary;
    Secondary: typeof LayerCardSecondary;
};
declare const LayerCard: LayerCardComponent;
export { LayerCard };
//# sourceMappingURL=layer-card.d.ts.map