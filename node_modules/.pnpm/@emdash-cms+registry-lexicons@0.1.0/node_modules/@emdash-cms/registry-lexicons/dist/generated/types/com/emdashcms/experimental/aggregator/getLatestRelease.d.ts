import { releaseViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/getLatestRelease.d.ts
declare namespace getLatestRelease_d_exports {
  export { $output, $params, mainSchema };
}
declare const _mainSchema: v.XRPCQueryMetadata<v.ObjectSchema<{
  /**
   * Publisher DID.
   */
  did: v.FormattedStringSchema<"did">;
  /**
   * Parent package slug.
   * @minLength 1
   * @maxLength 64
   */
  package: v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<1, 64>]>;
}>, {
  type: "lex";
  readonly schema: releaseViewSchema;
}, "com.emdashcms.experimental.aggregator.getLatestRelease">;
type main$schematype = typeof _mainSchema;
interface mainSchema extends main$schematype {}
declare const mainSchema: mainSchema;
interface $params extends v.InferInput<mainSchema["params"]> {}
type $output = v.InferXRPCBodyInput<mainSchema["output"]>;
declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "com.emdashcms.experimental.aggregator.getLatestRelease": mainSchema;
  }
}
//#endregion
export { $output, $params, mainSchema, getLatestRelease_d_exports as t };
//# sourceMappingURL=getLatestRelease.d.ts.map