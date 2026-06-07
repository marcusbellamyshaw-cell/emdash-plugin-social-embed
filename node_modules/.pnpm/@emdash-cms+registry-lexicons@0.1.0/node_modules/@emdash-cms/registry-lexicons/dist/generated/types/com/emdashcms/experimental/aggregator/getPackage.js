import { t as __exportAll } from "../../../../../../chunk-BYypO7fO.js";
import { packageViewSchema } from "./defs.js";
import * as v from "@atcute/lexicons/validations";

//#region src/generated/types/com/emdashcms/experimental/aggregator/getPackage.ts
var getPackage_exports = /* @__PURE__ */ __exportAll({ mainSchema: () => mainSchema });
const _mainSchema = /* @__PURE__ */ v.query("com.emdashcms.experimental.aggregator.getPackage", {
	params: /* @__PURE__ */ v.object({
		did: /* @__PURE__ */ v.didString(),
		slug: /* @__PURE__ */ v.constrain(/* @__PURE__ */ v.string(), [/* @__PURE__ */ v.stringLength(1, 64)])
	}),
	output: {
		type: "lex",
		get schema() {
			return packageViewSchema;
		}
	}
});
const mainSchema = _mainSchema;

//#endregion
export { mainSchema, getPackage_exports as t };
//# sourceMappingURL=getPackage.js.map