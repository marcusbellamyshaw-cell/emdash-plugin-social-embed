import { ReactNode } from 'react';
type FlowParallelNodeProps = {
    children: ReactNode;
    /**
     * Controls alignment of nodes within the parallel group.
     * - `start`: Nodes align to the left (default)
     * - `end`: Nodes align to the right
     */
    align?: "start" | "end";
};
export declare function FlowParallelNode({ children, align, }: FlowParallelNodeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=parallel.d.ts.map