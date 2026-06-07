import { Meter as BaseMeter } from '@base-ui/react/meter';
import { ComponentPropsWithoutRef } from 'react';
/** Meter variant definitions (currently empty, reserved for future additions). */
export declare const KUMO_METER_VARIANTS: {};
export declare const KUMO_METER_DEFAULT_VARIANTS: {};
export interface KumoMeterVariantsProps {
}
export declare function meterVariants(_props?: KumoMeterVariantsProps): string;
type RootProps = ComponentPropsWithoutRef<typeof BaseMeter.Root>;
/**
 * Meter component props.
 *
 * @example
 * ```tsx
 * <Meter label="Storage used" value={65} />
 * <Meter label="API requests" value={75} customValue="750 / 1,000" />
 * ```
 */
export interface MeterProps extends RootProps, KumoMeterVariantsProps {
    /** Custom formatted value text (e.g. "750 / 1,000") displayed instead of percentage. */
    customValue?: string;
    /** Label text displayed above the meter track. */
    label: string;
    /**
     * Whether to display the percentage value next to the label.
     * @default true
     */
    showValue?: boolean;
    /** Additional CSS classes for the track (background bar). */
    trackClassName?: string;
    /** Additional CSS classes for the indicator (filled bar). */
    indicatorClassName?: string;
}
/**
 * Progress bar showing a measured value within a known range (e.g. quota usage).
 *
 * @example
 * ```tsx
 * <Meter label="Storage" value={65} />
 * ```
 */
export declare function Meter({ value, customValue, label, showValue, className, trackClassName, indicatorClassName, ...props }: MeterProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=meter.d.ts.map