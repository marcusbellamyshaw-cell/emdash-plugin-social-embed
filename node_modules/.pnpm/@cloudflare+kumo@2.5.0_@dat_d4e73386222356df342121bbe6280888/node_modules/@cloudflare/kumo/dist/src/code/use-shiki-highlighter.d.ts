import { UseShikiHighlighterResult } from './types';
/**
 * Hook for accessing Shiki highlighting in custom implementations.
 *
 * Must be used within a ShikiProvider.
 *
 * Uses hardcoded themes: `github-light` for light mode, `vesper` for dark mode.
 *
 * @example
 * ```tsx
 * import { useShikiHighlighter } from "@cloudflare/kumo/code";
 *
 * function CustomCodeBlock({ code, lang }) {
 *   const { highlight, isLoading, isReady, error } = useShikiHighlighter();
 *
 *   if (error) {
 *     return <div>Failed to load highlighter</div>;
 *   }
 *
 *   if (isLoading) {
 *     return <pre><code>{code}</code></pre>;
 *   }
 *
 *   const html = highlight(code, lang);
 *
 *   // null means highlighting failed — render plain text
 *   if (html === null) {
 *     return <pre><code>{code}</code></pre>;
 *   }
 *
 *   return <pre dangerouslySetInnerHTML={{ __html: html }} />;
 * }
 * ```
 */
export declare function useShikiHighlighter(): UseShikiHighlighterResult;
//# sourceMappingURL=use-shiki-highlighter.d.ts.map