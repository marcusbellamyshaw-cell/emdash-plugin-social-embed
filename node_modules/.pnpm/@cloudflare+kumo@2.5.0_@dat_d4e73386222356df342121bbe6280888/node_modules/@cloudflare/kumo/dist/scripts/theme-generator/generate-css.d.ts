import { ThemeConfig, GeneratorOptions, TokenRenameMap } from './types.js';
/**
 * Generate the base kumo theme CSS
 * This contains all tokens with their kumo theme values
 */
export declare function generateKumoThemeCSS(config: ThemeConfig, useNewNames?: boolean): string;
/**
 * Generate a theme override CSS file
 * Only includes tokens that differ from the base kumo theme
 */
export declare function generateThemeOverrideCSS(config: ThemeConfig, themeName: string, useNewNames?: boolean): string;
/**
 * Get a mapping of old token names to new names
 * Useful for running codemods during migration
 */
export declare function getTokenRenameMap(config: ThemeConfig): TokenRenameMap;
/**
 * Generate all theme CSS files
 */
export declare function generateAllThemes(options: GeneratorOptions): Map<string, string>;
/**
 * List all tokens with their current and new names
 * Useful for documentation and migration planning
 */
export declare function listAllTokens(config: ThemeConfig): Array<{
    type: "text" | "color" | "typography";
    currentName: string;
    newName: string;
    themes: string[];
}>;
//# sourceMappingURL=generate-css.d.ts.map