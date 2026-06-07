import { DataModel, DynamicValue } from './types';
/**
 * Get a value from an object by JSON Pointer path.
 *
 * @example
 * const data = { user: { name: "John", profile: { age: 30 } } };
 * getByPath(data, "/user/name") // "John"
 * getByPath(data, "/user/profile/age") // 30
 * getByPath(data, "/missing") // undefined
 */
export declare function getByPath(obj: unknown, path: string): unknown;
/**
 * Set a value in an object by JSON Pointer path.
 * Creates intermediate objects as needed.
 *
 * @example
 * const data = {};
 * setByPath(data, "/user/name", "John");
 * // data is now { user: { name: "John" } }
 */
export declare function setByPath(obj: Record<string, unknown>, path: string, value: unknown): void;
/**
 * Check if a value is a dynamic path reference.
 */
export declare function isDynamicPath(value: unknown): value is {
    path: string;
};
/**
 * Resolve a dynamic value against a data model.
 * If the value is a path reference, look it up in the data model.
 * Otherwise, return the literal value.
 *
 * @example
 * const data = { user: { name: "John" } };
 * resolveDynamicValue("Hello", data) // "Hello"
 * resolveDynamicValue({ path: "/user/name" }, data) // "John"
 */
export declare function resolveDynamicValue<T>(value: DynamicValue<T>, dataModel: DataModel): T | undefined;
/**
 * Resolve all dynamic values in an object.
 * Recursively resolves any { path: string } references.
 */
export declare function resolveProps(props: Record<string, unknown>, dataModel: DataModel): Record<string, unknown>;
//# sourceMappingURL=data.d.ts.map