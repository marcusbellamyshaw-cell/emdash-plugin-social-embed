"use client";
function t(n, o, e) {
  const r = n[o];
  return r !== void 0 ? r : (process.env.NODE_ENV !== "production" && console.warn(
    `[kumo] Unknown variant "${o}". Expected one of: ${Object.keys(n).join(", ")}. Falling back to "${e}".`
  ), n[e]);
}
export {
  t as r
};
//# sourceMappingURL=resolve-variant-gw6eh7fa4st8ej7m.js.map
