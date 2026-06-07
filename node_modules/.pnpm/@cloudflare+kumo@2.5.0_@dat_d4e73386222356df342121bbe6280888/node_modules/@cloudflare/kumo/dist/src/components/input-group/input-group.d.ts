import { PropsWithChildren } from 'react';
import { InputGroupRootPropsInternal } from './context';
export { type InputGroupRootProps } from './context';
export { type InputGroupInputProps } from './input-group-input';
export { type InputGroupButtonProps } from './input-group-button';
export { type InputGroupAddonProps } from './input-group-addon';
export { type InputGroupSuffixProps } from './input-group-suffix';
export declare const KUMO_INPUT_GROUP_VARIANTS: {
    readonly size: {
        readonly xs: {
            readonly classes: "h-6 text-xs";
            readonly description: "Extra small size.";
        };
        readonly sm: {
            readonly classes: "h-7 text-xs";
            readonly description: "Small size.";
        };
        readonly base: {
            readonly classes: "h-9 text-base";
            readonly description: "Default size.";
        };
        readonly lg: {
            readonly classes: "h-11 text-base";
            readonly description: "Large size.";
        };
    };
};
export declare const KUMO_INPUT_GROUP_DEFAULT_VARIANTS: {
    readonly size: "base";
};
export declare const InputGroup: import('react').ForwardRefExoticComponent<InputGroupRootPropsInternal & {
    children?: import('react').ReactNode | undefined;
} & import('react').RefAttributes<HTMLElement>> & {
    Input: import('react').ForwardRefExoticComponent<import('./input-group-input').InputGroupInputProps & import('react').RefAttributes<HTMLInputElement>>;
    Button: import('react').ForwardRefExoticComponent<PropsWithChildren<import('./input-group-button').InputGroupButtonProps> & import('react').RefAttributes<HTMLButtonElement>>;
    Addon: import('react').ForwardRefExoticComponent<import('./input-group-addon').InputGroupAddonProps & import('react').RefAttributes<HTMLDivElement>>;
    Suffix: import('react').ForwardRefExoticComponent<import('./input-group-suffix').InputGroupSuffixProps & import('react').RefAttributes<HTMLDivElement>>;
    /** @deprecated Use `InputGroup.Addon` instead. */
    Label: import('react').ForwardRefExoticComponent<Omit<import('./input-group-addon').InputGroupAddonProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
    /** @deprecated Use `InputGroup.Suffix` instead. */
    Description: import('react').ForwardRefExoticComponent<Omit<import('./input-group-suffix').InputGroupSuffixProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
};
//# sourceMappingURL=input-group.d.ts.map