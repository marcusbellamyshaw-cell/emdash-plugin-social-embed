/**
 * Import path transformer for Kumo blocks
 * Transforms relative imports to package imports when installing blocks via CLI
 */
/**
 * Transforms relative imports in block source code to package imports
 *
 * This function consolidates all imports from @cloudflare/kumo into a single
 * import statement using inline `type` syntax to satisfy ESLint's
 * import/no-duplicates rule with prefer-inline: true.
 *
 * Examples:
 * - Multiple component imports → single consolidated import
 * - `../../components/tabs` + `../../utils/cn` → `import { Tabs, cn } from "@cloudflare/kumo";`
 * - Mixed value/type imports → `import { Button, type ButtonProps } from "@cloudflare/kumo";`
 *
 * @param content - The source code content to transform
 * @returns Transformed source code with consolidated package imports
 */
export declare function transformImports(content: string): string;
//# sourceMappingURL=transformer.d.ts.map