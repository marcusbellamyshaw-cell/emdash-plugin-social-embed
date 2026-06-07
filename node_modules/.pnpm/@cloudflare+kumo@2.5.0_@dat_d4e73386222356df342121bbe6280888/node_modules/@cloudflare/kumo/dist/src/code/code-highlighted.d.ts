import { default as React } from 'react';
import { CodeHighlightedProps } from './types';
/**
 * Syntax-highlighted code block powered by Shiki.
 *
 * Must be used within a ShikiProvider. While Shiki is loading,
 * displays code as plain text (no layout shift, immediately readable).
 *
 * Uses hardcoded themes: `github-light` for light mode, `vesper` for dark mode.
 *
 * @example
 * ```tsx
 * import { ShikiProvider, CodeHighlighted } from "@cloudflare/kumo/code";
 *
 * <ShikiProvider
 *   engine="javascript"
 *   languages={['tsx', 'bash']}
 * >
 *   <CodeHighlighted
 *     code={`const greeting = "Hello!";`}
 *     lang="tsx"
 *     showLineNumbers
 *     showCopyButton
 *   />
 * </ShikiProvider>
 * ```
 */
export declare function CodeHighlighted({ code, lang, showLineNumbers, highlightLines, showCopyButton, labels: labelOverrides, className, }: CodeHighlightedProps): React.JSX.Element;
export declare namespace CodeHighlighted {
    var displayName: string;
}
//# sourceMappingURL=code-highlighted.d.ts.map