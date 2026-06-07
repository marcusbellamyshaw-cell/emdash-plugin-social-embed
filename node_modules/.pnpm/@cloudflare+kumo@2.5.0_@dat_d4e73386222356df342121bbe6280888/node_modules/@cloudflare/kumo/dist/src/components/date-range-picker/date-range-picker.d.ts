/** DateRangePicker size and variant definitions mapping names to their Tailwind classes. */
export declare const KUMO_DATE_RANGE_PICKER_VARIANTS: {
    readonly size: {
        readonly sm: {
            readonly classes: "p-3 gap-2";
            readonly cellHeight: "h-[22px]";
            readonly cellWidth: "w-6";
            readonly calendarWidth: "w-[168px]";
            readonly textSize: "text-xs";
            readonly iconSize: 14;
            readonly description: "Compact calendar for tight spaces";
        };
        readonly base: {
            readonly classes: "p-4 gap-2.5";
            readonly cellHeight: "h-[26px]";
            readonly cellWidth: "w-7";
            readonly calendarWidth: "w-[196px]";
            readonly textSize: "text-sm";
            readonly iconSize: 16;
            readonly description: "Default calendar size";
        };
        readonly lg: {
            readonly classes: "p-5 gap-3";
            readonly cellHeight: "h-[32px]";
            readonly cellWidth: "w-9";
            readonly calendarWidth: "w-[252px]";
            readonly textSize: "text-base";
            readonly iconSize: 18;
            readonly description: "Large calendar for prominent date selection";
        };
    };
    readonly variant: {
        readonly default: {
            readonly classes: "bg-kumo-overlay";
            readonly description: "Default calendar appearance";
        };
        readonly subtle: {
            readonly classes: "bg-kumo-base";
            readonly description: "Subtle calendar with minimal background";
        };
    };
};
export declare const KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS: {
    readonly size: "base";
    readonly variant: "default";
};
export type KumoDateRangePickerSize = keyof typeof KUMO_DATE_RANGE_PICKER_VARIANTS.size;
export type KumoDateRangePickerVariant = keyof typeof KUMO_DATE_RANGE_PICKER_VARIANTS.variant;
export interface KumoDateRangePickerVariantsProps {
    /**
     * Calendar size.
     * - `"sm"` — Compact calendar for tight spaces
     * - `"base"` — Default calendar size
     * - `"lg"` — Large calendar for prominent date selection
     * @default "base"
     */
    size?: KumoDateRangePickerSize;
    /**
     * Visual variant.
     * - `"default"` — Standard appearance with overlay background
     * - `"subtle"` — Minimal background
     * @default "default"
     */
    variant?: KumoDateRangePickerVariant;
}
export declare function dateRangePickerVariants({ size, variant, }?: KumoDateRangePickerVariantsProps): string;
/**
 * DateRangePicker component props.
 *
 * Dual-calendar date range selector with hover preview, timezone display, and reset support.
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   onStartDateChange={(d) => setStart(d)}
 *   onEndDateChange={(d) => setEnd(d)}
 *   timezone="New York, NY, USA (GMT-4)"
 * />
 *
 * // Compact variant
 * <DateRangePicker
 *   size="sm"
 *   variant="subtle"
 *   onStartDateChange={setStart}
 *   onEndDateChange={setEnd}
 * />
 * ```
 *
 * @deprecated Use {@link DatePicker} with `mode="range"` instead.
 */
export interface DateRangePickerProps extends KumoDateRangePickerVariantsProps {
    /** Callback fired when start date changes. Receives `null` on reset. */
    onStartDateChange: (date: Date | null) => void;
    /** Callback fired when end date changes. Receives `null` on reset. */
    onEndDateChange: (date: Date | null) => void;
    /**
     * Display timezone string shown in the footer.
     * @default "New York, NY, USA (GMT-4)"
     */
    timezone?: string;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
}
/**
 * DateRangePicker — dual-calendar date range selector.
 *
 * Renders two side-by-side month calendars with click-to-select start/end dates,
 * hover preview of the range, a timezone footer, and a reset button.
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   onStartDateChange={setStart}
 *   onEndDateChange={setEnd}
 * />
 * ```
 *
 * @deprecated Use {@link DatePicker} with `mode="range"` instead.
 */
export declare function DateRangePicker({ onStartDateChange, onEndDateChange, size, variant, timezone, className, }: DateRangePickerProps): import("react/jsx-runtime").JSX.Element;
/**
 * @deprecated Use {@link DatePicker} with `mode="range"` instead.
 */
export default DateRangePicker;
//# sourceMappingURL=date-range-picker.d.ts.map