"use client";
import { jsx as l } from "react/jsx-runtime";
import a from "react";
import { c as d } from "./cn-ct4n7r74mh8y0f48.js";
import { r as n } from "./resolve-variant-gw6eh7fa4st8ej7m.js";
const g = {
  variant: {
    "2up": {
      classes: "grid-cols-1 md:grid-cols-2",
      description: "Grid items stack on small screens, display side-by-side on medium screens and up"
    },
    "side-by-side": {
      classes: "grid-cols-2",
      description: "Grid items always displayed side-by-side"
    },
    "2-1": {
      classes: "grid-cols-1 md:grid-cols-[2fr_1fr]",
      description: "Two-thirds / one-third split (66%/33%) on medium screens and up"
    },
    "1-2": {
      classes: "grid-cols-1 md:grid-cols-[1fr_2fr]",
      description: "One-third / two-thirds split (33%/66%) on medium screens and up"
    },
    "1-3up": {
      classes: "grid-cols-1 lg:grid-cols-3",
      description: "Grid items stack on small screens, expand to 3 across on large screens"
    },
    "3up": {
      classes: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      description: "Grid items stack on small screens, 2 across on medium, 3 across on large"
    },
    "4up": {
      classes: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      description: "Grid items stack on small screens, progressively increase columns at larger breakpoints"
    },
    "6up": {
      classes: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
      description: "Grid items start at 2 across, expand to 6 across on XL"
    },
    "1-2-4up": {
      classes: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      description: "Grid items stack on small screens, 2 across on medium, 4 across on large"
    }
  },
  gap: {
    none: {
      classes: "gap-0",
      description: "No gap between grid items"
    },
    sm: {
      classes: "gap-3",
      description: "Small gap between grid items"
    },
    base: {
      classes: "gap-2 md:gap-6 lg:gap-8",
      description: "Default responsive gap between grid items"
    },
    lg: {
      classes: "gap-8",
      description: "Large gap between grid items"
    }
  }
}, t = {
  gap: "base"
}, p = a.createContext({
  gap: "base"
});
function u({
  variant: s,
  gap: e = t.gap
} = {}) {
  return d(
    "grid",
    s && n(g.variant, s, "2up").classes,
    n(g.gap, e, t.gap).classes
  );
}
function b({
  variant: s,
  mobileDivider: e
} = {}) {
  return d(
    e && s === "4up" && "border-b border-kumo-hairline pb-8 md:border-b-0 md:pb-0"
  );
}
const f = a.forwardRef(
  ({
    children: s,
    className: e,
    mobileDivider: o,
    gap: r = t.gap,
    variant: i,
    ...c
  }, m) => /* @__PURE__ */ l(p.Provider, { value: { variant: i, gap: r, mobileDivider: o }, children: /* @__PURE__ */ l(
    "div",
    {
      ref: m,
      className: d(u({ variant: i, gap: r }), e),
      ...c,
      children: s
    }
  ) })
);
f.displayName = "Grid";
const G = a.forwardRef(
  ({ children: s, className: e, ...o }, r) => {
    const { variant: i, mobileDivider: c } = a.useContext(p);
    return /* @__PURE__ */ l(
      "div",
      {
        ref: r,
        className: d(b({ variant: i, mobileDivider: c }), e),
        ...o,
        children: s
      }
    );
  }
);
G.displayName = "GridItem";
export {
  f as G,
  g as K,
  G as a,
  b,
  t as c,
  u as g
};
//# sourceMappingURL=grid-do93dv1rjggqxx7p.js.map
