import { ReactNode } from 'react';
export type DescendantInfo<T = Record<string, unknown>> = {
    id: string;
    props: T;
    renderOrder: number;
};
type DescendantsContextType<DescendantType = Record<string, unknown>> = {
    register: (id: string, renderOrder: number, props?: DescendantType) => {
        unregister: () => void;
    };
    descendants: DescendantInfo<DescendantType>[];
    claimRenderOrder: (id: string) => number;
    /**
     * Counter that increments whenever any descendant registers, unregisters, or
     * reports a size change. Nodes can depend on this value to know when they
     * should remeasure their `getBoundingClientRect`.
     */
    measurementEpoch: number;
    /**
     * Call this when a node's own size changes (e.g. from a ResizeObserver) so
     * that sibling nodes know to remeasure their positions.
     */
    notifySizeChange: () => void;
};
/**
 * Hook that manages descendant registration and provides access to all registered descendants.
 * This hook contains all the logic for tracking and managing descendants.
 *
 * @returns The descendants context value with register function and descendants array
 */
export declare function useDescendants<DescendantType extends Record<string, unknown>>(): DescendantsContextType<DescendantType>;
type DescendantsProviderProps<T extends Record<string, unknown>> = {
    value: DescendantsContextType<T>;
    children: ReactNode;
};
export declare function DescendantsProvider<T extends Record<string, unknown>>({ value, children, }: DescendantsProviderProps<T>): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access the descendants context from within a DescendantsProvider.
 * This allows callers to access the descendants data and register function.
 *
 * @returns The descendants context value
 * @throws Error if used outside of DescendantsProvider
 */
export declare function useDescendantsContext<T extends Record<string, unknown>>(): DescendantsContextType<T>;
/**
 * Hook to optionally access the descendants context.
 * Returns null if not within a DescendantsProvider (does not throw).
 *
 * @returns The descendants context value or null
 */
export declare function useOptionalDescendantsContext<T extends Record<string, unknown>>(): DescendantsContextType<T> | null;
/**
 * Hook that allows a descendant component to register itself with a parent
 * and returns the index of the descendant in the parent's list.
 *
 * @example
 * ```tsx
 * function Parent() {
 *   return (
 *     <DescendantsProvider>
 *       <Descendant />
 *       <Descendant />
 *       <Descendant />
 *     </DescendantsProvider>
 *   );
 * }
 *
 * function Descendant() {
 *   const index = useDescendantIndex();
 *   return <div>I am descendant {index}</div>;
 * }
 *
 * // With props
 * function Descendant() {
 *   const index = useDescendantIndex({ name: "Descendant 1", type: "primary" });
 *   return <div>I am descendant {index}</div>;
 * }
 * ```
 */
export declare function useDescendantIndex<T extends Record<string, unknown>>(props?: T, customId?: string): {
    index: number;
    id: string;
    getPrevious: () => DescendantInfo<T> | undefined;
    getNext: () => DescendantInfo<T> | undefined;
};
export {};
//# sourceMappingURL=use-children.d.ts.map