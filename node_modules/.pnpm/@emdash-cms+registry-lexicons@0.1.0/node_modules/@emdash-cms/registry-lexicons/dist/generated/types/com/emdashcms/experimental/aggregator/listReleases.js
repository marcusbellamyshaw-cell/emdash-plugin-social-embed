import { t as __exportAll } from "../../../../../../chunk-BYypO7fO.js";
import { releaseViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/listReleases.ts
var listReleases_exports = /* @__PURE__ */ __exportAll({ mainSchema: () => mainSchema });
const _mainSchema = /* @__PURE__ */ v.query("com.emdashcms.experimental.aggregator.listReleases", {
	params: /* @__PURE__ */ v.object({
		cursor: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 1024)])),
		did: /* @__PURE__ */ v.didString(),
		limit: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.integer(), [/* @__PURE__ */ v.integerRange(1, 100)]), 25),
		package: /* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(1, 64)])
	}),
	output: {
		type: "lex",
		schema: /* @__PURE__ */ v.object({
			cursor: /* @__PURE__ */ v.optional(/* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(0, 1024)])),
			get releases() {
				return /* @__PURE__ */ v.constrain(/* @__PURE__ */ v.array(releaseViewSchema), [/* @__PURE__ */ v.arrayLength(0, 100)]);
			}
		})
	}
});
const mainSchema = _mainSchema;

//#endregion
export { mainSchema, listReleases_exports as t };
//# sourceMappingURL=listReleases.js.map