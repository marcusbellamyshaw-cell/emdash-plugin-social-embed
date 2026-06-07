import { ReactNode } from 'react';
import { TabsItem } from '../../components/tabs';
export declare const KUMO_PAGE_HEADER_VARIANTS: {
    readonly spacing: {
        readonly compact: {
            readonly classes: "gap-1";
            readonly description: "Compact spacing between header elements";
        };
        readonly base: {
            readonly classes: "gap-2";
            readonly description: "Default spacing between header elements";
        };
        readonly relaxed: {
            readonly classes: "gap-4";
            readonly description: "Relaxed spacing for more prominent headers";
        };
    };
};
export declare const KUMO_PAGE_HEADER_DEFAULT_VARIANTS: {
    readonly spacing: "base";
};
export type KumoPageHeaderSpacing = keyof typeof KUMO_PAGE_HEADER_VARIANTS.spacing;
export interface KumoPageHeaderVariantsProps {
    spacing?: KumoPageHeaderSpacing;
}
export declare function pageHeaderVariants({ spacing, }?: KumoPageHeaderVariantsProps): string;
export interface PageHeaderProps extends KumoPageHeaderVariantsProps {
    breadcrumbs: ReactNode;
    title?: string;
    description?: string;
    tabs?: TabsItem[];
    defaultTab?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    children?: React.ReactNode;
}
export declare function PageHeader({ breadcrumbs, title, description, tabs, defaultTab, onValueChange, spacing, className, children, }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=page-header.d.ts.map