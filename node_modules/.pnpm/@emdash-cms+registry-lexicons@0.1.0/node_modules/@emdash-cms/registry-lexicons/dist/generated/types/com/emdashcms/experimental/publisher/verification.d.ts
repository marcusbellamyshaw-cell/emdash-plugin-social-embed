import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/publisher/verification.d.ts
declare namespace verification_d_exports {
  export { Main, mainSchema };
}
declare const _mainSchema: v.RecordSchema<v.ObjectSchema<{
  $type: v.LiteralSchema<"com.emdashcms.experimental.publisher.verification">;
  /**
   * When the verification was issued.
   */
  createdAt: v.FormattedStringSchema<"datetime">;
  /**
   * Subject's `displayName` from their `com.emdashcms.experimental.publisher.profile` record (rkey `self`) at the moment of issuance. The verification is only valid if the subject's current publisher profile displayName matches this value byte-for-byte. A subject without a publisher profile cannot be verified: the issuer MUST require the subject to publish a publisher.profile before issuing the claim, and clients MUST reject verifications whose subject has no publisher profile resolvable at issuance check time.
   * @maxLength 1024
   * @maxGraphemes 100
   */
  displayName: v.SchemaWithConstraint<v.StringSchema<string>, readonly [v.StringLengthConstraint<0, 1024>, v.StringGraphemesConstraint<0, 100>]>;
  /**
   * Optional expiration timestamp. If absent, the verification has no automatic expiry. Clients SHOULD treat the verification as not in force after this time, regardless of whether the issuer has revoked it.
   */
  expiresAt: v.OptionalSchema<v.FormattedStringSchema<"datetime">, undefined>;
  /**
   * Handle of the subject at the moment of issuance. The verification is only valid if the subject's current handle (resolved from their DID document) matches this value byte-for-byte. Any handle change invalidates the verification until the issuer re-attests.
   */
  handle: v.FormattedStringSchema<"handle">;
  /**
   * DID of the subject the verification applies to.
   */
  subject: v.FormattedStringSchema<"did">;
}>, v.FormattedStringSchema<"tid">>;
type main$schematype = typeof _mainSchema;
interface mainSchema extends main$schematype {}
declare const mainSchema: mainSchema;
interface Main extends v.InferInput<typeof mainSchema> {}
declare module "@atcute/lexicons/ambient" {
  interface Records {
    "com.emdashcms.experimental.publisher.verification": mainSchema;
  }
}
//#endregion
export { Main, mainSchema, verification_d_exports as t };
//# sourceMappingURL=verification.d.ts.map