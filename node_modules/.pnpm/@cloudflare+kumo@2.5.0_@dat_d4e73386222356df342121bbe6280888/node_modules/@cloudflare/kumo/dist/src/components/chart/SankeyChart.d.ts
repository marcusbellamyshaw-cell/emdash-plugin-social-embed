import type * as echarts from "echarts/core";
export interface SankeyNodeData {
    id?: string;
    name: string;
    color?: string;
    /** Optional value/count to display above the node label */
    value?: number;
    /** Additional data to show in tooltip (e.g., { Apps: 166, Sessions: 122600 }) */
    tooltipData?: Record<string, number | string>;
    isDrillable?: boolean;
    childCount?: number;
}
export interface SankeyLinkData {
    id?: string;
    source: number;
    target: number;
    value: number;
    isDrillable?: boolean;
}
export type DrillTarget = {
    type: "node";
    nodeId: string;
} | {
    type: "link";
    sourceId: string;
    targetId: string;
};
export interface DrillSelection {
    id: string;
    type: "node" | "link";
    label: string;
    depth: number;
}
export interface DrillDownContext {
    selections: DrillSelection[];
    isMultiSelect: boolean;
}
export interface SankeyData {
    nodes: SankeyNodeData[];
    links: SankeyLinkData[];
}
/** Parameters passed to the tooltip formatter */
export interface SankeyTooltipParams {
    type: "node" | "link";
    name: string;
    node?: SankeyNodeData;
    link?: {
        source: string;
        target: string;
        value: number;
    };
    color?: string;
}
export interface SankeyChartProps {
    /**
     * The ECharts core instance imported by the consumer.
     * Passed in rather than imported directly so the consumer controls which
     * ECharts modules are bundled (tree-shaking).
     */
    echarts: typeof echarts;
    /** Array of nodes in the Sankey diagram */
    nodes: SankeyNodeData[];
    /** Array of links connecting nodes by index */
    links: SankeyLinkData[];
    /** Height of the chart in pixels */
    height?: number;
    /** Show node values above labels (default: true if any node has a value) */
    showNodeValues?: boolean;
    /** Layout for node labels when showNodeValues is true.
     * - 'stacked': value on top, name below (default)
     * - 'inline': "value name" on a single line (better for small nodes)
     */
    nodeLabelLayout?: "stacked" | "inline";
    /** Format function for node values (default: toLocaleString) */
    formatValue?: (value: number) => string;
    /** Custom tooltip formatter. Return HTML string or empty string to hide tooltip. */
    tooltipFormatter?: (params: SankeyTooltipParams) => string;
    nodeWidth?: number;
    nodePadding?: number;
    showTooltip?: boolean;
    defaultNodeColor?: string;
    /** Left padding of the Sankey layout within the chart container. Accepts a number (px) or percentage string. ECharts default: '5%'. */
    left?: number | string;
    /** Right padding of the Sankey layout within the chart container. Accepts a number (px) or percentage string. ECharts default: '5%'. */
    right?: number | string;
    /** Link fill style: 'gradient' blends source to target colors, 'gray' uses flat gray */
    linkColor?: "gradient" | "gray";
    linkOpacity?: number;
    className?: string;
    isDarkMode?: boolean;
    onNodeClick?: (node: SankeyNodeData) => void;
    onLinkClick?: (link: SankeyLinkData) => void;
}
export declare function SankeyChart({ echarts, nodes, links, height, nodeWidth, nodePadding, showTooltip: enableTooltip, showNodeValues, nodeLabelLayout, formatValue, tooltipFormatter, defaultNodeColor, left, right, linkColor, linkOpacity, className, isDarkMode, onNodeClick, onLinkClick, }: SankeyChartProps): import("react/jsx-runtime").JSX.Element;
export declare namespace SankeyChart {
    var displayName: string;
}
//# sourceMappingURL=SankeyChart.d.ts.map