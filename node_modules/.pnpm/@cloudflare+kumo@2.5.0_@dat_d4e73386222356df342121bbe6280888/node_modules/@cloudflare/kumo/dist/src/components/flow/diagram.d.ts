import { ReactNode } from 'react';
import { MotionValue } from 'motion/react';
import { DescendantInfo } from './use-children';
type Orientation = "horizontal" | "vertical";
type Align = "start" | "center";
interface DiagramContextValue {
    orientation: Orientation;
    align: Align;
    x: MotionValue<number>;
    y: MotionValue<number>;
    /** Ref to the canvas viewport wrapper element */
    wrapperRef: React.RefObject<HTMLDivElement | null>;
}
export declare function useDiagramContext(): DiagramContextValue;
interface FlowDiagramProps {
    orientation?: Orientation;
    /**
     * Controls vertical alignment of nodes in horizontal orientation.
     * - `start`: Nodes align to the top (default)
     * - `center`: Nodes are vertically centered
     */
    align?: Align;
    /**
     * Whether to render the pannable canvas wrapper.
     * - `true`: Renders with pannable canvas, scrollbars, and pan gestures (default)
     * - `false`: Renders only the node list without canvas wrapper
     */
    canvas?: boolean;
    /**
     * Padding around the diagram content within the canvas.
     * - `x`: Horizontal padding in pixels (default: 16)
     * - `y`: Vertical padding in pixels (default: 64)
     */
    padding?: {
        x?: number;
        y?: number;
    };
    /**
     * Callback fired when the overflow state changes.
     * Called with `{ x: boolean, y: boolean }` indicating overflow in each axis.
     */
    onOverflowChange?: (overflow: {
        x: boolean;
        y: boolean;
    }) => void;
    className?: string;
    children?: ReactNode;
}
export declare function FlowDiagram({ orientation, align, canvas, padding: requestedPadding, onOverflowChange, className, children, }: FlowDiagramProps): import("react/jsx-runtime").JSX.Element;
export type RectLike = {
    x: number;
    y: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
};
export type NodeData = {
    parallel?: boolean;
    disabled?: boolean;
    start?: RectLike | null;
    end?: RectLike | null;
};
export declare const useNodeGroup: () => {
    register: (id: string, renderOrder: number, props?: NodeData | undefined) => {
        unregister: () => void;
    };
    descendants: DescendantInfo<NodeData>[];
    claimRenderOrder: (id: string) => number;
    measurementEpoch: number;
    notifySizeChange: () => void;
};
export declare const useNode: (props: NodeData, id?: string) => {
    index: number;
    id: string;
    getPrevious: () => DescendantInfo<NodeData> | undefined;
    getNext: () => DescendantInfo<NodeData> | undefined;
};
/**
 * Hook to optionally register as a node if within a parent descendants context.
 * Returns registration info if registered, or null if no parent context exists.
 */
export declare const useOptionalNode: (props: NodeData) => {
    index: number;
    id: string;
} | null;
export declare const getNodeRect: (node: DescendantInfo<NodeData> | undefined, { type }: {
    type?: "start" | "end";
}) => RectLike | null;
export declare function FlowNodeList({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=diagram.d.ts.map