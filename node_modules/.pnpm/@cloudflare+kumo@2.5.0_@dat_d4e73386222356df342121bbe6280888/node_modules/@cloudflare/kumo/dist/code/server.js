import { jsx as p } from "react/jsx-runtime";
const h = {
  javascript: () => import("../chunks/javascript-hhx3avh9uv2o27ay.js"),
  typescript: () => import("../chunks/typescript-k4ggjrxhrhcdni6u.js"),
  jsx: () => import("../chunks/jsx-ij885l2li2lzfoss.js"),
  tsx: () => import("../chunks/tsx-ehy8lrzet6v54zur.js"),
  json: () => import("../chunks/json-jovp9qemdkp5cziz.js"),
  jsonc: () => import("../chunks/jsonc-jbkkgjer6ispw2u3.js"),
  html: () => import("../chunks/html-kl304jmqj4jxj777.js"),
  css: () => import("../chunks/css-d1mi3wy1sl3fzekh.js"),
  python: () => import("../chunks/python-gg755pb8oe9ra1d1.js"),
  yaml: () => import("../chunks/yaml-e2v22lr79tss2brj.js"),
  markdown: () => import("../chunks/markdown-n2vyyq7l68fy32wc.js"),
  graphql: () => import("../chunks/graphql-ft2h47erta7isqn4.js"),
  sql: () => import("../chunks/sql-ovukp5mrfunfk5tv.js"),
  bash: () => import("../chunks/bash-g5z23u7me5rx7bzt.js").then((t) => t.b),
  shell: () => import("../chunks/bash-g5z23u7me5rx7bzt.js").then((t) => t.s),
  diff: () => import("../chunks/diff-cpj1h9lg0bw716mj.js"),
  hcl: () => import("../chunks/hcl-hcu7d6ja6t540ijn.js"),
  toml: () => import("../chunks/toml-nczb2z9n0o23o3ci.js")
};
async function u(t, i, r = {}) {
  const { createHighlighterCore: n } = await import("shiki/core"), a = (r.engine ?? "javascript") === "wasm" ? await import("shiki/engine/oniguruma").then(
    (g) => g.createOnigurumaEngine(import("shiki/wasm"))
  ) : await import("shiki/engine/javascript").then(
    (g) => g.createJavaScriptRegexEngine()
  ), [s, m] = await Promise.all([
    import("../chunks/github-light-ulev8flhimfg79ob.js"),
    import("../chunks/vesper-ebfu9ns65f2v830s.js")
  ]), o = await h[i](), e = await n({
    themes: [s.default, m.default],
    langs: [o.default],
    engine: a
  }), l = e.codeToHtml(t, {
    lang: i,
    themes: {
      light: "github-light",
      dark: "vesper"
    }
  });
  return e.dispose(), l;
}
async function w(t) {
  const { createHighlighterCore: i } = await import("shiki/core"), n = (t.engine ?? "javascript") === "wasm" ? await import("shiki/engine/oniguruma").then(
    (e) => e.createOnigurumaEngine(import("shiki/wasm"))
  ) : await import("shiki/engine/javascript").then(
    (e) => e.createJavaScriptRegexEngine()
  ), [c, a] = await Promise.all([
    import("../chunks/github-light-ulev8flhimfg79ob.js"),
    import("../chunks/vesper-ebfu9ns65f2v830s.js")
  ]), s = t.languages.filter(
    (e) => e in h
  ), m = await Promise.all(
    s.map((e) => h[e]())
  ), o = await i({
    themes: [c.default, a.default],
    langs: m.map((e) => e.default),
    engine: n
  });
  return {
    highlight: (e, l) => o.codeToHtml(e, {
      lang: l,
      themes: {
        light: "github-light",
        dark: "vesper"
      }
    }),
    dispose: () => {
      o.dispose();
    }
  };
}
function f({ html: t, className: i }) {
  const r = i ? `group relative w-full min-w-0 rounded-md border border-kumo-fill bg-kumo-base ${i}` : "group relative w-full min-w-0 rounded-md border border-kumo-fill bg-kumo-base";
  return /* @__PURE__ */ p("div", { className: r, children: /* @__PURE__ */ p("div", { className: "overflow-x-auto", children: /* @__PURE__ */ p(
    "div",
    {
      className: "kumo-shiki [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed",
      dangerouslySetInnerHTML: { __html: t }
    }
  ) }) });
}
export {
  f as CodeBlock,
  w as createServerHighlighter,
  u as highlightCode
};
//# sourceMappingURL=server.js.map
