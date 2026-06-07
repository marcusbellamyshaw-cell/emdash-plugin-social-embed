/**
 * Safely resolve a variant config from a variants map, falling back
 * to a known-good default when the key doesn't match any entry.
 *
 * This prevents `TypeError: Cannot read properties of undefined`
 * when a component receives an invalid variant value at runtime
 * (e.g. from untyped JS consumers, server data, or stale props).
 *
 * @param variants  – A dimension of a KUMO_*_VARIANTS object
 *                    (e.g. `KUMO_BUTTON_VARIANTS.variant`)
 * @param key       – The runtime value of the variant prop
 * @param fallback  – A key guaranteed to exist (typically from
 *                    KUMO_*_DEFAULT_VARIANTS)
 * @returns The matched config entry, or the fallback entry
 *
 * @example
 * ```ts
 * const config = resolveVariant(
 *   KUMO_BUTTON_VARIANTS.variant,
 *   variant,
 *   KUMO_BUTTON_DEFAULT_VARIANTS.variant,
 * );
 * // config.classes is always safe to access
 * ```
 */
export declare function resolveVariant<T extends Record<string, unknown>>(variants: T, key: string, fallback: keyof T & string): T[keyof T];
//# sourceMappingURL=resolve-variant.d.ts.map