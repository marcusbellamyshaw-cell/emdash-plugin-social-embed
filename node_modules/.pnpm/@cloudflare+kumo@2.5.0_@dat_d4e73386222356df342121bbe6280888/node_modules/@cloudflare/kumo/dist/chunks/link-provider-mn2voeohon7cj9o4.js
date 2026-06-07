"use client";
import { jsx as t } from "react/jsx-runtime";
import { createContext as a, forwardRef as c, useContext as s } from "react";
const e = c(
  function({ to: n, href: i, ...u }, f) {
    return /* @__PURE__ */ t("a", { ref: f, href: i ?? n ?? void 0, ...u });
  }
), r = a(e);
function C() {
  return s(r);
}
function x({
  component: o,
  children: n
}) {
  return /* @__PURE__ */ t(r.Provider, { value: o ?? e, children: n });
}
export {
  x as L,
  C as u
};
//# sourceMappingURL=link-provider-mn2voeohon7cj9o4.js.map
