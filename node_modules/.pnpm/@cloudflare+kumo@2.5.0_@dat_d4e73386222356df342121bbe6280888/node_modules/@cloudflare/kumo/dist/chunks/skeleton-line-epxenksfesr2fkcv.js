"use client";
import { jsx as a } from "react/jsx-runtime";
import { useMemo as y } from "react";
import { c as M } from "./cn-ct4n7r74mh8y0f48.js";
const $ = (e, t) => Math.floor(Math.random() * (t - e + 1) + e), i = (e, t) => (Math.random() * (t - e) + e).toFixed(2), x = ({
  minWidth: e = 30,
  maxWidth: t = 100,
  minDuration: s = 1.3,
  maxDuration: n = 1.7,
  minDelay: r = 0,
  maxDelay: d = 0.5,
  blockHeight: o,
  className: c
}) => {
  const { width: m, duration: f, delay: h } = y(() => ({
    width: $(e, t),
    duration: i(s, n),
    delay: i(r, d)
  }), [e, t, s, n, r, d]), u = {
    "--skeleton-width": `${m}%`,
    "--shimmer-duration": `${f}s`,
    "--shimmer-delay": `${h}s`
  }, l = /* @__PURE__ */ a("div", { className: M("skeleton-line", c), style: u });
  if (o !== void 0) {
    const p = typeof o == "number" ? `${o}px` : o;
    return /* @__PURE__ */ a("div", { className: "flex items-center", style: { height: p }, children: l });
  }
  return l;
};
export {
  x as S
};
//# sourceMappingURL=skeleton-line-epxenksfesr2fkcv.js.map
