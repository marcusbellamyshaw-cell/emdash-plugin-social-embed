import { ReactNode } from 'react';
export interface ResourceListPageProps {
    title?: string;
    description?: string;
    icon?: ReactNode;
    usage?: ReactNode;
    additionalContent?: ReactNode;
    children: ReactNode;
    className?: string;
}
/**
 * ResourceListPage - A layout component for resource list pages
 *
 * Layouts are page-level components that provide consistent structure
 * for common page patterns like resource lists, dashboards, and settings.
 */
export declare function ResourceListPage({ title, description, icon, usage, additionalContent, children, className, }: ResourceListPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=resource-list.d.ts.map