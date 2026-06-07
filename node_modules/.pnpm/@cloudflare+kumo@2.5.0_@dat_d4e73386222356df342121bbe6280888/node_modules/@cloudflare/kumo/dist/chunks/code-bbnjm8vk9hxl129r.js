"use client";
import { jsx as o } from "react/jsx-runtime";
import { c as a } from "./cn-ct4n7r74mh8y0f48.js";
import { r as l } from "./resolve-variant-gw6eh7fa4st8ej7m.js";
const d = {
  lang: {
    ts: {
      classes: "",
      description: "TypeScript code"
    },
    tsx: {
      classes: "",
      description: "TypeScript JSX code"
    },
    jsonc: {
      classes: "",
      description: "JSON with comments"
    },
    bash: {
      classes: "",
      description: "Shell/Bash commands"
    },
    css: {
      classes: "",
      description: "CSS styles"
    }
  }
}, n = {
  lang: "ts"
};
function m({
  lang: s = n.lang
} = {}) {
  return a(
    // Base styles
    "m-0 w-auto rounded-none border-none bg-transparent p-0 font-mono text-sm leading-[20px] text-kumo-subtle",
    // Apply lang-specific styles (fallback to default if lang not in map)
    l(d.lang, s, n.lang).classes
  );
}
function t({
  code: s,
  lang: e = n.lang,
  className: r,
  style: i
}) {
  return /* @__PURE__ */ o("pre", { className: a(m({ lang: e }), r), style: i, children: s });
}
t.displayName = "Code";
function c({ code: s, lang: e }) {
  return /* @__PURE__ */ o("div", { className: "min-w-0 rounded-md border border-kumo-fill bg-kumo-base [&>pre]:p-2.5!", children: /* @__PURE__ */ o(t, { lang: e, code: s }) });
}
c.displayName = "CodeBlock";
const g = Object.assign(t, {
  Block: c
}), b = c;
export {
  g as C,
  b as a
};
//# sourceMappingURL=code-bbnjm8vk9hxl129r.js.map
