import { ReactNode } from 'react';
export interface Connector {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    isBottom?: boolean;
    disabled?: boolean;
    single?: boolean;
    /** Id of the source node this connector originates from. */
    fromId?: string;
    /** Id of the target node this connector points to. */
    toId?: string;
}
type PathProps = Partial<{
    cornerRadius: number;
    midOffset: number;
    arrowheadOffset: number;
    isBottom: boolean;
    single: boolean;
    orientation: "vertical" | "horizontal";
}>;
export declare function createRoundedPath({ x1, y1, x2, y2 }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}, { cornerRadius: maxCornerRadius, midOffset, arrowheadOffset, isBottom, single, orientation, }?: PathProps): string;
export declare const Connectors: import('react').ForwardRefExoticComponent<{
    connectors: Connector[];
    children?: ReactNode;
} & Omit<Partial<{
    cornerRadius: number;
    midOffset: number;
    arrowheadOffset: number;
    isBottom: boolean;
    single: boolean;
    orientation: "vertical" | "horizontal";
}>, "single" | "isBottom"> & import('react').RefAttributes<SVGSVGElement>>;
export {};
//# sourceMappingURL=connectors.d.ts.map