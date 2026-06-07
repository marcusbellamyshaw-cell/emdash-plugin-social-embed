import { releaseViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/listReleases.d.ts
declare namespace listReleases_d_exports {
  export { $output, $params, mainSchema };
}
declare const _mainSchema: v.XRPCQueryMetadata<v.ObjectSchema<{
  /**
   * Pagination cursor from a previous response.
   * @maxLength 1024
   */
  cursor: v.OptionalSchema<v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<0, 1024>]>, undefined>;
  /**
   * Publisher DID.
   */
  did: v.FormattedStringSchema<"did">;
  /**
   * Max results to return.
   * @minimum 1
   * @maximum 100
   * @default 25
   */
  limit: v.OptionalSchema<v.SchemaWithConstraint<v.IntegerSchema, readonly [v.IntegerRangeConstraint<1, 100>]>, 25>;
  /**
   * Parent package slug.
   * @minLength 1
   * @maxLength 64
   */
  package: v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<1, 64>]>;
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
    readonly releases: v.SchemaWithConstraint<v.ArraySchema<releaseViewSchema>, readonly [v.ArrayLengthConstraint<0, 100>]>;
  }>;
}, "com.emdashcms.experimental.aggregator.listReleases">;
type main$schematype = typeof _mainSchema;
interface mainSchema extends main$schematype {}
declare const mainSchema: mainSchema;
interface $params extends v.InferInput<mainSchema["params"]> {}
interface $output extends v.InferXRPCBodyInput<mainSchema["output"]> {}
declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "com.emdashcms.experimental.aggregator.listReleases": mainSchema;
  }
}
//#endregion
export { $output, $params, mainSchema, listReleases_d_exports as t };
//# sourceMappingURL=listReleases.d.ts.map