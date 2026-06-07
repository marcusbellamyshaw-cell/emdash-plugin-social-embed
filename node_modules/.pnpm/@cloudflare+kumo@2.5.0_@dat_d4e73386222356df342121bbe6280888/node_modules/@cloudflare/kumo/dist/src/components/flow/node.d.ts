import { ReactElement, ReactNode } from 'react';
/**
 * FlowNode component props.
 *
 * @example Default styling
 * ```tsx
 * <Flow.Node>Step 1</Flow.Node>
 * ```
 *
 * @example Custom render - completely replaces the default element
 * ```tsx
 * <Flow.Node render={<div className="custom-node">Custom content</div>} />
 * ```
 */
export type FlowNodeProps = {
    /**
     * Optional identifier for the node. When provided, used as the
     * `data-node-id` attribute instead of the auto-generated React id.
     */
    id?: string;
    /**
     * Custom element to render instead of the default styled node.
     * When provided, completely replaces the default element.
     */
    render?: ReactElement;
    children?: ReactNode;
    /**
     * When true, any connector linking to this node will be greyed out.
     */
    disabled?: boolean;
};
export declare const FlowNode: import('react').ForwardRefExoticComponent<FlowNodeProps & import('react').RefAttributes<HTMLElement>>;
/**
 * FlowAnchor component props.
 *
 * @example Default (unstyled div)
 * ```tsx
 * <Flow.Anchor type="start">Anchor content</Flow.Anchor>
 * ```
 *
 * @example Custom render - completely replaces the default element
 * ```tsx
 * <Flow.Anchor type="end" render={<span className="custom-anchor">Custom anchor</span>} />
 * ```
 */
export type FlowAnchorProps = {
    /**
     * Determines if the anchor should serve as a "start" point for the
     * _next_ connector or the "end" point for the _previous_ connector.
     * When omitted, it serves as both the start and end points.
     */
    type?: "start" | "end";
    /**
     * Custom element to render instead of the default div.
     * When provided, completely replaces the default element.
     */
    render?: ReactElement;
    children?: ReactNode;
};
export declare const FlowAnchor: import('react').ForwardRefExoticComponent<FlowAnchorProps & import('react').RefAttributes<HTMLElement>>;
//# sourceMappingURL=node.d.ts.map