/**
 * Kumo Catalog Module
 *
 * Runtime utilities for JSON-based UI rendering with Kumo components.
 * Based on the json-render pattern: https://github.com/vercel-labs/json-render
 *
 * Features:
 * - Catalog creation with auto-generated Zod schemas
 * - UI tree validation
 * - Dynamic value resolution (data binding)
 * - Visibility condition evaluation
 * - Action handling
 *
 * @example
 * import {
 *   createKumoCatalog,
 *   initCatalog,
 *   evaluateVisibility,
 *   resolveProps,
 * } from '@cloudflare/kumo/catalog';
 *
 * // Create catalog with actions
 * const catalog = createKumoCatalog({
 *   actions: {
 *     submit: { description: 'Submit form' },
 *   },
 * });
 *
 * // Initialize (loads schemas)
 * await initCatalog(catalog);
 *
 * // Validate AI-generated tree
 * const result = catalog.validateTree(aiGeneratedJson);
 */
export type { UIElement, UITree, DynamicValue, DynamicString, DynamicNumber, DynamicBoolean, VisibilityCondition, LogicExpression, Action, ActionConfirm, ActionHandler, ActionHandlers, ActionDefinition, AuthState, DataModel, KumoCatalog, CatalogConfig, ValidationResult, ComponentRegistry, ComponentSchema, PropSchema, SubComponentSchema, } from './types';
export { createKumoCatalog, initCatalog, loadSchemas } from './catalog';
export { getByPath, setByPath, isDynamicPath, resolveDynamicValue, resolveProps, } from './data';
export { evaluateVisibility, createVisibilityContext, type VisibilityContext, } from './visibility';
//# sourceMappingURL=index.d.ts.map