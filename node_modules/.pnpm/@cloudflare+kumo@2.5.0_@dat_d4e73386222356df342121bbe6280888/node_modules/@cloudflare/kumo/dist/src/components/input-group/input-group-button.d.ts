import { default as React, ReactNode } from 'react';
import { ButtonProps } from '../button/button';
import { KumoTooltipSide } from '../tooltip/tooltip';
export type InputGroupButtonProps = ButtonProps & {
    /**
     * When provided, wraps the button in a `Tooltip` showing this content on hover.
     * Automatically sets `aria-label` from a string value when no `aria-label` is set.
     *
     * @example
     * ```tsx
     * <InputGroup.Addon align="end">
     *   <InputGroup.Button tooltip="Query language help" aria-label="Query language help">
     *     <QuestionIcon size={16} />
     *   </InputGroup.Button>
     * </InputGroup.Addon>
     * ```
     */
    tooltip?: ReactNode;
    /**
     * Preferred side for the tooltip popup.
     * @default "bottom"
     */
    tooltipSide?: KumoTooltipSide;
};
/**
 * Button for secondary actions rendered inside `InputGroup.Addon`
 * (toggle, copy, help).
 *
 * In `focusMode="container"` (default), renders as a compact ghost button
 * subordinate to the input. In `focusMode="individual"`, renders as a full
 * standalone button with its own focus ring, matching toolbar/pagination usage.
 *
 * Pass a `tooltip` prop to show a tooltip on hover.
 */
export declare const Button: React.ForwardRefExoticComponent<React.PropsWithChildren<InputGroupButtonProps> & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=input-group-button.d.ts.map