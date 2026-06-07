"use client";
import { jsxs as i, jsx as s } from "react/jsx-runtime";
import { forwardRef as E, isValidElement as x } from "react";
import { c as a } from "./cn-ct4n7r74mh8y0f48.js";
import { r as p } from "./resolve-variant-gw6eh7fa4st8ej7m.js";
const R = "flex w-full items-start gap-3 rounded-lg px-4 py-3 text-base", v = {
  variant: {
    default: {
      classes: "bg-kumo-banner-info text-kumo-info",
      iconClasses: "text-kumo-info",
      description: "Informational banner for general messages"
    },
    alert: {
      classes: "bg-kumo-banner-warning text-kumo-warning",
      iconClasses: "text-kumo-warning",
      description: "Warning banner for cautionary messages"
    },
    error: {
      classes: "bg-kumo-danger-tint/60 text-kumo-danger",
      iconClasses: "text-kumo-danger",
      description: "Error banner for critical issues"
    },
    secondary: {
      classes: "bg-kumo-contrast/5 text-kumo-subtle",
      iconClasses: "text-kumo-subtle",
      description: "Neutral banner for secondary messages"
    }
  }
}, l = {
  variant: "default"
};
function N({
  variant: e = l.variant
} = {}) {
  const n = p(
    v.variant,
    e,
    l.variant
  );
  return a(
    // Base styles (exported as KUMO_BANNER_BASE_STYLES for Figma plugin)
    R,
    // Apply variant styles from KUMO_BANNER_VARIANTS
    n.classes
  );
}
var A = /* @__PURE__ */ ((e) => (e[e.DEFAULT = 0] = "DEFAULT", e[e.ALERT = 1] = "ALERT", e[e.ERROR = 2] = "ERROR", e))(A || {});
const T = E(function({
  icon: n,
  title: t,
  description: r,
  action: m,
  children: b,
  text: h,
  variant: o = l.variant,
  className: d,
  ...u
}, f) {
  const g = p(
    v.variant,
    o,
    l.variant
  );
  if (t || r)
    return /* @__PURE__ */ i(
      "div",
      {
        ref: f,
        className: a(N({ variant: o }), d),
        ...u,
        children: [
          n && /* @__PURE__ */ s(
            "span",
            {
              className: a(
                "shrink-0 flex items-center h-[1.375em]",
                g.iconClasses
              ),
              children: n
            }
          ),
          /* @__PURE__ */ i(
            "div",
            {
              className: a(
                "flex min-w-0 flex-1 items-center justify-between gap-3",
                !t && "pt-px"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
                  t && /* @__PURE__ */ s("p", { className: "font-medium leading-snug", children: t }),
                  r && /* @__PURE__ */ s("div", { className: "text-sm leading-snug", children: x(r) ? r : /* @__PURE__ */ s("p", { children: r }) })
                ] }),
                m && /* @__PURE__ */ s("div", { className: "flex shrink-0 items-center gap-2", children: m })
              ]
            }
          )
        ]
      }
    );
  const c = b ?? h, k = x(c) ? c : /* @__PURE__ */ s("p", { children: c });
  return /* @__PURE__ */ i(
    "div",
    {
      ref: f,
      className: a(N({ variant: o }), d),
      ...u,
      children: [
        n && /* @__PURE__ */ s("span", { className: a("shrink-0", g.iconClasses), children: n }),
        k
      ]
    }
  );
});
T.displayName = "Banner";
export {
  T as B,
  A as a
};
//# sourceMappingURL=banner-es5iwuk4pf25e29e.js.map
