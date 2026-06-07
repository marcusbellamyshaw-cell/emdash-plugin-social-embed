import { ShikiEngine, SupportedLanguage } from './types';
import { ReactNode } from 'react';
export interface HighlightCodeOptions {
    /** Highlighting engine (default: "javascript") */
    engine?: ShikiEngine;
}
export interface CreateHighlighterOptions {
    /** Highlighting engine (default: "javascript") */
    engine?: ShikiEngine;
    /** Languages to support */
    languages: SupportedLanguage[];
}
export interface ServerHighlighter {
    /** Highlight code and return HTML string */
    highlight: (code: string, lang: SupportedLanguage) => string;
    /** Dispose the highlighter when done */
    dispose: () => void;
}
/**
 * One-off highlighting for a single code snippet.
 *
 * Creates a highlighter, highlights the code, and disposes.
 * For multiple highlights, use `createServerHighlighter` instead.
 *
 * Uses hardcoded themes: `github-light` for light mode, `vesper` for dark mode.
 *
 * @example
 * ```tsx
 * const html = await highlightCode(code, "tsx");
 * ```
 */
export declare function highlightCode(code: string, lang: SupportedLanguage, options?: HighlightCodeOptions): Promise<string>;
/**
 * Create a reusable highlighter for multiple code snippets.
 *
 * More efficient than `highlightCode` when highlighting multiple snippets.
 * Remember to call `dispose()` when done.
 *
 * Uses hardcoded themes: `github-light` for light mode, `vesper` for dark mode.
 *
 * @example
 * ```tsx
 * const highlighter = await createServerHighlighter({
 *   languages: ["tsx", "bash", "json"],
 * });
 *
 * const html1 = highlighter.highlight(code1, "tsx");
 * const html2 = highlighter.highlight(code2, "bash");
 *
 * highlighter.dispose();
 * ```
 */
export declare function createServerHighlighter(options: CreateHighlighterOptions): Promise<ServerHighlighter>;
/**
 * Props for the CodeBlock component.
 */
export interface CodeBlockProps {
    /** Pre-rendered HTML from highlightCode() or createServerHighlighter().highlight() */
    html: string;
    /** Additional CSS classes for the container */
    className?: string;
}
/**
 * Server component that wraps highlighted code HTML with proper styling.
 *
 * Use this with `highlightCode()` or `createServerHighlighter().highlight()`
 * to render syntax-highlighted code blocks with consistent Kumo styling.
 *
 * @example
 * ```tsx
 * import { highlightCode, CodeBlock } from "@cloudflare/kumo/code/server";
 *
 * export default async function Page() {
 *   const html = await highlightCode(`const x = 1;`, "tsx");
 *   return <CodeBlock html={html} />;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With createServerHighlighter for multiple blocks
 * const highlighter = await createServerHighlighter({ languages: ["tsx", "bash"] });
 *
 * return (
 *   <>
 *     <CodeBlock html={highlighter.highlight(code1, "tsx")} />
 *     <CodeBlock html={highlighter.highlight(code2, "bash")} />
 *   </>
 * );
 *
 * highlighter.dispose();
 * ```
 */
export declare function CodeBlock({ html, className }: CodeBlockProps): ReactNode;
//# sourceMappingURL=server.d.ts.map