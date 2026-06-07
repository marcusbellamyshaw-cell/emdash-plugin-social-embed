import { t as __exportAll } from "../../../../../../chunk-BYypO7fO.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/publisher/verification.ts
var verification_exports = /* @__PURE__ */ __exportAll({ mainSchema: () => mainSchema });
const _mainSchema = /* @__PURE__ */ v.record(/* @__PURE__ */ v.tidString(), /* @__PURE__ */ v.object({
	$type: /* @__PURE__ */ v.literal("com.emdashcms.experimental.publisher.verification"),
	createdAt: /* @__PURE__ */ v.datetimeString(),
	displayName: /* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 1024), /* @__PURE__ */ v.stringGraphemes(0, 100)]),
	expiresAt: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.datetimeString()),
	handle: /* @__PURE__ */ v.handleString(),
	subject: /* @__PURE__ */ v.didString()
}));
const mainSchema = _mainSchema;

//#endregion
export { mainSchema, verification_exports as t };
//# sourceMappingURL=verification.js.map