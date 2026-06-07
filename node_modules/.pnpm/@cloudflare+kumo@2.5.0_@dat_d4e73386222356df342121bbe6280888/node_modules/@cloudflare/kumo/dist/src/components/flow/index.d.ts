import { FlowDiagram, FlowNodeList } from './diagram';
import { FlowParallelNode } from './parallel';
/**
 * Flow - Components for visualizing workflows and data flows.
 *
 * @example
 * ```tsx
 * <Flow>
 *   <Flow.Node>Step 1</Flow.Node>
 *   <Flow.Node>Step 2</Flow.Node>
 *   <Flow.Parallel>
 *     <Flow.Node>Branch A</Flow.Node>
 *     <Flow.Node>Branch B</Flow.Node>
 *   </Flow.Parallel>
 *   <Flow.Node>Step 3</Flow.Node>
 * </Flow>
 * ```
 */
declare const Flow: typeof FlowDiagram & {
    Node: import('react').ForwardRefExoticComponent<import('./node').FlowNodeProps & import('react').RefAttributes<HTMLElement>>;
    Parallel: typeof FlowParallelNode;
    List: typeof FlowNodeList;
    Anchor: import('react').ForwardRefExoticComponent<import('./node').FlowAnchorProps & import('react').RefAttributes<HTMLElement>>;
};
export { Flow };
//# sourceMappingURL=index.d.ts.map