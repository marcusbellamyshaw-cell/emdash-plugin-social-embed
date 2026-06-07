"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function dehydrateSsrMatchId(id) {
  return id.replaceAll("/", "\0");
}
function hydrateSsrMatchId(id) {
  return id.replaceAll("\0", "/").replaceAll("�", "/");
}
exports.dehydrateSsrMatchId = dehydrateSsrMatchId;
exports.hydrateSsrMatchId = hydrateSsrMatchId;
//# sourceMappingURL=ssr-match-id.cjs.map
