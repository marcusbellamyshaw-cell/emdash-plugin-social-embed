import { VisibilityCondition, DataModel, AuthState } from './types';
/**
 * Context for evaluating visibility conditions.
 */
export interface VisibilityContext {
    /** Data model for path resolution */
    data: DataModel;
    /** Authentication state */
    auth: AuthState;
}
/**
 * Evaluate a visibility condition.
 *
 * @example
 * // Boolean
 * evaluateVisibility(true, ctx) // true
 *
 * // Path check
 * evaluateVisibility({ path: "/user/isAdmin" }, ctx) // depends on data
 *
 * // Auth check
 * evaluateVisibility({ auth: "signedIn" }, ctx) // depends on auth state
 *
 * // Complex logic
 * evaluateVisibility({
 *   and: [
 *     { path: "/user/isAdmin" },
 *     { auth: "signedIn" }
 *   ]
 * }, ctx)
 */
export declare function evaluateVisibility(condition: VisibilityCondition | undefined, ctx: VisibilityContext): boolean;
/**
 * Create a default visibility context.
 */
export declare function createVisibilityContext(data?: DataModel, auth?: Partial<AuthState>): VisibilityContext;
//# sourceMappingURL=visibility.d.ts.map