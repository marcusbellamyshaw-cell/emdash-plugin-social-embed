import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/publisher/profile.d.ts
declare namespace profile_d_exports {
  export { Contact, Main, contactSchema, mainSchema };
}
declare const _contactSchema: v.ObjectSchema<{
  $type: v.OptionalSchema<v.LiteralSchema<"com.emdashcms.experimental.publisher.profile#contact">, undefined>;
  /**
   * @maxLength 256
   */
  email: v.OptionalSchema<v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<0, 256>]>, undefined>;
  /**
   * Channel role. 'general' for ordinary contact, 'security' for vulnerability reporting.
   * @maxLength 32
   */
  kind: v.OptionalSchema<v.SchemaWithConstraint<v.StringSchema<(string & {}) | "general" | "security">, readonly [v.StringLengthConstraint<0, 32>]>, undefined>;
  /**
   * @maxLength 1024
   */
  url: v.OptionalSchema<v.SchemaWithConstraint<v.FormattedStringSchema<"uri">, readonly [v.StringLengthConstraint<0, 1024>]>, undefined>;
}>;
declare const _mainSchema: v.RecordSchema<v.ObjectSchema<{
  $type: v.LiteralSchema<"com.emdashcms.experimental.publisher.profile">;
  /**
   * Identity-level contact channels for the publisher (general / security). Per-package security contacts on package profile records remain authoritative for their respective packages; this list is for the publisher entity itself.
   * @maxLength 8
   */
  readonly contact: v.OptionalSchema<v.SchemaWithConstraint<v.ArraySchema<contactSchema>, readonly [v.ArrayLengthConstraint<0, 8>]>, undefined>;
  /**
   * Short description / bio of the publisher. SHOULD NOT exceed 280 characters per UI convention. Plain text; no Markdown.
   * @maxLength 2048
   * @maxGraphemes 280
   */
  description: v.OptionalSchema<v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<0, 2048>, v.StringGraphemesConstraint<0, 280>]>, undefined>;
  /**
   * Human-readable name for the publisher (e.g. 'Acme Plugin Co.'). Displayed alongside packages and verification badges. Verification records bind against this value: a change to displayName invalidates any unexpired verification claims targeting this DID until the issuer re-attests.
   * @maxLength 1024
   * @maxGraphemes 100
   */
  displayName: v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<0, 1024>, v.StringGraphemesConstraint<0, 100>]>;
  /**
   * When this profile was last updated.
   */
  updatedAt: v.OptionalSchema<v.FormattedStringSchema<"datetime">, undefined>;
  /**
   * Publisher's primary homepage. Distinct from per-package repo or homepage URLs.
   * @maxLength 2048
   */
  url: v.OptionalSchema<v.SchemaWithConstraint<v.FormattedStringSchema<"uri">, readonly [v.StringLengthConstraint<0, 2048>]>, undefined>;
}>, v.LiteralSchema<"self">>;
type contact$schematype = typeof _contactSchema;
type main$schematype = typeof _mainSchema;
interface contactSchema extends contact$schematype {}
interface mainSchema extends main$schematype {}
declare const contactSchema: contactSchema;
declare const mainSchema: mainSchema;
interface Contact extends v.InferInput<typeof contactSchema> {}
interface Main extends v.InferInput<typeof mainSchema> {}
declare module "@atcute/lexicons/ambient" {
  interface Records {
    "com.emdashcms.experimental.publisher.profile": mainSchema;
  }
}
//#endregion
export { Contact, Main, contactSchema, mainSchema, profile_d_exports as t };
//# sourceMappingURL=profile.d.ts.map