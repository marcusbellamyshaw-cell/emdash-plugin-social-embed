"use client";
var v = Object.defineProperty, x = Object.getOwnPropertyDescriptor, D = Object.getOwnPropertyNames, I = Object.prototype.hasOwnProperty, j = (r, t) => {
  let n = {};
  for (var e in r)
    v(n, e, {
      get: r[e],
      enumerable: !0
    });
  return v(n, Symbol.toStringTag, { value: "Module" }), n;
}, N = (r, t, n, e) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (var u = D(t), c = 0, s = u.length, f; c < s; c++)
      f = u[c], !I.call(r, f) && f !== n && v(r, f, {
        get: ((i) => t[i]).bind(null, f),
        enumerable: !(e = x(t, f)) || e.enumerable
      });
  return r;
}, V = (r, t, n) => (N(r, t, "default"), n), B = class extends Error {
  constructor(r) {
    super(r), this.name = "ShikiError";
  }
};
function F() {
  return 2147483648;
}
function R() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
const z = (r, t) => r + (t - r % t) % t;
async function G(r) {
  let t, n;
  const e = {};
  function u(o) {
    n = o, e.HEAPU8 = new Uint8Array(o), e.HEAPU32 = new Uint32Array(o);
  }
  function c(o, h, b) {
    e.HEAPU8.copyWithin(o, h, h + b);
  }
  function s(o) {
    try {
      return t.grow(o - n.byteLength + 65535 >>> 16), u(t.buffer), 1;
    } catch {
    }
  }
  function f(o) {
    const h = e.HEAPU8.length;
    o = o >>> 0;
    const b = F();
    if (o > b)
      return !1;
    for (let P = 1; P <= 4; P *= 2) {
      let _ = h * (1 + 0.2 / P);
      _ = Math.min(_, o + 100663296);
      const U = Math.min(b, z(Math.max(o, _), 65536));
      if (s(U))
        return !0;
    }
    return !1;
  }
  const i = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
  function a(o, h, b = 1024) {
    const P = h + b;
    let _ = h;
    for (; o[_] && !(_ >= P); ) ++_;
    if (_ - h > 16 && o.buffer && i)
      return i.decode(o.subarray(h, _));
    let U = "";
    for (; h < _; ) {
      let p = o[h++];
      if (!(p & 128)) {
        U += String.fromCharCode(p);
        continue;
      }
      const L = o[h++] & 63;
      if ((p & 224) === 192) {
        U += String.fromCharCode((p & 31) << 6 | L);
        continue;
      }
      const C = o[h++] & 63;
      if ((p & 240) === 224 ? p = (p & 15) << 12 | L << 6 | C : p = (p & 7) << 18 | L << 12 | C << 6 | o[h++] & 63, p < 65536)
        U += String.fromCharCode(p);
      else {
        const E = p - 65536;
        U += String.fromCharCode(55296 | E >> 10, 56320 | E & 1023);
      }
    }
    return U;
  }
  function w(o, h) {
    return o ? a(e.HEAPU8, o, h) : "";
  }
  const l = {
    emscripten_get_now: R,
    emscripten_memcpy_big: c,
    emscripten_resize_heap: f,
    fd_write: () => 0
  };
  async function y() {
    const h = await r({
      env: l,
      wasi_snapshot_preview1: l
    });
    t = h.memory, u(t.buffer), Object.assign(e, h), e.UTF8ToString = w;
  }
  return await y(), e;
}
var $ = Object.defineProperty, J = (r, t, n) => t in r ? $(r, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : r[t] = n, g = (r, t, n) => J(r, typeof t != "symbol" ? t + "" : t, n);
let d = null;
function K(r) {
  throw new B(r.UTF8ToString(r.getLastOnigError()));
}
class A {
  constructor(t) {
    g(this, "utf16Length"), g(this, "utf8Length"), g(this, "utf16Value"), g(this, "utf8Value"), g(this, "utf16OffsetToUtf8"), g(this, "utf8OffsetToUtf16");
    const n = t.length, e = A._utf8ByteLength(t), u = e !== n, c = u ? new Uint32Array(n + 1) : null;
    u && (c[n] = e);
    const s = u ? new Uint32Array(e + 1) : null;
    u && (s[e] = n);
    const f = new Uint8Array(e);
    let i = 0;
    for (let a = 0; a < n; a++) {
      const w = t.charCodeAt(a);
      let l = w, y = !1;
      if (w >= 55296 && w <= 56319 && a + 1 < n) {
        const o = t.charCodeAt(a + 1);
        o >= 56320 && o <= 57343 && (l = (w - 55296 << 10) + 65536 | o - 56320, y = !0);
      }
      u && (c[a] = i, y && (c[a + 1] = i), l <= 127 ? s[i + 0] = a : l <= 2047 ? (s[i + 0] = a, s[i + 1] = a) : l <= 65535 ? (s[i + 0] = a, s[i + 1] = a, s[i + 2] = a) : (s[i + 0] = a, s[i + 1] = a, s[i + 2] = a, s[i + 3] = a)), l <= 127 ? f[i++] = l : l <= 2047 ? (f[i++] = 192 | (l & 1984) >>> 6, f[i++] = 128 | (l & 63) >>> 0) : l <= 65535 ? (f[i++] = 224 | (l & 61440) >>> 12, f[i++] = 128 | (l & 4032) >>> 6, f[i++] = 128 | (l & 63) >>> 0) : (f[i++] = 240 | (l & 1835008) >>> 18, f[i++] = 128 | (l & 258048) >>> 12, f[i++] = 128 | (l & 4032) >>> 6, f[i++] = 128 | (l & 63) >>> 0), y && a++;
    }
    this.utf16Length = n, this.utf8Length = e, this.utf16Value = t, this.utf8Value = f, this.utf16OffsetToUtf8 = c, this.utf8OffsetToUtf16 = s;
  }
  static _utf8ByteLength(t) {
    let n = 0;
    for (let e = 0, u = t.length; e < u; e++) {
      const c = t.charCodeAt(e);
      let s = c, f = !1;
      if (c >= 55296 && c <= 56319 && e + 1 < u) {
        const i = t.charCodeAt(e + 1);
        i >= 56320 && i <= 57343 && (s = (c - 55296 << 10) + 65536 | i - 56320, f = !0);
      }
      s <= 127 ? n += 1 : s <= 2047 ? n += 2 : s <= 65535 ? n += 3 : n += 4, f && e++;
    }
    return n;
  }
  createString(t) {
    const n = t.omalloc(this.utf8Length);
    return t.HEAPU8.set(this.utf8Value, n), n;
  }
}
const O = class m {
  constructor(t) {
    if (g(this, "id", ++m.LAST_ID), g(this, "_onigBinding"), g(this, "content"), g(this, "utf16Length"), g(this, "utf8Length"), g(this, "utf16OffsetToUtf8"), g(this, "utf8OffsetToUtf16"), g(this, "ptr"), !d)
      throw new B("Must invoke loadWasm first.");
    this._onigBinding = d, this.content = t;
    const n = new A(t);
    this.utf16Length = n.utf16Length, this.utf8Length = n.utf8Length, this.utf16OffsetToUtf8 = n.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = n.utf8OffsetToUtf16, this.utf8Length < 1e4 && !m._sharedPtrInUse ? (m._sharedPtr || (m._sharedPtr = d.omalloc(1e4)), m._sharedPtrInUse = !0, d.HEAPU8.set(n.utf8Value, m._sharedPtr), this.ptr = m._sharedPtr) : this.ptr = n.createString(d);
  }
  convertUtf8OffsetToUtf16(t) {
    return this.utf8OffsetToUtf16 ? t < 0 ? 0 : t > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[t] : t;
  }
  convertUtf16OffsetToUtf8(t) {
    return this.utf16OffsetToUtf8 ? t < 0 ? 0 : t > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[t] : t;
  }
  dispose() {
    this.ptr === m._sharedPtr ? m._sharedPtrInUse = !1 : this._onigBinding.ofree(this.ptr);
  }
};
g(O, "LAST_ID", 0);
g(O, "_sharedPtr", 0);
g(O, "_sharedPtrInUse", !1);
let M = O;
class Q {
  constructor(t) {
    if (g(this, "_onigBinding"), g(this, "_ptr"), !d)
      throw new B("Must invoke loadWasm first.");
    const n = [], e = [];
    for (let f = 0, i = t.length; f < i; f++) {
      const a = new A(t[f]);
      n[f] = a.createString(d), e[f] = a.utf8Length;
    }
    const u = d.omalloc(4 * t.length);
    d.HEAPU32.set(n, u / 4);
    const c = d.omalloc(4 * t.length);
    d.HEAPU32.set(e, c / 4);
    const s = d.createOnigScanner(u, c, t.length);
    for (let f = 0, i = t.length; f < i; f++)
      d.ofree(n[f]);
    d.ofree(c), d.ofree(u), s === 0 && K(d), this._onigBinding = d, this._ptr = s;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(t, n, e) {
    let u = 0;
    if (typeof e == "number" && (u = e), typeof t == "string") {
      t = new M(t);
      const c = this._findNextMatchSync(t, n, !1, u);
      return t.dispose(), c;
    }
    return this._findNextMatchSync(t, n, !1, u);
  }
  _findNextMatchSync(t, n, e, u) {
    const c = this._onigBinding, s = c.findNextOnigScannerMatch(this._ptr, t.id, t.ptr, t.utf8Length, t.convertUtf16OffsetToUtf8(n), u);
    if (s === 0)
      return null;
    const f = c.HEAPU32;
    let i = s / 4;
    const a = f[i++], w = f[i++], l = [];
    for (let y = 0; y < w; y++) {
      const o = t.convertUtf8OffsetToUtf16(f[i++]), h = t.convertUtf8OffsetToUtf16(f[i++]);
      l[y] = {
        start: o,
        end: h,
        length: h - o
      };
    }
    return {
      index: a,
      captureIndices: l
    };
  }
}
function X(r) {
  return typeof r.instantiator == "function";
}
function Y(r) {
  return typeof r.default == "function";
}
function Z(r) {
  return typeof r.data < "u";
}
function k(r) {
  return typeof Response < "u" && r instanceof Response;
}
function q(r) {
  return typeof ArrayBuffer < "u" && (r instanceof ArrayBuffer || ArrayBuffer.isView(r)) || typeof Buffer < "u" && Buffer.isBuffer?.(r) || typeof SharedArrayBuffer < "u" && r instanceof SharedArrayBuffer || typeof Uint32Array < "u" && r instanceof Uint32Array;
}
let S;
function H(r) {
  if (S)
    return S;
  async function t() {
    d = await G(async (n) => {
      let e = r;
      return e = await e, typeof e == "function" && (e = await e(n)), typeof e == "function" && (e = await e(n)), X(e) ? e = await e.instantiator(n) : Y(e) ? e = await e.default(n) : (Z(e) && (e = e.data), k(e) ? typeof WebAssembly.instantiateStreaming == "function" ? e = await tt(e)(n) : e = await et(e)(n) : q(e) ? e = await T(e)(n) : e instanceof WebAssembly.Module ? e = await T(e)(n) : "default" in e && e.default instanceof WebAssembly.Module && (e = await T(e.default)(n))), "instance" in e && (e = e.instance), "exports" in e && (e = e.exports), e;
    });
  }
  return S = t(), S;
}
function T(r) {
  return (t) => WebAssembly.instantiate(r, t);
}
function tt(r) {
  return (t) => WebAssembly.instantiateStreaming(r, t);
}
function et(r) {
  return async (t) => {
    const n = await r.arrayBuffer();
    return WebAssembly.instantiate(n, t);
  };
}
let W;
function nt(r) {
  W = r;
}
function rt() {
  return W;
}
async function it(r) {
  return r && await H(r), {
    createScanner(t) {
      return new Q(t.map((n) => typeof n == "string" ? n : n.source));
    },
    createString(t) {
      return new M(t);
    }
  };
}
const ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createOnigurumaEngine: it,
  getDefaultWasmLoader: rt,
  loadWasm: H,
  setDefaultWasmLoader: nt
}, Symbol.toStringTag, { value: "Module" }));
var ot = /* @__PURE__ */ j({});
V(ot, ft);
export {
  it as createOnigurumaEngine,
  rt as getDefaultWasmLoader,
  H as loadWasm,
  nt as setDefaultWasmLoader,
  ot as t
};
//# sourceMappingURL=engine-oniguruma-g75h8oxao68cjmhg.js.map
