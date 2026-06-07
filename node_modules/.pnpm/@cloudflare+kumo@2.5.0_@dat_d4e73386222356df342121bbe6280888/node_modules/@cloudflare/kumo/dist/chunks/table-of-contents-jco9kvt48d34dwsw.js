"use client";
import { jsx as e, jsxs as f } from "react/jsx-runtime";
import { forwardRef as o, isValidElement as k, cloneElement as h } from "react";
import { c as n } from "./cn-ct4n7r74mh8y0f48.js";
const m = {
  state: {
    default: {
      classes: "text-kumo-subtle hover:border-kumo-line hover:text-kumo-default hover:font-medium",
      description: "Inactive section link"
    },
    active: {
      classes: "border-kumo-brand font-medium text-kumo-default",
      description: "Currently visible / active section"
    }
  }
}, A = {
  state: "default"
}, p = "block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-sm text-left no-underline", T = o(
  ({ className: t, "aria-label": a = "Table of contents", ...s }, l) => /* @__PURE__ */ e("nav", { ref: l, "aria-label": a, className: t, ...s })
), N = o(({ className: t, ...a }, s) => /* @__PURE__ */ e(
  "p",
  {
    ref: s,
    className: n(
      "mb-3 text-xs font-semibold tracking-wide text-kumo-subtle uppercase",
      t
    ),
    ...a
  }
)), C = o(({ className: t, ...a }, s) => /* @__PURE__ */ e(
  "ul",
  {
    ref: s,
    className: n(
      "flex flex-col gap-2 border-l-2 border-kumo-hairline",
      t
    ),
    ...a
  }
)), x = o(({ active: t = !1, className: a, children: s, render: l, ...i }, r) => {
  const c = t ? m.state.active.classes : m.state.default.classes, u = n(p, c, a), d = {
    ref: r,
    "aria-current": t ? "true" : void 0,
    "data-kumo-component": "TableOfContents",
    "data-kumo-part": "item",
    className: u,
    children: /* @__PURE__ */ e("span", { className: "block min-w-0 leading-5", children: s }),
    ...i
  };
  return l && k(l) ? /* @__PURE__ */ e("li", { className: "-ml-0.5", children: h(l, d) }) : /* @__PURE__ */ e("li", { className: "-ml-0.5", children: /* @__PURE__ */ e("a", { ...d }) });
}), b = "flex flex-col gap-2 border-l-2 border-kumo-hairline [&>li>a]:pl-7 [&>li>button]:pl-7", O = o(({ label: t, href: a, active: s = !1, className: l, children: i, ...r }, c) => {
  if (a) {
    const u = s ? m.state.active.classes : m.state.default.classes;
    return /* @__PURE__ */ f(
      "li",
      {
        ref: c,
        className: n("-ml-0.5 flex flex-col gap-2", l),
        ...r,
        children: [
          /* @__PURE__ */ e(
            "a",
            {
              href: a,
              "aria-current": s ? "true" : void 0,
              "data-kumo-component": "TableOfContents",
              "data-kumo-part": "group-link",
              className: n(p, u),
              children: /* @__PURE__ */ e("span", { className: "block min-w-0 leading-5", children: t })
            }
          ),
          /* @__PURE__ */ e("ul", { className: n(b), children: i })
        ]
      }
    );
  }
  return /* @__PURE__ */ f(
    "li",
    {
      ref: c,
      className: n("-ml-0.5 flex flex-col gap-2", l),
      ...r,
      children: [
        /* @__PURE__ */ e("p", { className: "py-0.5 pl-4 text-sm leading-5 font-medium text-kumo-subtle", children: t }),
        /* @__PURE__ */ e("ul", { className: n(b), children: i })
      ]
    }
  );
});
T.displayName = "TableOfContents";
N.displayName = "TableOfContents.Title";
C.displayName = "TableOfContents.List";
x.displayName = "TableOfContents.Item";
O.displayName = "TableOfContents.Group";
const S = Object.assign(T, {
  Title: N,
  List: C,
  Item: x,
  Group: O
});
export {
  m as K,
  S as T,
  A as a
};
//# sourceMappingURL=table-of-contents-jco9kvt48d34dwsw.js.map
