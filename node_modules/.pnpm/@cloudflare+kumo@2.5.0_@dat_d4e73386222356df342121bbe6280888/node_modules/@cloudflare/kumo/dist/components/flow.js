"use client";
import { jsxs as Bt, jsx as C } from "react/jsx-runtime";
import { createContext as gt, useRef as N, useLayoutEffect as Pt, useEffect as X, useContext as W, useId as Pe, useCallback as ot, useMemo as ct, Fragment as Ti, createElement as Po, useInsertionEffect as bi, forwardRef as Ae, Component as Ao, useState as rt, isValidElement as Si, cloneElement as Pi } from "react";
import { c as me } from "../chunks/cn-ct4n7r74mh8y0f48.js";
const Ai = gt({});
function _t(t) {
  const e = N(null);
  return e.current === null && (e.current = t()), e.current;
}
const Vi = typeof window < "u", Ci = Vi ? Pt : X, wn = /* @__PURE__ */ gt(null);
function xn(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function pe(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const ht = (t, e, n) => n > e ? e : n < t ? t : n;
function Ge(t, e) {
  return e ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${e}` : t;
}
let Ft = () => {
}, ft = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Ft = (t, e, n) => {
  !t && typeof console < "u" && console.warn(Ge(e, n));
}, ft = (t, e, n) => {
  if (!t)
    throw new Error(Ge(e, n));
});
const mt = {}, Ei = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function Di(t) {
  return typeof t == "object" && t !== null;
}
const Mi = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function Ri(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const et = /* @__NO_SIDE_EFFECTS__ */ (t) => t, Vo = (t, e) => (n) => e(t(n)), Qt = (...t) => t.reduce(Vo), Xt = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
};
class Tn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return xn(this.subscriptions, e), () => pe(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let o = 0; o < i; o++) {
          const r = this.subscriptions[o];
          r && r(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const nt = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, tt = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function Li(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Qn = /* @__PURE__ */ new Set();
function bn(t, e, n) {
  t || Qn.has(e) || (console.warn(Ge(e, n)), Qn.add(e));
}
const ki = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, Co = 1e-7, Eo = 12;
function Do(t, e, n, s, i) {
  let o, r, a = 0;
  do
    r = e + (n - e) / 2, o = ki(r, s, i) - t, o > 0 ? n = r : e = r;
  while (Math.abs(o) > Co && ++a < Eo);
  return r;
}
function te(t, e, n, s) {
  if (t === e && n === s)
    return et;
  const i = (o) => Do(o, 0, 1, t, n);
  return (o) => o === 0 || o === 1 ? o : ki(i(o), e, s);
}
const Ii = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Bi = (t) => (e) => 1 - t(1 - e), Fi = /* @__PURE__ */ te(0.33, 1.53, 0.69, 0.99), Sn = /* @__PURE__ */ Bi(Fi), Oi = /* @__PURE__ */ Ii(Sn), Ni = (t) => (t *= 2) < 1 ? 0.5 * Sn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Pn = (t) => 1 - Math.sin(Math.acos(t)), ji = Bi(Pn), $i = Ii(Pn), Mo = /* @__PURE__ */ te(0.42, 0, 1, 1), Ro = /* @__PURE__ */ te(0, 0, 0.58, 1), Ui = /* @__PURE__ */ te(0.42, 0, 0.58, 1), Lo = (t) => Array.isArray(t) && typeof t[0] != "number", Wi = (t) => Array.isArray(t) && typeof t[0] == "number", ts = {
  linear: et,
  easeIn: Mo,
  easeInOut: Ui,
  easeOut: Ro,
  circIn: Pn,
  circInOut: $i,
  circOut: ji,
  backIn: Sn,
  backInOut: Oi,
  backOut: Fi,
  anticipate: Ni
}, ko = (t) => typeof t == "string", es = (t) => {
  if (Wi(t)) {
    ft(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [e, n, s, i] = t;
    return te(e, n, s, i);
  } else if (ko(t))
    return ft(ts[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), ts[t];
  return t;
}, se = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Io(t, e) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), i = !1, o = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function c(u) {
    r.has(u) && (l.schedule(u), t()), u(a);
  }
  const l = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (u, h = !1, d = !1) => {
      const m = d && i ? n : s;
      return h && r.add(u), m.has(u) || m.add(u), u;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (u) => {
      s.delete(u), r.delete(u);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (u) => {
      if (a = u, i) {
        o = !0;
        return;
      }
      i = !0, [n, s] = [s, n], n.forEach(c), n.clear(), i = !1, o && (o = !1, l.process(u));
    }
  };
  return l;
}
const Bo = 40;
function zi(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, r = se.reduce((p, S) => (p[S] = Io(o), p), {}), { setup: a, read: c, resolveKeyframes: l, preUpdate: u, update: h, preRender: d, render: f, postRender: m } = r, x = () => {
    const p = mt.useManualTiming ? i.timestamp : performance.now();
    n = !1, mt.useManualTiming || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(p - i.timestamp, Bo), 1)), i.timestamp = p, i.isProcessing = !0, a.process(i), c.process(i), l.process(i), u.process(i), h.process(i), d.process(i), f.process(i), m.process(i), i.isProcessing = !1, n && e && (s = !1, t(x));
  }, y = () => {
    n = !0, s = !0, i.isProcessing || t(x);
  };
  return { schedule: se.reduce((p, S) => {
    const w = r[S];
    return p[S] = (b, V = !1, P = !1) => (n || y(), w.schedule(b, V, P)), p;
  }, {}), cancel: (p) => {
    for (let S = 0; S < se.length; S++)
      r[se[S]].cancel(p);
  }, state: i, steps: r };
}
const { schedule: D, cancel: pt, state: G, steps: De } = /* @__PURE__ */ zi(typeof requestAnimationFrame < "u" ? requestAnimationFrame : et, !0);
let ae;
function Fo() {
  ae = void 0;
}
const Y = {
  now: () => (ae === void 0 && Y.set(G.isProcessing || mt.useManualTiming ? G.timestamp : performance.now()), ae),
  set: (t) => {
    ae = t, queueMicrotask(Fo);
  }
}, Hi = (t) => (e) => typeof e == "string" && e.startsWith(t), Ki = /* @__PURE__ */ Hi("--"), Oo = /* @__PURE__ */ Hi("var(--"), An = (t) => Oo(t) ? No.test(t.split("/*")[0].trim()) : !1, No = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ns(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const Ot = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Yt = {
  ...Ot,
  transform: (t) => ht(0, 1, t)
}, ie = {
  ...Ot,
  default: 1
}, zt = (t) => Math.round(t * 1e5) / 1e5, Vn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function jo(t) {
  return t == null;
}
const $o = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Cn = (t, e) => (n) => !!(typeof n == "string" && $o.test(n) && n.startsWith(t) || e && !jo(n) && Object.prototype.hasOwnProperty.call(n, e)), Gi = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, o, r, a] = s.match(Vn);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(o),
    [n]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Uo = (t) => ht(0, 255, t), Me = {
  ...Ot,
  transform: (t) => Math.round(Uo(t))
}, bt = {
  test: /* @__PURE__ */ Cn("rgb", "red"),
  parse: /* @__PURE__ */ Gi("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Me.transform(t) + ", " + Me.transform(e) + ", " + Me.transform(n) + ", " + zt(Yt.transform(s)) + ")"
};
function Wo(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const _e = {
  test: /* @__PURE__ */ Cn("#"),
  parse: Wo,
  transform: bt.transform
}, ee = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), yt = /* @__PURE__ */ ee("deg"), ut = /* @__PURE__ */ ee("%"), T = /* @__PURE__ */ ee("px"), zo = /* @__PURE__ */ ee("vh"), Ho = /* @__PURE__ */ ee("vw"), ss = {
  ...ut,
  parse: (t) => ut.parse(t) / 100,
  transform: (t) => ut.transform(t * 100)
}, Et = {
  test: /* @__PURE__ */ Cn("hsl", "hue"),
  parse: /* @__PURE__ */ Gi("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + ut.transform(zt(e)) + ", " + ut.transform(zt(n)) + ", " + zt(Yt.transform(s)) + ")"
}, j = {
  test: (t) => bt.test(t) || _e.test(t) || Et.test(t),
  parse: (t) => bt.test(t) ? bt.parse(t) : Et.test(t) ? Et.parse(t) : _e.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? bt.transform(t) : Et.transform(t),
  getAnimatableNone: (t) => {
    const e = j.parse(t);
    return e.alpha = 0, j.transform(e);
  }
}, Ko = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Go(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Vn)?.length || 0) + (t.match(Ko)?.length || 0) > 0;
}
const _i = "number", Xi = "color", _o = "var", Xo = "var(", is = "${}", Yo = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function qt(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let o = 0;
  const a = e.replace(Yo, (c) => (j.test(c) ? (s.color.push(o), i.push(Xi), n.push(j.parse(c))) : c.startsWith(Xo) ? (s.var.push(o), i.push(_o), n.push(c)) : (s.number.push(o), i.push(_i), n.push(parseFloat(c))), ++o, is)).split(is);
  return { values: n, split: a, indexes: s, types: i };
}
function Yi(t) {
  return qt(t).values;
}
function qi(t) {
  const { split: e, types: n } = qt(t), s = e.length;
  return (i) => {
    let o = "";
    for (let r = 0; r < s; r++)
      if (o += e[r], i[r] !== void 0) {
        const a = n[r];
        a === _i ? o += zt(i[r]) : a === Xi ? o += j.transform(i[r]) : o += i[r];
      }
    return o;
  };
}
const qo = (t) => typeof t == "number" ? 0 : j.test(t) ? j.getAnimatableNone(t) : t;
function Zo(t) {
  const e = Yi(t);
  return qi(t)(e.map(qo));
}
const at = {
  test: Go,
  parse: Yi,
  createTransformer: qi,
  getAnimatableNone: Zo
};
function Re(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Jo({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, o = 0, r = 0;
  if (!e)
    i = o = r = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, c = 2 * n - a;
    i = Re(c, a, t + 1 / 3), o = Re(c, a, t), r = Re(c, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: s
  };
}
function ge(t, e) {
  return (n) => n > 0 ? e : t;
}
const O = (t, e, n) => t + (e - t) * n, Le = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Qo = [_e, bt, Et], ta = (t) => Qo.find((e) => e.test(t));
function rs(t) {
  const e = ta(t);
  if (Ft(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !e)
    return !1;
  let n = e.parse(t);
  return e === Et && (n = Jo(n)), n;
}
const os = (t, e) => {
  const n = rs(t), s = rs(e);
  if (!n || !s)
    return ge(t, e);
  const i = { ...n };
  return (o) => (i.red = Le(n.red, s.red, o), i.green = Le(n.green, s.green, o), i.blue = Le(n.blue, s.blue, o), i.alpha = O(n.alpha, s.alpha, o), bt.transform(i));
}, Xe = /* @__PURE__ */ new Set(["none", "hidden"]);
function ea(t, e) {
  return Xe.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function na(t, e) {
  return (n) => O(t, e, n);
}
function En(t) {
  return typeof t == "number" ? na : typeof t == "string" ? An(t) ? ge : j.test(t) ? os : ra : Array.isArray(t) ? Zi : typeof t == "object" ? j.test(t) ? os : sa : ge;
}
function Zi(t, e) {
  const n = [...t], s = n.length, i = t.map((o, r) => En(o)(o, e[r]));
  return (o) => {
    for (let r = 0; r < s; r++)
      n[r] = i[r](o);
    return n;
  };
}
function sa(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = En(t[i])(t[i], e[i]));
  return (i) => {
    for (const o in s)
      n[o] = s[o](i);
    return n;
  };
}
function ia(t, e) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const o = e.types[i], r = t.indexes[o][s[o]], a = t.values[r] ?? 0;
    n[i] = a, s[o]++;
  }
  return n;
}
const ra = (t, e) => {
  const n = at.createTransformer(e), s = qt(t), i = qt(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? Xe.has(t) && !i.values.length || Xe.has(e) && !s.values.length ? ea(t, e) : Qt(Zi(ia(s, i), i.values), n) : (Ft(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ge(t, e));
};
function Ji(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? O(t, e, n) : En(t)(t, e);
}
const oa = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => D.update(e, n),
    stop: () => pt(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => G.isProcessing ? G.timestamp : Y.now()
  };
}, Qi = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let o = 0; o < i; o++)
    s += Math.round(t(o / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, ye = 2e4;
function Dn(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < ye; )
    e += n, s = t.next(e);
  return e >= ye ? 1 / 0 : e;
}
function aa(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min(Dn(s), ye);
  return {
    type: "keyframes",
    ease: (o) => s.next(i * o).value / e,
    duration: /* @__PURE__ */ tt(i)
  };
}
const ca = 5;
function tr(t, e, n) {
  const s = Math.max(e - ca, 0);
  return Li(n - t(s), e - s);
}
const F = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, ke = 1e-3;
function la({ duration: t = F.duration, bounce: e = F.bounce, velocity: n = F.velocity, mass: s = F.mass }) {
  let i, o;
  Ft(t <= /* @__PURE__ */ nt(F.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let r = 1 - e;
  r = ht(F.minDamping, F.maxDamping, r), t = ht(F.minDuration, F.maxDuration, /* @__PURE__ */ tt(t)), r < 1 ? (i = (l) => {
    const u = l * r, h = u * t, d = u - n, f = Ye(l, r), m = Math.exp(-h);
    return ke - d / f * m;
  }, o = (l) => {
    const h = l * r * t, d = h * n + n, f = Math.pow(r, 2) * Math.pow(l, 2) * t, m = Math.exp(-h), x = Ye(Math.pow(l, 2), r);
    return (-i(l) + ke > 0 ? -1 : 1) * ((d - f) * m) / x;
  }) : (i = (l) => {
    const u = Math.exp(-l * t), h = (l - n) * t + 1;
    return -ke + u * h;
  }, o = (l) => {
    const u = Math.exp(-l * t), h = (n - l) * (t * t);
    return u * h;
  });
  const a = 5 / t, c = ha(i, o, a);
  if (t = /* @__PURE__ */ nt(t), isNaN(c))
    return {
      stiffness: F.stiffness,
      damping: F.damping,
      duration: t
    };
  {
    const l = Math.pow(c, 2) * s;
    return {
      stiffness: l,
      damping: r * 2 * Math.sqrt(s * l),
      duration: t
    };
  }
}
const ua = 12;
function ha(t, e, n) {
  let s = n;
  for (let i = 1; i < ua; i++)
    s = s - t(s) / e(s);
  return s;
}
function Ye(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const da = ["duration", "bounce"], fa = ["stiffness", "damping", "mass"];
function as(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function ma(t) {
  let e = {
    velocity: F.velocity,
    stiffness: F.stiffness,
    damping: F.damping,
    mass: F.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!as(t, fa) && as(t, da))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, o = 2 * ht(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = {
        ...e,
        mass: F.mass,
        stiffness: i,
        damping: o
      };
    } else {
      const n = la(t);
      e = {
        ...e,
        ...n,
        mass: F.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function ve(t = F.visualDuration, e = F.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: i } = n;
  const o = n.keyframes[0], r = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: c, damping: l, mass: u, duration: h, velocity: d, isResolvedFromDuration: f } = ma({
    ...n,
    velocity: -/* @__PURE__ */ tt(n.velocity || 0)
  }), m = d || 0, x = l / (2 * Math.sqrt(c * u)), y = r - o, g = /* @__PURE__ */ tt(Math.sqrt(c / u)), v = Math.abs(y) < 5;
  s || (s = v ? F.restSpeed.granular : F.restSpeed.default), i || (i = v ? F.restDelta.granular : F.restDelta.default);
  let p;
  if (x < 1) {
    const w = Ye(g, x);
    p = (b) => {
      const V = Math.exp(-x * g * b);
      return r - V * ((m + x * g * y) / w * Math.sin(w * b) + y * Math.cos(w * b));
    };
  } else if (x === 1)
    p = (w) => r - Math.exp(-g * w) * (y + (m + g * y) * w);
  else {
    const w = g * Math.sqrt(x * x - 1);
    p = (b) => {
      const V = Math.exp(-x * g * b), P = Math.min(w * b, 300);
      return r - V * ((m + x * g * y) * Math.sinh(P) + w * y * Math.cosh(P)) / w;
    };
  }
  const S = {
    calculatedDuration: f && h || null,
    next: (w) => {
      const b = p(w);
      if (f)
        a.done = w >= h;
      else {
        let V = w === 0 ? m : 0;
        x < 1 && (V = w === 0 ? /* @__PURE__ */ nt(m) : tr(p, w, b));
        const P = Math.abs(V) <= s, k = Math.abs(r - b) <= i;
        a.done = P && k;
      }
      return a.value = a.done ? r : b, a;
    },
    toString: () => {
      const w = Math.min(Dn(S), ye), b = Qi((V) => S.next(w * V).value, w, 30);
      return w + "ms " + b;
    },
    toTransition: () => {
    }
  };
  return S;
}
ve.applyToOptions = (t) => {
  const e = aa(t, 100, ve);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ nt(e.duration), t.type = "keyframes", t;
};
function qe({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: c, restDelta: l = 0.5, restSpeed: u }) {
  const h = t[0], d = {
    done: !1,
    value: h
  }, f = (P) => a !== void 0 && P < a || c !== void 0 && P > c, m = (P) => a === void 0 ? c : c === void 0 || Math.abs(a - P) < Math.abs(c - P) ? a : c;
  let x = n * e;
  const y = h + x, g = r === void 0 ? y : r(y);
  g !== y && (x = g - h);
  const v = (P) => -x * Math.exp(-P / s), p = (P) => g + v(P), S = (P) => {
    const k = v(P), L = p(P);
    d.done = Math.abs(k) <= l, d.value = d.done ? g : L;
  };
  let w, b;
  const V = (P) => {
    f(d.value) && (w = P, b = ve({
      keyframes: [d.value, m(d.value)],
      velocity: tr(p, P, d.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: o,
      restDelta: l,
      restSpeed: u
    }));
  };
  return V(0), {
    calculatedDuration: null,
    next: (P) => {
      let k = !1;
      return !b && w === void 0 && (k = !0, S(P), V(P)), w !== void 0 && P >= w ? b.next(P - w) : (!k && S(P), d);
    }
  };
}
function pa(t, e, n) {
  const s = [], i = n || mt.mix || Ji, o = t.length - 1;
  for (let r = 0; r < o; r++) {
    let a = i(t[r], t[r + 1]);
    if (e) {
      const c = Array.isArray(e) ? e[r] || et : e;
      a = Qt(c, a);
    }
    s.push(a);
  }
  return s;
}
function er(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const o = t.length;
  if (ft(o === e.length, "Both input and output ranges must be the same length", "range-length"), o === 1)
    return () => e[0];
  if (o === 2 && e[0] === e[1])
    return () => e[1];
  const r = t[0] === t[1];
  t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = pa(e, s, i), c = a.length, l = (u) => {
    if (r && u < t[0])
      return e[0];
    let h = 0;
    if (c > 1)
      for (; h < t.length - 2 && !(u < t[h + 1]); h++)
        ;
    const d = /* @__PURE__ */ Xt(t[h], t[h + 1], u);
    return a[h](d);
  };
  return n ? (u) => l(ht(t[0], t[o - 1], u)) : l;
}
function ga(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = /* @__PURE__ */ Xt(0, e, s);
    t.push(O(n, 1, i));
  }
}
function ya(t) {
  const e = [0];
  return ga(e, t.length - 1), e;
}
function va(t, e) {
  return t.map((n) => n * e);
}
function wa(t, e) {
  return t.map(() => e || Ui).splice(0, t.length - 1);
}
function Dt({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = Lo(s) ? s.map(es) : es(s), o = {
    done: !1,
    value: e[0]
  }, r = va(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : ya(e),
    t
  ), a = er(r, e, {
    ease: Array.isArray(i) ? i : wa(e, i)
  });
  return {
    calculatedDuration: t,
    next: (c) => (o.value = a(c), o.done = c >= t, o)
  };
}
const xa = (t) => t !== null;
function Mn(t, { repeat: e, repeatType: n = "loop" }, s, i = 1) {
  const o = t.filter(xa), a = i < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : o.length - 1;
  return !a || s === void 0 ? o[a] : s;
}
const Ta = {
  decay: qe,
  inertia: qe,
  tween: Dt,
  keyframes: Dt,
  spring: ve
};
function nr(t) {
  typeof t.type == "string" && (t.type = Ta[t.type]);
}
class Rn {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const ba = (t) => t / 100;
class Ln extends Rn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== Y.now() && this.tick(Y.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    nr(e);
    const { type: n = Dt, repeat: s = 0, repeatDelay: i = 0, repeatType: o, velocity: r = 0 } = e;
    let { keyframes: a } = e;
    const c = n || Dt;
    process.env.NODE_ENV !== "production" && c !== Dt && ft(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), c !== Dt && typeof a[0] != "number" && (this.mixKeyframes = Qt(ba, Ji(a[0], a[1])), a = [0, 100]);
    const l = c({ ...e, keyframes: a });
    o === "mirror" && (this.mirroredGenerator = c({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -r
    })), l.calculatedDuration === null && (l.calculatedDuration = Dn(l));
    const { calculatedDuration: u } = l;
    this.calculatedDuration = u, this.resolvedDuration = u + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = l;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: s, totalDuration: i, mixKeyframes: o, mirroredGenerator: r, resolvedDuration: a, calculatedDuration: c } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: l = 0, keyframes: u, repeat: h, repeatType: d, repeatDelay: f, type: m, onUpdate: x, finalKeyframe: y } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - i / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const g = this.currentTime - l * (this.playbackSpeed >= 0 ? 1 : -1), v = this.playbackSpeed >= 0 ? g < 0 : g > i;
    this.currentTime = Math.max(g, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let p = this.currentTime, S = s;
    if (h) {
      const P = Math.min(this.currentTime, i) / a;
      let k = Math.floor(P), L = P % 1;
      !L && P >= 1 && (L = 1), L === 1 && k--, k = Math.min(k, h + 1), !!(k % 2) && (d === "reverse" ? (L = 1 - L, f && (L -= f / a)) : d === "mirror" && (S = r)), p = ht(0, 1, L) * a;
    }
    const w = v ? { done: !1, value: u[0] } : S.next(p);
    o && (w.value = o(w.value));
    let { done: b } = w;
    !v && c !== null && (b = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const V = this.holdTime === null && (this.state === "finished" || this.state === "running" && b);
    return V && m !== qe && (w.value = Mn(u, this.options, y, this.speed)), x && x(w.value), V && this.finish(), w;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ tt(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ tt(e);
  }
  get time() {
    return /* @__PURE__ */ tt(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ nt(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(Y.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ tt(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = oa, startTime: n } = this.options;
    this.driver || (this.driver = e((i) => this.tick(i))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Y.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
  }
}
function Sa(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const St = (t) => t * 180 / Math.PI, Ze = (t) => {
  const e = St(Math.atan2(t[1], t[0]));
  return Je(e);
}, Pa = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Ze,
  rotateZ: Ze,
  skewX: (t) => St(Math.atan(t[1])),
  skewY: (t) => St(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Je = (t) => (t = t % 360, t < 0 && (t += 360), t), cs = Ze, ls = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), us = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Aa = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ls,
  scaleY: us,
  scale: (t) => (ls(t) + us(t)) / 2,
  rotateX: (t) => Je(St(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Je(St(Math.atan2(-t[2], t[0]))),
  rotateZ: cs,
  rotate: cs,
  skewX: (t) => St(Math.atan(t[4])),
  skewY: (t) => St(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Qe(t) {
  return t.includes("scale") ? 1 : 0;
}
function tn(t, e) {
  if (!t || t === "none")
    return Qe(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n)
    s = Aa, i = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = Pa, i = a;
  }
  if (!i)
    return Qe(e);
  const o = s[e], r = i[1].split(",").map(Ca);
  return typeof o == "function" ? o(r) : r[o];
}
const Va = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return tn(n, e);
};
function Ca(t) {
  return parseFloat(t.trim());
}
const Nt = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], jt = new Set(Nt), hs = (t) => t === Ot || t === T, Ea = /* @__PURE__ */ new Set(["x", "y", "z"]), Da = Nt.filter((t) => !Ea.has(t));
function Ma(t) {
  const e = [];
  return Da.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const vt = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => tn(e, "x"),
  y: (t, { transform: e }) => tn(e, "y")
};
vt.translateX = vt.x;
vt.translateY = vt.y;
const At = /* @__PURE__ */ new Set();
let en = !1, nn = !1, sn = !1;
function sr() {
  if (nn) {
    const t = Array.from(At).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = Ma(s);
      i.length && (n.set(s, i), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([o, r]) => {
        s.getValue(o)?.set(r);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  nn = !1, en = !1, At.forEach((t) => t.complete(sn)), At.clear();
}
function ir() {
  At.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (nn = !0);
  });
}
function Ra() {
  sn = !0, ir(), sr(), sn = !1;
}
class kn {
  constructor(e, n, s, i, o, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = o, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (At.add(this), en || (en = !0, D.read(ir), D.resolveKeyframes(sr))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: i } = this;
    if (e[0] === null) {
      const o = i?.get(), r = e[e.length - 1];
      if (o !== void 0)
        e[0] = o;
      else if (s && n) {
        const a = s.readValue(n, r);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = r), i && o === void 0 && i.set(e[0]);
    }
    Sa(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), At.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (At.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const La = (t) => t.startsWith("--");
function ka(t, e, n) {
  La(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const Ia = {};
function rr(t, e) {
  const n = /* @__PURE__ */ Ri(t);
  return () => Ia[e] ?? n();
}
const Ba = /* @__PURE__ */ rr(() => window.ScrollTimeline !== void 0, "scrollTimeline"), or = /* @__PURE__ */ rr(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Wt = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, ds = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Wt([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Wt([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Wt([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Wt([0.33, 1.53, 0.69, 0.99])
};
function ar(t, e) {
  if (t)
    return typeof t == "function" ? or() ? Qi(t, e) : "ease-out" : Wi(t) ? Wt(t) : Array.isArray(t) ? t.map((n) => ar(n, e) || ds.easeOut) : ds[t];
}
function Fa(t, e, n, { delay: s = 0, duration: i = 300, repeat: o = 0, repeatType: r = "loop", ease: a = "easeOut", times: c } = {}, l = void 0) {
  const u = {
    [e]: n
  };
  c && (u.offset = c);
  const h = ar(a, i);
  Array.isArray(h) && (u.easing = h);
  const d = {
    delay: s,
    duration: i,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return l && (d.pseudoElement = l), t.animate(u, d);
}
function cr(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function Oa({ type: t, ...e }) {
  return cr(t) && or() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class lr extends Rn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: n, name: s, keyframes: i, pseudoElement: o, allowFlatten: r = !1, finalKeyframe: a, onComplete: c } = e;
    this.isPseudoElement = !!o, this.allowFlatten = r, this.options = e, ft(typeof e.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const l = Oa(e);
    this.animation = Fa(n, s, i, l, o), l.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const u = Mn(i, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(u) : ka(n, s, u), this.animation.cancel();
      }
      c?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const e = this.options?.element;
    !this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ tt(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ tt(e);
  }
  get time() {
    return /* @__PURE__ */ tt(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ nt(e);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, observe: n }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && Ba() ? (this.animation.timeline = e, et) : n(this);
  }
}
const ur = {
  anticipate: Ni,
  backInOut: Oi,
  circInOut: $i
};
function Na(t) {
  return t in ur;
}
function ja(t) {
  typeof t.ease == "string" && Na(t.ease) && (t.ease = ur[t.ease]);
}
const Ie = 10;
class $a extends lr {
  constructor(e) {
    ja(e), nr(e), super(e), e.startTime !== void 0 && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: s, onComplete: i, element: o, ...r } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Ln({
      ...r,
      autoplay: !1
    }), c = Math.max(Ie, Y.now() - this.startTime), l = ht(0, Ie, c - Ie);
    n.setWithVelocity(a.sample(Math.max(0, c - l)).value, a.sample(c).value, l), a.stop();
  }
}
const fs = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(at.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Ua(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Wa(t, e, n, s) {
  const i = t[0];
  if (i === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const o = t[t.length - 1], r = fs(i, e), a = fs(o, e);
  return Ft(r === a, `You are trying to animate ${e} from "${i}" to "${o}". "${r ? o : i}" is not an animatable value.`, "value-not-animatable"), !r || !a ? !1 : Ua(t) || (n === "spring" || cr(n)) && s;
}
function rn(t) {
  t.duration = 0, t.type = "keyframes";
}
const za = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Ha = /* @__PURE__ */ Ri(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ka(t) {
  const { motionValue: e, name: n, repeatDelay: s, repeatType: i, damping: o, type: r } = t;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: c, transformTemplate: l } = e.owner.getProps();
  return Ha() && n && za.has(n) && (n !== "transform" || !l) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !c && !s && i !== "mirror" && o !== 0 && r !== "inertia";
}
const Ga = 40;
class _a extends Rn {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: o = 0, repeatType: r = "loop", keyframes: a, name: c, motionValue: l, element: u, ...h }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Y.now();
    const d = {
      autoplay: e,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: o,
      repeatType: r,
      name: c,
      motionValue: l,
      element: u,
      ...h
    }, f = u?.KeyframeResolver || kn;
    this.keyframeResolver = new f(a, (m, x, y) => this.onKeyframesResolved(m, x, d, !y), c, l, u), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, s, i) {
    this.keyframeResolver = void 0;
    const { name: o, type: r, velocity: a, delay: c, isHandoff: l, onUpdate: u } = s;
    this.resolvedAt = Y.now(), Wa(e, o, r, a) || ((mt.instantAnimations || !c) && u?.(Mn(e, s, n)), e[0] = e[e.length - 1], rn(s), s.repeat = 0);
    const d = {
      startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > Ga ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: e
    }, f = !l && Ka(d), m = d.motionValue?.owner?.current, x = f ? new $a({
      ...d,
      element: m
    }) : new Ln(d);
    x.finished.then(() => {
      this.notifyFinished();
    }).catch(et), this.pendingTimeline && (this.stopTimeline = x.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = x;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Ra()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
function hr(t, e, n, s = 0, i = 1) {
  const o = Array.from(t).sort((l, u) => l.sortNodePosition(u)).indexOf(e), r = t.size, a = (r - 1) * s;
  return typeof n == "function" ? n(o, r) : i === 1 ? o * s : a - o * s;
}
const Xa = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ya(t) {
  const e = Xa.exec(t);
  if (!e)
    return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
const qa = 4;
function dr(t, e, n = 1) {
  ft(n <= qa, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, i] = Ya(t);
  if (!s)
    return;
  const o = window.getComputedStyle(e).getPropertyValue(s);
  if (o) {
    const r = o.trim();
    return Ei(r) ? parseFloat(r) : r;
  }
  return An(i) ? dr(i, e, n + 1) : i;
}
const Za = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Ja = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Qa = {
  type: "keyframes",
  duration: 0.8
}, tc = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, ec = (t, { keyframes: e }) => e.length > 2 ? Qa : jt.has(t) ? t.startsWith("scale") ? Ja(e[1]) : Za : tc, nc = (t) => t !== null;
function sc(t, { repeat: e, repeatType: n = "loop" }, s) {
  const i = t.filter(nc), o = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return i[o];
}
function fr(t, e) {
  if (t?.inherit && e) {
    const { inherit: n, ...s } = t;
    return { ...e, ...s };
  }
  return t;
}
function In(t, e) {
  const n = t?.[e] ?? t?.default ?? t;
  return n !== t ? fr(n, t) : n;
}
function ic({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: o, repeatType: r, repeatDelay: a, from: c, elapsed: l, ...u }) {
  return !!Object.keys(u).length;
}
const Bn = (t, e, n, s = {}, i, o) => (r) => {
  const a = In(s, t) || {}, c = a.delay || s.delay || 0;
  let { elapsed: l = 0 } = s;
  l = l - /* @__PURE__ */ nt(c);
  const u = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -l,
    onUpdate: (d) => {
      e.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      r(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: o ? void 0 : i
  };
  ic(a) || Object.assign(u, ec(t, u)), u.duration && (u.duration = /* @__PURE__ */ nt(u.duration)), u.repeatDelay && (u.repeatDelay = /* @__PURE__ */ nt(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
  let h = !1;
  if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (rn(u), u.delay === 0 && (h = !0)), (mt.instantAnimations || mt.skipAnimations || i?.shouldSkipAnimations) && (h = !0, rn(u), u.delay = 0), u.allowFlatten = !a.type && !a.ease, h && !o && e.get() !== void 0) {
    const d = sc(u.keyframes, a);
    if (d !== void 0) {
      D.update(() => {
        u.onUpdate(d), u.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Ln(u) : new _a(u);
};
function ms(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Fn(t, e, n, s) {
  if (typeof e == "function") {
    const [i, o] = ms(s);
    e = e(n !== void 0 ? n : t.custom, i, o);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, o] = ms(s);
    e = e(n !== void 0 ? n : t.custom, i, o);
  }
  return e;
}
function It(t, e, n) {
  const s = t.getProps();
  return Fn(s, e, n !== void 0 ? n : s.custom, t);
}
const mr = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Nt
]), ps = 30, rc = (t) => !isNaN(parseFloat(t)), Ht = {
  current: void 0
};
class oc {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const i = Y.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = Y.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = rc(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return process.env.NODE_ENV !== "production" && bn(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new Tn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), D.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return Ht.current && Ht.current.push(this), this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = Y.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > ps)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, ps);
    return Li(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Vt(t, e) {
  return new oc(t, e);
}
const on = (t) => Array.isArray(t);
function ac(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Vt(n));
}
function cc(t) {
  return on(t) ? t[t.length - 1] || 0 : t;
}
function lc(t, e) {
  const n = It(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...o } = n || {};
  o = { ...o, ...s };
  for (const r in o) {
    const a = cc(o[r]);
    ac(t, r, a);
  }
}
const H = (t) => !!(t && t.getVelocity);
function uc(t) {
  return !!(H(t) && t.add);
}
function an(t, e) {
  const n = t.getValue("willChange");
  if (uc(n))
    return n.add(e);
  if (!n && mt.WillChange) {
    const s = new mt.WillChange("auto");
    t.addValue("willChange", s), s.add(e);
  }
}
function On(t) {
  return t.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const hc = "framerAppearId", pr = "data-" + On(hc);
function gr(t) {
  return t.props[pr];
}
function dc({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function yr(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: o, transitionEnd: r, ...a } = e;
  const c = t.getDefaultTransition();
  o = o ? fr(o, c) : c;
  const l = o?.reduceMotion;
  s && (o = s);
  const u = [], h = i && t.animationState && t.animationState.getState()[i];
  for (const d in a) {
    const f = t.getValue(d, t.latestValues[d] ?? null), m = a[d];
    if (m === void 0 || h && dc(h, d))
      continue;
    const x = {
      delay: n,
      ...In(o || {}, d)
    }, y = f.get();
    if (y !== void 0 && !f.isAnimating && !Array.isArray(m) && m === y && !x.velocity)
      continue;
    let g = !1;
    if (window.MotionHandoffAnimation) {
      const S = gr(t);
      if (S) {
        const w = window.MotionHandoffAnimation(S, d, D);
        w !== null && (x.startTime = w, g = !0);
      }
    }
    an(t, d);
    const v = l ?? t.shouldReduceMotion;
    f.start(Bn(d, f, m, v && mr.has(d) ? { type: !1 } : x, t, g));
    const p = f.animation;
    p && u.push(p);
  }
  if (r) {
    const d = () => D.update(() => {
      r && lc(t, r);
    });
    u.length ? Promise.all(u).then(d) : d();
  }
  return u;
}
function cn(t, e, n = {}) {
  const s = It(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: i = t.getDefaultTransition() || {} } = s || {};
  n.transitionOverride && (i = n.transitionOverride);
  const o = s ? () => Promise.all(yr(t, s, n)) : () => Promise.resolve(), r = t.variantChildren && t.variantChildren.size ? (c = 0) => {
    const { delayChildren: l = 0, staggerChildren: u, staggerDirection: h } = i;
    return fc(t, e, c, l, u, h, n);
  } : () => Promise.resolve(), { when: a } = i;
  if (a) {
    const [c, l] = a === "beforeChildren" ? [o, r] : [r, o];
    return c().then(() => l());
  } else
    return Promise.all([o(), r(n.delay)]);
}
function fc(t, e, n = 0, s = 0, i = 0, o = 1, r) {
  const a = [];
  for (const c of t.variantChildren)
    c.notify("AnimationStart", e), a.push(cn(c, e, {
      ...r,
      delay: n + (typeof s == "function" ? 0 : s) + hr(t.variantChildren, c, s, i, o)
    }).then(() => c.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function mc(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const i = e.map((o) => cn(t, o, n));
    s = Promise.all(i);
  } else if (typeof e == "string")
    s = cn(t, e, n);
  else {
    const i = typeof e == "function" ? It(t, e, n.custom) : e;
    s = Promise.all(yr(t, i, n));
  }
  return s.then(() => {
    t.notify("AnimationComplete", e);
  });
}
const pc = {
  test: (t) => t === "auto",
  parse: (t) => t
}, vr = (t) => (e) => e.test(t), wr = [Ot, T, ut, yt, Ho, zo, pc], gs = (t) => wr.find(vr(t));
function gc(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Mi(t) : !0;
}
const yc = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function vc(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(Vn) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let o = yc.has(e) ? 1 : 0;
  return s !== n && (o *= 100), e + "(" + o + i + ")";
}
const wc = /\b([a-z-]*)\(.*?\)/gu, ln = {
  ...at,
  getAnimatableNone: (t) => {
    const e = t.match(wc);
    return e ? e.map(vc).join(" ") : t;
  }
}, un = {
  ...at,
  getAnimatableNone: (t) => {
    const e = at.parse(t);
    return at.createTransformer(t)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, ys = {
  ...Ot,
  transform: Math.round
}, xc = {
  rotate: yt,
  rotateX: yt,
  rotateY: yt,
  rotateZ: yt,
  scale: ie,
  scaleX: ie,
  scaleY: ie,
  scaleZ: ie,
  skew: yt,
  skewX: yt,
  skewY: yt,
  distance: T,
  translateX: T,
  translateY: T,
  translateZ: T,
  x: T,
  y: T,
  z: T,
  perspective: T,
  transformPerspective: T,
  opacity: Yt,
  originX: ss,
  originY: ss,
  originZ: T
}, Nn = {
  // Border props
  borderWidth: T,
  borderTopWidth: T,
  borderRightWidth: T,
  borderBottomWidth: T,
  borderLeftWidth: T,
  borderRadius: T,
  borderTopLeftRadius: T,
  borderTopRightRadius: T,
  borderBottomRightRadius: T,
  borderBottomLeftRadius: T,
  // Positioning props
  width: T,
  maxWidth: T,
  height: T,
  maxHeight: T,
  top: T,
  right: T,
  bottom: T,
  left: T,
  inset: T,
  insetBlock: T,
  insetBlockStart: T,
  insetBlockEnd: T,
  insetInline: T,
  insetInlineStart: T,
  insetInlineEnd: T,
  // Spacing props
  padding: T,
  paddingTop: T,
  paddingRight: T,
  paddingBottom: T,
  paddingLeft: T,
  paddingBlock: T,
  paddingBlockStart: T,
  paddingBlockEnd: T,
  paddingInline: T,
  paddingInlineStart: T,
  paddingInlineEnd: T,
  margin: T,
  marginTop: T,
  marginRight: T,
  marginBottom: T,
  marginLeft: T,
  marginBlock: T,
  marginBlockStart: T,
  marginBlockEnd: T,
  marginInline: T,
  marginInlineStart: T,
  marginInlineEnd: T,
  // Typography
  fontSize: T,
  // Misc
  backgroundPositionX: T,
  backgroundPositionY: T,
  ...xc,
  zIndex: ys,
  // SVG
  fillOpacity: Yt,
  strokeOpacity: Yt,
  numOctaves: ys
}, Tc = {
  ...Nn,
  // Color props
  color: j,
  backgroundColor: j,
  outlineColor: j,
  fill: j,
  stroke: j,
  // Border props
  borderColor: j,
  borderTopColor: j,
  borderRightColor: j,
  borderBottomColor: j,
  borderLeftColor: j,
  filter: ln,
  WebkitFilter: ln,
  mask: un,
  WebkitMask: un
}, xr = (t) => Tc[t], bc = /* @__PURE__ */ new Set([ln, un]);
function Tr(t, e) {
  let n = xr(t);
  return bc.has(n) || (n = at), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Sc = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Pc(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const o = t[s];
    typeof o == "string" && !Sc.has(o) && qt(o).values.length && (i = t[s]), s++;
  }
  if (i && n)
    for (const o of e)
      t[o] = Tr(n, i);
}
class Ac extends kn {
  constructor(e, n, s, i, o) {
    super(e, n, s, i, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let u = 0; u < e.length; u++) {
      let h = e[u];
      if (typeof h == "string" && (h = h.trim(), An(h))) {
        const d = dr(h, n.current);
        d !== void 0 && (e[u] = d), u === e.length - 1 && (this.finalKeyframe = h);
      }
    }
    if (this.resolveNoneKeyframes(), !mr.has(s) || e.length !== 2)
      return;
    const [i, o] = e, r = gs(i), a = gs(o), c = ns(i), l = ns(o);
    if (c !== l && vt[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (r !== a)
      if (hs(r) && hs(a))
        for (let u = 0; u < e.length; u++) {
          const h = e[u];
          typeof h == "string" && (e[u] = parseFloat(h));
        }
      else vt[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let i = 0; i < e.length; i++)
      (e[i] === null || gc(e[i])) && s.push(i);
    s.length && Pc(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = vt[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: s } = this;
    if (!e || !e.current)
      return;
    const i = e.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const o = s.length - 1, r = s[o];
    s[o] = vt[n](e.measureViewportBox(), window.getComputedStyle(e.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([a, c]) => {
      e.getValue(a).set(c);
    }), this.resolveNoneKeyframes();
  }
}
const Vc = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function br(t, e, n) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let s = document;
    const i = n?.[t] ?? s.querySelectorAll(t);
    return i ? Array.from(i) : [];
  }
  return Array.from(t).filter((s) => s != null);
}
const Sr = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function Cc(t) {
  return Di(t) && "offsetHeight" in t;
}
const { schedule: jn } = /* @__PURE__ */ zi(queueMicrotask, !1), it = {
  x: !1,
  y: !1
};
function Pr() {
  return it.x || it.y;
}
function Ec(t) {
  return t === "x" || t === "y" ? it[t] ? null : (it[t] = !0, () => {
    it[t] = !1;
  }) : it.x || it.y ? null : (it.x = it.y = !0, () => {
    it.x = it.y = !1;
  });
}
function Ar(t, e) {
  const n = br(t), s = new AbortController(), i = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [n, i, () => s.abort()];
}
function Dc(t) {
  return !(t.pointerType === "touch" || Pr());
}
function Mc(t, e, n = {}) {
  const [s, i, o] = Ar(t, n);
  return s.forEach((r) => {
    let a = !1, c = !1, l;
    const u = () => {
      r.removeEventListener("pointerleave", m);
    }, h = (y) => {
      l && (l(y), l = void 0), u();
    }, d = (y) => {
      a = !1, window.removeEventListener("pointerup", d), window.removeEventListener("pointercancel", d), c && (c = !1, h(y));
    }, f = () => {
      a = !0, window.addEventListener("pointerup", d, i), window.addEventListener("pointercancel", d, i);
    }, m = (y) => {
      if (y.pointerType !== "touch") {
        if (a) {
          c = !0;
          return;
        }
        h(y);
      }
    }, x = (y) => {
      if (!Dc(y))
        return;
      c = !1;
      const g = e(r, y);
      typeof g == "function" && (l = g, r.addEventListener("pointerleave", m, i));
    };
    r.addEventListener("pointerenter", x, i), r.addEventListener("pointerdown", f, i);
  }), o;
}
const Vr = (t, e) => e ? t === e ? !0 : Vr(t, e.parentElement) : !1, $n = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Rc = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Lc(t) {
  return Rc.has(t.tagName) || t.isContentEditable === !0;
}
const kc = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Ic(t) {
  return kc.has(t.tagName) || t.isContentEditable === !0;
}
const ce = /* @__PURE__ */ new WeakSet();
function vs(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Be(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const Bc = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const s = vs(() => {
    if (ce.has(n))
      return;
    Be(n, "down");
    const i = vs(() => {
      Be(n, "up");
    }), o = () => Be(n, "cancel");
    n.addEventListener("keyup", i, e), n.addEventListener("blur", o, e);
  });
  n.addEventListener("keydown", s, e), n.addEventListener("blur", () => n.removeEventListener("keydown", s), e);
};
function ws(t) {
  return $n(t) && !Pr();
}
const xs = /* @__PURE__ */ new WeakSet();
function Fc(t, e, n = {}) {
  const [s, i, o] = Ar(t, n), r = (a) => {
    const c = a.currentTarget;
    if (!ws(a) || xs.has(a))
      return;
    ce.add(c), n.stopPropagation && xs.add(a);
    const l = e(c, a), u = (f, m) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", d), ce.has(c) && ce.delete(c), ws(f) && typeof l == "function" && l(f, { success: m });
    }, h = (f) => {
      u(f, c === window || c === document || n.useGlobalTarget || Vr(c, f.target));
    }, d = (f) => {
      u(f, !1);
    };
    window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", d, i);
  };
  return s.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", r, i), Cc(a) && (a.addEventListener("focus", (l) => Bc(l, i)), !Lc(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), o;
}
function Un(t) {
  return Di(t) && "ownerSVGElement" in t;
}
const le = /* @__PURE__ */ new WeakMap();
let ue;
const Cr = (t, e, n) => (s, i) => i && i[0] ? i[0][t + "Size"] : Un(s) && "getBBox" in s ? s.getBBox()[e] : s[n], Oc = /* @__PURE__ */ Cr("inline", "width", "offsetWidth"), Nc = /* @__PURE__ */ Cr("block", "height", "offsetHeight");
function jc({ target: t, borderBoxSize: e }) {
  le.get(t)?.forEach((n) => {
    n(t, {
      get width() {
        return Oc(t, e);
      },
      get height() {
        return Nc(t, e);
      }
    });
  });
}
function $c(t) {
  t.forEach(jc);
}
function Uc() {
  typeof ResizeObserver > "u" || (ue = new ResizeObserver($c));
}
function Wc(t, e) {
  ue || Uc();
  const n = br(t);
  return n.forEach((s) => {
    let i = le.get(s);
    i || (i = /* @__PURE__ */ new Set(), le.set(s, i)), i.add(e), ue?.observe(s);
  }), () => {
    n.forEach((s) => {
      const i = le.get(s);
      i?.delete(e), i?.size || ue?.unobserve(s);
    });
  };
}
const he = /* @__PURE__ */ new Set();
let Mt;
function zc() {
  Mt = () => {
    const t = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    he.forEach((e) => e(t));
  }, window.addEventListener("resize", Mt);
}
function Hc(t) {
  return he.add(t), Mt || zc(), () => {
    he.delete(t), !he.size && typeof Mt == "function" && (window.removeEventListener("resize", Mt), Mt = void 0);
  };
}
function Ts(t, e) {
  return typeof t == "function" ? Hc(t) : Wc(t, e);
}
function Kc(t) {
  return Un(t) && t.tagName === "svg";
}
function Gc(...t) {
  const e = !Array.isArray(t[0]), n = e ? 0 : -1, s = t[0 + n], i = t[1 + n], o = t[2 + n], r = t[3 + n], a = er(i, o, r);
  return e ? a(s) : a;
}
const _c = [...wr, j, at], Xc = (t) => _c.find(vr(t)), bs = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Rt = () => ({
  x: bs(),
  y: bs()
}), Ss = () => ({ min: 0, max: 0 }), U = () => ({
  x: Ss(),
  y: Ss()
}), Yc = /* @__PURE__ */ new WeakMap();
function Ve(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Zt(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Wn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], zn = ["initial", ...Wn];
function Ce(t) {
  return Ve(t.animate) || zn.some((e) => Zt(t[e]));
}
function Er(t) {
  return !!(Ce(t) || t.variants);
}
function qc(t, e, n) {
  for (const s in e) {
    const i = e[s], o = n[s];
    if (H(i))
      t.addValue(s, i);
    else if (H(o))
      t.addValue(s, Vt(i, { owner: t }));
    else if (o !== i)
      if (t.hasValue(s)) {
        const r = t.getValue(s);
        r.liveStyle === !0 ? r.jump(i) : r.hasAnimated || r.set(i);
      } else {
        const r = t.getStaticValue(s);
        t.addValue(s, Vt(r !== void 0 ? r : i, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const hn = { current: null }, Dr = { current: !1 }, Zc = typeof window < "u";
function Jc() {
  if (Dr.current = !0, !!Zc)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => hn.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      hn.current = !1;
}
const Ps = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let we = {};
function Mr(t) {
  we = t;
}
function Qc() {
  return we;
}
class tl {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, skipAnimations: o, blockInitialAnimation: r, visualState: a }, c = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = kn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = Y.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, D.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = a;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.skipAnimationsConfig = o, this.options = c, this.blockInitialAnimation = !!r, this.isControllingVariants = Ce(n), this.isVariantNode = Er(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: h, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const f in d) {
      const m = d[f];
      l[f] !== void 0 && H(m) && m.set(l[f]);
    }
  }
  mount(e) {
    if (this.hasBeenMounted)
      for (const n in this.initialValues)
        this.values.get(n)?.jump(this.initialValues[n]), this.latestValues[n] = this.initialValues[n];
    this.current = e, Yc.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Dr.current || Jc(), this.shouldReduceMotion = hn.current), process.env.NODE_ENV !== "production" && bn(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), pt(this.notifyUpdate), pt(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), n.accelerate && Vc.has(e) && this.current instanceof HTMLElement) {
      const { factory: r, keyframes: a, times: c, ease: l, duration: u } = n.accelerate, h = new lr({
        element: this.current,
        name: e,
        keyframes: a,
        times: c,
        ease: l,
        duration: /* @__PURE__ */ nt(u)
      }), d = r(h);
      this.valueSubscriptions.set(e, () => {
        d(), h.cancel();
      });
      return;
    }
    const s = jt.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (r) => {
      this.latestValues[e] = r, this.props.onUpdate && D.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let o;
    typeof window < "u" && window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      i(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in we) {
      const n = we[e];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
        const o = this.features[e];
        o.isMounted ? o.update() : (o.mount(), o.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : U();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < Ps.length; s++) {
      const i = Ps[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const o = "on" + i, r = e[o];
      r && (this.propEventSubscriptions[i] = this.on(i, r));
    }
    this.prevMotionValues = qc(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = Vt(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (Ei(s) || Mi(s)) ? s = parseFloat(s) : !Xc(s) && at.test(n) && (s = Tr(e, n)), this.setBaseTarget(e, H(s) ? s.get() : s)), H(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const o = Fn(this.props, n, this.presenceContext?.custom);
      o && (s = o[e]);
    }
    if (n && s !== void 0)
      return s;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !H(i) ? i : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Tn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    jn.render(this.render);
  }
}
class Rr extends tl {
  constructor() {
    super(...arguments), this.KeyframeResolver = Ac;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    const s = e.style;
    return s ? s[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    H(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
class wt {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function Lr({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function el({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function nl(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function Fe(t) {
  return t === void 0 || t === 1;
}
function dn({ scale: t, scaleX: e, scaleY: n }) {
  return !Fe(t) || !Fe(e) || !Fe(n);
}
function Tt(t) {
  return dn(t) || kr(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function kr(t) {
  return As(t.x) || As(t.y);
}
function As(t) {
  return t && t !== "0%";
}
function xe(t, e, n) {
  const s = t - n, i = e * s;
  return n + i;
}
function Vs(t, e, n, s, i) {
  return i !== void 0 && (t = xe(t, i, s)), xe(t, n, s) + e;
}
function fn(t, e = 0, n = 1, s, i) {
  t.min = Vs(t.min, e, n, s, i), t.max = Vs(t.max, e, n, s, i);
}
function Ir(t, { x: e, y: n }) {
  fn(t.x, e.translate, e.scale, e.originPoint), fn(t.y, n.translate, n.scale, n.originPoint);
}
const Cs = 0.999999999999, Es = 1.0000000000001;
function sl(t, e, n, s = !1) {
  const i = n.length;
  if (!i)
    return;
  e.x = e.y = 1;
  let o, r;
  for (let a = 0; a < i; a++) {
    o = n[a], r = o.projectionDelta;
    const { visualElement: c } = o.options;
    c && c.props.style && c.props.style.display === "contents" || (s && o.options.layoutScroll && o.scroll && o !== o.root && kt(t, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), r && (e.x *= r.x.scale, e.y *= r.y.scale, Ir(t, r)), s && Tt(o.latestValues) && kt(t, o.latestValues));
  }
  e.x < Es && e.x > Cs && (e.x = 1), e.y < Es && e.y > Cs && (e.y = 1);
}
function Lt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function Ds(t, e, n, s, i = 0.5) {
  const o = O(t.min, t.max, i);
  fn(t, e, n, o, s);
}
function kt(t, e) {
  Ds(t.x, e.x, e.scaleX, e.scale, e.originX), Ds(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function Br(t, e) {
  return Lr(nl(t.getBoundingClientRect(), e));
}
function il(t, e, n) {
  const s = Br(t, n), { scroll: i } = e;
  return i && (Lt(s.x, i.offset.x), Lt(s.y, i.offset.y)), s;
}
const rl = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, ol = Nt.length;
function al(t, e, n) {
  let s = "", i = !0;
  for (let o = 0; o < ol; o++) {
    const r = Nt[o], a = t[r];
    if (a === void 0)
      continue;
    let c = !0;
    if (typeof a == "number")
      c = a === (r.startsWith("scale") ? 1 : 0);
    else {
      const l = parseFloat(a);
      c = r.startsWith("scale") ? l === 1 : l === 0;
    }
    if (!c || n) {
      const l = Sr(a, Nn[r]);
      if (!c) {
        i = !1;
        const u = rl[r] || r;
        s += `${u}(${l}) `;
      }
      n && (e[r] = l);
    }
  }
  return s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function Hn(t, e, n) {
  const { style: s, vars: i, transformOrigin: o } = t;
  let r = !1, a = !1;
  for (const c in e) {
    const l = e[c];
    if (jt.has(c)) {
      r = !0;
      continue;
    } else if (Ki(c)) {
      i[c] = l;
      continue;
    } else {
      const u = Sr(l, Nn[c]);
      c.startsWith("origin") ? (a = !0, o[c] = u) : s[c] = u;
    }
  }
  if (e.transform || (r || n ? s.transform = al(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: c = "50%", originY: l = "50%", originZ: u = 0 } = o;
    s.transformOrigin = `${c} ${l} ${u}`;
  }
}
function Fr(t, { style: e, vars: n }, s, i) {
  const o = t.style;
  let r;
  for (r in e)
    o[r] = e[r];
  i?.applyProjectionStyles(o, s);
  for (r in n)
    o.setProperty(r, n[r]);
}
function Ms(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const Ut = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (T.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Ms(t, e.target.x), s = Ms(t, e.target.y);
    return `${n}% ${s}%`;
  }
}, cl = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const s = t, i = at.parse(t);
    if (i.length > 5)
      return s;
    const o = at.createTransformer(t), r = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * e.x, c = n.y.scale * e.y;
    i[0 + r] /= a, i[1 + r] /= c;
    const l = O(a, c, 0.5);
    return typeof i[2 + r] == "number" && (i[2 + r] /= l), typeof i[3 + r] == "number" && (i[3 + r] /= l), o(i);
  }
}, mn = {
  borderRadius: {
    ...Ut,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Ut,
  borderTopRightRadius: Ut,
  borderBottomLeftRadius: Ut,
  borderBottomRightRadius: Ut,
  boxShadow: cl
};
function Or(t, { layout: e, layoutId: n }) {
  return jt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!mn[t] || t === "opacity");
}
function Kn(t, e, n) {
  const s = t.style, i = e?.style, o = {};
  if (!s)
    return o;
  for (const r in s)
    (H(s[r]) || i && H(i[r]) || Or(r, t) || n?.getValue(r)?.liveStyle !== void 0) && (o[r] = s[r]);
  return o;
}
function ll(t) {
  return window.getComputedStyle(t);
}
class ul extends Rr {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Fr;
  }
  readValueFromInstance(e, n) {
    if (jt.has(n))
      return this.projection?.isProjecting ? Qe(n) : Va(e, n);
    {
      const s = ll(e), i = (Ki(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Br(e, n);
  }
  build(e, n, s) {
    Hn(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Kn(e, n, s);
  }
}
const hl = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, dl = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function fl(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const o = i ? hl : dl;
  t[o.offset] = `${-s}`, t[o.array] = `${e} ${n}`;
}
const ml = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Nr(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  pathLength: i,
  pathSpacing: o = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, c, l, u) {
  if (Hn(t, a, l), c) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: d } = t;
  h.transform && (d.transform = h.transform, delete h.transform), (d.transform || h.transformOrigin) && (d.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), d.transform && (d.transformBox = u?.transformBox ?? "fill-box", delete h.transformBox);
  for (const f of ml)
    h[f] !== void 0 && (d[f] = h[f], delete h[f]);
  e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), s !== void 0 && (h.scale = s), i !== void 0 && fl(h, i, o, r, !1);
}
const jr = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), $r = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function pl(t, e, n, s) {
  Fr(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(jr.has(i) ? i : On(i), e.attrs[i]);
}
function Ur(t, e, n) {
  const s = Kn(t, e, n);
  for (const i in t)
    if (H(t[i]) || H(e[i])) {
      const o = Nt.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[o] = t[i];
    }
  return s;
}
class gl extends Rr {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = U;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (jt.has(n)) {
      const s = xr(n);
      return s && s.default || 0;
    }
    return n = jr.has(n) ? n : On(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Ur(e, n, s);
  }
  build(e, n, s) {
    Nr(e, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, n, s, i) {
    pl(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = $r(e.tagName), super.mount(e);
  }
}
const yl = zn.length;
function Wr(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? Wr(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < yl; n++) {
    const s = zn[n], i = t.props[s];
    (Zt(i) || i === !1) && (e[s] = i);
  }
  return e;
}
function zr(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let s = 0; s < n; s++)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const vl = [...Wn].reverse(), wl = Wn.length;
function xl(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: s }) => mc(t, n, s)));
}
function Tl(t) {
  let e = xl(t), n = Rs(), s = !0;
  const i = (c) => (l, u) => {
    const h = It(t, u, c === "exit" ? t.presenceContext?.custom : void 0);
    if (h) {
      const { transition: d, transitionEnd: f, ...m } = h;
      l = { ...l, ...m, ...f };
    }
    return l;
  };
  function o(c) {
    e = c(t);
  }
  function r(c) {
    const { props: l } = t, u = Wr(t.parent) || {}, h = [], d = /* @__PURE__ */ new Set();
    let f = {}, m = 1 / 0;
    for (let y = 0; y < wl; y++) {
      const g = vl[y], v = n[g], p = l[g] !== void 0 ? l[g] : u[g], S = Zt(p), w = g === c ? v.isActive : null;
      w === !1 && (m = y);
      let b = p === u[g] && p !== l[g] && S;
      if (b && s && t.manuallyAnimateOnMount && (b = !1), v.protectedKeys = { ...f }, // If it isn't active and hasn't *just* been set as inactive
      !v.isActive && w === null || // If we didn't and don't have any defined prop for this animation type
      !p && !v.prevProp || // Or if the prop doesn't define an animation
      Ve(p) || typeof p == "boolean")
        continue;
      if (g === "exit" && v.isActive && w !== !0) {
        v.prevResolvedValues && (f = {
          ...f,
          ...v.prevResolvedValues
        });
        continue;
      }
      const V = bl(v.prevProp, p);
      let P = V || // If we're making this variant active, we want to always make it active
      g === c && v.isActive && !b && S || // If we removed a higher-priority variant (i is in reverse order)
      y > m && S, k = !1;
      const L = Array.isArray(p) ? p : [p];
      let $ = L.reduce(i(g), {});
      w === !1 && ($ = {});
      const { prevResolvedValues: K = {} } = v, Q = {
        ...K,
        ...$
      }, J = (A) => {
        P = !0, d.has(A) && (k = !0, d.delete(A)), v.needsAnimating[A] = !0;
        const I = t.getValue(A);
        I && (I.liveStyle = !1);
      };
      for (const A in Q) {
        const I = $[A], E = K[A];
        if (f.hasOwnProperty(A))
          continue;
        let R = !1;
        on(I) && on(E) ? R = !zr(I, E) : R = I !== E, R ? I != null ? J(A) : d.add(A) : I !== void 0 && d.has(A) ? J(A) : v.protectedKeys[A] = !0;
      }
      v.prevProp = p, v.prevResolvedValues = $, v.isActive && (f = { ...f, ...$ }), s && t.blockInitialAnimation && (P = !1);
      const Z = b && V;
      P && (!Z || k) && h.push(...L.map((A) => {
        const I = { type: g };
        if (typeof A == "string" && s && !Z && t.manuallyAnimateOnMount && t.parent) {
          const { parent: E } = t, R = It(E, A);
          if (E.enteringChildren && R) {
            const { delayChildren: B } = R.transition || {};
            I.delay = hr(E.enteringChildren, t, B);
          }
        }
        return {
          animation: A,
          options: I
        };
      }));
    }
    if (d.size) {
      const y = {};
      if (typeof l.initial != "boolean") {
        const g = It(t, Array.isArray(l.initial) ? l.initial[0] : l.initial);
        g && g.transition && (y.transition = g.transition);
      }
      d.forEach((g) => {
        const v = t.getBaseTarget(g), p = t.getValue(g);
        p && (p.liveStyle = !0), y[g] = v ?? null;
      }), h.push({ animation: y });
    }
    let x = !!h.length;
    return s && (l.initial === !1 || l.initial === l.animate) && !t.manuallyAnimateOnMount && (x = !1), s = !1, x ? e(h) : Promise.resolve();
  }
  function a(c, l) {
    if (n[c].isActive === l)
      return Promise.resolve();
    t.variantChildren?.forEach((h) => h.animationState?.setActive(c, l)), n[c].isActive = l;
    const u = r(c);
    for (const h in n)
      n[h].protectedKeys = {};
    return u;
  }
  return {
    animateChanges: r,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      n = Rs();
    }
  };
}
function bl(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !zr(e, t) : !1;
}
function xt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Rs() {
  return {
    animate: xt(!0),
    whileInView: xt(),
    whileHover: xt(),
    whileTap: xt(),
    whileDrag: xt(),
    whileFocus: xt(),
    exit: xt()
  };
}
function Ls(t, e) {
  t.min = e.min, t.max = e.max;
}
function st(t, e) {
  Ls(t.x, e.x), Ls(t.y, e.y);
}
function ks(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
const Hr = 1e-4, Sl = 1 - Hr, Pl = 1 + Hr, Kr = 0.01, Al = 0 - Kr, Vl = 0 + Kr;
function q(t) {
  return t.max - t.min;
}
function Cl(t, e, n) {
  return Math.abs(t - e) <= n;
}
function Is(t, e, n, s = 0.5) {
  t.origin = s, t.originPoint = O(e.min, e.max, t.origin), t.scale = q(n) / q(e), t.translate = O(n.min, n.max, t.origin) - t.originPoint, (t.scale >= Sl && t.scale <= Pl || isNaN(t.scale)) && (t.scale = 1), (t.translate >= Al && t.translate <= Vl || isNaN(t.translate)) && (t.translate = 0);
}
function Kt(t, e, n, s) {
  Is(t.x, e.x, n.x, s ? s.originX : void 0), Is(t.y, e.y, n.y, s ? s.originY : void 0);
}
function Bs(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + q(e);
}
function El(t, e, n) {
  Bs(t.x, e.x, n.x), Bs(t.y, e.y, n.y);
}
function Fs(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + q(e);
}
function Te(t, e, n) {
  Fs(t.x, e.x, n.x), Fs(t.y, e.y, n.y);
}
function Os(t, e, n, s, i) {
  return t -= e, t = xe(t, 1 / n, s), i !== void 0 && (t = xe(t, 1 / i, s)), t;
}
function Dl(t, e = 0, n = 1, s = 0.5, i, o = t, r = t) {
  if (ut.test(e) && (e = parseFloat(e), e = O(r.min, r.max, e / 100) - r.min), typeof e != "number")
    return;
  let a = O(o.min, o.max, s);
  t === o && (a -= e), t.min = Os(t.min, e, n, a, i), t.max = Os(t.max, e, n, a, i);
}
function Ns(t, e, [n, s, i], o, r) {
  Dl(t, e[n], e[s], e[i], e.scale, o, r);
}
const Ml = ["x", "scaleX", "originX"], Rl = ["y", "scaleY", "originY"];
function js(t, e, n, s) {
  Ns(t.x, e, Ml, n ? n.x : void 0, s ? s.x : void 0), Ns(t.y, e, Rl, n ? n.y : void 0, s ? s.y : void 0);
}
function $s(t) {
  return t.translate === 0 && t.scale === 1;
}
function Gr(t) {
  return $s(t.x) && $s(t.y);
}
function Us(t, e) {
  return t.min === e.min && t.max === e.max;
}
function Ll(t, e) {
  return Us(t.x, e.x) && Us(t.y, e.y);
}
function Ws(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function _r(t, e) {
  return Ws(t.x, e.x) && Ws(t.y, e.y);
}
function zs(t) {
  return q(t.x) / q(t.y);
}
function Hs(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
function lt(t) {
  return [t("x"), t("y")];
}
function kl(t, e, n) {
  let s = "";
  const i = t.x.translate / e.x, o = t.y.translate / e.y, r = n?.z || 0;
  if ((i || o || r) && (s = `translate3d(${i}px, ${o}px, ${r}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: l, rotate: u, rotateX: h, rotateY: d, skewX: f, skewY: m } = n;
    l && (s = `perspective(${l}px) ${s}`), u && (s += `rotate(${u}deg) `), h && (s += `rotateX(${h}deg) `), d && (s += `rotateY(${d}deg) `), f && (s += `skewX(${f}deg) `), m && (s += `skewY(${m}deg) `);
  }
  const a = t.x.scale * e.x, c = t.y.scale * e.y;
  return (a !== 1 || c !== 1) && (s += `scale(${a}, ${c})`), s || "none";
}
const Xr = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Il = Xr.length, Ks = (t) => typeof t == "string" ? parseFloat(t) : t, Gs = (t) => typeof t == "number" || T.test(t);
function Bl(t, e, n, s, i, o) {
  i ? (t.opacity = O(0, n.opacity ?? 1, Fl(s)), t.opacityExit = O(e.opacity ?? 1, 0, Ol(s))) : o && (t.opacity = O(e.opacity ?? 1, n.opacity ?? 1, s));
  for (let r = 0; r < Il; r++) {
    const a = `border${Xr[r]}Radius`;
    let c = _s(e, a), l = _s(n, a);
    if (c === void 0 && l === void 0)
      continue;
    c || (c = 0), l || (l = 0), c === 0 || l === 0 || Gs(c) === Gs(l) ? (t[a] = Math.max(O(Ks(c), Ks(l), s), 0), (ut.test(l) || ut.test(c)) && (t[a] += "%")) : t[a] = l;
  }
  (e.rotate || n.rotate) && (t.rotate = O(e.rotate || 0, n.rotate || 0, s));
}
function _s(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const Fl = /* @__PURE__ */ Yr(0, 0.5, ji), Ol = /* @__PURE__ */ Yr(0.5, 0.95, et);
function Yr(t, e, n) {
  return (s) => s < t ? 0 : s > e ? 1 : n(/* @__PURE__ */ Xt(t, e, s));
}
function Nl(t, e, n) {
  const s = H(t) ? t : Vt(t);
  return s.start(Bn("", s, e, n)), s.animation;
}
function Jt(t, e, n, s = { passive: !0 }) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n);
}
const jl = (t, e) => t.depth - e.depth;
class $l {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    xn(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    pe(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(jl), this.isDirty = !1, this.children.forEach(e);
  }
}
function Ul(t, e) {
  const n = Y.now(), s = ({ timestamp: i }) => {
    const o = i - n;
    o >= e && (pt(s), t(o - e));
  };
  return D.setup(s, !0), () => pt(s);
}
function de(t) {
  return H(t) ? t.get() : t;
}
class Wl {
  constructor() {
    this.members = [];
  }
  add(e) {
    xn(this.members, e);
    for (let n = this.members.length - 1; n >= 0; n--) {
      const s = this.members[n];
      if (s === e || s === this.lead || s === this.prevLead)
        continue;
      const i = s.instance;
      i && i.isConnected === !1 && s.isPresent !== !1 && !s.snapshot && pe(this.members, s);
    }
    e.scheduleRender();
  }
  remove(e) {
    if (pe(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((i) => e === i);
    if (n === 0)
      return !1;
    let s;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i], r = o.instance;
      if (o.isPresent !== !1 && (!r || r.isConnected !== !1)) {
        s = o;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(e, n) {
    const s = this.lead;
    if (e !== s && (this.prevLead = s, this.lead = e, e.show(), s)) {
      s.instance && s.scheduleRender(), e.scheduleRender();
      const i = s.options.layoutDependency, o = e.options.layoutDependency;
      if (!(i !== void 0 && o !== void 0 && i === o)) {
        const c = s.instance;
        c && c.isConnected === !1 && !s.snapshot || (e.resumeFrom = s, n && (e.resumeFrom.preserveOpacity = !0), s.snapshot && (e.snapshot = s.snapshot, e.snapshot.latestValues = s.animationValues || s.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
      }
      const { crossfade: a } = e.options;
      a === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: s } = e;
      n.onExitComplete && n.onExitComplete(), s && s.options.onExitComplete && s.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
const fe = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, Oe = ["", "X", "Y", "Z"], zl = 1e3;
let Hl = 0;
function Ne(t, e, n, s) {
  const { latestValues: i } = e;
  i[t] && (n[t] = i[t], e.setStaticValue(t, 0), s && (s[t] = 0));
}
function qr(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = gr(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: o } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", D, !(i || o));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && qr(s);
}
function Zr({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: s, resetTransform: i }) {
  return class {
    constructor(r = {}, a = e?.()) {
      this.id = Hl++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(_l), this.nodes.forEach(Zl), this.nodes.forEach(Jl), this.nodes.forEach(Xl);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let c = 0; c < this.path.length; c++)
        this.path[c].shouldResetTransform = !0;
      this.root === this && (this.nodes = new $l());
    }
    addEventListener(r, a) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new Tn()), this.eventHandlers.get(r).add(a);
    }
    notifyListeners(r, ...a) {
      const c = this.eventHandlers.get(r);
      c && c.notify(...a);
    }
    hasListeners(r) {
      return this.eventHandlers.has(r);
    }
    /**
     * Lifecycles
     */
    mount(r) {
      if (this.instance)
        return;
      this.isSVG = Un(r) && !Kc(r), this.instance = r;
      const { layoutId: a, layout: c, visualElement: l } = this.options;
      if (l && !l.current && l.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (c || a) && (this.isLayoutDirty = !0), t) {
        let u, h = 0;
        const d = () => this.root.updateBlockedByResize = !1;
        D.read(() => {
          h = window.innerWidth;
        }), t(r, () => {
          const f = window.innerWidth;
          f !== h && (h = f, this.root.updateBlockedByResize = !0, u && u(), u = Ul(d, 250), fe.hasAnimatedSinceResize && (fe.hasAnimatedSinceResize = !1, this.nodes.forEach(qs)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && l && (a || c) && this.addEventListener("didUpdate", ({ delta: u, hasLayoutChanged: h, hasRelativeLayoutChanged: d, layout: f }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const m = this.options.transition || l.getDefaultTransition() || su, { onLayoutAnimationStart: x, onLayoutAnimationComplete: y } = l.getProps(), g = !this.targetLayout || !_r(this.targetLayout, f), v = !h && d;
        if (this.options.layoutRoot || this.resumeFrom || v || h && (g || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const p = {
            ...In(m, "layout"),
            onPlay: x,
            onComplete: y
          };
          (l.shouldReduceMotion || this.options.layoutRoot) && (p.delay = 0, p.type = !1), this.startAnimation(p), this.setAnimationOrigin(u, v);
        } else
          h || qs(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = f;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), pt(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Ql), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: r } = this.options;
      return r && r.getProps().transformTemplate;
    }
    willUpdate(r = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && qr(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let u = 0; u < this.path.length; u++) {
        const h = this.path[u];
        h.shouldResetTransform = !0, h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: a, layout: c } = this.options;
      if (a === void 0 && !c)
        return;
      const l = this.getTransformTemplate();
      this.prevTransformTemplateValue = l ? l(this.latestValues, "") : void 0, this.updateSnapshot(), r && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Xs);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ys);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(ql), this.nodes.forEach(Kl), this.nodes.forEach(Gl)) : this.nodes.forEach(Ys), this.clearAllSnapshots();
      const a = Y.now();
      G.delta = ht(0, 1e3 / 60, a - G.timestamp), G.timestamp = a, G.isProcessing = !0, De.update.process(G), De.preRender.process(G), De.render.process(G), G.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, jn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Yl), this.sharedNodes.forEach(tu);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, D.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      D.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !q(this.snapshot.measuredBox.x) && !q(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let c = 0; c < this.path.length; c++)
          this.path[c].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = U(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, r ? r.layoutBox : void 0);
    }
    updateScroll(r = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === r && (a = !1), a && this.instance) {
        const c = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: r,
          isRoot: c,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : c
        };
      }
    }
    resetTransform() {
      if (!i)
        return;
      const r = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Gr(this.projectionDelta), c = this.getTransformTemplate(), l = c ? c(this.latestValues, "") : void 0, u = l !== this.prevTransformTemplateValue;
      r && this.instance && (a || Tt(this.latestValues) || u) && (i(this.instance, l), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let c = this.removeElementScroll(a);
      return r && (c = this.removeTransform(c)), iu(c), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: c,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: r } = this.options;
      if (!r)
        return U();
      const a = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(ru))) {
        const { scroll: l } = this.root;
        l && (Lt(a.x, l.offset.x), Lt(a.y, l.offset.y));
      }
      return a;
    }
    removeElementScroll(r) {
      const a = U();
      if (st(a, r), this.scroll?.wasRoot)
        return a;
      for (let c = 0; c < this.path.length; c++) {
        const l = this.path[c], { scroll: u, options: h } = l;
        l !== this.root && u && h.layoutScroll && (u.wasRoot && st(a, r), Lt(a.x, u.offset.x), Lt(a.y, u.offset.y));
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const c = U();
      st(c, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        !a && u.options.layoutScroll && u.scroll && u !== u.root && kt(c, {
          x: -u.scroll.offset.x,
          y: -u.scroll.offset.y
        }), Tt(u.latestValues) && kt(c, u.latestValues);
      }
      return Tt(this.latestValues) && kt(c, this.latestValues), c;
    }
    removeTransform(r) {
      const a = U();
      st(a, r);
      for (let c = 0; c < this.path.length; c++) {
        const l = this.path[c];
        if (!l.instance || !Tt(l.latestValues))
          continue;
        dn(l.latestValues) && l.updateSnapshot();
        const u = U(), h = l.measurePageBox();
        st(u, h), js(a, l.latestValues, l.snapshot ? l.snapshot.layoutBox : void 0, u);
      }
      return Tt(this.latestValues) && js(a, this.latestValues), a;
    }
    setTargetDelta(r) {
      this.targetDelta = r, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(r) {
      this.options = {
        ...this.options,
        ...r,
        crossfade: r.crossfade !== void 0 ? r.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== G.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(r = !1) {
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const c = !!this.resumingFrom || this !== a;
      if (!(r || c && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: u, layoutId: h } = this.options;
      if (!this.layout || !(u || h))
        return;
      this.resolvedRelativeTargetAt = G.timestamp;
      const d = this.getClosestProjectingParent();
      d && this.linkedParentVersion !== d.layoutVersion && !d.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (d && d.layout ? this.createRelativeTarget(d, this.layout.layoutBox, d.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = U(), this.targetWithTransforms = U()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), El(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : st(this.target, this.layout.layoutBox), Ir(this.target, this.targetDelta)) : st(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, d && !!d.resumingFrom == !!this.resumingFrom && !d.options.layoutScroll && d.target && this.animationProgress !== 1 ? this.createRelativeTarget(d, this.target, d.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || dn(this.parent.latestValues) || kr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(r, a, c) {
      this.relativeParent = r, this.linkedParentVersion = r.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = U(), this.relativeTargetOrigin = U(), Te(this.relativeTargetOrigin, a, c), st(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const r = this.getLead(), a = !!this.resumingFrom || this !== r;
      let c = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (c = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (c = !1), this.resolvedRelativeTargetAt === G.timestamp && (c = !1), c)
        return;
      const { layout: l, layoutId: u } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(l || u))
        return;
      st(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, d = this.treeScale.y;
      sl(this.layoutCorrected, this.treeScale, this.path, a), r.layout && !r.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (r.target = r.layout.layoutBox, r.targetWithTransforms = U());
      const { target: f } = r;
      if (!f) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (ks(this.prevProjectionDelta.x, this.projectionDelta.x), ks(this.prevProjectionDelta.y, this.projectionDelta.y)), Kt(this.projectionDelta, this.layoutCorrected, f, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== d || !Hs(this.projectionDelta.x, this.prevProjectionDelta.x) || !Hs(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", f));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(r = !0) {
      if (this.options.visualElement?.scheduleRender(), r) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Rt(), this.projectionDelta = Rt(), this.projectionDeltaWithTransform = Rt();
    }
    setAnimationOrigin(r, a = !1) {
      const c = this.snapshot, l = c ? c.latestValues : {}, u = { ...this.latestValues }, h = Rt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const d = U(), f = c ? c.source : void 0, m = this.layout ? this.layout.source : void 0, x = f !== m, y = this.getStack(), g = !y || y.members.length <= 1, v = !!(x && !g && this.options.crossfade === !0 && !this.path.some(nu));
      this.animationProgress = 0;
      let p;
      this.mixTargetDelta = (S) => {
        const w = S / 1e3;
        Zs(h.x, r.x, w), Zs(h.y, r.y, w), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Te(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox), eu(this.relativeTarget, this.relativeTargetOrigin, d, w), p && Ll(this.relativeTarget, p) && (this.isProjectionDirty = !1), p || (p = U()), st(p, this.relativeTarget)), x && (this.animationValues = u, Bl(u, l, this.latestValues, w, v, g)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = w;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (pt(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = D.update(() => {
        fe.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Vt(0)), this.currentAnimation = Nl(this.motionValue, [0, 1e3], {
          ...r,
          velocity: 0,
          isSync: !0,
          onUpdate: (a) => {
            this.mixTargetDelta(a), r.onUpdate && r.onUpdate(a);
          },
          onStop: () => {
          },
          onComplete: () => {
            r.onComplete && r.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const r = this.getStack();
      r && r.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(zl), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: a, target: c, layout: l, latestValues: u } = r;
      if (!(!a || !c || !l)) {
        if (this !== r && this.layout && l && Jr(this.options.animationType, this.layout.layoutBox, l.layoutBox)) {
          c = this.target || U();
          const h = q(this.layout.layoutBox.x);
          c.x.min = r.target.x.min, c.x.max = c.x.min + h;
          const d = q(this.layout.layoutBox.y);
          c.y.min = r.target.y.min, c.y.max = c.y.min + d;
        }
        st(a, c), kt(a, u), Kt(this.projectionDeltaWithTransform, this.layoutCorrected, a, u);
      }
    }
    registerSharedNode(r, a) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new Wl()), this.sharedNodes.get(r).add(a);
      const l = a.options.initialPromotionConfig;
      a.promote({
        transition: l ? l.transition : void 0,
        preserveFollowOpacity: l && l.shouldPreserveFollowOpacity ? l.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const r = this.getStack();
      return r ? r.lead === this : !0;
    }
    getLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: r } = this.options;
      if (r)
        return this.root.sharedNodes.get(r);
    }
    promote({ needsReset: r, transition: a, preserveFollowOpacity: c } = {}) {
      const l = this.getStack();
      l && l.promote(this, c), r && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const r = this.getStack();
      return r ? r.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: r } = this.options;
      if (!r)
        return;
      let a = !1;
      const { latestValues: c } = r;
      if ((c.z || c.rotate || c.rotateX || c.rotateY || c.rotateZ || c.skewX || c.skewY) && (a = !0), !a)
        return;
      const l = {};
      c.z && Ne("z", r, l, this.animationValues);
      for (let u = 0; u < Oe.length; u++)
        Ne(`rotate${Oe[u]}`, r, l, this.animationValues), Ne(`skew${Oe[u]}`, r, l, this.animationValues);
      r.render();
      for (const u in l)
        r.setStaticValue(u, l[u]), this.animationValues && (this.animationValues[u] = l[u]);
      r.scheduleRender();
    }
    applyProjectionStyles(r, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        r.visibility = "hidden";
        return;
      }
      const c = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, r.visibility = "", r.opacity = "", r.pointerEvents = de(a?.pointerEvents) || "", r.transform = c ? c(this.latestValues, "") : "none";
        return;
      }
      const l = this.getLead();
      if (!this.projectionDelta || !this.layout || !l.target) {
        this.options.layoutId && (r.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, r.pointerEvents = de(a?.pointerEvents) || ""), this.hasProjected && !Tt(this.latestValues) && (r.transform = c ? c({}, "") : "none", this.hasProjected = !1);
        return;
      }
      r.visibility = "";
      const u = l.animationValues || l.latestValues;
      this.applyTransformsToTarget();
      let h = kl(this.projectionDeltaWithTransform, this.treeScale, u);
      c && (h = c(u, h)), r.transform = h;
      const { x: d, y: f } = this.projectionDelta;
      r.transformOrigin = `${d.origin * 100}% ${f.origin * 100}% 0`, l.animationValues ? r.opacity = l === this ? u.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : u.opacityExit : r.opacity = l === this ? u.opacity !== void 0 ? u.opacity : "" : u.opacityExit !== void 0 ? u.opacityExit : 0;
      for (const m in mn) {
        if (u[m] === void 0)
          continue;
        const { correct: x, applyTo: y, isCSSVariable: g } = mn[m], v = h === "none" ? u[m] : x(u[m], l);
        if (y) {
          const p = y.length;
          for (let S = 0; S < p; S++)
            r[y[S]] = v;
        } else
          g ? this.options.visualElement.renderState.vars[m] = v : r[m] = v;
      }
      this.options.layoutId && (r.pointerEvents = l === this ? de(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => r.currentAnimation?.stop()), this.root.nodes.forEach(Xs), this.root.sharedNodes.clear();
    }
  };
}
function Kl(t) {
  t.updateLayout();
}
function Gl(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: s } = t.layout, { animationType: i } = t.options, o = e.source !== t.layout.source;
    i === "size" ? lt((u) => {
      const h = o ? e.measuredBox[u] : e.layoutBox[u], d = q(h);
      h.min = n[u].min, h.max = h.min + d;
    }) : Jr(i, e.layoutBox, n) && lt((u) => {
      const h = o ? e.measuredBox[u] : e.layoutBox[u], d = q(n[u]);
      h.max = h.min + d, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[u].max = t.relativeTarget[u].min + d);
    });
    const r = Rt();
    Kt(r, n, e.layoutBox);
    const a = Rt();
    o ? Kt(a, t.applyTransform(s, !0), e.measuredBox) : Kt(a, n, e.layoutBox);
    const c = !Gr(r);
    let l = !1;
    if (!t.resumeFrom) {
      const u = t.getClosestProjectingParent();
      if (u && !u.resumeFrom) {
        const { snapshot: h, layout: d } = u;
        if (h && d) {
          const f = U();
          Te(f, e.layoutBox, h.layoutBox);
          const m = U();
          Te(m, n, d.layoutBox), _r(f, m) || (l = !0), u.options.layoutRoot && (t.relativeTarget = m, t.relativeTargetOrigin = f, t.relativeParent = u);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: n,
      snapshot: e,
      delta: a,
      layoutDelta: r,
      hasLayoutChanged: c,
      hasRelativeLayoutChanged: l
    });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function _l(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function Xl(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function Yl(t) {
  t.clearSnapshot();
}
function Xs(t) {
  t.clearMeasurements();
}
function Ys(t) {
  t.isLayoutDirty = !1;
}
function ql(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function qs(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function Zl(t) {
  t.resolveTargetDelta();
}
function Jl(t) {
  t.calcProjection();
}
function Ql(t) {
  t.resetSkewAndRotation();
}
function tu(t) {
  t.removeLeadSnapshot();
}
function Zs(t, e, n) {
  t.translate = O(e.translate, 0, n), t.scale = O(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function Js(t, e, n, s) {
  t.min = O(e.min, n.min, s), t.max = O(e.max, n.max, s);
}
function eu(t, e, n, s) {
  Js(t.x, e.x, n.x, s), Js(t.y, e.y, n.y, s);
}
function nu(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const su = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Qs = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), ti = Qs("applewebkit/") && !Qs("chrome/") ? Math.round : et;
function ei(t) {
  t.min = ti(t.min), t.max = ti(t.max);
}
function iu(t) {
  ei(t.x), ei(t.y);
}
function Jr(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !Cl(zs(e), zs(n), 0.2);
}
function ru(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const ou = Zr({
  attachResizeListener: (t, e) => Jt(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), je = {
  current: void 0
}, Qr = Zr({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!je.current) {
      const t = new ou({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), je.current = t;
    }
    return je.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), Gn = gt({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function au(t = !0) {
  const e = W(wn);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: s, register: i } = e, o = Pe();
  X(() => {
    if (t)
      return i(o);
  }, [t]);
  const r = ot(() => t && s && s(o), [o, s, t]);
  return !n && s ? [!1, r] : [!0];
}
const to = gt({ strict: !1 }), ni = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let si = !1;
function cu() {
  if (si)
    return;
  const t = {};
  for (const e in ni)
    t[e] = {
      isEnabled: (n) => ni[e].some((s) => !!n[s])
    };
  Mr(t), si = !0;
}
function eo() {
  return cu(), Qc();
}
function lu(t) {
  const e = eo();
  for (const n in t)
    e[n] = {
      ...e[n],
      ...t[n]
    };
  Mr(e);
}
const uu = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function be(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || uu.has(t);
}
let no = (t) => !be(t);
function hu(t) {
  typeof t == "function" && (no = (e) => e.startsWith("on") ? !be(e) : t(e));
}
try {
  hu(require("@emotion/is-prop-valid").default);
} catch {
}
function du(t, e, n) {
  const s = {};
  for (const i in t)
    i === "values" && typeof t.values == "object" || (no(i) || n === !0 && be(i) || !e && !be(i) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && i.startsWith("onDrag")) && (s[i] = t[i]);
  return s;
}
const Ee = /* @__PURE__ */ gt({});
function fu(t, e) {
  if (Ce(t)) {
    const { initial: n, animate: s } = t;
    return {
      initial: n === !1 || Zt(n) ? n : void 0,
      animate: Zt(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function mu(t) {
  const { initial: e, animate: n } = fu(t, W(Ee));
  return ct(() => ({ initial: e, animate: n }), [ii(e), ii(n)]);
}
function ii(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const _n = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function so(t, e, n) {
  for (const s in e)
    !H(e[s]) && !Or(s, n) && (t[s] = e[s]);
}
function pu({ transformTemplate: t }, e) {
  return ct(() => {
    const n = _n();
    return Hn(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function gu(t, e) {
  const n = t.style || {}, s = {};
  return so(s, n, t), Object.assign(s, pu(t, e)), s;
}
function yu(t, e) {
  const n = {}, s = gu(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = s, n;
}
const io = () => ({
  ..._n(),
  attrs: {}
});
function vu(t, e, n, s) {
  const i = ct(() => {
    const o = io();
    return Nr(o, e, $r(s), t.transformTemplate, t.style), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [e]);
  if (t.style) {
    const o = {};
    so(o, t.style, t), i.style = { ...o, ...i.style };
  }
  return i;
}
const wu = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Xn(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(wu.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function xu(t, e, n, { latestValues: s }, i, o = !1, r) {
  const c = (r ?? Xn(t) ? vu : yu)(e, s, i, t), l = du(e, typeof t == "string", o), u = t !== Ti ? { ...l, ...c, ref: n } : {}, { children: h } = e, d = ct(() => H(h) ? h.get() : h, [h]);
  return Po(t, {
    ...u,
    children: d
  });
}
function Tu({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, s, i) {
  return {
    latestValues: bu(n, s, i, t),
    renderState: e()
  };
}
function bu(t, e, n, s) {
  const i = {}, o = s(t, {});
  for (const d in o)
    i[d] = de(o[d]);
  let { initial: r, animate: a } = t;
  const c = Ce(t), l = Er(t);
  e && l && !c && t.inherit !== !1 && (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let u = n ? n.initial === !1 : !1;
  u = u || r === !1;
  const h = u ? a : r;
  if (h && typeof h != "boolean" && !Ve(h)) {
    const d = Array.isArray(h) ? h : [h];
    for (let f = 0; f < d.length; f++) {
      const m = Fn(t, d[f]);
      if (m) {
        const { transitionEnd: x, transition: y, ...g } = m;
        for (const v in g) {
          let p = g[v];
          if (Array.isArray(p)) {
            const S = u ? p.length - 1 : 0;
            p = p[S];
          }
          p !== null && (i[v] = p);
        }
        for (const v in x)
          i[v] = x[v];
      }
    }
  }
  return i;
}
const ro = (t) => (e, n) => {
  const s = W(Ee), i = W(wn), o = () => Tu(t, e, s, i);
  return n ? o() : _t(o);
}, Su = /* @__PURE__ */ ro({
  scrapeMotionValuesFromProps: Kn,
  createRenderState: _n
}), Pu = /* @__PURE__ */ ro({
  scrapeMotionValuesFromProps: Ur,
  createRenderState: io
}), Au = Symbol.for("motionComponentSymbol");
function Vu(t, e, n) {
  const s = N(n);
  bi(() => {
    s.current = n;
  });
  const i = N(null);
  return ot((o) => {
    o && t.onMount?.(o), e && (o ? e.mount(o) : e.unmount());
    const r = s.current;
    if (typeof r == "function")
      if (o) {
        const a = r(o);
        typeof a == "function" && (i.current = a);
      } else i.current ? (i.current(), i.current = null) : r(o);
    else r && (r.current = o);
  }, [e]);
}
const oo = gt({});
function Ct(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Cu(t, e, n, s, i, o) {
  const { visualElement: r } = W(Ee), a = W(to), c = W(wn), l = W(Gn), u = l.reducedMotion, h = l.skipAnimations, d = N(null), f = N(!1);
  s = s || a.renderer, !d.current && s && (d.current = s(t, {
    visualState: e,
    parent: r,
    props: n,
    presenceContext: c,
    blockInitialAnimation: c ? c.initial === !1 : !1,
    reducedMotionConfig: u,
    skipAnimations: h,
    isSVG: o
  }), f.current && d.current && (d.current.manuallyAnimateOnMount = !0));
  const m = d.current, x = W(oo);
  m && !m.projection && i && (m.type === "html" || m.type === "svg") && Eu(d.current, n, i, x);
  const y = N(!1);
  bi(() => {
    m && y.current && m.update(n, c);
  });
  const g = n[pr], v = N(!!g && !window.MotionHandoffIsComplete?.(g) && window.MotionHasOptimisedAnimation?.(g));
  return Ci(() => {
    f.current = !0, m && (y.current = !0, window.MotionIsMounted = !0, m.updateFeatures(), m.scheduleRenderMicrotask(), v.current && m.animationState && m.animationState.animateChanges());
  }), X(() => {
    m && (!v.current && m.animationState && m.animationState.animateChanges(), v.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(g);
    }), v.current = !1), m.enteringChildren = void 0);
  }), m;
}
function Eu(t, e, n, s) {
  const { layoutId: i, layout: o, drag: r, dragConstraints: a, layoutScroll: c, layoutRoot: l, layoutCrossfade: u } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : ao(t.parent)), t.projection.setOptions({
    layoutId: i,
    layout: o,
    alwaysMeasureLayout: !!r || a && Ct(a),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof o == "string" ? o : "both",
    initialPromotionConfig: s,
    crossfade: u,
    layoutScroll: c,
    layoutRoot: l
  });
}
function ao(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : ao(t.parent);
}
function $e(t, { forwardMotionProps: e = !1, type: n } = {}, s, i) {
  s && lu(s);
  const o = n ? n === "svg" : Xn(t), r = o ? Pu : Su;
  function a(l, u) {
    let h;
    const d = {
      ...W(Gn),
      ...l,
      layoutId: Du(l)
    }, { isStatic: f } = d, m = mu(l), x = r(l, f);
    if (!f && Vi) {
      Mu(d, s);
      const y = Ru(d);
      h = y.MeasureLayout, m.visualElement = Cu(t, x, d, i, y.ProjectionNode, o);
    }
    return Bt(Ee.Provider, { value: m, children: [h && m.visualElement ? C(h, { visualElement: m.visualElement, ...d }) : null, xu(t, l, Vu(x, m.visualElement, u), x, f, e, o)] });
  }
  a.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const c = Ae(a);
  return c[Au] = t, c;
}
function Du({ layoutId: t }) {
  const e = W(Ai).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function Mu(t, e) {
  const n = W(to).strict;
  if (process.env.NODE_ENV !== "production" && e && n) {
    const s = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    t.ignoreStrict ? Ft(!1, s, "lazy-strict-mode") : ft(!1, s, "lazy-strict-mode");
  }
}
function Ru(t) {
  const e = eo(), { drag: n, layout: s } = e;
  if (!n && !s)
    return {};
  const i = { ...n, ...s };
  return {
    MeasureLayout: n?.isEnabled(t) || s?.isEnabled(t) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function Lu(t, e) {
  if (typeof Proxy > "u")
    return $e;
  const n = /* @__PURE__ */ new Map(), s = (o, r) => $e(o, r, t, e), i = (o, r) => (process.env.NODE_ENV !== "production" && bn(!1, "motion() is deprecated. Use motion.create() instead."), s(o, r));
  return new Proxy(i, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (o, r) => r === "create" ? s : (n.has(r) || n.set(r, $e(r, void 0, t, e)), n.get(r))
  });
}
const ku = (t, e) => e.isSVG ?? Xn(t) ? new gl(e) : new ul(e, {
  allowProjection: t !== Ti
});
class Iu extends wt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Tl(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    Ve(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Bu = 0;
class Fu extends wt {
  constructor() {
    super(...arguments), this.id = Bu++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === s)
      return;
    const i = this.node.animationState.setActive("exit", !e);
    n && !e && i.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const Ou = {
  animation: {
    Feature: Iu
  },
  exit: {
    Feature: Fu
  }
};
function ne(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const Nu = (t) => (e) => $n(e) && t(e, ne(e));
function Gt(t, e, n, s) {
  return Jt(t, e, Nu(n), s);
}
const co = ({ current: t }) => t ? t.ownerDocument.defaultView : null, ri = (t, e) => Math.abs(t - e);
function ju(t, e) {
  const n = ri(t.x, e.x), s = ri(t.y, e.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
const oi = /* @__PURE__ */ new Set(["auto", "scroll"]);
class lo {
  constructor(e, n, { transformPagePoint: s, contextWindow: i = window, dragSnapToOrigin: o = !1, distanceThreshold: r = 3, element: a } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (f) => {
      this.handleScroll(f.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const f = We(this.lastMoveEventInfo, this.history), m = this.startEvent !== null, x = ju(f.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!m && !x)
        return;
      const { point: y } = f, { timestamp: g } = G;
      this.history.push({ ...y, timestamp: g });
      const { onStart: v, onMove: p } = this.handlers;
      m || (v && v(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), p && p(this.lastMoveEvent, f);
    }, this.handlePointerMove = (f, m) => {
      this.lastMoveEvent = f, this.lastMoveEventInfo = Ue(m, this.transformPagePoint), D.update(this.updatePoint, !0);
    }, this.handlePointerUp = (f, m) => {
      this.end();
      const { onEnd: x, onSessionEnd: y, resumeAnimation: g } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && g && g(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const v = We(f.type === "pointercancel" ? this.lastMoveEventInfo : Ue(m, this.transformPagePoint), this.history);
      this.startEvent && x && x(f, v), y && y(f, v);
    }, !$n(e))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = s, this.distanceThreshold = r, this.contextWindow = i || window;
    const c = ne(e), l = Ue(c, this.transformPagePoint), { point: u } = l, { timestamp: h } = G;
    this.history = [{ ...u, timestamp: h }];
    const { onSessionStart: d } = n;
    d && d(e, We(l, this.history)), this.removeListeners = Qt(Gt(this.contextWindow, "pointermove", this.handlePointerMove), Gt(this.contextWindow, "pointerup", this.handlePointerUp), Gt(this.contextWindow, "pointercancel", this.handlePointerUp)), a && this.startScrollTracking(a);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let n = e.parentElement;
    for (; n; ) {
      const s = getComputedStyle(n);
      (oi.has(s.overflowX) || oi.has(s.overflowY)) && this.scrollPositions.set(n, {
        x: n.scrollLeft,
        y: n.scrollTop
      }), n = n.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0,
      passive: !0
    }), window.addEventListener("scroll", this.onWindowScroll, {
      passive: !0
    }), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(e) {
    const n = this.scrollPositions.get(e);
    if (!n)
      return;
    const s = e === window, i = s ? { x: window.scrollX, y: window.scrollY } : {
      x: e.scrollLeft,
      y: e.scrollTop
    }, o = { x: i.x - n.x, y: i.y - n.y };
    o.x === 0 && o.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += o.x, this.lastMoveEventInfo.point.y += o.y) : this.history.length > 0 && (this.history[0].x -= o.x, this.history[0].y -= o.y), this.scrollPositions.set(e, i), D.update(this.updatePoint, !0));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), pt(this.updatePoint);
  }
}
function Ue(t, e) {
  return e ? { point: e(t.point) } : t;
}
function ai(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function We({ point: t }, e) {
  return {
    point: t,
    delta: ai(t, uo(e)),
    offset: ai(t, $u(e)),
    velocity: Uu(e, 0.1)
  };
}
function $u(t) {
  return t[0];
}
function uo(t) {
  return t[t.length - 1];
}
function Uu(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, s = null;
  const i = uo(t);
  for (; n >= 0 && (s = t[n], !(i.timestamp - s.timestamp > /* @__PURE__ */ nt(e))); )
    n--;
  if (!s)
    return { x: 0, y: 0 };
  s === t[0] && t.length > 2 && i.timestamp - s.timestamp > /* @__PURE__ */ nt(e) * 2 && (s = t[1]);
  const o = /* @__PURE__ */ tt(i.timestamp - s.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (i.x - s.x) / o,
    y: (i.y - s.y) / o
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function Wu(t, { min: e, max: n }, s) {
  return e !== void 0 && t < e ? t = s ? O(e, t, s.min) : Math.max(t, e) : n !== void 0 && t > n && (t = s ? O(n, t, s.max) : Math.min(t, n)), t;
}
function ci(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function zu(t, { top: e, left: n, bottom: s, right: i }) {
  return {
    x: ci(t.x, n, i),
    y: ci(t.y, e, s)
  };
}
function li(t, e) {
  let n = e.min - t.min, s = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, s] = [s, n]), { min: n, max: s };
}
function Hu(t, e) {
  return {
    x: li(t.x, e.x),
    y: li(t.y, e.y)
  };
}
function Ku(t, e) {
  let n = 0.5;
  const s = q(t), i = q(e);
  return i > s ? n = /* @__PURE__ */ Xt(e.min, e.max - s, t.min) : s > i && (n = /* @__PURE__ */ Xt(t.min, t.max - i, e.min)), ht(0, 1, n);
}
function Gu(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const pn = 0.35;
function _u(t = pn) {
  return t === !1 ? t = 0 : t === !0 && (t = pn), {
    x: ui(t, "left", "right"),
    y: ui(t, "top", "bottom")
  };
}
function ui(t, e, n) {
  return {
    min: hi(t, e),
    max: hi(t, n)
  };
}
function hi(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Xu = /* @__PURE__ */ new WeakMap();
class Yu {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = U(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: s } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === !1)
      return;
    const o = (h) => {
      n && this.snapToCursor(ne(h).point), this.stopAnimation();
    }, r = (h, d) => {
      const { drag: f, dragPropagation: m, onDragStart: x } = this.getProps();
      if (f && !m && (this.openDragLock && this.openDragLock(), this.openDragLock = Ec(f), !this.openDragLock))
        return;
      this.latestPointerEvent = h, this.latestPanInfo = d, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), lt((g) => {
        let v = this.getAxisMotionValue(g).get() || 0;
        if (ut.test(v)) {
          const { projection: p } = this.visualElement;
          if (p && p.layout) {
            const S = p.layout.layoutBox[g];
            S && (v = q(S) * (parseFloat(v) / 100));
          }
        }
        this.originPoint[g] = v;
      }), x && D.update(() => x(h, d), !1, !0), an(this.visualElement, "transform");
      const { animationState: y } = this.visualElement;
      y && y.setActive("whileDrag", !0);
    }, a = (h, d) => {
      this.latestPointerEvent = h, this.latestPanInfo = d;
      const { dragPropagation: f, dragDirectionLock: m, onDirectionLock: x, onDrag: y } = this.getProps();
      if (!f && !this.openDragLock)
        return;
      const { offset: g } = d;
      if (m && this.currentDirection === null) {
        this.currentDirection = Zu(g), this.currentDirection !== null && x && x(this.currentDirection);
        return;
      }
      this.updateAxis("x", d.point, g), this.updateAxis("y", d.point, g), this.visualElement.render(), y && D.update(() => y(h, d), !1, !0);
    }, c = (h, d) => {
      this.latestPointerEvent = h, this.latestPanInfo = d, this.stop(h, d), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, l = () => {
      const { dragSnapToOrigin: h } = this.getProps();
      (h || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new lo(e, {
      onSessionStart: o,
      onStart: r,
      onMove: a,
      onSessionEnd: c,
      resumeAnimation: l
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: u,
      distanceThreshold: s,
      contextWindow: co(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const s = e || this.latestPointerEvent, i = n || this.latestPanInfo, o = this.isDragging;
    if (this.cancel(), !o || !i || !s)
      return;
    const { velocity: r } = i;
    this.startAnimation(r);
    const { onDragEnd: a } = this.getProps();
    a && D.postRender(() => a(s, i));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(e, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !re(e, i, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (r = Wu(r, this.constraints[e], this.elastic[e])), o.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, i = this.constraints;
    e && Ct(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = zu(s.layoutBox, e) : this.constraints = !1, this.elastic = _u(n), i !== this.constraints && !Ct(e) && s && this.constraints && !this.hasMutatedConstraints && lt((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = Gu(s.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !Ct(e))
      return !1;
    const s = e.current;
    ft(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: i } = this.visualElement;
    if (!i || !i.layout)
      return !1;
    const o = il(s, i.root, this.visualElement.getTransformPagePoint());
    let r = Hu(i.layout.layoutBox, o);
    if (n) {
      const a = n(el(r));
      this.hasMutatedConstraints = !!a, a && (r = Lr(a));
    }
    return r;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: s, dragElastic: i, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a } = this.getProps(), c = this.constraints || {}, l = lt((u) => {
      if (!re(u, n, this.currentDirection))
        return;
      let h = c && c[u] || {};
      r && (h = { min: 0, max: 0 });
      const d = i ? 200 : 1e6, f = i ? 40 : 1e7, m = {
        type: "inertia",
        velocity: s ? e[u] : 0,
        bounceStiffness: d,
        bounceDamping: f,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...h
      };
      return this.startAxisValueAnimation(u, m);
    });
    return Promise.all(l).then(a);
  }
  startAxisValueAnimation(e, n) {
    const s = this.getAxisMotionValue(e);
    return an(this.visualElement, e), s.start(Bn(e, s, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    lt((e) => this.getAxisMotionValue(e).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`, s = this.visualElement.getProps(), i = s[n];
    return i || this.visualElement.getValue(e, (s.initial ? s.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    lt((n) => {
      const { drag: s } = this.getProps();
      if (!re(n, s, this.currentDirection))
        return;
      const { projection: i } = this.visualElement, o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: r, max: a } = i.layout.layoutBox[n], c = o.get() || 0;
        o.set(e[n] - O(r, a, 0.5) + c);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: s } = this.visualElement;
    if (!Ct(n) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    lt((r) => {
      const a = this.getAxisMotionValue(r);
      if (a && this.constraints !== !1) {
        const c = a.get();
        i[r] = Ku({ min: c, max: c }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), lt((r) => {
      if (!re(r, e, null))
        return;
      const a = this.getAxisMotionValue(r), { min: c, max: l } = this.constraints[r];
      a.set(O(c, l, i[r]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Xu.set(this.visualElement, this);
    const e = this.visualElement.current, n = Gt(e, "pointerdown", (l) => {
      const { drag: u, dragListener: h = !0 } = this.getProps(), d = l.target, f = d !== e && Ic(d);
      u && h && !f && this.start(l);
    });
    let s;
    const i = () => {
      const { dragConstraints: l } = this.getProps();
      Ct(l) && l.current && (this.constraints = this.resolveRefConstraints(), s || (s = qu(e, l.current, () => this.scalePositionWithinConstraints())));
    }, { projection: o } = this.visualElement, r = o.addEventListener("measure", i);
    o && !o.layout && (o.root && o.root.updateScroll(), o.updateLayout()), D.read(i);
    const a = Jt(window, "resize", () => this.scalePositionWithinConstraints()), c = o.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (lt((h) => {
        const d = this.getAxisMotionValue(h);
        d && (this.originPoint[h] += l[h].translate, d.set(d.get() + l[h].translate));
      }), this.visualElement.render());
    }));
    return () => {
      a(), n(), r(), c && c(), s && s();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: s = !1, dragPropagation: i = !1, dragConstraints: o = !1, dragElastic: r = pn, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: r,
      dragMomentum: a
    };
  }
}
function di(t) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    t();
  };
}
function qu(t, e, n) {
  const s = Ts(t, di(n)), i = Ts(e, di(n));
  return () => {
    s(), i();
  };
}
function re(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Zu(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Ju extends wt {
  constructor(e) {
    super(e), this.removeGroupControls = et, this.removeListeners = et, this.controls = new Yu(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || et;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: n } = this.node.prevProps || {};
    e !== n && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const ze = (t) => (e, n) => {
  t && D.update(() => t(e, n), !1, !0);
};
class Qu extends wt {
  constructor() {
    super(...arguments), this.removePointerDownListener = et;
  }
  onPointerDown(e) {
    this.session = new lo(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: co(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: s, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: ze(e),
      onStart: ze(n),
      onMove: ze(s),
      onEnd: (o, r) => {
        delete this.session, i && D.postRender(() => i(o, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Gt(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let He = !1;
class th extends Ao {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s, layoutId: i } = this.props, { projection: o } = e;
    o && (n.group && n.group.add(o), s && s.register && i && s.register(o), He && o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), fe.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: s, drag: i, isPresent: o } = this.props, { projection: r } = s;
    return r && (r.isPresent = o, e.layoutDependency !== n && r.setOptions({
      ...r.options,
      layoutDependency: n
    }), He = !0, i || e.layoutDependency !== n || n === void 0 || e.isPresent !== o ? r.willUpdate() : this.safeToRemove(), e.isPresent !== o && (o ? r.promote() : r.relegate() || D.postRender(() => {
      const a = r.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), jn.postRender(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s } = this.props, { projection: i } = e;
    He = !0, i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function ho(t) {
  const [e, n] = au(), s = W(Ai);
  return C(th, { ...t, layoutGroup: s, switchLayoutGroup: W(oo), isPresent: e, safeToRemove: n });
}
const eh = {
  pan: {
    Feature: Qu
  },
  drag: {
    Feature: Ju,
    ProjectionNode: Qr,
    MeasureLayout: ho
  }
};
function fi(t, e, n) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n, o = s[i];
  o && D.postRender(() => o(e, ne(e)));
}
class nh extends wt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Mc(e, (n, s) => (fi(this.node, s, "Start"), (i) => fi(this.node, i, "End"))));
  }
  unmount() {
  }
}
class sh extends wt {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Qt(Jt(this.node.current, "focus", () => this.onFocus()), Jt(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function mi(t, e, n) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n), o = s[i];
  o && D.postRender(() => o(e, ne(e)));
}
class ih extends wt {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: n, propagate: s } = this.node.props;
    this.unmount = Fc(e, (i, o) => (mi(this.node, o, "Start"), (r, { success: a }) => mi(this.node, r, a ? "End" : "Cancel")), {
      useGlobalTarget: n,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const gn = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), rh = (t) => {
  const e = gn.get(t.target);
  e && e(t);
}, oh = (t) => {
  t.forEach(rh);
};
function ah({ root: t, ...e }) {
  const n = t || document;
  Ke.has(n) || Ke.set(n, {});
  const s = Ke.get(n), i = JSON.stringify(e);
  return s[i] || (s[i] = new IntersectionObserver(oh, { root: t, ...e })), s[i];
}
function ch(t, e, n) {
  const s = ah(e);
  return gn.set(t, n), s.observe(t), () => {
    gn.delete(t), s.unobserve(t);
  };
}
const lh = {
  some: 0,
  all: 1
};
class uh extends wt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: s, amount: i = "some", once: o } = e, r = {
      root: n ? n.current : void 0,
      rootMargin: s,
      threshold: typeof i == "number" ? i : lh[i]
    }, a = (c) => {
      const { isIntersecting: l } = c;
      if (this.isInView === l || (this.isInView = l, o && !l && this.hasEnteredView))
        return;
      l && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", l);
      const { onViewportEnter: u, onViewportLeave: h } = this.node.getProps(), d = l ? u : h;
      d && d(c);
    };
    return ch(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(hh(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function hh({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const dh = {
  inView: {
    Feature: uh
  },
  tap: {
    Feature: ih
  },
  focus: {
    Feature: sh
  },
  hover: {
    Feature: nh
  }
}, fh = {
  layout: {
    ProjectionNode: Qr,
    MeasureLayout: ho
  }
}, mh = {
  ...Ou,
  ...dh,
  ...eh,
  ...fh
}, oe = /* @__PURE__ */ Lu(mh, ku);
function yn(t) {
  const e = _t(() => Vt(t)), { isStatic: n } = W(Gn);
  if (n) {
    const [, s] = rt(t);
    X(() => e.on("change", s), []);
  }
  return e;
}
function Yn(t, e) {
  const n = yn(e()), s = () => n.set(e());
  return s(), Ci(() => {
    const i = () => D.preRender(s, !1, !0), o = t.map((r) => r.on("change", i));
    return () => {
      o.forEach((r) => r()), pt(s);
    };
  }), n;
}
function pi(t, ...e) {
  const n = t.length;
  function s() {
    let i = "";
    for (let o = 0; o < n; o++) {
      i += t[o];
      const r = e[o];
      r && (i += H(r) ? r.get() : r);
    }
    return i;
  }
  return Yn(e.filter(H), s);
}
function ph(t) {
  Ht.current = [], t();
  const e = Yn(Ht.current, t);
  return Ht.current = void 0, e;
}
function vn(t, e, n, s) {
  if (typeof t == "function")
    return ph(t);
  if (n !== void 0 && !Array.isArray(n) && typeof e != "function")
    return gh(t, e, n, s);
  const r = typeof e == "function" ? e : Gc(e, n, s), a = Array.isArray(t) ? gi(t, r) : gi([t], ([l]) => r(l)), c = Array.isArray(t) ? void 0 : t.accelerate;
  return c && !c.isTransformed && typeof e != "function" && Array.isArray(n) && s?.clamp !== !1 && (a.accelerate = {
    ...c,
    times: e,
    keyframes: n,
    isTransformed: !0
  }), a;
}
function gi(t, e) {
  const n = _t(() => []);
  return Yn(t, () => {
    n.length = 0;
    const s = t.length;
    for (let i = 0; i < s; i++)
      n[i] = t[i].get();
    return e(n);
  });
}
function gh(t, e, n, s) {
  const i = _t(() => Object.keys(n)), o = _t(() => ({}));
  for (const r of i)
    o[r] = vn(t, e, n[r], s);
  return o;
}
const yi = 2;
function yh({ x1: t, y1: e, x2: n, y2: s }, {
  cornerRadius: i = 8,
  midOffset: o = 32,
  arrowheadOffset: r = 8,
  isBottom: a = !1,
  single: c = !1,
  orientation: l = "vertical"
} = {}) {
  const u = Math.min(
    i,
    Math.abs(l === "horizontal" ? (s - e) / 2 : (n - t) / 2)
  );
  if (l === "horizontal") {
    if (Math.abs(s - e) <= yi)
      return `M ${t} ${e} L ${n - r} ${s}`;
    const P = c || a ? n - o : t + o, L = n > t ? 1 : -1, K = s > e ? 1 : -1, Q = P - L * u, J = e + K * u, Z = s - K * u, _ = P + L * u, A = n - L * r, I = [
      `L ${Q} ${e}`,
      `Q ${P} ${e} ${P} ${J}`,
      c ? `L ${P} ${Z} Q ${P} ${s} ${_} ${s}` : `L ${P} ${s}`
    ], E = [
      c ? `L ${Q} ${e} Q ${P} ${e} ${P} ${J}` : `L ${P} ${e}`,
      `L ${P} ${Z}`,
      `Q ${P} ${s} ${_} ${s}`
    ];
    return [
      `M ${t} ${e}`,
      ...a ? I : E,
      `L ${A} ${s}`
    ].join(" ");
  }
  if (Math.abs(n - t) <= yi)
    return `M ${t} ${e} L ${n} ${s - r}`;
  const h = c || a ? s - o : e + o, f = n > t ? 1 : -1, x = s > e ? 1 : -1, y = h - u, g = t + f * u, v = n - f * u, p = h + u, S = s - x * r, w = [
    `L ${t} ${y}`,
    `Q ${t} ${h} ${g} ${h}`,
    `L ${n} ${h}`
  ], b = [
    `L ${t} ${h}`,
    `L ${v} ${h}`,
    `Q ${n} ${h} ${n} ${p}`
  ];
  return [
    `M ${t} ${e}`,
    // Move the cursor to the starting point
    ...a ? w : b,
    `L ${n} ${S}`
    // Draw the final line to the end point
  ].join(" ");
}
const fo = Ae(
  function({ connectors: e, children: n, ...s }, i) {
    const o = Pe();
    return /* @__PURE__ */ Bt(
      "svg",
      {
        width: "100%",
        height: "100%",
        overflow: "visible",
        "aria-hidden": "true",
        className: "text-kumo-inactive overflow-visible",
        ref: i,
        children: [
          /* @__PURE__ */ C("defs", { children: /* @__PURE__ */ C(
            "marker",
            {
              id: o,
              markerWidth: "8",
              markerHeight: "8",
              refX: "0",
              refY: "4",
              orient: "auto",
              markerUnits: "userSpaceOnUse",
              children: /* @__PURE__ */ C(
                "path",
                {
                  d: "M 0,1.5 Q 0,0 1.5,0 Q 3.5,1 5.8,3.2 Q 6.5,4 5.8,4.8 Q 3.5,7 1.5,8 Q 0,8 0,6.5 Z",
                  fill: "currentColor",
                  stroke: "none"
                }
              )
            }
          ) }),
          [...e].sort((r, a) => r.disabled && !a.disabled ? -1 : !r.disabled && a.disabled ? 1 : 0).map((r, a) => {
            const c = yh(r, {
              isBottom: r.isBottom,
              single: r.single,
              ...s
            }), l = r.fromId && r.toId ? `${r.fromId}-${r.toId}` : `path-${a}`;
            return /* @__PURE__ */ C(
              "g",
              {
                className: r.disabled ? "opacity-40" : void 0,
                children: /* @__PURE__ */ C(
                  "path",
                  {
                    d: c,
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    markerEnd: `url(#${o})`,
                    "data-index": a,
                    "data-testid": l
                  }
                )
              },
              l
            );
          }),
          n
        ]
      }
    );
  }
), qn = gt(null);
function vh() {
  const [t, e] = rt([]), n = N(
    /* @__PURE__ */ new Map()
  ), [s, i] = rt(0), o = N(0), r = N(/* @__PURE__ */ new Map());
  o.current = 0, r.current.clear();
  const a = ot((h) => (r.current.has(h) || r.current.set(h, o.current++), r.current.get(h)), []), c = ot(() => {
    i((h) => h + 1);
  }, []), l = ot(
    (h, d, f = {}) => {
      const m = !n.current.has(h), x = {
        id: h,
        props: f,
        renderOrder: d
      };
      n.current.set(h, x);
      const y = Array.from(
        n.current.values()
      ).sort((v, p) => v.renderOrder - p.renderOrder);
      return e(y), m && i((v) => v + 1), { unregister: () => {
        n.current.delete(h);
        const v = Array.from(
          n.current.values()
        ).sort((p, S) => p.renderOrder - S.renderOrder);
        e(v), i((p) => p + 1);
      } };
    },
    []
  );
  return ct(
    () => ({
      register: l,
      descendants: t,
      claimRenderOrder: a,
      measurementEpoch: s,
      notifySizeChange: c
    }),
    [
      l,
      t,
      a,
      s,
      c
    ]
  );
}
function mo({
  value: t,
  children: e
}) {
  return /* @__PURE__ */ C(
    qn.Provider,
    {
      value: t,
      children: e
    }
  );
}
function Zn() {
  const t = W(qn);
  if (!t)
    throw new Error(
      "useDescendantsContext must be used within DescendantsProvider"
    );
  return t;
}
function wh() {
  return W(qn);
}
function xh(t, e) {
  const n = Zn(), s = Pe(), i = e ?? s, o = n.claimRenderOrder(i), r = N(null), a = N(n.register);
  a.current = n.register, X(() => {
    const { unregister: h } = a.current(i, o, t);
    return r.current || (r.current = h), () => {
      r.current && (r.current(), r.current = null);
    };
  }, [i, o, t]);
  const c = ct(() => n.descendants.findIndex((h) => h.id === i), [n.descendants, i]), l = ot(() => {
    if (!(c <= 0))
      return n.descendants[c - 1];
  }, [n.descendants, c]), u = ot(() => {
    if (!(c < 0 || c >= n.descendants.length - 1))
      return n.descendants[c + 1];
  }, [n.descendants, c]);
  return { index: c, id: i, getPrevious: l, getNext: u };
}
const vi = {
  y: 64,
  x: 16
};
function Th(t) {
  return t instanceof Element && t.closest("[data-node-id]") !== null;
}
const wi = 10, po = gt(null);
function go() {
  const t = W(po);
  if (t === null)
    throw new Error("useDiagramContext must be used within a FlowDiagram");
  return t;
}
function bh({
  orientation: t = "horizontal",
  align: e = "start",
  canvas: n = !0,
  padding: s,
  onOverflowChange: i,
  className: o,
  children: r
}) {
  const a = N(null), c = N(null), l = {
    x: s?.x ?? vi.x,
    y: s?.y ?? vi.y
  }, u = yn(0), h = yn(0), [d, f] = rt(null), [m, x] = rt(null), [y, g] = rt(!1), [v, p] = rt(!1);
  X(() => {
    if (!n || !a.current || !c.current) return;
    const _ = () => {
      if (!a.current || !c.current) return;
      const I = a.current.getBoundingClientRect(), E = c.current.getBoundingClientRect(), R = I.width - l.x * 2, B = I.height - l.y * 2;
      f({
        x: Math.min(0, R - E.width),
        y: Math.min(0, B - E.height)
      }), x({
        viewportWidth: R,
        viewportHeight: B,
        contentWidth: E.width,
        contentHeight: E.height
      });
      const z = E.width > R, M = E.height > B;
      p(z || M), i?.({ x: z, y: M });
    };
    _();
    const A = new ResizeObserver(_);
    return A.observe(a.current), A.observe(c.current), () => A.disconnect();
  }, [l.x, l.y, n, i]), X(() => {
    n && d && (u.get() < d.x && u.set(d.x), h.get() < d.y && h.set(d.y));
  }, [d, u, h, n]), X(() => {
    if (n)
      return () => {
        document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [n]), X(() => {
    if (!n) return;
    const _ = a.current;
    if (!_) return;
    const A = (I) => {
      if (!d) return;
      const E = d.x < 0, R = d.y < 0;
      if (!(!E && !R)) {
        if (I.preventDefault(), R) {
          const B = Math.max(d.y, Math.min(0, h.get() - I.deltaY));
          h.set(B);
        }
        if (E) {
          const B = Math.max(d.x, Math.min(0, u.get() - I.deltaX));
          u.set(B);
        }
      }
    };
    return _.addEventListener("wheel", A, { passive: !1 }), () => _.removeEventListener("wheel", A);
  }, [n, d, u, h]);
  const S = (_) => {
    Th(_.target) || (g(!0), document.body.style.cursor = "grabbing", document.body.style.userSelect = "none");
  }, w = (_, A) => {
    !d || !y || (u.set(Math.max(d.x, Math.min(0, u.get() + A.delta.x))), h.set(Math.max(d.y, Math.min(0, h.get() + A.delta.y))));
  }, b = () => {
    y && (g(!1), document.body.style.cursor = "", document.body.style.userSelect = "");
  }, V = d && d.x < 0, P = d && d.y < 0, k = m && m.contentWidth > 0 && m.viewportWidth > 0 ? Math.max(
    wi,
    m.viewportWidth / m.contentWidth * 100
  ) : 0, L = m && m.contentHeight > 0 && m.viewportHeight > 0 ? Math.max(
    wi,
    m.viewportHeight / m.contentHeight * 100
  ) : 0, $ = vn(
    u,
    [0, d?.x ?? 0],
    [0, 100 - k]
  ), K = vn(
    h,
    [0, d?.y ?? 0],
    [0, 100 - L]
  ), Q = pi`${K}%`, J = pi`${$}%`, Z = ct(
    () => ({ orientation: t, align: e, x: u, y: h, wrapperRef: a }),
    [t, e, u, h]
  );
  return /* @__PURE__ */ C(po.Provider, { value: Z, children: /* @__PURE__ */ Bt(
    oe.div,
    {
      ref: a,
      className: me("relative overflow-hidden grow isolate group", o),
      style: {
        paddingTop: l.y,
        paddingBottom: l.y,
        paddingLeft: l.x,
        paddingRight: l.x,
        cursor: v && !y ? "grab" : void 0
      },
      onPanStart: S,
      onPan: w,
      onPanEnd: b,
      children: [
        /* @__PURE__ */ C(
          oe.div,
          {
            "data-testid": "flow-contents",
            ref: c,
            className: "w-max mx-auto",
            style: { x: u, y: h },
            children: /* @__PURE__ */ C(wo, { children: r })
          }
        ),
        P && /* @__PURE__ */ C("div", { className: "absolute right-1 top-1 bottom-1 w-1.5 rounded-full bg-kumo-hairline/50 opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ C(
          oe.div,
          {
            className: "absolute w-full rounded-full bg-kumo-fill",
            style: {
              height: `${L}%`,
              top: Q
            }
          }
        ) }),
        V && /* @__PURE__ */ C("div", { className: "absolute bottom-1 left-1 right-1 h-1.5 rounded-full bg-kumo-hairline/50 opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ C(
          oe.div,
          {
            className: "absolute h-full rounded-full bg-kumo-fill",
            style: {
              width: `${k}%`,
              left: J
            }
          }
        ) })
      ]
    }
  ) });
}
const yo = () => vh(), vo = (t, e) => xh(t, e), Sh = (t) => {
  const e = wh(), n = Pe(), s = e?.claimRenderOrder(n) ?? -1, i = N(null);
  return X(() => {
    if (!e?.register) return;
    const { unregister: r } = e.register(n, s, t);
    return i.current || (i.current = r), () => {
      i.current && (i.current(), i.current = null);
    };
  }, [n, s, t, e?.register]), e ? { index: e.descendants.findIndex((r) => r.id === n), id: n } : null;
}, Se = (t, { type: e = "start" }) => t ? t.props[e] ?? null : null;
function wo({ children: t }) {
  const { orientation: e, align: n } = go(), s = yo(), i = N(null), [o, r] = rt([]), a = ot(() => {
    const f = [], m = s.descendants, x = i.current?.getBoundingClientRect(), y = x?.left ?? 0, g = x?.top ?? 0;
    for (let v = 0; v < m.length - 1; v++) {
      const p = m[v], S = m[v + 1];
      if (p.props?.parallel || S.props?.parallel) continue;
      const w = Se(p, { type: "start" }), b = Se(S, { type: "end" });
      if (w && b) {
        const V = p.props.disabled || S.props.disabled;
        f.push({
          x1: w.left - y + w.width,
          y1: w.top - g + w.height / 2,
          x2: b.left - y,
          y2: b.top - g + b.height / 2,
          disabled: V,
          single: !0,
          fromId: p.id,
          toId: S.id
        });
      }
    }
    r(f);
  }, [s.descendants]);
  Pt(() => {
    a();
  }, [a]), X(() => (window.addEventListener("scroll", a, {
    capture: !0,
    passive: !0
  }), window.addEventListener("resize", a, { passive: !0 }), () => {
    window.removeEventListener("scroll", a, {
      capture: !0
    }), window.removeEventListener("resize", a);
  }), [a]);
  const c = s.descendants[0], l = s.descendants[s.descendants.length - 1], u = c?.props?.end ?? null, h = l?.props?.start ?? null, d = ct(
    () => ({
      parallel: !1,
      disabled: !1,
      start: h,
      end: u
    }),
    [JSON.stringify(h), JSON.stringify(u)]
  );
  return Sh(d), /* @__PURE__ */ C(mo, { value: s, children: /* @__PURE__ */ Bt("div", { className: "relative", ref: i, children: [
    /* @__PURE__ */ C(
      "ul",
      {
        className: me(
          "ml-0 list-none",
          e === "vertical" ? "grid auto-rows-min gap-16" : "flex gap-16",
          e === "horizontal" && (n === "center" ? "items-center" : "items-start")
        ),
        children: t
      }
    ),
    /* @__PURE__ */ C("div", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ C(fo, { connectors: o, orientation: e }) })
  ] }) });
}
function xo(...t) {
  return (e) => {
    t.forEach((n) => {
      typeof n == "function" ? n(e) : n != null && (n.current = e);
    });
  };
}
const To = Ae(
  function({ id: e, render: n, children: s, disabled: i = !1 }, o) {
    const r = N(null), a = N(null), c = N(null), [l, u] = rt({ start: null, end: null }), { measurementEpoch: h, notifySizeChange: d } = Zn(), f = ot(() => {
      if (!r.current) return;
      const p = r.current.getBoundingClientRect();
      let S = p, w = p;
      a.current && (S = a.current.getBoundingClientRect()), c.current && (w = c.current.getBoundingClientRect()), u((b) => {
        const V = { start: S, end: w };
        return JSON.stringify(b) === JSON.stringify(V) ? b : V;
      });
    }, []), m = ct(
      () => ({
        parallel: !1,
        disabled: i,
        ...l
      }),
      [l, i]
    ), { index: x, id: y } = vo(m, e);
    Pt(() => {
      if (!r.current) return;
      const p = () => {
        f(), d();
      }, S = new ResizeObserver(p);
      return S.observe(r.current), () => S.disconnect();
    }, [f, d]), Pt(() => {
      f();
    }, [h, f]), X(() => {
      const p = () => {
        f(), d();
      };
      return window.addEventListener("scroll", p, {
        capture: !0,
        passive: !0
      }), window.addEventListener("resize", p, { passive: !0 }), () => {
        window.removeEventListener("scroll", p, { capture: !0 }), window.removeEventListener("resize", p);
      };
    }, [f, d]);
    const g = xo(o, r);
    let v;
    if (n && Si(n)) {
      const p = n.props;
      v = Pi(n, {
        ref: g,
        "data-node-index": x,
        "data-node-id": y,
        "data-testid": p["data-testid"] ?? y,
        style: { cursor: "default", ...p.style },
        children: p.children ?? s
      });
    } else
      v = /* @__PURE__ */ C(
        "li",
        {
          ref: g,
          className: "py-2 px-3 rounded-md shadow bg-kumo-base ring ring-kumo-line",
          style: { cursor: "default" },
          "data-node-index": x,
          "data-node-id": y,
          "data-testid": y,
          children: s
        }
      );
    return /* @__PURE__ */ C(
      bo.Provider,
      {
        value: ct(
          () => ({
            registerStartAnchor: (p) => {
              a.current = p;
            },
            registerEndAnchor: (p) => {
              c.current = p;
            }
          }),
          []
        ),
        children: v
      }
    );
  }
);
To.displayName = "Flow.Node";
const bo = gt(
  null
), So = Ae(
  function({ type: e, render: n, children: s }, i) {
    const o = W(bo), r = N(null);
    if (!o)
      throw new Error("Flow.Anchor must be used within Flow.Node");
    X(() => {
      if (r.current)
        return (e === "start" || e === void 0) && o.registerStartAnchor(r.current), (e === "end" || e === void 0) && o.registerEndAnchor(r.current), () => {
          (e === "start" || e === void 0) && o.registerStartAnchor(null), (e === "end" || e === void 0) && o.registerEndAnchor(null);
        };
    }, [e, o.registerStartAnchor, o.registerEndAnchor]);
    const a = xo(i, r);
    if (n && Si(n)) {
      const c = n.props;
      return Pi(n, {
        ref: a,
        children: c.children ?? s
      });
    }
    return /* @__PURE__ */ C("div", { ref: a, children: s });
  }
);
So.displayName = "Flow.Anchor";
function Ph({
  container: t,
  previous: e,
  next: n,
  orientation: s
}) {
  if (s === "vertical")
    return {
      start: {
        x: t.width / 2,
        y: 0
      },
      end: {
        x: t.width / 2,
        y: t.height
      }
    };
  let i = {
    x: 0,
    y: t.height / 2
  }, o = {
    x: t.width,
    y: t.height / 2
  };
  return e && (i.y = e.top - t.top + e.height / 2), n && (o.y = n.top - t.top + n.height / 2), { start: i, end: o };
}
function Ah({
  children: t,
  align: e = "start"
}) {
  const { orientation: n } = go(), s = yo(), { measurementEpoch: i, notifySizeChange: o } = Zn(), r = N(null), a = N(null), [c, l] = rt(null), u = s.descendants[0], h = u?.props?.end ?? c, d = u?.props?.start ?? c, { index: f, getPrevious: m, getNext: x } = vo(
    ct(
      () => ({ parallel: !0, start: d, end: h }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [JSON.stringify(d), JSON.stringify(h)]
    )
  ), y = ot(() => {
    if (!a.current) return;
    const w = a.current.getBoundingClientRect();
    l((b) => JSON.stringify(b) === JSON.stringify(w) ? b : w);
  }, []);
  Pt(() => {
    if (!a.current) return;
    const w = () => {
      y(), o();
    }, b = new ResizeObserver(w);
    return b.observe(a.current), () => b.disconnect();
  }, [y, o]), Pt(() => {
    y();
  }, [i, y]), X(() => {
    const w = () => {
      y(), o();
    };
    return window.addEventListener("scroll", w, {
      capture: !0,
      passive: !0
    }), window.addEventListener("resize", w, { passive: !0 }), () => {
      window.removeEventListener("scroll", w, { capture: !0 }), window.removeEventListener("resize", w);
    };
  }, [y, o]);
  const [g, v] = rt(null), p = ot(() => {
    const w = r.current;
    if (!w) return;
    const b = w.getBoundingClientRect(), [V, P] = [m(), x()], k = Se(V, { type: "start" }), L = Se(P, { type: "end" }), { start: $, end: K } = Ph({
      container: b,
      previous: k,
      next: L,
      orientation: n
    }), Q = [], J = [];
    for (const E of s.descendants) {
      const { props: R } = E, [B, z] = [R.end, R.start];
      if (k && B) {
        const M = n === "horizontal" ? B.top - b.top + B.height / 2 : B.left - b.left + B.width / 2;
        Q.push({ y: M });
      }
      if (L && z) {
        const M = n === "horizontal" ? z.top - b.top + z.height / 2 : z.left - b.left + z.width / 2;
        J.push({ y: M });
      }
    }
    const Z = 2, _ = (() => {
      if (Q.length <= 1) return !1;
      const E = Q.some(
        (M) => M.y < $.y - Z
      ), R = Q.some(
        (M) => M.y > $.y + Z
      ), B = Q.some(
        (M) => Math.abs(M.y - $.y) <= Z
      );
      return [E, R, B].filter(Boolean).length > 1;
    })(), A = (() => {
      if (J.length <= 1) return !1;
      const E = J.some(
        (M) => M.y < K.y - Z
      ), R = J.some(
        (M) => M.y > K.y + Z
      ), B = J.some(
        (M) => Math.abs(M.y - K.y) <= Z
      );
      return [E, R, B].filter(Boolean).length > 1;
    })(), I = s.descendants.flatMap((E) => {
      const { props: R } = E, B = [], [z, M] = [R.end, R.start], Jn = R.disabled;
      if (k && z) {
        let dt;
        switch (n) {
          case "vertical": {
            dt = {
              x: z.left - b.left + z.width / 2,
              y: z.top - b.top
            };
            break;
          }
          case "horizontal": {
            const $t = z.top - b.top + z.height / 2;
            dt = {
              x: z.left - b.left,
              y: $t
            };
            break;
          }
          default:
            throw new Error(`Unknown orientation: ${n}`);
        }
        B.push({
          x1: $.x,
          y1: $.y,
          x2: dt.x,
          y2: dt.y,
          isBottom: !1,
          disabled: V?.props.disabled || Jn,
          single: !_,
          fromId: V?.id,
          toId: E.id
        });
      }
      if (L && M) {
        let dt;
        switch (n) {
          case "vertical": {
            dt = {
              x: M.left - b.left + M.width / 2,
              y: M.bottom - b.top
            };
            break;
          }
          case "horizontal": {
            const $t = M.top - b.top + M.height / 2;
            dt = {
              x: M.right - b.left,
              y: $t
            };
            break;
          }
          default:
            throw new Error(`Unknown orientation: ${n}`);
        }
        B.push({
          x1: dt.x,
          y1: dt.y,
          x2: K.x,
          y2: K.y,
          isBottom: !0,
          disabled: Jn || P?.props.disabled,
          single: !A,
          fromId: E.id,
          toId: P?.id
        });
      }
      return B;
    });
    v({
      connectors: I,
      junctions: {
        start: k && _ ? {
          x: n === "vertical" ? $.x : $.x + 32,
          y: n === "vertical" ? $.y + 32 : $.y
        } : void 0,
        end: L && A ? {
          x: n === "vertical" ? K.x : K.x - 32,
          y: n === "vertical" ? K.y - 32 : K.y
        } : void 0
      },
      containerRect: b
    });
  }, [
    r,
    m,
    x,
    n,
    s.descendants
  ]);
  Pt(() => {
    p();
  }, [p]), X(() => {
    const w = () => p();
    return window.addEventListener("scroll", w, {
      capture: !0,
      passive: !0
    }), window.addEventListener("resize", w, { passive: !0 }), () => {
      window.removeEventListener("scroll", w, { capture: !0 }), window.removeEventListener("resize", w);
    };
  }, [p]);
  const S = m()?.props?.parallel === !0;
  return /* @__PURE__ */ Bt(
    "div",
    {
      ref: r,
      className: me(
        "relative isolate",
        n === "horizontal" ? "px-16 -mr-16" : "py-16 -mb-16",
        n === "horizontal" ? S ? "-ml-3" : "-ml-16" : S ? "-mt-3" : "-mt-16"
      ),
      "data-node-index": f,
      children: [
        /* @__PURE__ */ C("div", { className: "absolute inset-0 pointer-events-none z-1", children: g && /* @__PURE__ */ Bt(fo, { connectors: g.connectors, orientation: n, children: [
          g.junctions?.start && /* @__PURE__ */ C(
            "g",
            {
              transform: `translate(${g.junctions.start.x} ${g.junctions.start.y})`,
              children: /* @__PURE__ */ C(xi, {})
            }
          ),
          g.junctions?.end && /* @__PURE__ */ C(
            "g",
            {
              transform: `translate(${g.junctions.end.x} ${g.junctions.end.y})`,
              children: /* @__PURE__ */ C(xi, {})
            }
          )
        ] }) }),
        /* @__PURE__ */ C(
          "ul",
          {
            className: me(
              "gap-5 list-none flex",
              e === "start" ? "items-start" : "items-end",
              n === "horizontal" ? "flex-col ml-0" : "gap-5 w-fit mx-auto"
            ),
            ref: a,
            children: /* @__PURE__ */ C(mo, { value: s, children: t })
          }
        )
      ]
    }
  );
}
function xi({ size: t = 6 }) {
  const e = t / 2;
  return /* @__PURE__ */ C(
    "rect",
    {
      x: -e,
      y: -e,
      width: t,
      height: t,
      fill: "currentColor",
      rx: "1"
    }
  );
}
const Mh = Object.assign(bh, {
  Node: To,
  Parallel: Ah,
  List: wo,
  Anchor: So
});
export {
  Mh as Flow
};
//# sourceMappingURL=flow.js.map
