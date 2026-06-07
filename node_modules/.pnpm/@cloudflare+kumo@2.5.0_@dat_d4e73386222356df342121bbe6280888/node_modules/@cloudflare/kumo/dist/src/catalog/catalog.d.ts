import { KumoCatalog, CatalogConfig, UIElement } from './types';
interface SchemasModule {
    KUMO_COMPONENT_NAMES: readonly string[];
    UIElementBaseSchema: {
        safeParse: (data: unknown) => {
            success: boolean;
            data?: unknown;
            error?: {
                issues: Array<{
                    message: string;
                    path: (string | number)[];
                }>;
            };
        };
    };
    validateElementProps: (element: UIElement) => {
        success: boolean;
        error?: {
            issues: Array<{
                message: string;
                path: (string | number)[];
            }>;
        };
    };
    validateUITree: (tree: unknown) => {
        success: boolean;
        data?: unknown;
        error?: {
            issues: Array<{
                message: string;
                path: (string | number)[];
            }>;
        };
    };
}
/**
 * Load the generated schemas module.
 * This is called automatically when needed.
 */
export declare function loadSchemas(): Promise<SchemasModule>;
/**
 * Create a Kumo catalog for runtime validation.
 *
 * The catalog:
 * - Uses auto-generated Zod schemas from component-registry.json
 * - Validates UI elements and trees at runtime
 * - Generates AI prompts describing available components
 *
 * @example
 * import { createKumoCatalog, initCatalog } from '@cloudflare/kumo/catalog';
 *
 * const catalog = createKumoCatalog({
 *   actions: {
 *     submit_form: { description: 'Submit the form' },
 *     delete_item: { description: 'Delete selected item' },
 *   },
 * });
 *
 * // Initialize schemas (required before sync validation)
 * await initCatalog(catalog);
 *
 * // Validate AI-generated tree
 * const result = catalog.validateTree(aiGeneratedJson);
 * if (result.success) {
 *   // Render the tree
 * }
 */
export declare function createKumoCatalog(config?: CatalogConfig): KumoCatalog;
/**
 * Initialize the catalog by loading schemas.
 * Call this before using synchronous validation methods.
 */
export declare function initCatalog(catalog: KumoCatalog): Promise<void>;
export {};
//# sourceMappingURL=catalog.d.ts.map