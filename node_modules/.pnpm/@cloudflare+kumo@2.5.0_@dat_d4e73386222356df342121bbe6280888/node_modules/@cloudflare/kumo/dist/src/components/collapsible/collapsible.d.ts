import { Collapsible as CollapsibleBase } from '@base-ui/react/collapsible';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
export declare const KUMO_COLLAPSIBLE_VARIANTS: {};
export declare const KUMO_COLLAPSIBLE_DEFAULT_VARIANTS: {};
export interface KumoCollapsibleVariantsProps {
}
export declare function collapsibleVariants(_props?: KumoCollapsibleVariantsProps): string;
type BaseRootProps = ComponentPropsWithoutRef<typeof CollapsibleBase.Root>;
export interface CollapsibleRootProps extends BaseRootProps {
    /** Additional CSS classes */
    className?: string;
}
/**
 * Root component that manages collapsible state.
 *
 * @example
 * ```tsx
 * <Collapsible.Root open={open} onOpenChange={setOpen}>
 *   <Collapsible.Trigger>Toggle</Collapsible.Trigger>
 *   <Collapsible.Panel>Content</Collapsible.Panel>
 * </Collapsible.Root>
 * ```
 */
declare function CollapsibleRoot({ className, ...props }: CollapsibleRootProps): import("react/jsx-runtime").JSX.Element;
declare namespace CollapsibleRoot {
    var displayName: string;
}
type BaseTriggerProps = ComponentPropsWithoutRef<typeof CollapsibleBase.Trigger>;
export interface CollapsibleTriggerProps extends BaseTriggerProps {
    /** Additional CSS classes */
    className?: string;
}
type BasePanelProps = ComponentPropsWithoutRef<typeof CollapsibleBase.Panel>;
export interface CollapsiblePanelProps extends BasePanelProps {
    /** Additional CSS classes */
    className?: string;
}
export interface CollapsibleDefaultTriggerProps {
    /** Label text displayed in the trigger */
    children: ReactNode;
    /** Additional CSS classes */
    className?: string;
}
export interface CollapsibleDefaultPanelProps extends BasePanelProps {
    /** Panel content */
    children: ReactNode;
    /** Additional CSS classes */
    className?: string;
}
/**
 * Collapsible — a composable disclosure component for showing/hiding content.
 *
 * Built on Base UI's Collapsible with full composition support.
 *
 * ## Basic Usage
 *
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Collapsible.Root open={open} onOpenChange={setOpen}>
 *   <Collapsible.Trigger render={<Button variant="ghost" />}>
 *     Show details
 *   </Collapsible.Trigger>
 *   <Collapsible.Panel className="mt-2">
 *     <Text>Hidden content revealed when expanded.</Text>
 *   </Collapsible.Panel>
 * </Collapsible.Root>
 * ```
 *
 * ## With Default Styling
 *
 * Use `DefaultTrigger` and `DefaultPanel` for the classic Kumo style:
 *
 * ```tsx
 * <Collapsible.Root>
 *   <Collapsible.DefaultTrigger>Show details</Collapsible.DefaultTrigger>
 *   <Collapsible.DefaultPanel>
 *     <Text>Content with border-left accent</Text>
 *   </Collapsible.DefaultPanel>
 * </Collapsible.Root>
 * ```
 *
 * ## Controlled Accordion Pattern
 *
 * ```tsx
 * const [activeIndex, setActiveIndex] = useState<number | null>(null);
 *
 * {items.map((item, i) => (
 *   <Collapsible.Root
 *     key={i}
 *     open={activeIndex === i}
 *     onOpenChange={(open) => setActiveIndex(open ? i : null)}
 *   >
 *     <Collapsible.DefaultTrigger>{item.title}</Collapsible.DefaultTrigger>
 *     <Collapsible.DefaultPanel>{item.content}</Collapsible.DefaultPanel>
 *   </Collapsible.Root>
 * ))}
 * ```
 */
export declare const Collapsible: typeof CollapsibleRoot & {
    Root: typeof CollapsibleRoot;
    Trigger: import('react').ForwardRefExoticComponent<CollapsibleTriggerProps & import('react').RefAttributes<HTMLButtonElement>>;
    Panel: import('react').ForwardRefExoticComponent<CollapsiblePanelProps & import('react').RefAttributes<HTMLDivElement>>;
    DefaultTrigger: import('react').ForwardRefExoticComponent<CollapsibleDefaultTriggerProps & import('react').RefAttributes<HTMLButtonElement>>;
    DefaultPanel: import('react').ForwardRefExoticComponent<CollapsibleDefaultPanelProps & import('react').RefAttributes<HTMLDivElement>>;
};
export type CollapsibleProps = CollapsibleRootProps;
export {};
//# sourceMappingURL=collapsible.d.ts.map