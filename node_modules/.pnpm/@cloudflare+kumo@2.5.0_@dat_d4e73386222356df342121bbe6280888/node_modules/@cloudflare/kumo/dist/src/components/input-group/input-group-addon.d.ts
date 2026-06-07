import { ReactNode } from 'react';
export interface InputGroupAddonProps {
    /** Position relative to the input. @default "start" */
    align?: "start" | "end";
    /** Additional CSS classes. */
    className?: string;
    /** Addon content: icons, buttons, spinners, text. */
    children?: ReactNode;
}
/**
 * Container for icons, text, or compact buttons positioned at the start or end
 * of the input. Automatically sizes icon children to match the input size.
 */
export declare const Addon: import('react').ForwardRefExoticComponent<InputGroupAddonProps & import('react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=input-group-addon.d.ts.map