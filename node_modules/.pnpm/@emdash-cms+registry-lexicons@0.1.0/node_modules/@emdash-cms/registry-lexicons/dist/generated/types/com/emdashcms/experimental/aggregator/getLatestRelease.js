import { t as __exportAll } from "../../../../../../chunk-BYypO7fO.js";
import { releaseViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/getLatestRelease.ts
var getLatestRelease_exports = /* @__PURE__ */ __exportAll({ mainSchema: () => mainSchema });
const _mainSchema = /* @__PURE__ */ v.query("com.emdashcms.experimental.aggregator.getLatestRelease", {
	params: /* @__PURE__ */ v.object({
		did: /* @__PURE__ */ v.didString(),
		package: /* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(1, 64)])
	}),
	output: {
		type: "lex",
		get schema() {
			return releaseViewSchema;
		}
	}
});
const mainSchema = _mainSchema;

//#endregion
export { mainSchema, getLatestRelease_exports as t };
//# sourceMappingURL=getLatestRelease.js.map