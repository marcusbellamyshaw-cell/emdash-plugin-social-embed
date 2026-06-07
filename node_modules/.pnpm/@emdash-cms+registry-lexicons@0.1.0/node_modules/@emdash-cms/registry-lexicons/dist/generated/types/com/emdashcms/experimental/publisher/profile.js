import { t as __exportAll } from "../../../../../../chunk-BYypO7fO.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/publisher/profile.ts
var profile_exports = /* @__PURE__ */ __exportAll({
	contactSchema: () => contactSchema,
	mainSchema: () => mainSchema
});
const _contactSchema = /* @__PURE__ */ v.object({
	$type: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.literal("com.emdashcms.experimental.publisher.profile#contact")),
	email: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 256)])),
	kind: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 32)])),
	url: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.genericUriString(), [/* @__PURE__ */ v.stringLength(0, 1024)]))
});
const _mainSchema = /* @__PURE__ */ v.record(/* @__PURE__ */ v.literal("self"), /* @__PURE__ */ v.object({
	$type: /* @__PURE__ */ v.literal("com.emdashcms.experimental.publisher.profile"),
	get contact() {
		return /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.array(contactSchema), [/* @__PURE__ */ v.arrayLength(0, 8)]));
	},
	description: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 2048), /* @__PURE__ */ v.stringGraphemes(0, 280)])),
	displayName: /* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 1024), /* @__PURE__ */ v.stringGraphemes(0, 100)]),
	updatedAt: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.datetimeString()),
	url: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.genericUriString(), [/* @__PURE__ */ v.stringLength(0, 2048)]))
}));
const contactSchema = _contactSchema;
const mainSchema = _mainSchema;

//#endregion
export { contactSchema, mainSchema, profile_exports as t };
//# sourceMappingURL=profile.js.map