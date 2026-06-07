"use client";
import { jsxs as c, jsx as l } from "react/jsx-runtime";
import { c as o } from "./cn-ct4n7r74mh8y0f48.js";
import { r as n } from "./resolve-variant-gw6eh7fa4st8ej7m.js";
const u = "inline-flex w-fit flex-none shrink-0 items-center justify-self-start rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap", i = {
  variant: {
    /** Semantic token badges */
    primary: {
      classes: "bg-kumo-badge-inverted text-kumo-badge-inverted",
      description: "Primary badge"
    },
    secondary: {
      classes: "bg-kumo-fill text-kumo-badge-neutral-subtle",
      description: "Secondary badge"
    },
    error: {
      classes: "bg-kumo-danger-tint/60 text-kumo-danger",
      description: "Error badge"
    },
    warning: {
      classes: "bg-kumo-warning-tint/70 text-kumo-warning",
      description: "Warning badge"
    },
    success: {
      classes: "bg-kumo-success-tint/70 text-kumo-success",
      description: "Success badge"
    },
    destructive: {
      classes: "bg-kumo-badge-red text-white",
      description: "Deprecated. Use red instead."
    },
    info: {
      classes: "bg-kumo-info-tint/70 text-kumo-info",
      description: "Info badge"
    },
    beta: {
      classes: "border border-dashed border-kumo-brand bg-transparent text-kumo-link",
      description: "Indicates beta or experimental features"
    },
    outline: {
      classes: "border border-kumo-fill bg-transparent text-kumo-default",
      description: "Bordered badge with transparent background"
    },
    /** Other color token variants */
    red: {
      classes: "bg-kumo-badge-red text-white",
      description: "Red badge"
    },
    green: {
      classes: "bg-kumo-badge-green text-white",
      description: "Green badge"
    },
    neutral: {
      classes: "bg-kumo-badge-neutral text-white",
      description: "Neutral badge"
    },
    orange: {
      classes: "bg-kumo-badge-orange text-black",
      description: "Orange badge"
    },
    purple: {
      classes: "bg-kumo-badge-purple text-white",
      description: "Purple badge"
    },
    teal: {
      classes: "bg-kumo-badge-teal text-white",
      description: "Teal badge"
    },
    "teal-subtle": {
      classes: "bg-kumo-badge-teal-subtle text-kumo-badge-teal-subtle",
      description: "Subtle teal badge"
    },
    blue: {
      classes: "bg-kumo-badge-blue text-white",
      description: "Blue badge"
    }
  },
  appearance: {
    filled: {
      classes: "",
      description: "Filled badge with background color (default)"
    },
    dot: {
      classes: "gap-1.5 bg-transparent text-kumo-default ring ring-kumo-hairline",
      description: "Outlined badge with a colored circle dot indicating status"
    }
  },
  dotColor: {
    none: {
      classes: "",
      description: "No dot indicator (used when appearance is not dot, or variant has no dot color)"
    },
    success: {
      classes: "bg-kumo-success",
      description: "Green dot for success status"
    },
    warning: {
      classes: "bg-kumo-badge-orange",
      description: "Orange dot for warning status"
    },
    error: {
      classes: "bg-kumo-badge-red",
      description: "Red dot for error status"
    },
    neutral: {
      classes: "bg-kumo-badge-neutral",
      description: "Neutral dot for informational status"
    }
  }
}, e = {
  variant: "primary",
  appearance: "filled",
  dotColor: "none"
};
function g({
  variant: t = e.variant,
  appearance: s = e.appearance
} = {}) {
  const a = n(
    i.variant,
    t,
    e.variant
  ).classes, r = n(
    i.appearance,
    s,
    e.appearance
  ).classes;
  return o(
    // Base styles (exported as KUMO_BADGE_BASE_STYLES for Figma plugin)
    u,
    // The dot appearance overrides background/text colors from the variant,
    // so only apply variant classes when we're not in dot mode.
    s === "dot" ? "" : a,
    r
  );
}
function k({
  variant: t = e.variant,
  appearance: s = e.appearance,
  className: a,
  children: r
}) {
  const d = s === "dot" ? n(
    i.dotColor,
    t,
    e.dotColor
  ).classes : "";
  return /* @__PURE__ */ c("span", { className: o(g({ variant: t, appearance: s }), a), children: [
    d ? /* @__PURE__ */ l(
      "span",
      {
        "aria-hidden": "true",
        className: o("size-1.75 rounded-full shrink-0", d)
      }
    ) : null,
    r
  ] });
}
export {
  k as B,
  u as K
};
//# sourceMappingURL=badge-c1th6h6ahz7eu49q.js.map
