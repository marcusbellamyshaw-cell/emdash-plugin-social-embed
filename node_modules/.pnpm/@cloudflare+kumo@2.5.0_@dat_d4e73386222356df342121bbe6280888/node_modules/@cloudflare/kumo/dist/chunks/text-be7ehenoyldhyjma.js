"use client";
import { jsx as g } from "react/jsx-runtime";
import { forwardRef as b, useMemo as y } from "react";
import { c as T } from "./cn-ct4n7r74mh8y0f48.js";
import { r as i } from "./resolve-variant-gw6eh7fa4st8ej7m.js";
const s = {
  variant: {
    heading1: {
      classes: "text-3xl font-semibold",
      description: "Large heading for page titles"
    },
    heading2: {
      classes: "text-2xl font-semibold",
      description: "Medium heading for section titles"
    },
    heading3: {
      classes: "text-lg font-semibold",
      description: "Small heading for subsections"
    },
    body: {
      classes: "text-kumo-default",
      description: "Default body text"
    },
    secondary: {
      classes: "text-kumo-subtle",
      description: "Muted text for secondary information"
    },
    success: {
      classes: "text-kumo-link",
      description: "Success state text"
    },
    error: {
      classes: "text-kumo-danger",
      description: "Error state text"
    },
    mono: {
      classes: "font-mono",
      description: "Monospace text for code"
    },
    "mono-secondary": {
      classes: "font-mono text-kumo-subtle",
      description: "Muted monospace text"
    }
  },
  size: {
    xs: {
      classes: "text-xs",
      description: "Extra small text"
    },
    sm: {
      classes: "text-sm",
      description: "Small text"
    },
    base: {
      classes: "text-base",
      description: "Default text size"
    },
    lg: {
      classes: "text-lg",
      description: "Large text"
    }
  }
}, a = {
  variant: "body",
  size: "base"
};
function h({
  variant: e = "body",
  bold: c = !1,
  size: o = "base",
  truncate: r = !1,
  children: l,
  DANGEROUS_className: d,
  DANGEROUS_style: m,
  as: t,
  ...u
}, x) {
  const n = ["body", "secondary", "success", "error"].includes(e), f = ["mono", "mono-secondary"].includes(e), p = y(() => t || (["mono", "mono-secondary"].includes(e) || ["heading1", "heading2", "heading3"].includes(e) ? "span" : "p"), [e, t]);
  return /* @__PURE__ */ g(
    p,
    {
      ref: x,
      className: T(
        "text-kumo-default",
        i(s.variant, e, a.variant).classes,
        n ? i(s.size, o, a.size).classes : "",
        n && c ? "font-medium" : "",
        // Monospace fonts need to be 1pt smaller than body text to optically match
        f && (o === "lg" ? s.size.base.classes : s.size.sm.classes),
        r && "truncate min-w-0",
        d
      ),
      style: m,
      ...u,
      children: l
    }
  );
}
const A = b(h);
export {
  A as T
};
//# sourceMappingURL=text-be7ehenoyldhyjma.js.map
