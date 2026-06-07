import { packageViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/searchPackages.d.ts
declare namespace searchPackages_d_exports {
  export { $output, $params, mainSchema };
}
declare const _mainSchema: v.XRPCQueryMetadata<v.ObjectSchema<{
  /**
   * Optional filter: only return packages that declare this access category (e.g. 'email', 'network'). Compares against the latest release's declaredAccess top-level keys.
   * @minLength 1
   * @maxLength 64
   */
  capability: v.OptionalSchema<v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<1, 64>]>, undefined>;
  /**
   * Pagination cursor from a previous response.
   * @maxLength 1024
   */
  cursor: v.OptionalSchema<v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<0, 1024>]>, undefined>;
  /**
   * Max results to return.
   * @minimum 1
   * @maximum 100
   * @default 25
   */
  limit: v.OptionalSchema<v.SchemaWithConstraint<v.IntegerSchema, readonly [v.IntegerRangeConstraint<1, 100>]>, 25>;
  /**
   * Free-text search query. Matches against name, description, keywords, and authors. Empty or absent returns all packages.
   * @maxLength 256
   */
  q: v.OptionalSchema<v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<0, 256>]>, undefined>;
}>, {
  type: "lex";
  schema: v.ObjectSchema<{
    /**
     * Cursor to fetch the next page. Absent when there are no more results.
     * @maxLength 1024
     */
    cursor: v.OptionalSchema<v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<0, 1024>]>, undefined>;
    /**
     * @maxLength 100
     */
    readonly packages: v.SchemaWithConstraint<v.ArraySchema<packageViewSchema>, readonly [v.ArrayLengthConstraint<0, 100>]>;
  }>;
}, "com.emdashcms.experimental.aggregator.searchPackages">;
type main$schematype = typeof _mainSchema;
interface mainSchema extends main$schematype {}
declare const mainSchema: mainSchema;
interface $params extends v.InferInput<mainSchema["params"]> {}
interface $output extends v.InferXRPCBodyInput<mainSchema["output"]> {}
declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "com.emdashcms.experimental.aggregator.searchPackages": mainSchema;
  }
}
//#endregion
export { $output, $params, mainSchema, searchPackages_d_exports as t };
//# sourceMappingURL=searchPackages.d.ts.map