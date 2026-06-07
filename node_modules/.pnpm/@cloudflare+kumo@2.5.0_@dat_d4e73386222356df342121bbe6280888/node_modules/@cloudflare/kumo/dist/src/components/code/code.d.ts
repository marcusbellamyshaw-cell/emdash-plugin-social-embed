import { CSSProperties } from 'react';
/** Code language variant definitions. */
export declare const KUMO_CODE_VARIANTS: {
    readonly lang: {
        readonly ts: {
            readonly classes: "";
            readonly description: "TypeScript code";
        };
        readonly tsx: {
            readonly classes: "";
            readonly description: "TypeScript JSX code";
        };
        readonly jsonc: {
            readonly classes: "";
            readonly description: "JSON with comments";
        };
        readonly bash: {
            readonly classes: "";
            readonly description: "Shell/Bash commands";
        };
        readonly css: {
            readonly classes: "";
            readonly description: "CSS styles";
        };
    };
};
export declare const KUMO_CODE_DEFAULT_VARIANTS: {
    readonly lang: "ts";
};
/**
 * Styling metadata for Code component (for AI/Figma plugin consumption)
 */
export declare const KUMO_CODE_STYLING: {
    /** Base semantic tokens used */
    readonly baseTokens: readonly ["text-kumo-subtle"];
    /** Typography and layout */
    readonly typography: {
        readonly fontFamily: "font-mono";
        readonly fontSize: "text-sm";
        readonly lineHeight: "leading-[20px]";
    };
    /** Container dimensions */
    readonly dimensions: {
        readonly margin: "m-0";
        readonly padding: "p-0";
        readonly width: "w-auto";
    };
    /** Border and background */
    readonly appearance: {
        readonly borderRadius: "rounded-none";
        readonly border: "border-none";
        readonly background: "bg-transparent";
    };
};
/**
 * Styling metadata for CodeBlock component (for AI/Figma plugin consumption)
 */
export declare const KUMO_CODEBLOCK_STYLING: {
    /** Base semantic tokens used */
    readonly baseTokens: readonly ["bg-kumo-base", "border-kumo-fill"];
    /** Container styling */
    readonly container: {
        readonly minWidth: "min-w-0";
        readonly borderRadius: "rounded-md";
        readonly border: "border border-kumo-fill";
        readonly background: "bg-kumo-base";
    };
    /** Inner code element padding */
    readonly innerPadding: "[&>pre]:p-2.5";
    /** Parsed dimensions */
    readonly dimensions: {
        readonly borderRadius: 6;
        readonly padding: 10;
    };
};
export type KumoCodeLang = keyof typeof KUMO_CODE_VARIANTS.lang;
export interface KumoCodeVariantsProps {
    /**
     * Language hint for the code content.
     * - `"ts"` — TypeScript code
     * - `"tsx"` — TypeScript JSX code
     * - `"jsonc"` — JSON with comments
     * - `"bash"` — Shell/Bash commands
     * - `"css"` — CSS styles
     * @default "ts"
     */
    lang?: KumoCodeLang;
}
export declare function codeVariants({ lang, }?: KumoCodeVariantsProps): string;
export type CodeLang = KumoCodeLang;
/** @deprecated Use CodeLang instead */
export type BundledLanguage = CodeLang;
/**
 * Code component props.
 *
 * @example
 * ```tsx
 * <Code code="const x = 1;" lang="ts" />
 * <Code code="export API_KEY={{apiKey}}" lang="bash"
 *   values={{ apiKey: { value: "sk_live_123", highlight: true } }}
 * />
 * ```
 */
export interface CodeProps extends KumoCodeVariantsProps {
    /** The code string to display. */
    code: string;
    /** Template values for `{{key}}` interpolation. Values with `highlight: true` are visually emphasized. */
    values?: Record<string, {
        value: string;
        highlight?: boolean;
    }>;
    /** Additional CSS classes merged via `cn()`. */
    className?: string;
    /** Inline styles. */
    style?: CSSProperties;
}
/**
 * Simple code component without syntax highlighting.
 *
 * Renders code in a monospace font with customizable language metadata.
 * For a bordered container version, use `Code.Block` or `CodeBlock`.
 *
 * **Styling:**
 * - Typography: `font-mono text-sm leading-[20px]`
 * - Colors: `text-kumo-subtle` with `bg-transparent`
 * - No borders or padding (use CodeBlock for styled container)
 * - Supports all semantic tokens via className prop
 *
 * @deprecated Use `CodeHighlighted` from `@cloudflare/kumo/code` for syntax highlighting.
 * This component will be removed in v2.0.
 *
 * @example Migration:
 * ```tsx
 * // Before
 * import { Code } from "@cloudflare/kumo";
 * <Code code="const x = 1;" lang="ts" />
 *
 * // After
 * import { ShikiProvider, CodeHighlighted } from "@cloudflare/kumo/code";
 * <ShikiProvider engine="javascript" languages={['tsx']} themes={{ light: 'github-light', dark: 'github-dark' }}>
 *   <CodeHighlighted code="const x = 1;" lang="tsx" />
 * </ShikiProvider>
 * ```
 */
declare function CodeComponent({ code, lang, className, style, }: CodeProps): import("react/jsx-runtime").JSX.Element;
declare namespace CodeComponent {
    var displayName: string;
}
/**
 * CodeBlock component props — code inside a bordered container.
 *
 * @example
 * ```tsx
 * <CodeBlock lang="tsx" code={`const greeting = "Hello!";`} />
 * ```
 */
export interface CodeBlockProps {
    /** The code string to display. */
    code: string;
    /**
     * Language hint for the code content.
     * @default "ts"
     */
    lang?: CodeLang;
}
/**
 * Code block with border and background container.
 *
 * A styled wrapper around Code that adds a bordered container with surface background.
 * Useful for displaying code snippets with visual separation from surrounding content.
 *
 * **Styling:**
 * - Container: `min-w-0 rounded-md border border-kumo-fill bg-kumo-base`
 * - Inner padding: `p-2.5` (10px)
 * - Uses semantic tokens: `bg-kumo-base`, `border-kumo-fill`
 *
 * @deprecated Use `CodeHighlighted` from `@cloudflare/kumo/code` for syntax highlighting.
 * This component will be removed in v2.0.
 */
declare function CodeBlockComponent({ code, lang }: CodeBlockProps): import("react/jsx-runtime").JSX.Element;
declare namespace CodeBlockComponent {
    var displayName: string;
}
export declare const Code: typeof CodeComponent & {
    Block: typeof CodeBlockComponent;
};
export declare const CodeBlock: typeof CodeBlockComponent;
export {};
//# sourceMappingURL=code.d.ts.map