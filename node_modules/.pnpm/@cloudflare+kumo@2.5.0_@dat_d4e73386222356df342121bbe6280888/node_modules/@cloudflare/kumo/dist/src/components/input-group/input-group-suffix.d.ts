import { ReactNode } from 'react';
export interface InputGroupSuffixProps {
    /** Additional CSS classes. */
    className?: string;
    /** Suffix content (e.g., ".workers.dev"). */
    children?: ReactNode;
}
/**
 * Inline suffix that flows seamlessly next to the typed input value.
 * Input width adjusts automatically via CSS `field-sizing: content`.
 */
export declare const Suffix: import('react').ForwardRefExoticComponent<InputGroupSuffixProps & import('react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=input-group-suffix.d.ts.map