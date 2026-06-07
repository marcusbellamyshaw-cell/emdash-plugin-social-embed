import { packageViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/getPackage.d.ts
declare namespace getPackage_d_exports {
  export { $output, $params, mainSchema };
}
declare const _mainSchema: v.XRPCQueryMetadata<v.ObjectSchema<{
  /**
   * Publisher DID.
   */
  did: v.FormattedStringSchema<"did">;
  /**
   * Package slug.
   * @minLength 1
   * @maxLength 64
   */
  slug: v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<1, 64>]>;
}>, {
  type: "lex";
  readonly schema: packageViewSchema;
}, "com.emdashcms.experimental.aggregator.getPackage">;
type main$schematype = typeof _mainSchema;
interface mainSchema extends main$schematype {}
declare const mainSchema: mainSchema;
interface $params extends v.InferInput<mainSchema["params"]> {}
type $output = v.InferXRPCBodyInput<mainSchema["output"]>;
declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "com.emdashcms.experimental.aggregator.getPackage": mainSchema;
  }
}
//#endregion
export { $output, $params, mainSchema, getPackage_d_exports as t };
//# sourceMappingURL=getPackage.d.ts.map