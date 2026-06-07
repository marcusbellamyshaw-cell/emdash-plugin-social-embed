"use client";
let c = null, h = null;
async function y() {
  return c || h || (h = import("./ai/schemas.js").then((t) => (c = t, c)), h);
}
function l() {
  if (!c)
    throw new Error(
      "Schemas not loaded. Call initCatalog(catalog) first or use async validation."
    );
  return c;
}
function v(t = {}) {
  const { actions: s = {} } = t, r = Object.keys(s);
  return {
    get componentNames() {
      return l().KUMO_COMPONENT_NAMES;
    },
    get actionNames() {
      return r;
    },
    hasComponent(n) {
      try {
        return l().KUMO_COMPONENT_NAMES.includes(n);
      } catch {
        return !1;
      }
    },
    hasAction(n) {
      return n in s;
    },
    validateElement(n) {
      try {
        const e = l(), a = e.UIElementBaseSchema.safeParse(n);
        if (a.success) {
          const u = e.validateElementProps(
            a.data
          );
          return u.success ? { success: !0, data: a.data } : {
            success: !1,
            error: u.error.issues.map((i) => ({
              message: i.message,
              path: ["props", ...i.path]
            }))
          };
        }
        return {
          success: !1,
          error: a.error?.issues.map((u) => ({
            message: u.message,
            path: u.path
          })) ?? [{ message: "Validation failed", path: [] }]
        };
      } catch (e) {
        return {
          success: !1,
          error: [
            {
              message: e instanceof Error ? e.message : "Validation failed",
              path: []
            }
          ]
        };
      }
    },
    validateTree(n) {
      try {
        const a = l().validateUITree(n);
        return a.success ? { success: !0, data: a.data } : {
          success: !1,
          error: a.error.issues.map((u) => ({
            message: u.message,
            path: u.path
          }))
        };
      } catch (e) {
        return {
          success: !1,
          error: [
            {
              message: e instanceof Error ? e.message : "Validation failed",
              path: []
            }
          ]
        };
      }
    },
    generatePrompt() {
      const n = l(), e = [
        "# Kumo Component Catalog",
        "",
        "You are generating UI using Kumo components. Output must be valid JSON matching the UITree schema.",
        "",
        "## Available Components",
        ""
      ];
      for (const a of n.KUMO_COMPONENT_NAMES)
        e.push(`- \`${a}\``);
      if (r.length > 0) {
        e.push(""), e.push("## Available Actions"), e.push("");
        for (const [a, u] of Object.entries(s))
          e.push(`- \`${a}\`: ${u.description}`);
      }
      return e.push(""), e.push("## Output Format"), e.push(""), e.push("```json"), e.push("{"), e.push('  "root": "element-1",'), e.push('  "elements": {'), e.push('    "element-1": {'), e.push('      "key": "element-1",'), e.push('      "type": "ComponentName",'), e.push('      "props": { ... },'), e.push('      "children": ["element-2"],'), e.push(
        '      "visible": true | { "path": "/data/path" } | { "auth": "signedIn" }'
      ), e.push("    }"), e.push("  }"), e.push("}"), e.push("```"), e.push(""), e.push("## Dynamic Values"), e.push(""), e.push(
        'Props can reference data model values using `{ path: "/data/path" }`:'
      ), e.push(""), e.push("```json"), e.push("{"), e.push('  "type": "Text",'), e.push('  "props": {'), e.push('    "children": { "path": "/user/name" }'), e.push("  }"), e.push("}"), e.push("```"), e.push(""), e.join(`
`);
    }
  };
}
async function E(t) {
  t.validateTree({});
}
function p(t, s) {
  if (!s || s === "/")
    return t;
  const r = s.startsWith("/") ? s.slice(1).split("/") : s.split("/");
  let n = t;
  for (const e of r) {
    if (n == null)
      return;
    if (typeof n == "object")
      n = n[e];
    else
      return;
  }
  return n;
}
function b(t, s, r) {
  const n = s.startsWith("/") ? s.slice(1).split("/") : s.split("/");
  if (n.length === 0) return;
  let e = t;
  for (let u = 0; u < n.length - 1; u++) {
    const i = n[u];
    (!(i in e) || typeof e[i] != "object") && (e[i] = {}), e = e[i];
  }
  const a = n[n.length - 1];
  e[a] = r;
}
function m(t) {
  return typeof t == "object" && t !== null && "path" in t && typeof t.path == "string";
}
function o(t, s) {
  if (t != null)
    return m(t) ? p(s, t.path) : t;
}
function d(t, s) {
  const r = {};
  for (const [n, e] of Object.entries(t))
    m(e) ? r[n] = p(s, e.path) : typeof e == "object" && e !== null && !Array.isArray(e) ? r[n] = d(e, s) : r[n] = e;
  return r;
}
function g(t) {
  return t == null ? !1 : typeof t == "boolean" ? t : typeof t == "number" ? t !== 0 : typeof t == "string" || Array.isArray(t) ? t.length > 0 : typeof t == "object" ? Object.keys(t).length > 0 : !!t;
}
function f(t, s) {
  if ("path" in t && !("eq" in t) && !("neq" in t)) {
    const r = p(s.data, t.path);
    return g(r);
  }
  if ("and" in t)
    return t.and.every((r) => f(r, s));
  if ("or" in t)
    return t.or.some((r) => f(r, s));
  if ("not" in t)
    return !f(t.not, s);
  if ("eq" in t) {
    const r = t, n = o(r.eq[0], s.data), e = o(r.eq[1], s.data);
    return n === e;
  }
  if ("neq" in t) {
    const r = t, n = o(r.neq[0], s.data), e = o(r.neq[1], s.data);
    return n !== e;
  }
  if ("gt" in t) {
    const r = t, n = o(r.gt[0], s.data), e = o(r.gt[1], s.data);
    return n > e;
  }
  if ("gte" in t) {
    const r = t, n = o(r.gte[0], s.data), e = o(r.gte[1], s.data);
    return n >= e;
  }
  if ("lt" in t) {
    const r = t, n = o(r.lt[0], s.data), e = o(r.lt[1], s.data);
    return n < e;
  }
  if ("lte" in t) {
    const r = t, n = o(r.lte[0], s.data), e = o(r.lte[1], s.data);
    return n <= e;
  }
  return !0;
}
function A(t, s) {
  if (t === void 0)
    return !0;
  if (typeof t == "boolean")
    return t;
  if ("auth" in t)
    return t.auth === "signedIn" ? s.auth.isSignedIn : t.auth === "signedOut" ? !s.auth.isSignedIn : !0;
  if ("path" in t && !("and" in t) && !("or" in t)) {
    const r = p(s.data, t.path);
    return g(r);
  }
  return f(t, s);
}
function O(t = {}, s = {}) {
  return {
    data: t,
    auth: {
      isSignedIn: s.isSignedIn ?? !1,
      user: s.user
    }
  };
}
export {
  v as createKumoCatalog,
  O as createVisibilityContext,
  A as evaluateVisibility,
  p as getByPath,
  E as initCatalog,
  m as isDynamicPath,
  y as loadSchemas,
  o as resolveDynamicValue,
  d as resolveProps,
  b as setByPath
};
//# sourceMappingURL=catalog.js.map
