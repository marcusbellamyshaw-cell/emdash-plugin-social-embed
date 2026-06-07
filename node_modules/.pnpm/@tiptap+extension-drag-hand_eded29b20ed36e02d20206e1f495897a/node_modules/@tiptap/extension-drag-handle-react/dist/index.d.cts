import * as react from 'react';
import { ReactNode } from 'react';
import { DragHandlePluginProps, NestedOptions } from '@tiptap/extension-drag-handle';
import { Node } from '@tiptap/pm/model';
import { Editor } from '@tiptap/react';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type DragHandleProps = Omit<Optional<DragHandlePluginProps, 'pluginKey'>, 'element' | 'nestedOptions'> & {
    className?: string;
    onNodeChange?: (data: {
        node: Node | null;
        editor: Editor;
        pos: number;
    }) => void;
    children: ReactNode;
    /**
     * Enable drag handles for nested content (list items, blockquotes, etc.).
     *
     * When enabled, the drag handle will appear for nested blocks, not just
     * top-level blocks. A rule-based scoring system determines which node
     * to target based on cursor position and configured rules.
     *
     * @default false
     *
     * @example
     * // Simple enable with sensible defaults
     * <DragHandle editor={editor} nested>
     *   <GripIcon />
     * </DragHandle>
     *
     * @example
     * // With custom configuration
     * <DragHandle
     *   editor={editor}
     *   nested={{
     *     edgeDetection: 'left',
     *     allowedContainers: ['bulletList', 'orderedList'],
     *   }}
     * >
     *   <GripIcon />
     * </DragHandle>
     *
     * @example
     * // With custom rules
     * <DragHandle
     *   editor={editor}
     *   nested={{
     *     rules: [{
     *       id: 'excludeCodeBlocks',
     *       evaluate: ({ node }) => node.type.name === 'codeBlock' ? 1000 : 0,
     *     }],
     *   }}
     * >
     *   <GripIcon />
     * </DragHandle>
     */
    nested?: boolean | NestedOptions;
};
declare const DragHandle: (props: DragHandleProps) => react.ReactPortal | null;

export { DragHandle, type DragHandleProps, DragHandle as default };
