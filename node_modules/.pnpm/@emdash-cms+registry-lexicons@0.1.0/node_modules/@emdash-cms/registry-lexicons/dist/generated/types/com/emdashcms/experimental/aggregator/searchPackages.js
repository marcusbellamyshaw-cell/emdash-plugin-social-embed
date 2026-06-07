import { t as __exportAll } from "../../../../../../chunk-BYypO7fO.js";
import { packageViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/searchPackages.ts
var searchPackages_exports = /* @__PURE__ */ __exportAll({ mainSchema: () => mainSchema });
const _mainSchema = /* @__PURE__ */ v.query("com.emdashcms.experimental.aggregator.searchPackages", {
	params: /* @__PURE__ */ v.object({
		capability: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(1, 64)])),
		cursor: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 1024)])),
		limit: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.integer(), [/* @__PURE__ */ v.integerRange(1, 100)]), 25),
		q: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 256)]))
	}),
	output: {
		type: "lex",
		schema: /* @__PURE__ */ v.object({
			cursor: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 1024)])),
			get packages() {
				return /* @__PURE__ */ v.constrain(/* @__PURE__ */ v.array(packageViewSchema), [/* @__PURE__ */ v.arrayLength(0, 100)]);
			}
		})
	}
});
const mainSchema = _mainSchema;

//#endregion
export { mainSchema, searchPackages_exports as t };
//# sourceMappingURL=searchPackages.js.map