"use client";
import * as C from "react";
import { useLayoutEffect as qt } from "react";
import * as Yt from "react-dom";
function at() {
  return typeof window < "u";
}
function tt(t) {
  return Ft(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function T(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function _(t) {
  var e;
  return (e = (Ft(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Ft(t) {
  return at() ? t instanceof Node || t instanceof T(t).Node : !1;
}
function F(t) {
  return at() ? t instanceof Element || t instanceof T(t).Element : !1;
}
function j(t) {
  return at() ? t instanceof HTMLElement || t instanceof T(t).HTMLElement : !1;
}
function At(t) {
  return !at() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof T(t).ShadowRoot;
}
function nt(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = W(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && i !== "inline" && i !== "contents";
}
function Ut(t) {
  return /^(table|td|th)$/.test(tt(t));
}
function ut(t) {
  try {
    if (t.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return t.matches(":modal");
  } catch {
    return !1;
  }
}
const Kt = /transform|translate|scale|rotate|perspective|filter/, Gt = /paint|layout|strict|content/, U = (t) => !!t && t !== "none";
let ht;
function yt(t) {
  const e = F(t) ? W(t) : t;
  return U(e.transform) || U(e.translate) || U(e.scale) || U(e.rotate) || U(e.perspective) || !vt() && (U(e.backdropFilter) || U(e.filter)) || Kt.test(e.willChange || "") || Gt.test(e.contain || "");
}
function Jt(t) {
  let e = q(t);
  for (; j(e) && !Q(e); ) {
    if (yt(e))
      return e;
    if (ut(e))
      return null;
    e = q(e);
  }
  return null;
}
function vt() {
  return ht == null && (ht = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), ht;
}
function Q(t) {
  return /^(html|body|#document)$/.test(tt(t));
}
function W(t) {
  return T(t).getComputedStyle(t);
}
function dt(t) {
  return F(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function q(t) {
  if (tt(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    At(t) && t.host || // Fallback.
    _(t)
  );
  return At(e) ? e.host : e;
}
function Wt(t) {
  const e = q(t);
  return Q(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : j(e) && nt(e) ? e : Wt(e);
}
function et(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Wt(t), s = i === ((o = t.ownerDocument) == null ? void 0 : o.body), r = T(i);
  if (s) {
    const c = wt(r);
    return e.concat(r, r.visualViewport || [], nt(i) ? i : [], c && n ? et(c) : []);
  } else
    return e.concat(i, et(i, [], n));
}
function wt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
const Qt = ["top", "right", "bottom", "left"], Z = Math.min, M = Math.max, rt = Math.round, it = Math.floor, N = (t) => ({
  x: t,
  y: t
}), Zt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ot(t, e, n) {
  return M(t, Z(e, n));
}
function Y(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function z(t) {
  return t.split("-")[0];
}
function ot(t) {
  return t.split("-")[1];
}
function bt(t) {
  return t === "x" ? "y" : "x";
}
function $t(t) {
  return t === "y" ? "height" : "width";
}
function B(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function Bt(t) {
  return bt(B(t));
}
function te(t, e, n) {
  n === void 0 && (n = !1);
  const o = ot(t), i = Bt(t), s = $t(i);
  let r = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (r = ct(r)), [r, ct(r)];
}
function ee(t) {
  const e = ct(t);
  return [xt(t), e, xt(e)];
}
function xt(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const Ct = ["left", "right"], St = ["right", "left"], ne = ["top", "bottom"], oe = ["bottom", "top"];
function ie(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? St : Ct : e ? Ct : St;
    case "left":
    case "right":
      return e ? ne : oe;
    default:
      return [];
  }
}
function se(t, e, n, o) {
  const i = ot(t);
  let s = ie(z(t), n === "start", o);
  return i && (s = s.map((r) => r + "-" + i), e && (s = s.concat(s.map(xt)))), s;
}
function ct(t) {
  const e = z(t);
  return Zt[e] + t.slice(e.length);
}
function re(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ce(t) {
  return typeof t != "number" ? re(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function lt(t) {
  const {
    x: e,
    y: n,
    width: o,
    height: i
  } = t;
  return {
    width: o,
    height: i,
    top: n,
    left: e,
    right: e + o,
    bottom: n + i,
    x: e,
    y: n
  };
}
function Et(t, e, n) {
  let {
    reference: o,
    floating: i
  } = t;
  const s = B(e), r = Bt(e), c = $t(r), f = z(e), d = s === "y", l = o.x + o.width / 2 - i.width / 2, a = o.y + o.height / 2 - i.height / 2, m = o[c] / 2 - i[c] / 2;
  let u;
  switch (f) {
    case "top":
      u = {
        x: l,
        y: o.y - i.height
      };
      break;
    case "bottom":
      u = {
        x: l,
        y: o.y + o.height
      };
      break;
    case "right":
      u = {
        x: o.x + o.width,
        y: a
      };
      break;
    case "left":
      u = {
        x: o.x - i.width,
        y: a
      };
      break;
    default:
      u = {
        x: o.x,
        y: o.y
      };
  }
  switch (ot(e)) {
    case "start":
      u[r] -= m * (n && d ? -1 : 1);
      break;
    case "end":
      u[r] += m * (n && d ? -1 : 1);
      break;
  }
  return u;
}
async function le(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: o,
    y: i,
    platform: s,
    rects: r,
    elements: c,
    strategy: f
  } = t, {
    boundary: d = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: a = "floating",
    altBoundary: m = !1,
    padding: u = 0
  } = Y(e, t), h = ce(u), x = c[m ? a === "floating" ? "reference" : "floating" : a], p = lt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(x))) == null || n ? x : x.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(c.floating)),
    boundary: d,
    rootBoundary: l,
    strategy: f
  })), v = a === "floating" ? {
    x: o,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c.floating)), w = await (s.isElement == null ? void 0 : s.isElement(y)) ? await (s.getScale == null ? void 0 : s.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, b = lt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: v,
    offsetParent: y,
    strategy: f
  }) : v);
  return {
    top: (p.top - b.top + h.top) / w.y,
    bottom: (b.bottom - p.bottom + h.bottom) / w.y,
    left: (p.left - b.left + h.left) / w.x,
    right: (b.right - p.right + h.right) / w.x
  };
}
const fe = 50, ae = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: r
  } = n, c = r.detectOverflow ? r : {
    ...r,
    detectOverflow: le
  }, f = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let d = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: l,
    y: a
  } = Et(d, o, f), m = o, u = 0;
  const h = {};
  for (let g = 0; g < s.length; g++) {
    const x = s[g];
    if (!x)
      continue;
    const {
      name: p,
      fn: v
    } = x, {
      x: y,
      y: w,
      data: b,
      reset: A
    } = await v({
      x: l,
      y: a,
      initialPlacement: o,
      placement: m,
      strategy: i,
      middlewareData: h,
      rects: d,
      platform: c,
      elements: {
        reference: t,
        floating: e
      }
    });
    l = y ?? l, a = w ?? a, h[p] = {
      ...h[p],
      ...b
    }, A && u < fe && (u++, typeof A == "object" && (A.placement && (m = A.placement), A.rects && (d = A.rects === !0 ? await r.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : A.rects), {
      x: l,
      y: a
    } = Et(d, m, f)), g = -1);
  }
  return {
    x: l,
    y: a,
    placement: m,
    strategy: i,
    middlewareData: h
  };
}, ue = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        middlewareData: s,
        rects: r,
        initialPlacement: c,
        platform: f,
        elements: d
      } = e, {
        mainAxis: l = !0,
        crossAxis: a = !0,
        fallbackPlacements: m,
        fallbackStrategy: u = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: g = !0,
        ...x
      } = Y(t, e);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const p = z(i), v = B(c), y = z(c) === c, w = await (f.isRTL == null ? void 0 : f.isRTL(d.floating)), b = m || (y || !g ? [ct(c)] : ee(c)), A = h !== "none";
      !m && A && b.push(...se(c, g, h, w));
      const O = [c, ...b], D = await f.detectOverflow(e, x), H = [];
      let S = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (l && H.push(D[p]), a) {
        const k = te(i, r, w);
        H.push(D[k[0]], D[k[1]]);
      }
      if (S = [...S, {
        placement: i,
        overflows: H
      }], !H.every((k) => k <= 0)) {
        var V, I;
        const k = (((V = s.flip) == null ? void 0 : V.index) || 0) + 1, G = O[k];
        if (G && (!(a === "alignment" ? v !== B(G) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        S.every((R) => B(R.placement) === v ? R.overflows[0] > 0 : !0)))
          return {
            data: {
              index: k,
              overflows: S
            },
            reset: {
              placement: G
            }
          };
        let E = (I = S.filter(($) => $.overflows[0] <= 0).sort(($, R) => $.overflows[1] - R.overflows[1])[0]) == null ? void 0 : I.placement;
        if (!E)
          switch (u) {
            case "bestFit": {
              var P;
              const $ = (P = S.filter((R) => {
                if (A) {
                  const L = B(R.placement);
                  return L === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((R) => [R.placement, R.overflows.filter((L) => L > 0).reduce((L, X) => L + X, 0)]).sort((R, L) => R[1] - L[1])[0]) == null ? void 0 : P[0];
              $ && (E = $);
              break;
            }
            case "initialPlacement":
              E = c;
              break;
          }
        if (i !== E)
          return {
            reset: {
              placement: E
            }
          };
      }
      return {};
    }
  };
};
function Lt(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Mt(t) {
  return Qt.some((e) => t[e] >= 0);
}
const de = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n,
        platform: o
      } = e, {
        strategy: i = "referenceHidden",
        ...s
      } = Y(t, e);
      switch (i) {
        case "referenceHidden": {
          const r = await o.detectOverflow(e, {
            ...s,
            elementContext: "reference"
          }), c = Lt(r, n.reference);
          return {
            data: {
              referenceHiddenOffsets: c,
              referenceHidden: Mt(c)
            }
          };
        }
        case "escaped": {
          const r = await o.detectOverflow(e, {
            ...s,
            altBoundary: !0
          }), c = Lt(r, n.floating);
          return {
            data: {
              escapedOffsets: c,
              escaped: Mt(c)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Nt = /* @__PURE__ */ new Set(["left", "top"]);
async function me(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, s = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), r = z(n), c = ot(n), f = B(n) === "y", d = Nt.has(r) ? -1 : 1, l = s && f ? -1 : 1, a = Y(e, t);
  let {
    mainAxis: m,
    crossAxis: u,
    alignmentAxis: h
  } = typeof a == "number" ? {
    mainAxis: a,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: a.mainAxis || 0,
    crossAxis: a.crossAxis || 0,
    alignmentAxis: a.alignmentAxis
  };
  return c && typeof h == "number" && (u = c === "end" ? h * -1 : h), f ? {
    x: u * l,
    y: m * d
  } : {
    x: m * d,
    y: u * l
  };
}
const he = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: i,
        y: s,
        placement: r,
        middlewareData: c
      } = e, f = await me(e, t);
      return r === ((n = c.offset) == null ? void 0 : n.placement) && (o = c.arrow) != null && o.alignmentOffset ? {} : {
        x: i + f.x,
        y: s + f.y,
        data: {
          ...f,
          placement: r
        }
      };
    }
  };
}, ge = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: i,
        platform: s
      } = e, {
        mainAxis: r = !0,
        crossAxis: c = !1,
        limiter: f = {
          fn: (p) => {
            let {
              x: v,
              y
            } = p;
            return {
              x: v,
              y
            };
          }
        },
        ...d
      } = Y(t, e), l = {
        x: n,
        y: o
      }, a = await s.detectOverflow(e, d), m = B(z(i)), u = bt(m);
      let h = l[u], g = l[m];
      if (r) {
        const p = u === "y" ? "top" : "left", v = u === "y" ? "bottom" : "right", y = h + a[p], w = h - a[v];
        h = Ot(y, h, w);
      }
      if (c) {
        const p = m === "y" ? "top" : "left", v = m === "y" ? "bottom" : "right", y = g + a[p], w = g - a[v];
        g = Ot(y, g, w);
      }
      const x = f.fn({
        ...e,
        [u]: h,
        [m]: g
      });
      return {
        ...x,
        data: {
          x: x.x - n,
          y: x.y - o,
          enabled: {
            [u]: r,
            [m]: c
          }
        }
      };
    }
  };
}, pe = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      const {
        x: n,
        y: o,
        placement: i,
        rects: s,
        middlewareData: r
      } = e, {
        offset: c = 0,
        mainAxis: f = !0,
        crossAxis: d = !0
      } = Y(t, e), l = {
        x: n,
        y: o
      }, a = B(i), m = bt(a);
      let u = l[m], h = l[a];
      const g = Y(c, e), x = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (f) {
        const y = m === "y" ? "height" : "width", w = s.reference[m] - s.floating[y] + x.mainAxis, b = s.reference[m] + s.reference[y] - x.mainAxis;
        u < w ? u = w : u > b && (u = b);
      }
      if (d) {
        var p, v;
        const y = m === "y" ? "width" : "height", w = Nt.has(z(i)), b = s.reference[a] - s.floating[y] + (w && ((p = r.offset) == null ? void 0 : p[a]) || 0) + (w ? 0 : x.crossAxis), A = s.reference[a] + s.reference[y] + (w ? 0 : ((v = r.offset) == null ? void 0 : v[a]) || 0) - (w ? x.crossAxis : 0);
        h < b ? h = b : h > A && (h = A);
      }
      return {
        [m]: u,
        [a]: h
      };
    }
  };
}, we = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        rects: s,
        platform: r,
        elements: c
      } = e, {
        apply: f = () => {
        },
        ...d
      } = Y(t, e), l = await r.detectOverflow(e, d), a = z(i), m = ot(i), u = B(i) === "y", {
        width: h,
        height: g
      } = s.floating;
      let x, p;
      a === "top" || a === "bottom" ? (x = a, p = m === (await (r.isRTL == null ? void 0 : r.isRTL(c.floating)) ? "start" : "end") ? "left" : "right") : (p = a, x = m === "end" ? "top" : "bottom");
      const v = g - l.top - l.bottom, y = h - l.left - l.right, w = Z(g - l[x], v), b = Z(h - l[p], y), A = !e.middlewareData.shift;
      let O = w, D = b;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (D = y), (o = e.middlewareData.shift) != null && o.enabled.y && (O = v), A && !m) {
        const S = M(l.left, 0), V = M(l.right, 0), I = M(l.top, 0), P = M(l.bottom, 0);
        u ? D = h - 2 * (S !== 0 || V !== 0 ? S + V : M(l.left, l.right)) : O = g - 2 * (I !== 0 || P !== 0 ? I + P : M(l.top, l.bottom));
      }
      await f({
        ...e,
        availableWidth: D,
        availableHeight: O
      });
      const H = await r.getDimensions(c.floating);
      return h !== H.width || g !== H.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function _t(t) {
  const e = W(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = j(t), s = i ? t.offsetWidth : n, r = i ? t.offsetHeight : o, c = rt(n) !== s || rt(o) !== r;
  return c && (n = s, o = r), {
    width: n,
    height: o,
    $: c
  };
}
function Rt(t) {
  return F(t) ? t : t.contextElement;
}
function J(t) {
  const e = Rt(t);
  if (!j(e))
    return N(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: s
  } = _t(e);
  let r = (s ? rt(n.width) : n.width) / o, c = (s ? rt(n.height) : n.height) / i;
  return (!r || !Number.isFinite(r)) && (r = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: r,
    y: c
  };
}
const xe = /* @__PURE__ */ N(0);
function Ht(t) {
  const e = T(t);
  return !vt() || !e.visualViewport ? xe : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ye(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== T(t) ? !1 : e;
}
function K(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), s = Rt(t);
  let r = N(1);
  e && (o ? F(o) && (r = J(o)) : r = J(t));
  const c = ye(s, n, o) ? Ht(s) : N(0);
  let f = (i.left + c.x) / r.x, d = (i.top + c.y) / r.y, l = i.width / r.x, a = i.height / r.y;
  if (s) {
    const m = T(s), u = o && F(o) ? T(o) : o;
    let h = m, g = wt(h);
    for (; g && o && u !== h; ) {
      const x = J(g), p = g.getBoundingClientRect(), v = W(g), y = p.left + (g.clientLeft + parseFloat(v.paddingLeft)) * x.x, w = p.top + (g.clientTop + parseFloat(v.paddingTop)) * x.y;
      f *= x.x, d *= x.y, l *= x.x, a *= x.y, f += y, d += w, h = T(g), g = wt(h);
    }
  }
  return lt({
    width: l,
    height: a,
    x: f,
    y: d
  });
}
function mt(t, e) {
  const n = dt(t).scrollLeft;
  return e ? e.left + n : K(_(t)).left + n;
}
function Vt(t, e) {
  const n = t.getBoundingClientRect(), o = n.left + e.scrollLeft - mt(t, n), i = n.top + e.scrollTop;
  return {
    x: o,
    y: i
  };
}
function ve(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const s = i === "fixed", r = _(o), c = e ? ut(e.floating) : !1;
  if (o === r || c && s)
    return n;
  let f = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = N(1);
  const l = N(0), a = j(o);
  if ((a || !a && !s) && ((tt(o) !== "body" || nt(r)) && (f = dt(o)), a)) {
    const u = K(o);
    d = J(o), l.x = u.x + o.clientLeft, l.y = u.y + o.clientTop;
  }
  const m = r && !a && !s ? Vt(r, f) : N(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - f.scrollLeft * d.x + l.x + m.x,
    y: n.y * d.y - f.scrollTop * d.y + l.y + m.y
  };
}
function be(t) {
  return Array.from(t.getClientRects());
}
function Re(t) {
  const e = _(t), n = dt(t), o = t.ownerDocument.body, i = M(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), s = M(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let r = -n.scrollLeft + mt(t);
  const c = -n.scrollTop;
  return W(o).direction === "rtl" && (r += M(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: s,
    x: r,
    y: c
  };
}
const Tt = 25;
function Ae(t, e) {
  const n = T(t), o = _(t), i = n.visualViewport;
  let s = o.clientWidth, r = o.clientHeight, c = 0, f = 0;
  if (i) {
    s = i.width, r = i.height;
    const l = vt();
    (!l || l && e === "fixed") && (c = i.offsetLeft, f = i.offsetTop);
  }
  const d = mt(o);
  if (d <= 0) {
    const l = o.ownerDocument, a = l.body, m = getComputedStyle(a), u = l.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, h = Math.abs(o.clientWidth - a.clientWidth - u);
    h <= Tt && (s -= h);
  } else d <= Tt && (s += d);
  return {
    width: s,
    height: r,
    x: c,
    y: f
  };
}
function Oe(t, e) {
  const n = K(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, s = j(t) ? J(t) : N(1), r = t.clientWidth * s.x, c = t.clientHeight * s.y, f = i * s.x, d = o * s.y;
  return {
    width: r,
    height: c,
    x: f,
    y: d
  };
}
function Dt(t, e, n) {
  let o;
  if (e === "viewport")
    o = Ae(t, n);
  else if (e === "document")
    o = Re(_(t));
  else if (F(e))
    o = Oe(e, n);
  else {
    const i = Ht(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return lt(o);
}
function zt(t, e) {
  const n = q(t);
  return n === e || !F(n) || Q(n) ? !1 : W(n).position === "fixed" || zt(n, e);
}
function Ce(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = et(t, [], !1).filter((c) => F(c) && tt(c) !== "body"), i = null;
  const s = W(t).position === "fixed";
  let r = s ? q(t) : t;
  for (; F(r) && !Q(r); ) {
    const c = W(r), f = yt(r);
    !f && c.position === "fixed" && (i = null), (s ? !f && !i : !f && c.position === "static" && !!i && (i.position === "absolute" || i.position === "fixed") || nt(r) && !f && zt(t, r)) ? o = o.filter((l) => l !== r) : i = c, r = q(r);
  }
  return e.set(t, o), o;
}
function Se(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const r = [...n === "clippingAncestors" ? ut(e) ? [] : Ce(e, this._c) : [].concat(n), o], c = Dt(e, r[0], i);
  let f = c.top, d = c.right, l = c.bottom, a = c.left;
  for (let m = 1; m < r.length; m++) {
    const u = Dt(e, r[m], i);
    f = M(u.top, f), d = Z(u.right, d), l = Z(u.bottom, l), a = M(u.left, a);
  }
  return {
    width: d - a,
    height: l - f,
    x: a,
    y: f
  };
}
function Ee(t) {
  const {
    width: e,
    height: n
  } = _t(t);
  return {
    width: e,
    height: n
  };
}
function Le(t, e, n) {
  const o = j(e), i = _(e), s = n === "fixed", r = K(t, !0, s, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const f = N(0);
  function d() {
    f.x = mt(i);
  }
  if (o || !o && !s)
    if ((tt(e) !== "body" || nt(i)) && (c = dt(e)), o) {
      const u = K(e, !0, s, e);
      f.x = u.x + e.clientLeft, f.y = u.y + e.clientTop;
    } else i && d();
  s && !o && i && d();
  const l = i && !o && !s ? Vt(i, c) : N(0), a = r.left + c.scrollLeft - f.x - l.x, m = r.top + c.scrollTop - f.y - l.y;
  return {
    x: a,
    y: m,
    width: r.width,
    height: r.height
  };
}
function gt(t) {
  return W(t).position === "static";
}
function Pt(t, e) {
  if (!j(t) || W(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return _(t) === n && (n = n.ownerDocument.body), n;
}
function jt(t, e) {
  const n = T(t);
  if (ut(t))
    return n;
  if (!j(t)) {
    let i = q(t);
    for (; i && !Q(i); ) {
      if (F(i) && !gt(i))
        return i;
      i = q(i);
    }
    return n;
  }
  let o = Pt(t, e);
  for (; o && Ut(o) && gt(o); )
    o = Pt(o, e);
  return o && Q(o) && gt(o) && !yt(o) ? n : o || Jt(t) || n;
}
const Me = async function(t) {
  const e = this.getOffsetParent || jt, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: Le(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Te(t) {
  return W(t).direction === "rtl";
}
const De = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ve,
  getDocumentElement: _,
  getClippingRect: Se,
  getOffsetParent: jt,
  getElementRects: Me,
  getClientRects: be,
  getDimensions: Ee,
  getScale: J,
  isElement: F,
  isRTL: Te
};
function It(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Pe(t, e) {
  let n = null, o;
  const i = _(t);
  function s() {
    var c;
    clearTimeout(o), (c = n) == null || c.disconnect(), n = null;
  }
  function r(c, f) {
    c === void 0 && (c = !1), f === void 0 && (f = 1), s();
    const d = t.getBoundingClientRect(), {
      left: l,
      top: a,
      width: m,
      height: u
    } = d;
    if (c || e(), !m || !u)
      return;
    const h = it(a), g = it(i.clientWidth - (l + m)), x = it(i.clientHeight - (a + u)), p = it(l), y = {
      rootMargin: -h + "px " + -g + "px " + -x + "px " + -p + "px",
      threshold: M(0, Z(1, f)) || 1
    };
    let w = !0;
    function b(A) {
      const O = A[0].intersectionRatio;
      if (O !== f) {
        if (!w)
          return r();
        O ? r(!1, O) : o = setTimeout(() => {
          r(!1, 1e-7);
        }, 1e3);
      }
      O === 1 && !It(d, t.getBoundingClientRect()) && r(), w = !1;
    }
    try {
      n = new IntersectionObserver(b, {
        ...y,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(b, y);
    }
    n.observe(t);
  }
  return r(!0), s;
}
function je(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: s = !0,
    elementResize: r = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: f = !1
  } = o, d = Rt(t), l = i || s ? [...d ? et(d) : [], ...e ? et(e) : []] : [];
  l.forEach((p) => {
    i && p.addEventListener("scroll", n, {
      passive: !0
    }), s && p.addEventListener("resize", n);
  });
  const a = d && c ? Pe(d, n) : null;
  let m = -1, u = null;
  r && (u = new ResizeObserver((p) => {
    let [v] = p;
    v && v.target === d && u && e && (u.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var y;
      (y = u) == null || y.observe(e);
    })), n();
  }), d && !f && u.observe(d), e && u.observe(e));
  let h, g = f ? K(t) : null;
  f && x();
  function x() {
    const p = K(t);
    g && !It(g, p) && n(), g = p, h = requestAnimationFrame(x);
  }
  return n(), () => {
    var p;
    l.forEach((v) => {
      i && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), a?.(), (p = u) == null || p.disconnect(), u = null, f && cancelAnimationFrame(h);
  };
}
const ke = he, Fe = ge, We = ue, $e = we, Be = de, Ne = pe, _e = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: De,
    ...n
  }, s = {
    ...i.platform,
    _c: o
  };
  return ae(t, e, {
    ...i,
    platform: s
  });
};
var He = typeof document < "u", Ve = function() {
}, st = He ? qt : Ve;
function ft(t, e) {
  if (t === e)
    return !0;
  if (typeof t != typeof e)
    return !1;
  if (typeof t == "function" && t.toString() === e.toString())
    return !0;
  let n, o, i;
  if (t && e && typeof t == "object") {
    if (Array.isArray(t)) {
      if (n = t.length, n !== e.length) return !1;
      for (o = n; o-- !== 0; )
        if (!ft(t[o], e[o]))
          return !1;
      return !0;
    }
    if (i = Object.keys(t), n = i.length, n !== Object.keys(e).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!{}.hasOwnProperty.call(e, i[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      const s = i[o];
      if (!(s === "_owner" && t.$$typeof) && !ft(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function Xt(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function kt(t, e) {
  const n = Xt(t);
  return Math.round(e * n) / n;
}
function pt(t) {
  const e = C.useRef(t);
  return st(() => {
    e.current = t;
  }), e;
}
function Ie(t) {
  t === void 0 && (t = {});
  const {
    placement: e = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: i,
    elements: {
      reference: s,
      floating: r
    } = {},
    transform: c = !0,
    whileElementsMounted: f,
    open: d
  } = t, [l, a] = C.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [m, u] = C.useState(o);
  ft(m, o) || u(o);
  const [h, g] = C.useState(null), [x, p] = C.useState(null), v = C.useCallback((R) => {
    R !== A.current && (A.current = R, g(R));
  }, []), y = C.useCallback((R) => {
    R !== O.current && (O.current = R, p(R));
  }, []), w = s || h, b = r || x, A = C.useRef(null), O = C.useRef(null), D = C.useRef(l), H = f != null, S = pt(f), V = pt(i), I = pt(d), P = C.useCallback(() => {
    if (!A.current || !O.current)
      return;
    const R = {
      placement: e,
      strategy: n,
      middleware: m
    };
    V.current && (R.platform = V.current), _e(A.current, O.current, R).then((L) => {
      const X = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: I.current !== !1
      };
      k.current && !ft(D.current, X) && (D.current = X, Yt.flushSync(() => {
        a(X);
      }));
    });
  }, [m, e, n, V, I]);
  st(() => {
    d === !1 && D.current.isPositioned && (D.current.isPositioned = !1, a((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [d]);
  const k = C.useRef(!1);
  st(() => (k.current = !0, () => {
    k.current = !1;
  }), []), st(() => {
    if (w && (A.current = w), b && (O.current = b), w && b) {
      if (S.current)
        return S.current(w, b, P);
      P();
    }
  }, [w, b, P, S, H]);
  const G = C.useMemo(() => ({
    reference: A,
    floating: O,
    setReference: v,
    setFloating: y
  }), [v, y]), E = C.useMemo(() => ({
    reference: w,
    floating: b
  }), [w, b]), $ = C.useMemo(() => {
    const R = {
      position: n,
      left: 0,
      top: 0
    };
    if (!E.floating)
      return R;
    const L = kt(E.floating, l.x), X = kt(E.floating, l.y);
    return c ? {
      ...R,
      transform: "translate(" + L + "px, " + X + "px)",
      ...Xt(E.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: X
    };
  }, [n, c, E.floating, l.x, l.y]);
  return C.useMemo(() => ({
    ...l,
    update: P,
    refs: G,
    elements: E,
    floatingStyles: $
  }), [l, P, G, E, $]);
}
const Xe = (t, e) => {
  const n = ke(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, qe = (t, e) => {
  const n = Fe(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ye = (t, e) => ({
  fn: Ne(t).fn,
  options: [t, e]
}), Ue = (t, e) => {
  const n = We(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ke = (t, e) => {
  const n = $e(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ge = (t, e) => {
  const n = Be(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
};
export {
  Ye as A,
  rt as B,
  nt as C,
  De as D,
  lt as E,
  j as a,
  F as b,
  tt as c,
  Ft as d,
  T as e,
  it as f,
  W as g,
  vt as h,
  At as i,
  Q as j,
  q as k,
  Y as l,
  ce as m,
  Bt as n,
  ot as o,
  Ot as p,
  $t as q,
  Ge as r,
  z as s,
  Ue as t,
  Ie as u,
  Ke as v,
  B as w,
  je as x,
  Xe as y,
  qe as z
};
//# sourceMappingURL=vendor-floating-ui-c4mwmh0xmfzevy9l.js.map
