import { AnchorHTMLAttributes, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
type LinkComponentProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    /**
     * @deprecated Use `href` instead. The `to` prop is a routing-framework concept
     * (e.g. React Router) that does not belong on a presentational component.
     *
     * If your application uses a client-side router, configure the `LinkProvider`
     * with a wrapper component that maps `href` to your router's navigation prop:
     *
     * ```tsx
     * const AppLink = forwardRef(({ href, ...rest }, ref) => (
     *   <ReactRouterLink ref={ref} to={href} {...rest} />
     * ));
     *
     * <LinkProvider component={AppLink}>
     *   <App />
     * </LinkProvider>
     * ```
     */
    to?: string;
};
type ForwardLinkComponent = ForwardRefExoticComponent<LinkComponentProps & RefAttributes<HTMLAnchorElement>>;
export declare function useLinkComponent(): ForwardLinkComponent;
/**
 * Provides a custom link component for all Kumo Link instances in the tree.
 *
 * Use this to integrate framework-specific routing (React Router, Next.js, etc.)
 * while keeping Kumo's Link component framework-agnostic.
 *
 * Your custom component receives standard anchor props (including `href`) and
 * is responsible for bridging to your router's API:
 *
 * @example React Router integration
 * ```tsx
 * import { Link as ReactRouterLink } from "react-router-dom";
 *
 * const AppLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(
 *   ({ href, ...rest }, ref) => (
 *     <ReactRouterLink ref={ref} to={href ?? ""} {...rest} />
 *   ),
 * );
 *
 * <LinkProvider component={AppLink}>
 *   <App />
 * </LinkProvider>
 * ```
 *
 * @example Next.js integration
 * ```tsx
 * import NextLink from "next/link";
 *
 * const AppLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(
 *   (props, ref) => <NextLink ref={ref} {...props} />,
 * );
 *
 * <LinkProvider component={AppLink}>
 *   <App />
 * </LinkProvider>
 * ```
 */
export declare function LinkProvider({ component, children, }: {
    component?: ForwardLinkComponent;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export type { LinkComponentProps };
//# sourceMappingURL=link-provider.d.ts.map