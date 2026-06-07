import { packageViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/resolvePackage.d.ts
declare namespace resolvePackage_d_exports {
  export { $output, $params, mainSchema };
}
declare const _mainSchema: v.XRPCQueryMetadata<v.ObjectSchema<{
  /**
   * Publisher's handle (e.g. 'example.dev').
   */
  handle: v.FormattedStringSchema<"handle">;
  /**
   * Package slug.
   * @minLength 1
   * @maxLength 64
   */
  slug: v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<1, 64>]>;
}>, {
  type: "lex";
  readonly schema: packageViewSchema;
}, "com.emdashcms.experimental.aggregator.resolvePackage">;
type main$schematype = typeof _mainSchema;
interface mainSchema extends main$schematype {}
declare const mainSchema: mainSchema;
interface $params extends v.InferInput<mainSchema["params"]> {}
type $output = v.InferXRPCBodyInput<mainSchema["output"]>;
declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "com.emdashcms.experimental.aggregator.resolvePackage": mainSchema;
  }
}
//#endregion
export { $output, $params, mainSchema, resolvePackage_d_exports as t };
//# sourceMappingURL=resolvePackage.d.ts.map