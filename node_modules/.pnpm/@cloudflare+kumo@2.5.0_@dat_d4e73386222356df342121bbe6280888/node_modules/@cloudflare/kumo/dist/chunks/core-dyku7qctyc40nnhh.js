"use client";
var v = class extends Error {
  constructor(t) {
    super(t), this.name = "ShikiError";
  }
};
function an(t) {
  return We(t);
}
function We(t) {
  return Array.isArray(t) ? cn(t) : t instanceof RegExp ? t : typeof t == "object" ? un(t) : t;
}
function cn(t) {
  let e = [];
  for (let n = 0, r = t.length; n < r; n++)
    e[n] = We(t[n]);
  return e;
}
function un(t) {
  let e = {};
  for (let n in t)
    e[n] = We(t[n]);
  return e;
}
function St(t, ...e) {
  return e.forEach((n) => {
    for (let r in n)
      t[r] = n[r];
  }), t;
}
function Ct(t) {
  const e = ~t.lastIndexOf("/") || ~t.lastIndexOf("\\");
  return e === 0 ? t : ~e === t.length - 1 ? Ct(t.substring(0, t.length - 1)) : t.substr(~e + 1);
}
var ve = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g, te = class {
  static hasCaptures(t) {
    return t === null ? !1 : (ve.lastIndex = 0, ve.test(t));
  }
  static replaceCaptures(t, e, n) {
    return t.replace(ve, (r, s, o, l) => {
      let a = n[parseInt(s || o, 10)];
      if (a) {
        let i = e.substring(a.start, a.end);
        for (; i[0] === "."; )
          i = i.substring(1);
        switch (l) {
          case "downcase":
            return i.toLowerCase();
          case "upcase":
            return i.toUpperCase();
          default:
            return i;
        }
      } else
        return r;
    });
  }
};
function wt(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function vt(t, e) {
  if (t === null && e === null)
    return 0;
  if (!t)
    return -1;
  if (!e)
    return 1;
  let n = t.length, r = e.length;
  if (n === r) {
    for (let s = 0; s < n; s++) {
      let o = wt(t[s], e[s]);
      if (o !== 0)
        return o;
    }
    return 0;
  }
  return n - r;
}
function Qe(t) {
  return !!(/^#[0-9a-f]{6}$/i.test(t) || /^#[0-9a-f]{8}$/i.test(t) || /^#[0-9a-f]{3}$/i.test(t) || /^#[0-9a-f]{4}$/i.test(t));
}
function kt(t) {
  return t.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var Rt = class {
  constructor(t) {
    this.fn = t;
  }
  cache = /* @__PURE__ */ new Map();
  get(t) {
    if (this.cache.has(t))
      return this.cache.get(t);
    const e = this.fn(t);
    return this.cache.set(t, e), e;
  }
}, le = class {
  constructor(t, e, n) {
    this._colorMap = t, this._defaults = e, this._root = n;
  }
  static createFromRawTheme(t, e) {
    return this.createFromParsedTheme(fn(t), e);
  }
  static createFromParsedTheme(t, e) {
    return gn(t, e);
  }
  _cachedMatchRoot = new Rt(
    (t) => this._root.match(t)
  );
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(t) {
    if (t === null)
      return this._defaults;
    const e = t.scopeName, r = this._cachedMatchRoot.get(e).find(
      (s) => hn(t.parent, s.parentScopes)
    );
    return r ? new xt(
      r.fontStyle,
      r.foreground,
      r.background
    ) : null;
  }
}, ke = class se {
  constructor(e, n) {
    this.parent = e, this.scopeName = n;
  }
  static push(e, n) {
    for (const r of n)
      e = new se(e, r);
    return e;
  }
  static from(...e) {
    let n = null;
    for (let r = 0; r < e.length; r++)
      n = new se(n, e[r]);
    return n;
  }
  push(e) {
    return new se(this, e);
  }
  getSegments() {
    let e = this;
    const n = [];
    for (; e; )
      n.push(e.scopeName), e = e.parent;
    return n.reverse(), n;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(e) {
    return this === e ? !0 : this.parent === null ? !1 : this.parent.extends(e);
  }
  getExtensionIfDefined(e) {
    const n = [];
    let r = this;
    for (; r && r !== e; )
      n.push(r.scopeName), r = r.parent;
    return r === e ? n.reverse() : void 0;
  }
};
function hn(t, e) {
  if (e.length === 0)
    return !0;
  for (let n = 0; n < e.length; n++) {
    let r = e[n], s = !1;
    if (r === ">") {
      if (n === e.length - 1)
        return !1;
      r = e[++n], s = !0;
    }
    for (; t && !dn(t.scopeName, r); ) {
      if (s)
        return !1;
      t = t.parent;
    }
    if (!t)
      return !1;
    t = t.parent;
  }
  return !0;
}
function dn(t, e) {
  return e === t || t.startsWith(e) && t[e.length] === ".";
}
var xt = class {
  constructor(t, e, n) {
    this.fontStyle = t, this.foregroundId = e, this.backgroundId = n;
  }
};
function fn(t) {
  if (!t)
    return [];
  if (!t.settings || !Array.isArray(t.settings))
    return [];
  let e = t.settings, n = [], r = 0;
  for (let s = 0, o = e.length; s < o; s++) {
    let l = e[s];
    if (!l.settings)
      continue;
    let a;
    if (typeof l.scope == "string") {
      let h = l.scope;
      h = h.replace(/^[,]+/, ""), h = h.replace(/[,]+$/, ""), a = h.split(",");
    } else Array.isArray(l.scope) ? a = l.scope : a = [""];
    let i = -1;
    if (typeof l.settings.fontStyle == "string") {
      i = 0;
      let h = l.settings.fontStyle.split(" ");
      for (let f = 0, g = h.length; f < g; f++)
        switch (h[f]) {
          case "italic":
            i = i | 1;
            break;
          case "bold":
            i = i | 2;
            break;
          case "underline":
            i = i | 4;
            break;
          case "strikethrough":
            i = i | 8;
            break;
        }
    }
    let c = null;
    typeof l.settings.foreground == "string" && Qe(l.settings.foreground) && (c = l.settings.foreground);
    let u = null;
    typeof l.settings.background == "string" && Qe(l.settings.background) && (u = l.settings.background);
    for (let h = 0, f = a.length; h < f; h++) {
      let p = a[h].trim().split(" "), S = p[p.length - 1], _ = null;
      p.length > 1 && (_ = p.slice(0, p.length - 1), _.reverse()), n[r++] = new pn(
        S,
        _,
        s,
        i,
        c,
        u
      );
    }
  }
  return n;
}
var pn = class {
  constructor(t, e, n, r, s, o) {
    this.scope = t, this.parentScopes = e, this.index = n, this.fontStyle = r, this.foreground = s, this.background = o;
  }
}, T = /* @__PURE__ */ ((t) => (t[t.NotSet = -1] = "NotSet", t[t.None = 0] = "None", t[t.Italic = 1] = "Italic", t[t.Bold = 2] = "Bold", t[t.Underline = 4] = "Underline", t[t.Strikethrough = 8] = "Strikethrough", t))(T || {});
function gn(t, e) {
  t.sort((i, c) => {
    let u = wt(i.scope, c.scope);
    return u !== 0 || (u = vt(i.parentScopes, c.parentScopes), u !== 0) ? u : i.index - c.index;
  });
  let n = 0, r = "#000000", s = "#ffffff";
  for (; t.length >= 1 && t[0].scope === ""; ) {
    let i = t.shift();
    i.fontStyle !== -1 && (n = i.fontStyle), i.foreground !== null && (r = i.foreground), i.background !== null && (s = i.background);
  }
  let o = new mn(e), l = new xt(n, o.getId(r), o.getId(s)), a = new _n(new Pe(0, null, -1, 0, 0), []);
  for (let i = 0, c = t.length; i < c; i++) {
    let u = t[i];
    a.insert(0, u.scope, u.parentScopes, u.fontStyle, o.getId(u.foreground), o.getId(u.background));
  }
  return new le(o, l, a);
}
var mn = class {
  _isFrozen;
  _lastColorId;
  _id2color;
  _color2id;
  constructor(t) {
    if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(t)) {
      this._isFrozen = !0;
      for (let e = 0, n = t.length; e < n; e++)
        this._color2id[t[e]] = e, this._id2color[e] = t[e];
    } else
      this._isFrozen = !1;
  }
  getId(t) {
    if (t === null)
      return 0;
    t = t.toUpperCase();
    let e = this._color2id[t];
    if (e)
      return e;
    if (this._isFrozen)
      throw new Error(`Missing color in color map - ${t}`);
    return e = ++this._lastColorId, this._color2id[t] = e, this._id2color[e] = t, e;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
}, yn = Object.freeze([]), Pe = class At {
  scopeDepth;
  parentScopes;
  fontStyle;
  foreground;
  background;
  constructor(e, n, r, s, o) {
    this.scopeDepth = e, this.parentScopes = n || yn, this.fontStyle = r, this.foreground = s, this.background = o;
  }
  clone() {
    return new At(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(e) {
    let n = [];
    for (let r = 0, s = e.length; r < s; r++)
      n[r] = e[r].clone();
    return n;
  }
  acceptOverwrite(e, n, r, s) {
    this.scopeDepth > e ? console.log("how did this happen?") : this.scopeDepth = e, n !== -1 && (this.fontStyle = n), r !== 0 && (this.foreground = r), s !== 0 && (this.background = s);
  }
}, _n = class Ie {
  constructor(e, n = [], r = {}) {
    this._mainRule = e, this._children = r, this._rulesWithParentScopes = n;
  }
  _rulesWithParentScopes;
  static _cmpBySpecificity(e, n) {
    if (e.scopeDepth !== n.scopeDepth)
      return n.scopeDepth - e.scopeDepth;
    let r = 0, s = 0;
    for (; e.parentScopes[r] === ">" && r++, n.parentScopes[s] === ">" && s++, !(r >= e.parentScopes.length || s >= n.parentScopes.length); ) {
      const o = n.parentScopes[s].length - e.parentScopes[r].length;
      if (o !== 0)
        return o;
      r++, s++;
    }
    return n.parentScopes.length - e.parentScopes.length;
  }
  match(e) {
    if (e !== "") {
      let r = e.indexOf("."), s, o;
      if (r === -1 ? (s = e, o = "") : (s = e.substring(0, r), o = e.substring(r + 1)), this._children.hasOwnProperty(s))
        return this._children[s].match(o);
    }
    const n = this._rulesWithParentScopes.concat(this._mainRule);
    return n.sort(Ie._cmpBySpecificity), n;
  }
  insert(e, n, r, s, o, l) {
    if (n === "") {
      this._doInsertHere(e, r, s, o, l);
      return;
    }
    let a = n.indexOf("."), i, c;
    a === -1 ? (i = n, c = "") : (i = n.substring(0, a), c = n.substring(a + 1));
    let u;
    this._children.hasOwnProperty(i) ? u = this._children[i] : (u = new Ie(this._mainRule.clone(), Pe.cloneArr(this._rulesWithParentScopes)), this._children[i] = u), u.insert(e + 1, c, r, s, o, l);
  }
  _doInsertHere(e, n, r, s, o) {
    if (n === null) {
      this._mainRule.acceptOverwrite(e, r, s, o);
      return;
    }
    for (let l = 0, a = this._rulesWithParentScopes.length; l < a; l++) {
      let i = this._rulesWithParentScopes[l];
      if (vt(i.parentScopes, n) === 0) {
        i.acceptOverwrite(e, r, s, o);
        return;
      }
    }
    r === -1 && (r = this._mainRule.fontStyle), s === 0 && (s = this._mainRule.foreground), o === 0 && (o = this._mainRule.background), this._rulesWithParentScopes.push(new Pe(e, n, r, s, o));
  }
}, U = class L {
  static toBinaryStr(e) {
    return e.toString(2).padStart(32, "0");
  }
  static print(e) {
    const n = L.getLanguageId(e), r = L.getTokenType(e), s = L.getFontStyle(e), o = L.getForeground(e), l = L.getBackground(e);
    console.log({
      languageId: n,
      tokenType: r,
      fontStyle: s,
      foreground: o,
      background: l
    });
  }
  static getLanguageId(e) {
    return (e & 255) >>> 0;
  }
  static getTokenType(e) {
    return (e & 768) >>> 8;
  }
  static containsBalancedBrackets(e) {
    return (e & 1024) !== 0;
  }
  static getFontStyle(e) {
    return (e & 30720) >>> 11;
  }
  static getForeground(e) {
    return (e & 16744448) >>> 15;
  }
  static getBackground(e) {
    return (e & 4278190080) >>> 24;
  }
  /**
   * Updates the fields in `metadata`.
   * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
   */
  static set(e, n, r, s, o, l, a) {
    let i = L.getLanguageId(e), c = L.getTokenType(e), u = L.containsBalancedBrackets(e) ? 1 : 0, h = L.getFontStyle(e), f = L.getForeground(e), g = L.getBackground(e);
    return n !== 0 && (i = n), r !== 8 && (c = r), s !== null && (u = s ? 1 : 0), o !== -1 && (h = o), l !== 0 && (f = l), a !== 0 && (g = a), (i << 0 | c << 8 | u << 10 | h << 11 | f << 15 | g << 24) >>> 0;
  }
};
function ie(t, e) {
  const n = [], r = bn(t);
  let s = r.next();
  for (; s !== null; ) {
    let i = 0;
    if (s.length === 2 && s.charAt(1) === ":") {
      switch (s.charAt(0)) {
        case "R":
          i = 1;
          break;
        case "L":
          i = -1;
          break;
        default:
          console.log(`Unknown priority ${s} in scope selector`);
      }
      s = r.next();
    }
    let c = l();
    if (n.push({ matcher: c, priority: i }), s !== ",")
      break;
    s = r.next();
  }
  return n;
  function o() {
    if (s === "-") {
      s = r.next();
      const i = o();
      return (c) => !!i && !i(c);
    }
    if (s === "(") {
      s = r.next();
      const i = a();
      return s === ")" && (s = r.next()), i;
    }
    if (Ze(s)) {
      const i = [];
      do
        i.push(s), s = r.next();
      while (Ze(s));
      return (c) => e(i, c);
    }
    return null;
  }
  function l() {
    const i = [];
    let c = o();
    for (; c; )
      i.push(c), c = o();
    return (u) => i.every((h) => h(u));
  }
  function a() {
    const i = [];
    let c = l();
    for (; c && (i.push(c), s === "|" || s === ","); ) {
      do
        s = r.next();
      while (s === "|" || s === ",");
      c = l();
    }
    return (u) => i.some((h) => h(u));
  }
}
function Ze(t) {
  return !!t && !!t.match(/[\w\.:]+/);
}
function bn(t) {
  let e = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g, n = e.exec(t);
  return {
    next: () => {
      if (!n)
        return null;
      const r = n[0];
      return n = e.exec(t), r;
    }
  };
}
function Nt(t) {
  typeof t.dispose == "function" && t.dispose();
}
var Y = class {
  constructor(t) {
    this.scopeName = t;
  }
  toKey() {
    return this.scopeName;
  }
}, Sn = class {
  constructor(t, e) {
    this.scopeName = t, this.ruleName = e;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
}, Cn = class {
  _references = [];
  _seenReferenceKeys = /* @__PURE__ */ new Set();
  get references() {
    return this._references;
  }
  visitedRule = /* @__PURE__ */ new Set();
  add(t) {
    const e = t.toKey();
    this._seenReferenceKeys.has(e) || (this._seenReferenceKeys.add(e), this._references.push(t));
  }
}, wn = class {
  constructor(t, e) {
    this.repo = t, this.initialScopeName = e, this.seenFullScopeRequests.add(this.initialScopeName), this.Q = [new Y(this.initialScopeName)];
  }
  seenFullScopeRequests = /* @__PURE__ */ new Set();
  seenPartialScopeRequests = /* @__PURE__ */ new Set();
  Q;
  processQueue() {
    const t = this.Q;
    this.Q = [];
    const e = new Cn();
    for (const n of t)
      vn(n, this.initialScopeName, this.repo, e);
    for (const n of e.references)
      if (n instanceof Y) {
        if (this.seenFullScopeRequests.has(n.scopeName))
          continue;
        this.seenFullScopeRequests.add(n.scopeName), this.Q.push(n);
      } else {
        if (this.seenFullScopeRequests.has(n.scopeName) || this.seenPartialScopeRequests.has(n.toKey()))
          continue;
        this.seenPartialScopeRequests.add(n.toKey()), this.Q.push(n);
      }
  }
};
function vn(t, e, n, r) {
  const s = n.lookup(t.scopeName);
  if (!s) {
    if (t.scopeName === e)
      throw new Error(`No grammar provided for <${e}>`);
    return;
  }
  const o = n.lookup(e);
  t instanceof Y ? oe({ baseGrammar: o, selfGrammar: s }, r) : Le(
    t.ruleName,
    { baseGrammar: o, selfGrammar: s, repository: s.repository },
    r
  );
  const l = n.injections(t.scopeName);
  if (l)
    for (const a of l)
      r.add(new Y(a));
}
function Le(t, e, n) {
  if (e.repository && e.repository[t]) {
    const r = e.repository[t];
    ae([r], e, n);
  }
}
function oe(t, e) {
  t.selfGrammar.patterns && Array.isArray(t.selfGrammar.patterns) && ae(
    t.selfGrammar.patterns,
    { ...t, repository: t.selfGrammar.repository },
    e
  ), t.selfGrammar.injections && ae(
    Object.values(t.selfGrammar.injections),
    { ...t, repository: t.selfGrammar.repository },
    e
  );
}
function ae(t, e, n) {
  for (const r of t) {
    if (n.visitedRule.has(r))
      continue;
    n.visitedRule.add(r);
    const s = r.repository ? St({}, e.repository, r.repository) : e.repository;
    Array.isArray(r.patterns) && ae(r.patterns, { ...e, repository: s }, n);
    const o = r.include;
    if (!o)
      continue;
    const l = Tt(o);
    switch (l.kind) {
      case 0:
        oe({ ...e, selfGrammar: e.baseGrammar }, n);
        break;
      case 1:
        oe(e, n);
        break;
      case 2:
        Le(l.ruleName, { ...e, repository: s }, n);
        break;
      case 3:
      case 4:
        const a = l.scopeName === e.selfGrammar.scopeName ? e.selfGrammar : l.scopeName === e.baseGrammar.scopeName ? e.baseGrammar : void 0;
        if (a) {
          const i = { baseGrammar: e.baseGrammar, selfGrammar: a, repository: s };
          l.kind === 4 ? Le(l.ruleName, i, n) : oe(i, n);
        } else
          l.kind === 4 ? n.add(new Sn(l.scopeName, l.ruleName)) : n.add(new Y(l.scopeName));
        break;
    }
  }
}
var kn = class {
  kind = 0;
}, Rn = class {
  kind = 1;
}, xn = class {
  constructor(t) {
    this.ruleName = t;
  }
  kind = 2;
}, An = class {
  constructor(t) {
    this.scopeName = t;
  }
  kind = 3;
}, Nn = class {
  constructor(t, e) {
    this.scopeName = t, this.ruleName = e;
  }
  kind = 4;
};
function Tt(t) {
  if (t === "$base")
    return new kn();
  if (t === "$self")
    return new Rn();
  const e = t.indexOf("#");
  if (e === -1)
    return new An(t);
  if (e === 0)
    return new xn(t.substring(1));
  {
    const n = t.substring(0, e), r = t.substring(e + 1);
    return new Nn(n, r);
  }
}
var Tn = /\\(\d+)/, et = /\\(\d+)/g, Pn = -1, Pt = -2;
var Z = class {
  $location;
  id;
  _nameIsCapturing;
  _name;
  _contentNameIsCapturing;
  _contentName;
  constructor(t, e, n, r) {
    this.$location = t, this.id = e, this._name = n || null, this._nameIsCapturing = te.hasCaptures(this._name), this._contentName = r || null, this._contentNameIsCapturing = te.hasCaptures(this._contentName);
  }
  get debugName() {
    const t = this.$location ? `${Ct(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${t}`;
  }
  getName(t, e) {
    return !this._nameIsCapturing || this._name === null || t === null || e === null ? this._name : te.replaceCaptures(this._name, t, e);
  }
  getContentName(t, e) {
    return !this._contentNameIsCapturing || this._contentName === null ? this._contentName : te.replaceCaptures(this._contentName, t, e);
  }
}, In = class extends Z {
  retokenizeCapturedWithRuleId;
  constructor(t, e, n, r, s) {
    super(t, e, n, r), this.retokenizeCapturedWithRuleId = s;
  }
  dispose() {
  }
  collectPatterns(t, e) {
    throw new Error("Not supported!");
  }
  compile(t, e) {
    throw new Error("Not supported!");
  }
  compileAG(t, e, n, r) {
    throw new Error("Not supported!");
  }
}, Ln = class extends Z {
  _match;
  captures;
  _cachedCompiledPatterns;
  constructor(t, e, n, r, s) {
    super(t, e, n, null), this._match = new X(r, this.id), this.captures = s, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(t, e) {
    e.push(this._match);
  }
  compile(t, e) {
    return this._getCachedCompiledPatterns(t).compile(t);
  }
  compileAG(t, e, n, r) {
    return this._getCachedCompiledPatterns(t).compileAG(t, n, r);
  }
  _getCachedCompiledPatterns(t) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new J(), this.collectPatterns(t, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, tt = class extends Z {
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  constructor(t, e, n, r, s) {
    super(t, e, n, r), this.patterns = s.patterns, this.hasMissingPatterns = s.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  collectPatterns(t, e) {
    for (const n of this.patterns)
      t.getRule(n).collectPatterns(t, e);
  }
  compile(t, e) {
    return this._getCachedCompiledPatterns(t).compile(t);
  }
  compileAG(t, e, n, r) {
    return this._getCachedCompiledPatterns(t).compileAG(t, n, r);
  }
  _getCachedCompiledPatterns(t) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new J(), this.collectPatterns(t, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, Ee = class extends Z {
  _begin;
  beginCaptures;
  _end;
  endHasBackReferences;
  endCaptures;
  applyEndPatternLast;
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  constructor(t, e, n, r, s, o, l, a, i, c) {
    super(t, e, n, r), this._begin = new X(s, this.id), this.beginCaptures = o, this._end = new X(l || "￿", -1), this.endHasBackReferences = this._end.hasBackReferences, this.endCaptures = a, this.applyEndPatternLast = i || !1, this.patterns = c.patterns, this.hasMissingPatterns = c.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(t, e) {
    return this._end.resolveBackReferences(t, e);
  }
  collectPatterns(t, e) {
    e.push(this._begin);
  }
  compile(t, e) {
    return this._getCachedCompiledPatterns(t, e).compile(t);
  }
  compileAG(t, e, n, r) {
    return this._getCachedCompiledPatterns(t, e).compileAG(t, n, r);
  }
  _getCachedCompiledPatterns(t, e) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new J();
      for (const n of this.patterns)
        t.getRule(n).collectPatterns(t, this._cachedCompiledPatterns);
      this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
    }
    return this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, e) : this._cachedCompiledPatterns.setSource(0, e)), this._cachedCompiledPatterns;
  }
}, ce = class extends Z {
  _begin;
  beginCaptures;
  whileCaptures;
  _while;
  whileHasBackReferences;
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  _cachedCompiledWhilePatterns;
  constructor(t, e, n, r, s, o, l, a, i) {
    super(t, e, n, r), this._begin = new X(s, this.id), this.beginCaptures = o, this.whileCaptures = a, this._while = new X(l, Pt), this.whileHasBackReferences = this._while.hasBackReferences, this.patterns = i.patterns, this.hasMissingPatterns = i.hasMissingPatterns, this._cachedCompiledPatterns = null, this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(t, e) {
    return this._while.resolveBackReferences(t, e);
  }
  collectPatterns(t, e) {
    e.push(this._begin);
  }
  compile(t, e) {
    return this._getCachedCompiledPatterns(t).compile(t);
  }
  compileAG(t, e, n, r) {
    return this._getCachedCompiledPatterns(t).compileAG(t, n, r);
  }
  _getCachedCompiledPatterns(t) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new J();
      for (const e of this.patterns)
        t.getRule(e).collectPatterns(t, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(t, e) {
    return this._getCachedCompiledWhilePatterns(t, e).compile(t);
  }
  compileWhileAG(t, e, n, r) {
    return this._getCachedCompiledWhilePatterns(t, e).compileAG(t, n, r);
  }
  _getCachedCompiledWhilePatterns(t, e) {
    return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new J(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, e || "￿"), this._cachedCompiledWhilePatterns;
  }
}, It = class N {
  static createCaptureRule(e, n, r, s, o) {
    return e.registerRule((l) => new In(n, l, r, s, o));
  }
  static getCompiledRuleId(e, n, r) {
    return e.id || n.registerRule((s) => {
      if (e.id = s, e.match)
        return new Ln(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.match,
          N._compileCaptures(e.captures, n, r)
        );
      if (typeof e.begin > "u") {
        e.repository && (r = St({}, r, e.repository));
        let o = e.patterns;
        return typeof o > "u" && e.include && (o = [{ include: e.include }]), new tt(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.contentName,
          N._compilePatterns(o, n, r)
        );
      }
      return e.while ? new ce(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        N._compileCaptures(e.beginCaptures || e.captures, n, r),
        e.while,
        N._compileCaptures(e.whileCaptures || e.captures, n, r),
        N._compilePatterns(e.patterns, n, r)
      ) : new Ee(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        N._compileCaptures(e.beginCaptures || e.captures, n, r),
        e.end,
        N._compileCaptures(e.endCaptures || e.captures, n, r),
        e.applyEndPatternLast,
        N._compilePatterns(e.patterns, n, r)
      );
    }), e.id;
  }
  static _compileCaptures(e, n, r) {
    let s = [];
    if (e) {
      let o = 0;
      for (const l in e) {
        if (l === "$vscodeTextmateLocation")
          continue;
        const a = parseInt(l, 10);
        a > o && (o = a);
      }
      for (let l = 0; l <= o; l++)
        s[l] = null;
      for (const l in e) {
        if (l === "$vscodeTextmateLocation")
          continue;
        const a = parseInt(l, 10);
        let i = 0;
        e[l].patterns && (i = N.getCompiledRuleId(e[l], n, r)), s[a] = N.createCaptureRule(n, e[l].$vscodeTextmateLocation, e[l].name, e[l].contentName, i);
      }
    }
    return s;
  }
  static _compilePatterns(e, n, r) {
    let s = [];
    if (e)
      for (let o = 0, l = e.length; o < l; o++) {
        const a = e[o];
        let i = -1;
        if (a.include) {
          const c = Tt(a.include);
          switch (c.kind) {
            case 0:
            case 1:
              i = N.getCompiledRuleId(r[a.include], n, r);
              break;
            case 2:
              let u = r[c.ruleName];
              u && (i = N.getCompiledRuleId(u, n, r));
              break;
            case 3:
            case 4:
              const h = c.scopeName, f = c.kind === 4 ? c.ruleName : null, g = n.getExternalGrammar(h, r);
              if (g)
                if (f) {
                  let p = g.repository[f];
                  p && (i = N.getCompiledRuleId(p, n, g.repository));
                } else
                  i = N.getCompiledRuleId(g.repository.$self, n, g.repository);
              break;
          }
        } else
          i = N.getCompiledRuleId(a, n, r);
        if (i !== -1) {
          const c = n.getRule(i);
          let u = !1;
          if ((c instanceof tt || c instanceof Ee || c instanceof ce) && c.hasMissingPatterns && c.patterns.length === 0 && (u = !0), u)
            continue;
          s.push(i);
        }
      }
    return {
      patterns: s,
      hasMissingPatterns: (e ? e.length : 0) !== s.length
    };
  }
}, X = class Lt {
  source;
  ruleId;
  hasAnchor;
  hasBackReferences;
  _anchorCache;
  constructor(e, n) {
    if (e && typeof e == "string") {
      const r = e.length;
      let s = 0, o = [], l = !1;
      for (let a = 0; a < r; a++)
        if (e.charAt(a) === "\\" && a + 1 < r) {
          const c = e.charAt(a + 1);
          c === "z" ? (o.push(e.substring(s, a)), o.push("$(?!\\n)(?<!\\n)"), s = a + 2) : (c === "A" || c === "G") && (l = !0), a++;
        }
      this.hasAnchor = l, s === 0 ? this.source = e : (o.push(e.substring(s, r)), this.source = o.join(""));
    } else
      this.hasAnchor = !1, this.source = e;
    this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = n, typeof this.source == "string" ? this.hasBackReferences = Tn.test(this.source) : this.hasBackReferences = !1;
  }
  clone() {
    return new Lt(this.source, this.ruleId);
  }
  setSource(e) {
    this.source !== e && (this.source = e, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
  }
  resolveBackReferences(e, n) {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let r = n.map((s) => e.substring(s.start, s.end));
    return et.lastIndex = 0, this.source.replace(et, (s, o) => kt(r[parseInt(o, 10)] || ""));
  }
  _buildAnchorCache() {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let e = [], n = [], r = [], s = [], o, l, a, i;
    for (o = 0, l = this.source.length; o < l; o++)
      a = this.source.charAt(o), e[o] = a, n[o] = a, r[o] = a, s[o] = a, a === "\\" && o + 1 < l && (i = this.source.charAt(o + 1), i === "A" ? (e[o + 1] = "￿", n[o + 1] = "￿", r[o + 1] = "A", s[o + 1] = "A") : i === "G" ? (e[o + 1] = "￿", n[o + 1] = "G", r[o + 1] = "￿", s[o + 1] = "G") : (e[o + 1] = i, n[o + 1] = i, r[o + 1] = i, s[o + 1] = i), o++);
    return {
      A0_G0: e.join(""),
      A0_G1: n.join(""),
      A1_G0: r.join(""),
      A1_G1: s.join("")
    };
  }
  resolveAnchors(e, n) {
    return !this.hasAnchor || !this._anchorCache || typeof this.source != "string" ? this.source : e ? n ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : n ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0;
  }
}, J = class {
  _items;
  _hasAnchors;
  _cached;
  _anchorCache;
  constructor() {
    this._items = [], this._hasAnchors = !1, this._cached = null, this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
  }
  push(t) {
    this._items.push(t), this._hasAnchors = this._hasAnchors || t.hasAnchor;
  }
  unshift(t) {
    this._items.unshift(t), this._hasAnchors = this._hasAnchors || t.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(t, e) {
    this._items[t].source !== e && (this._disposeCaches(), this._items[t].setSource(e));
  }
  compile(t) {
    if (!this._cached) {
      let e = this._items.map((n) => n.source);
      this._cached = new nt(t, e, this._items.map((n) => n.ruleId));
    }
    return this._cached;
  }
  compileAG(t, e, n) {
    return this._hasAnchors ? e ? n ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(t, e, n)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(t, e, n)), this._anchorCache.A1_G0) : n ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(t, e, n)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(t, e, n)), this._anchorCache.A0_G0) : this.compile(t);
  }
  _resolveAnchors(t, e, n) {
    let r = this._items.map((s) => s.resolveAnchors(e, n));
    return new nt(t, r, this._items.map((s) => s.ruleId));
  }
}, nt = class {
  constructor(t, e, n) {
    this.regExps = e, this.rules = n, this.scanner = t.createOnigScanner(e);
  }
  scanner;
  dispose() {
    typeof this.scanner.dispose == "function" && this.scanner.dispose();
  }
  toString() {
    const t = [];
    for (let e = 0, n = this.rules.length; e < n; e++)
      t.push("   - " + this.rules[e] + ": " + this.regExps[e]);
    return t.join(`
`);
  }
  findNextMatchSync(t, e, n) {
    const r = this.scanner.findNextMatchSync(t, e, n);
    return r ? {
      ruleId: this.rules[r.index],
      captureIndices: r.captureIndices
    } : null;
  }
}, Re = class {
  constructor(t, e) {
    this.languageId = t, this.tokenType = e;
  }
}, En = class Oe {
  _defaultAttributes;
  _embeddedLanguagesMatcher;
  constructor(e, n) {
    this._defaultAttributes = new Re(
      e,
      8
      /* NotSet */
    ), this._embeddedLanguagesMatcher = new On(Object.entries(n || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(e) {
    return e === null ? Oe._NULL_SCOPE_METADATA : this._getBasicScopeAttributes.get(e);
  }
  static _NULL_SCOPE_METADATA = new Re(0, 0);
  _getBasicScopeAttributes = new Rt((e) => {
    const n = this._scopeToLanguage(e), r = this._toStandardTokenType(e);
    return new Re(n, r);
  });
  /**
   * Given a produced TM scope, return the language that token describes or null if unknown.
   * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
   */
  _scopeToLanguage(e) {
    return this._embeddedLanguagesMatcher.match(e) || 0;
  }
  _toStandardTokenType(e) {
    const n = e.match(Oe.STANDARD_TOKEN_TYPE_REGEXP);
    if (!n)
      return 8;
    switch (n[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
  static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
}, On = class {
  values;
  scopesRegExp;
  constructor(t) {
    if (t.length === 0)
      this.values = null, this.scopesRegExp = null;
    else {
      this.values = new Map(t);
      const e = t.map(
        ([n, r]) => kt(n)
      );
      e.sort(), e.reverse(), this.scopesRegExp = new RegExp(
        `^((${e.join(")|(")}))($|\\.)`,
        ""
      );
    }
  }
  match(t) {
    if (!this.scopesRegExp)
      return;
    const e = t.match(this.scopesRegExp);
    if (e)
      return this.values.get(e[1]);
  }
};
typeof process < "u" && process.env.VSCODE_TEXTMATE_DEBUG;
var rt = class {
  constructor(t, e) {
    this.stack = t, this.stoppedEarly = e;
  }
};
function Et(t, e, n, r, s, o, l, a) {
  const i = e.content.length;
  let c = !1, u = -1;
  if (l) {
    const g = Mn(
      t,
      e,
      n,
      r,
      s,
      o
    );
    s = g.stack, r = g.linePos, n = g.isFirstLine, u = g.anchorPosition;
  }
  const h = Date.now();
  for (; !c; ) {
    if (a !== 0 && Date.now() - h > a)
      return new rt(s, !0);
    f();
  }
  return new rt(s, !1);
  function f() {
    const g = Bn(
      t,
      e,
      n,
      r,
      s,
      u
    );
    if (!g) {
      o.produce(s, i), c = !0;
      return;
    }
    const p = g.captureIndices, S = g.matchedRuleId, _ = p && p.length > 0 ? p[0].end > r : !1;
    if (S === Pn) {
      const y = s.getRule(t);
      o.produce(s, p[0].start), s = s.withContentNameScopesList(s.nameScopesList), K(
        t,
        e,
        n,
        s,
        o,
        y.endCaptures,
        p
      ), o.produce(s, p[0].end);
      const m = s;
      if (s = s.parent, u = m.getAnchorPos(), !_ && m.getEnterPos() === r) {
        s = m, o.produce(s, i), c = !0;
        return;
      }
    } else {
      const y = t.getRule(S);
      o.produce(s, p[0].start);
      const m = s, b = y.getName(e.content, p), A = s.contentNameScopesList.pushAttributed(
        b,
        t
      );
      if (s = s.push(
        S,
        r,
        u,
        p[0].end === i,
        null,
        A,
        A
      ), y instanceof Ee) {
        const k = y;
        K(
          t,
          e,
          n,
          s,
          o,
          k.beginCaptures,
          p
        ), o.produce(s, p[0].end), u = p[0].end;
        const E = k.getContentName(
          e.content,
          p
        ), G = A.pushAttributed(
          E,
          t
        );
        if (s = s.withContentNameScopesList(G), k.endHasBackReferences && (s = s.withEndRule(
          k.getEndWithResolvedBackReferences(
            e.content,
            p
          )
        )), !_ && m.hasSameRuleAs(s)) {
          s = s.pop(), o.produce(s, i), c = !0;
          return;
        }
      } else if (y instanceof ce) {
        const k = y;
        K(
          t,
          e,
          n,
          s,
          o,
          k.beginCaptures,
          p
        ), o.produce(s, p[0].end), u = p[0].end;
        const E = k.getContentName(
          e.content,
          p
        ), G = A.pushAttributed(
          E,
          t
        );
        if (s = s.withContentNameScopesList(G), k.whileHasBackReferences && (s = s.withEndRule(
          k.getWhileWithResolvedBackReferences(
            e.content,
            p
          )
        )), !_ && m.hasSameRuleAs(s)) {
          s = s.pop(), o.produce(s, i), c = !0;
          return;
        }
      } else if (K(
        t,
        e,
        n,
        s,
        o,
        y.captures,
        p
      ), o.produce(s, p[0].end), s = s.pop(), !_) {
        s = s.safePop(), o.produce(s, i), c = !0;
        return;
      }
    }
    p[0].end > r && (r = p[0].end, n = !1);
  }
}
function Mn(t, e, n, r, s, o) {
  let l = s.beginRuleCapturedEOL ? 0 : -1;
  const a = [];
  for (let i = s; i; i = i.pop()) {
    const c = i.getRule(t);
    c instanceof ce && a.push({
      rule: c,
      stack: i
    });
  }
  for (let i = a.pop(); i; i = a.pop()) {
    const { ruleScanner: c, findOptions: u } = $n(i.rule, t, i.stack.endRule, n, r === l), h = c.findNextMatchSync(e, r, u);
    if (h) {
      if (h.ruleId !== Pt) {
        s = i.stack.pop();
        break;
      }
      h.captureIndices && h.captureIndices.length && (o.produce(i.stack, h.captureIndices[0].start), K(t, e, n, i.stack, o, i.rule.whileCaptures, h.captureIndices), o.produce(i.stack, h.captureIndices[0].end), l = h.captureIndices[0].end, h.captureIndices[0].end > r && (r = h.captureIndices[0].end, n = !1));
    } else {
      s = i.stack.pop();
      break;
    }
  }
  return { stack: s, linePos: r, anchorPosition: l, isFirstLine: n };
}
function Bn(t, e, n, r, s, o) {
  const l = Gn(t, e, n, r, s, o), a = t.getInjections();
  if (a.length === 0)
    return l;
  const i = Dn(a, t, e, n, r, s, o);
  if (!i)
    return l;
  if (!l)
    return i;
  const c = l.captureIndices[0].start, u = i.captureIndices[0].start;
  return u < c || i.priorityMatch && u === c ? i : l;
}
function Gn(t, e, n, r, s, o) {
  const l = s.getRule(t), { ruleScanner: a, findOptions: i } = Ot(l, t, s.endRule, n, r === o), c = a.findNextMatchSync(e, r, i);
  return c ? {
    captureIndices: c.captureIndices,
    matchedRuleId: c.ruleId
  } : null;
}
function Dn(t, e, n, r, s, o, l) {
  let a = Number.MAX_VALUE, i = null, c, u = 0;
  const h = o.contentNameScopesList.getScopeNames();
  for (let f = 0, g = t.length; f < g; f++) {
    const p = t[f];
    if (!p.matcher(h))
      continue;
    const S = e.getRule(p.ruleId), { ruleScanner: _, findOptions: y } = Ot(S, e, null, r, s === l), m = _.findNextMatchSync(n, s, y);
    if (!m)
      continue;
    const b = m.captureIndices[0].start;
    if (!(b >= a) && (a = b, i = m.captureIndices, c = m.ruleId, u = p.priority, a === s))
      break;
  }
  return i ? {
    priorityMatch: u === -1,
    captureIndices: i,
    matchedRuleId: c
  } : null;
}
function Ot(t, e, n, r, s) {
  return {
    ruleScanner: t.compileAG(e, n, r, s),
    findOptions: 0
    /* None */
  };
}
function $n(t, e, n, r, s) {
  return {
    ruleScanner: t.compileWhileAG(e, n, r, s),
    findOptions: 0
    /* None */
  };
}
function K(t, e, n, r, s, o, l) {
  if (o.length === 0)
    return;
  const a = e.content, i = Math.min(o.length, l.length), c = [], u = l[0].end;
  for (let h = 0; h < i; h++) {
    const f = o[h];
    if (f === null)
      continue;
    const g = l[h];
    if (g.length === 0)
      continue;
    if (g.start > u)
      break;
    for (; c.length > 0 && c[c.length - 1].endPos <= g.start; )
      s.produceFromScopes(c[c.length - 1].scopes, c[c.length - 1].endPos), c.pop();
    if (c.length > 0 ? s.produceFromScopes(c[c.length - 1].scopes, g.start) : s.produce(r, g.start), f.retokenizeCapturedWithRuleId) {
      const S = f.getName(a, l), _ = r.contentNameScopesList.pushAttributed(S, t), y = f.getContentName(a, l), m = _.pushAttributed(y, t), b = r.push(f.retokenizeCapturedWithRuleId, g.start, -1, !1, null, _, m), A = t.createOnigString(a.substring(0, g.end));
      Et(
        t,
        A,
        n && g.start === 0,
        g.start,
        b,
        s,
        !1,
        /* no time limit */
        0
      ), Nt(A);
      continue;
    }
    const p = f.getName(a, l);
    if (p !== null) {
      const _ = (c.length > 0 ? c[c.length - 1].scopes : r.contentNameScopesList).pushAttributed(p, t);
      c.push(new jn(_, g.end));
    }
  }
  for (; c.length > 0; )
    s.produceFromScopes(c[c.length - 1].scopes, c[c.length - 1].endPos), c.pop();
}
var jn = class {
  scopes;
  endPos;
  constructor(t, e) {
    this.scopes = t, this.endPos = e;
  }
};
function Fn(t, e, n, r, s, o, l, a) {
  return new zn(
    t,
    e,
    n,
    r,
    s,
    o,
    l,
    a
  );
}
function st(t, e, n, r, s) {
  const o = ie(e, ue), l = It.getCompiledRuleId(n, r, s.repository);
  for (const a of o)
    t.push({
      debugSelector: e,
      matcher: a.matcher,
      ruleId: l,
      grammar: s,
      priority: a.priority
    });
}
function ue(t, e) {
  if (e.length < t.length)
    return !1;
  let n = 0;
  return t.every((r) => {
    for (let s = n; s < e.length; s++)
      if (Wn(e[s], r))
        return n = s + 1, !0;
    return !1;
  });
}
function Wn(t, e) {
  if (!t)
    return !1;
  if (t === e)
    return !0;
  const n = e.length;
  return t.length > n && t.substr(0, n) === e && t[n] === ".";
}
var zn = class {
  constructor(t, e, n, r, s, o, l, a) {
    if (this._rootScopeName = t, this.balancedBracketSelectors = o, this._onigLib = a, this._basicScopeAttributesProvider = new En(
      n,
      r
    ), this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = l, this._grammar = ot(e, null), this._injections = null, this._tokenTypeMatchers = [], s)
      for (const i of Object.keys(s)) {
        const c = ie(i, ue);
        for (const u of c)
          this._tokenTypeMatchers.push({
            matcher: u.matcher,
            type: s[i]
          });
      }
  }
  _rootId;
  _lastRuleId;
  _ruleId2desc;
  _includedGrammars;
  _grammarRepository;
  _grammar;
  _injections;
  _basicScopeAttributesProvider;
  _tokenTypeMatchers;
  get themeProvider() {
    return this._grammarRepository;
  }
  dispose() {
    for (const t of this._ruleId2desc)
      t && t.dispose();
  }
  createOnigScanner(t) {
    return this._onigLib.createOnigScanner(t);
  }
  createOnigString(t) {
    return this._onigLib.createOnigString(t);
  }
  getMetadataForScope(t) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(t);
  }
  _collectInjections() {
    const t = {
      lookup: (s) => s === this._rootScopeName ? this._grammar : this.getExternalGrammar(s),
      injections: (s) => this._grammarRepository.injections(s)
    }, e = [], n = this._rootScopeName, r = t.lookup(n);
    if (r) {
      const s = r.injections;
      if (s)
        for (let l in s)
          st(
            e,
            l,
            s[l],
            this,
            r
          );
      const o = this._grammarRepository.injections(n);
      o && o.forEach((l) => {
        const a = this.getExternalGrammar(l);
        if (a) {
          const i = a.injectionSelector;
          i && st(
            e,
            i,
            a,
            this,
            a
          );
        }
      });
    }
    return e.sort((s, o) => s.priority - o.priority), e;
  }
  getInjections() {
    return this._injections === null && (this._injections = this._collectInjections()), this._injections;
  }
  registerRule(t) {
    const e = ++this._lastRuleId, n = t(e);
    return this._ruleId2desc[e] = n, n;
  }
  getRule(t) {
    return this._ruleId2desc[t];
  }
  getExternalGrammar(t, e) {
    if (this._includedGrammars[t])
      return this._includedGrammars[t];
    if (this._grammarRepository) {
      const n = this._grammarRepository.lookup(t);
      if (n)
        return this._includedGrammars[t] = ot(
          n,
          e && e.$base
        ), this._includedGrammars[t];
    }
  }
  tokenizeLine(t, e, n = 0) {
    const r = this._tokenize(t, e, !1, n);
    return {
      tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  tokenizeLine2(t, e, n = 0) {
    const r = this._tokenize(t, e, !0, n);
    return {
      tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  _tokenize(t, e, n, r) {
    this._rootId === -1 && (this._rootId = It.getCompiledRuleId(
      this._grammar.repository.$self,
      this,
      this._grammar.repository
    ), this.getInjections());
    let s;
    if (!e || e === Me.NULL) {
      s = !0;
      const c = this._basicScopeAttributesProvider.getDefaultAttributes(), u = this.themeProvider.getDefaults(), h = U.set(
        0,
        c.languageId,
        c.tokenType,
        null,
        u.fontStyle,
        u.foregroundId,
        u.backgroundId
      ), f = this.getRule(this._rootId).getName(
        null,
        null
      );
      let g;
      f ? g = V.createRootAndLookUpScopeName(
        f,
        h,
        this
      ) : g = V.createRoot(
        "unknown",
        h
      ), e = new Me(
        null,
        this._rootId,
        -1,
        -1,
        !1,
        null,
        g,
        g
      );
    } else
      s = !1, e.reset();
    t = t + `
`;
    const o = this.createOnigString(t), l = o.content.length, a = new qn(
      n,
      t,
      this._tokenTypeMatchers,
      this.balancedBracketSelectors
    ), i = Et(
      this,
      o,
      s,
      0,
      e,
      a,
      !0,
      r
    );
    return Nt(o), {
      lineLength: l,
      lineTokens: a,
      ruleStack: i.stack,
      stoppedEarly: i.stoppedEarly
    };
  }
};
function ot(t, e) {
  return t = an(t), t.repository = t.repository || {}, t.repository.$self = {
    $vscodeTextmateLocation: t.$vscodeTextmateLocation,
    patterns: t.patterns,
    name: t.scopeName
  }, t.repository.$base = e || t.repository.$self, t;
}
var V = class O {
  /**
   * Invariant:
   * ```
   * if (parent && !scopePath.extends(parent.scopePath)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, n, r) {
    this.parent = e, this.scopePath = n, this.tokenAttributes = r;
  }
  static fromExtension(e, n) {
    let r = e, s = e?.scopePath ?? null;
    for (const o of n)
      s = ke.push(s, o.scopeNames), r = new O(r, s, o.encodedTokenAttributes);
    return r;
  }
  static createRoot(e, n) {
    return new O(null, new ke(null, e), n);
  }
  static createRootAndLookUpScopeName(e, n, r) {
    const s = r.getMetadataForScope(e), o = new ke(null, e), l = r.themeProvider.themeMatch(o), a = O.mergeAttributes(
      n,
      s,
      l
    );
    return new O(null, o, a);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(e) {
    return O.equals(this, e);
  }
  static equals(e, n) {
    do {
      if (e === n || !e && !n)
        return !0;
      if (!e || !n || e.scopeName !== n.scopeName || e.tokenAttributes !== n.tokenAttributes)
        return !1;
      e = e.parent, n = n.parent;
    } while (!0);
  }
  static mergeAttributes(e, n, r) {
    let s = -1, o = 0, l = 0;
    return r !== null && (s = r.fontStyle, o = r.foregroundId, l = r.backgroundId), U.set(
      e,
      n.languageId,
      n.tokenType,
      null,
      s,
      o,
      l
    );
  }
  pushAttributed(e, n) {
    if (e === null)
      return this;
    if (e.indexOf(" ") === -1)
      return O._pushAttributed(this, e, n);
    const r = e.split(/ /g);
    let s = this;
    for (const o of r)
      s = O._pushAttributed(s, o, n);
    return s;
  }
  static _pushAttributed(e, n, r) {
    const s = r.getMetadataForScope(n), o = e.scopePath.push(n), l = r.themeProvider.themeMatch(o), a = O.mergeAttributes(
      e.tokenAttributes,
      s,
      l
    );
    return new O(e, o, a);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(e) {
    const n = [];
    let r = this;
    for (; r && r !== e; )
      n.push({
        encodedTokenAttributes: r.tokenAttributes,
        scopeNames: r.scopePath.getExtensionIfDefined(r.parent?.scopePath ?? null)
      }), r = r.parent;
    return r === e ? n.reverse() : void 0;
  }
}, Me = class D {
  /**
   * Invariant:
   * ```
   * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
   * 	throw new Error();
   * }
   * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, n, r, s, o, l, a, i) {
    this.parent = e, this.ruleId = n, this.beginRuleCapturedEOL = o, this.endRule = l, this.nameScopesList = a, this.contentNameScopesList = i, this.depth = this.parent ? this.parent.depth + 1 : 1, this._enterPos = r, this._anchorPos = s;
  }
  _stackElementBrand = void 0;
  // TODO remove me
  static NULL = new D(
    null,
    0,
    0,
    0,
    !1,
    null,
    null,
    null
  );
  /**
   * The position on the current line where this state was pushed.
   * This is relevant only while tokenizing a line, to detect endless loops.
   * Its value is meaningless across lines.
   */
  _enterPos;
  /**
   * The captured anchor position when this stack element was pushed.
   * This is relevant only while tokenizing a line, to restore the anchor position when popping.
   * Its value is meaningless across lines.
   */
  _anchorPos;
  /**
   * The depth of the stack.
   */
  depth;
  equals(e) {
    return e === null ? !1 : D._equals(this, e);
  }
  static _equals(e, n) {
    return e === n ? !0 : this._structuralEquals(e, n) ? V.equals(e.contentNameScopesList, n.contentNameScopesList) : !1;
  }
  /**
   * A structural equals check. Does not take into account `scopes`.
   */
  static _structuralEquals(e, n) {
    do {
      if (e === n || !e && !n)
        return !0;
      if (!e || !n || e.depth !== n.depth || e.ruleId !== n.ruleId || e.endRule !== n.endRule)
        return !1;
      e = e.parent, n = n.parent;
    } while (!0);
  }
  clone() {
    return this;
  }
  static _reset(e) {
    for (; e; )
      e._enterPos = -1, e._anchorPos = -1, e = e.parent;
  }
  reset() {
    D._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    return this.parent ? this.parent : this;
  }
  push(e, n, r, s, o, l, a) {
    return new D(
      this,
      e,
      n,
      r,
      s,
      o,
      l,
      a
    );
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(e) {
    return e.getRule(this.ruleId);
  }
  toString() {
    const e = [];
    return this._writeString(e, 0), "[" + e.join(",") + "]";
  }
  _writeString(e, n) {
    return this.parent && (n = this.parent._writeString(e, n)), e[n++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`, n;
  }
  withContentNameScopesList(e) {
    return this.contentNameScopesList === e ? this : this.parent.push(
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      this.endRule,
      this.nameScopesList,
      e
    );
  }
  withEndRule(e) {
    return this.endRule === e ? this : new D(
      this.parent,
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      e,
      this.nameScopesList,
      this.contentNameScopesList
    );
  }
  // Used to warn of endless loops
  hasSameRuleAs(e) {
    let n = this;
    for (; n && n._enterPos === e._enterPos; ) {
      if (n.ruleId === e.ruleId)
        return !0;
      n = n.parent;
    }
    return !1;
  }
  toStateStackFrame() {
    return {
      ruleId: this.ruleId,
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
      contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? []
    };
  }
  static pushFrame(e, n) {
    const r = V.fromExtension(e?.nameScopesList ?? null, n.nameScopesList);
    return new D(
      e,
      n.ruleId,
      n.enterPos ?? -1,
      n.anchorPos ?? -1,
      n.beginRuleCapturedEOL,
      n.endRule,
      r,
      V.fromExtension(r, n.contentNameScopesList)
    );
  }
}, Un = class {
  balancedBracketScopes;
  unbalancedBracketScopes;
  allowAny = !1;
  constructor(t, e) {
    this.balancedBracketScopes = t.flatMap(
      (n) => n === "*" ? (this.allowAny = !0, []) : ie(n, ue).map((r) => r.matcher)
    ), this.unbalancedBracketScopes = e.flatMap(
      (n) => ie(n, ue).map((r) => r.matcher)
    );
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(t) {
    for (const e of this.unbalancedBracketScopes)
      if (e(t))
        return !1;
    for (const e of this.balancedBracketScopes)
      if (e(t))
        return !0;
    return this.allowAny;
  }
}, qn = class {
  constructor(t, e, n, r) {
    this.balancedBracketSelectors = r, this._emitBinaryTokens = t, this._tokenTypeOverrides = n, this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
  }
  _emitBinaryTokens;
  /**
   * defined only if `false`.
   */
  _lineText;
  /**
   * used only if `_emitBinaryTokens` is false.
   */
  _tokens;
  /**
   * used only if `_emitBinaryTokens` is true.
   */
  _binaryTokens;
  _lastTokenEndIndex;
  _tokenTypeOverrides;
  produce(t, e) {
    this.produceFromScopes(t.contentNameScopesList, e);
  }
  produceFromScopes(t, e) {
    if (this._lastTokenEndIndex >= e)
      return;
    if (this._emitBinaryTokens) {
      let r = t?.tokenAttributes ?? 0, s = !1;
      if (this.balancedBracketSelectors?.matchesAlways && (s = !0), this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const o = t?.getScopeNames() ?? [];
        for (const l of this._tokenTypeOverrides)
          l.matcher(o) && (r = U.set(
            r,
            0,
            l.type,
            null,
            -1,
            0,
            0
          ));
        this.balancedBracketSelectors && (s = this.balancedBracketSelectors.match(o));
      }
      if (s && (r = U.set(
        r,
        0,
        8,
        s,
        -1,
        0,
        0
      )), this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === r) {
        this._lastTokenEndIndex = e;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(r), this._lastTokenEndIndex = e;
      return;
    }
    const n = t?.getScopeNames() ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex: e,
      // value: lineText.substring(lastTokenEndIndex, endIndex),
      scopes: n
    }), this._lastTokenEndIndex = e;
  }
  getResult(t, e) {
    return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === e - 1 && this._tokens.pop(), this._tokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(t, e), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
  }
  getBinaryResult(t, e) {
    this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === e - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), this._binaryTokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(t, e), this._binaryTokens[this._binaryTokens.length - 2] = 0);
    const n = new Uint32Array(this._binaryTokens.length);
    for (let r = 0, s = this._binaryTokens.length; r < s; r++)
      n[r] = this._binaryTokens[r];
    return n;
  }
}, Hn = class {
  constructor(t, e) {
    this._onigLib = e, this._theme = t;
  }
  _grammars = /* @__PURE__ */ new Map();
  _rawGrammars = /* @__PURE__ */ new Map();
  _injectionGrammars = /* @__PURE__ */ new Map();
  _theme;
  dispose() {
    for (const t of this._grammars.values())
      t.dispose();
  }
  setTheme(t) {
    this._theme = t;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  /**
   * Add `grammar` to registry and return a list of referenced scope names
   */
  addGrammar(t, e) {
    this._rawGrammars.set(t.scopeName, t), e && this._injectionGrammars.set(t.scopeName, e);
  }
  /**
   * Lookup a raw grammar.
   */
  lookup(t) {
    return this._rawGrammars.get(t);
  }
  /**
   * Returns the injections for the given grammar
   */
  injections(t) {
    return this._injectionGrammars.get(t);
  }
  /**
   * Get the default theme settings
   */
  getDefaults() {
    return this._theme.getDefaults();
  }
  /**
   * Match a scope in the theme.
   */
  themeMatch(t) {
    return this._theme.match(t);
  }
  /**
   * Lookup a grammar.
   */
  grammarForScopeName(t, e, n, r, s) {
    if (!this._grammars.has(t)) {
      let o = this._rawGrammars.get(t);
      if (!o)
        return null;
      this._grammars.set(t, Fn(
        t,
        o,
        e,
        n,
        r,
        s,
        this,
        this._onigLib
      ));
    }
    return this._grammars.get(t);
  }
}, Kn = class {
  _options;
  _syncRegistry;
  _ensureGrammarCache;
  constructor(e) {
    this._options = e, this._syncRegistry = new Hn(
      le.createFromRawTheme(e.theme, e.colorMap),
      e.onigLib
    ), this._ensureGrammarCache = /* @__PURE__ */ new Map();
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  /**
   * Change the theme. Once called, no previous `ruleStack` should be used anymore.
   */
  setTheme(e, n) {
    this._syncRegistry.setTheme(le.createFromRawTheme(e, n));
  }
  /**
   * Returns a lookup array for color ids.
   */
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithEmbeddedLanguages(e, n, r) {
    return this.loadGrammarWithConfiguration(e, n, { embeddedLanguages: r });
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithConfiguration(e, n, r) {
    return this._loadGrammar(
      e,
      n,
      r.embeddedLanguages,
      r.tokenTypes,
      new Un(
        r.balancedBracketSelectors || [],
        r.unbalancedBracketSelectors || []
      )
    );
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   */
  loadGrammar(e) {
    return this._loadGrammar(e, 0, null, null, null);
  }
  _loadGrammar(e, n, r, s, o) {
    const l = new wn(this._syncRegistry, e);
    for (; l.Q.length > 0; )
      l.Q.map((a) => this._loadSingleGrammar(a.scopeName)), l.processQueue();
    return this._grammarForScopeName(
      e,
      n,
      r,
      s,
      o
    );
  }
  _loadSingleGrammar(e) {
    this._ensureGrammarCache.has(e) || (this._doLoadSingleGrammar(e), this._ensureGrammarCache.set(e, !0));
  }
  _doLoadSingleGrammar(e) {
    const n = this._options.loadGrammar(e);
    if (n) {
      const r = typeof this._options.getInjections == "function" ? this._options.getInjections(e) : void 0;
      this._syncRegistry.addGrammar(n, r);
    }
  }
  /**
   * Adds a rawGrammar.
   */
  addGrammar(e, n = [], r = 0, s = null) {
    return this._syncRegistry.addGrammar(e, n), this._grammarForScopeName(e.scopeName, r, s);
  }
  /**
   * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
   */
  _grammarForScopeName(e, n = 0, r = null, s = null, o = null) {
    return this._syncRegistry.grammarForScopeName(
      e,
      n,
      r,
      s,
      o
    );
  }
}, Be = Me.NULL;
function he(t, e) {
  const n = typeof t == "string" ? {} : { ...t.colorReplacements }, r = typeof t == "string" ? t : t.name;
  for (const [s, o] of Object.entries(e?.colorReplacements || {})) typeof o == "string" ? n[s] = o : s === r && Object.assign(n, o);
  return n;
}
function B(t, e) {
  return t && (e?.[t?.toLowerCase()] || t);
}
function Vn(t) {
  return Array.isArray(t) ? t : [t];
}
async function Mt(t) {
  return Promise.resolve(typeof t == "function" ? t() : t).then((e) => e.default || e);
}
function me(t) {
  return !t || [
    "plaintext",
    "txt",
    "text",
    "plain"
  ].includes(t);
}
function Yn(t) {
  return t === "ansi" || me(t);
}
function ye(t) {
  return t === "none";
}
function Xn(t) {
  return ye(t);
}
function _e(t, e = !1) {
  if (t.length === 0) return [["", 0]];
  const n = t.split(/(\r?\n)/g);
  let r = 0;
  const s = [];
  for (let o = 0; o < n.length; o += 2) {
    const l = e ? n[o] + (n[o + 1] || "") : n[o];
    s.push([l, r]), r += n[o].length, r += n[o + 1]?.length || 0;
  }
  return s;
}
const lt = {
  light: "#333333",
  dark: "#bbbbbb"
}, it = {
  light: "#fffffe",
  dark: "#1e1e1e"
}, at = "__shiki_resolved";
function ze(t) {
  if (t?.[at]) return t;
  const e = { ...t };
  e.tokenColors && !e.settings && (e.settings = e.tokenColors, delete e.tokenColors), e.type ||= "dark", e.colorReplacements = { ...e.colorReplacements }, e.settings ||= [];
  let { bg: n, fg: r } = e;
  if (!n || !r) {
    const a = e.settings ? e.settings.find((i) => !i.name && !i.scope) : void 0;
    a?.settings?.foreground && (r = a.settings.foreground), a?.settings?.background && (n = a.settings.background), !r && e?.colors?.["editor.foreground"] && (r = e.colors["editor.foreground"]), !n && e?.colors?.["editor.background"] && (n = e.colors["editor.background"]), r || (r = e.type === "light" ? lt.light : lt.dark), n || (n = e.type === "light" ? it.light : it.dark), e.fg = r, e.bg = n;
  }
  e.settings[0] && e.settings[0].settings && !e.settings[0].scope || e.settings.unshift({ settings: {
    foreground: e.fg,
    background: e.bg
  } });
  let s = 0;
  const o = /* @__PURE__ */ new Map();
  function l(a) {
    if (o.has(a)) return o.get(a);
    s += 1;
    const i = `#${s.toString(16).padStart(8, "0").toLowerCase()}`;
    return e.colorReplacements?.[`#${i}`] ? l(a) : (o.set(a, i), i);
  }
  e.settings = e.settings.map((a) => {
    const i = a.settings?.foreground && !a.settings.foreground.startsWith("#"), c = a.settings?.background && !a.settings.background.startsWith("#");
    if (!i && !c) return a;
    const u = {
      ...a,
      settings: { ...a.settings }
    };
    if (i) {
      const h = l(a.settings.foreground);
      e.colorReplacements[h] = a.settings.foreground, u.settings.foreground = h;
    }
    if (c) {
      const h = l(a.settings.background);
      e.colorReplacements[h] = a.settings.background, u.settings.background = h;
    }
    return u;
  });
  for (const a of Object.keys(e.colors || {})) if ((a === "editor.foreground" || a === "editor.background" || a.startsWith("terminal.ansi")) && !e.colors[a]?.startsWith("#")) {
    const i = l(e.colors[a]);
    e.colorReplacements[i] = e.colors[a], e.colors[a] = i;
  }
  return Object.defineProperty(e, at, {
    enumerable: !1,
    writable: !1,
    value: !0
  }), e;
}
async function Bt(t) {
  return Array.from(new Set((await Promise.all(t.filter((e) => !Yn(e)).map(async (e) => await Mt(e).then((n) => Array.isArray(n) ? n : [n])))).flat()));
}
async function Gt(t) {
  return (await Promise.all(t.map(async (e) => Xn(e) ? null : ze(await Mt(e))))).filter((e) => !!e);
}
function Dt(t, e) {
  if (!e) return t;
  if (e[t]) {
    const n = /* @__PURE__ */ new Set([t]);
    for (; e[t]; ) {
      if (t = e[t], n.has(t)) throw new v(`Circular alias \`${Array.from(n).join(" -> ")} -> ${t}\``);
      n.add(t);
    }
  }
  return t;
}
var Jn = class extends Kn {
  _resolvedThemes = /* @__PURE__ */ new Map();
  _resolvedGrammars = /* @__PURE__ */ new Map();
  _langMap = /* @__PURE__ */ new Map();
  _langGraph = /* @__PURE__ */ new Map();
  _textmateThemeCache = /* @__PURE__ */ new WeakMap();
  _loadedThemesCache = null;
  _loadedLanguagesCache = null;
  constructor(t, e, n, r = {}) {
    super(t), this._resolver = t, this._themes = e, this._langs = n, this._alias = r, this._themes.map((s) => this.loadTheme(s)), this.loadLanguages(this._langs);
  }
  getTheme(t) {
    return typeof t == "string" ? this._resolvedThemes.get(t) : this.loadTheme(t);
  }
  loadTheme(t) {
    const e = ze(t);
    return e.name && (this._resolvedThemes.set(e.name, e), this._loadedThemesCache = null), e;
  }
  getLoadedThemes() {
    return this._loadedThemesCache || (this._loadedThemesCache = [...this._resolvedThemes.keys()]), this._loadedThemesCache;
  }
  setTheme(t) {
    let e = this._textmateThemeCache.get(t);
    e || (e = le.createFromRawTheme(t), this._textmateThemeCache.set(t, e)), this._syncRegistry.setTheme(e);
  }
  getGrammar(t) {
    return t = Dt(t, this._alias), this._resolvedGrammars.get(t);
  }
  loadLanguage(t) {
    if (this.getGrammar(t.name)) return;
    const e = new Set([...this._langMap.values()].filter((s) => s.embeddedLangsLazy?.includes(t.name)));
    this._resolver.addLanguage(t);
    const n = {
      balancedBracketSelectors: t.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: t.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(t.scopeName, t);
    const r = this.loadGrammarWithConfiguration(t.scopeName, 1, n);
    if (r.name = t.name, this._resolvedGrammars.set(t.name, r), t.aliases && t.aliases.forEach((s) => {
      this._alias[s] = t.name;
    }), this._loadedLanguagesCache = null, e.size) for (const s of e)
      this._resolvedGrammars.delete(s.name), this._loadedLanguagesCache = null, this._syncRegistry?._injectionGrammars?.delete(s.scopeName), this._syncRegistry?._grammars?.delete(s.scopeName), this.loadLanguage(this._langMap.get(s.name));
  }
  dispose() {
    super.dispose(), this._resolvedThemes.clear(), this._resolvedGrammars.clear(), this._langMap.clear(), this._langGraph.clear(), this._loadedThemesCache = null;
  }
  loadLanguages(t) {
    for (const r of t) this.resolveEmbeddedLanguages(r);
    const e = Array.from(this._langGraph.entries()), n = e.filter(([r, s]) => !s);
    if (n.length) {
      const r = e.filter(([s, o]) => o ? (o.embeddedLanguages || o.embeddedLangs)?.some((l) => n.map(([a]) => a).includes(l)) : !1).filter((s) => !n.includes(s));
      throw new v(`Missing languages ${n.map(([s]) => `\`${s}\``).join(", ")}, required by ${r.map(([s]) => `\`${s}\``).join(", ")}`);
    }
    for (const [r, s] of e) this._resolver.addLanguage(s);
    for (const [r, s] of e) this.loadLanguage(s);
  }
  getLoadedLanguages() {
    return this._loadedLanguagesCache || (this._loadedLanguagesCache = [.../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])]), this._loadedLanguagesCache;
  }
  resolveEmbeddedLanguages(t) {
    this._langMap.set(t.name, t), this._langGraph.set(t.name, t);
    const e = t.embeddedLanguages ?? t.embeddedLangs;
    if (e) for (const n of e) this._langGraph.set(n, this._langMap.get(n));
  }
}, Qn = class {
  _langs = /* @__PURE__ */ new Map();
  _scopeToLang = /* @__PURE__ */ new Map();
  _injections = /* @__PURE__ */ new Map();
  _onigLib;
  constructor(t, e) {
    this._onigLib = {
      createOnigScanner: (n) => t.createScanner(n),
      createOnigString: (n) => t.createString(n)
    }, e.forEach((n) => this.addLanguage(n));
  }
  get onigLib() {
    return this._onigLib;
  }
  getLangRegistration(t) {
    return this._langs.get(t);
  }
  loadGrammar(t) {
    return this._scopeToLang.get(t);
  }
  addLanguage(t) {
    this._langs.set(t.name, t), t.aliases && t.aliases.forEach((e) => {
      this._langs.set(e, t);
    }), this._scopeToLang.set(t.scopeName, t), t.injectTo && t.injectTo.forEach((e) => {
      this._injections.get(e) || this._injections.set(e, []), this._injections.get(e).push(t.scopeName);
    });
  }
  getInjections(t) {
    const e = t.split(".");
    let n = [];
    for (let r = 1; r <= e.length; r++) {
      const s = e.slice(0, r).join(".");
      n = [...n, ...this._injections.get(s) || []];
    }
    return n;
  }
};
let H = 0;
function Zn(t) {
  H += 1, t.warnings !== !1 && H >= 10 && H % 10 === 0 && console.warn(`[Shiki] ${H} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
  let e = !1;
  if (!t.engine) throw new v("`engine` option is required for synchronous mode");
  const n = (t.langs || []).flat(1), r = (t.themes || []).flat(1).map(ze), s = new Jn(new Qn(t.engine, n), r, n, t.langAlias);
  let o;
  function l(m) {
    return Dt(m, t.langAlias);
  }
  function a(m) {
    _();
    const b = s.getGrammar(typeof m == "string" ? m : m.name);
    if (!b) throw new v(`Language \`${m}\` not found, you may need to load it first`);
    return b;
  }
  function i(m) {
    if (m === "none") return {
      bg: "",
      fg: "",
      name: "none",
      settings: [],
      type: "dark"
    };
    _();
    const b = s.getTheme(m);
    if (!b) throw new v(`Theme \`${m}\` not found, you may need to load it first`);
    return b;
  }
  function c(m) {
    _();
    const b = i(m);
    return o !== m && (s.setTheme(b), o = m), {
      theme: b,
      colorMap: s.getColorMap()
    };
  }
  function u() {
    return _(), s.getLoadedThemes();
  }
  function h() {
    return _(), s.getLoadedLanguages();
  }
  function f(...m) {
    _(), s.loadLanguages(m.flat(1));
  }
  async function g(...m) {
    return f(await Bt(m));
  }
  function p(...m) {
    _();
    for (const b of m.flat(1)) s.loadTheme(b);
  }
  async function S(...m) {
    return _(), p(await Gt(m));
  }
  function _() {
    if (e) throw new v("Shiki instance has been disposed");
  }
  function y() {
    e || (e = !0, s.dispose(), H -= 1);
  }
  return {
    setTheme: c,
    getTheme: i,
    getLanguage: a,
    getLoadedThemes: u,
    getLoadedLanguages: h,
    resolveLangAlias: l,
    loadLanguage: g,
    loadLanguageSync: f,
    loadTheme: S,
    loadThemeSync: p,
    dispose: y,
    [Symbol.dispose]: y
  };
}
async function er(t) {
  t.engine || console.warn("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
  const [e, n, r] = await Promise.all([
    Gt(t.themes || []),
    Bt(t.langs || []),
    t.engine
  ]);
  return Zn({
    ...t,
    themes: e,
    langs: n,
    engine: r
  });
}
const $t = /* @__PURE__ */ new WeakMap();
function be(t, e) {
  $t.set(t, e);
}
function Q(t) {
  return $t.get(t);
}
var Se = class jt {
  /**
  * Theme to Stack mapping
  */
  _stacks = {};
  lang;
  get themes() {
    return Object.keys(this._stacks);
  }
  get theme() {
    return this.themes[0];
  }
  get _stack() {
    return this._stacks[this.theme];
  }
  /**
  * Static method to create a initial grammar state.
  */
  static initial(e, n) {
    return new jt(Object.fromEntries(Vn(n).map((r) => [r, Be])), e);
  }
  constructor(...e) {
    if (e.length === 2) {
      const [n, r] = e;
      this.lang = r, this._stacks = n;
    } else {
      const [n, r, s] = e;
      this.lang = r, this._stacks = { [s]: n };
    }
  }
  /**
  * Get the internal stack object.
  * @internal
  */
  getInternalStack(e = this.theme) {
    return this._stacks[e];
  }
  getScopes(e = this.theme) {
    return tr(this._stacks[e]);
  }
  toJSON() {
    return {
      lang: this.lang,
      theme: this.theme,
      themes: this.themes,
      scopes: this.getScopes()
    };
  }
};
function tr(t) {
  const e = [], n = /* @__PURE__ */ new Set();
  function r(s) {
    if (n.has(s)) return;
    n.add(s);
    const o = s?.nameScopesList?.scopeName;
    o && e.push(o), s.parent && r(s.parent);
  }
  return r(t), e;
}
function nr(t, e) {
  if (!(t instanceof Se)) throw new v("Invalid grammar state");
  return t.getInternalStack(e);
}
function Ft(t, e, n = {}) {
  const { theme: r = t.getLoadedThemes()[0] } = n;
  if (me(t.resolveLangAlias(n.lang || "text")) || ye(r)) return _e(e).map((a) => [{
    content: a[0],
    offset: a[1]
  }]);
  const { theme: s, colorMap: o } = t.setTheme(r), l = t.getLanguage(n.lang || "text");
  if (n.grammarState) {
    if (n.grammarState.lang !== l.name) throw new v(`Grammar state language "${n.grammarState.lang}" does not match highlight language "${l.name}"`);
    if (!n.grammarState.themes.includes(s.name)) throw new v(`Grammar state themes "${n.grammarState.themes}" do not contain highlight theme "${s.name}"`);
  }
  return sr(e, l, s, o, n);
}
function rr(...t) {
  if (t.length === 2) return Q(t[1]);
  const [e, n, r = {}] = t, { lang: s = "text", theme: o = e.getLoadedThemes()[0] } = r;
  if (me(s) || ye(o)) throw new v("Plain language does not have grammar state");
  if (s === "ansi") throw new v("ANSI language does not have grammar state");
  const { theme: l, colorMap: a } = e.setTheme(o), i = e.getLanguage(s);
  return new Se(Ue(n, i, l, a, r).stateStack, i.name, l.name);
}
function sr(t, e, n, r, s) {
  const o = Ue(t, e, n, r, s), l = new Se(o.stateStack, e.name, n.name);
  return be(o.tokens, l), o.tokens;
}
function Ue(t, e, n, r, s) {
  const o = he(n, s), { tokenizeMaxLineLength: l = 0, tokenizeTimeLimit: a = 500 } = s, i = _e(t);
  let c = s.grammarState ? nr(s.grammarState, n.name) ?? Be : s.grammarContextCode != null ? Ue(s.grammarContextCode, e, n, r, {
    ...s,
    grammarState: void 0,
    grammarContextCode: void 0
  }).stateStack : Be, u = [];
  const h = [];
  for (let f = 0, g = i.length; f < g; f++) {
    const [p, S] = i[f];
    if (p === "") {
      u = [], h.push([]);
      continue;
    }
    if (l > 0 && p.length >= l) {
      u = [], h.push([{
        content: p,
        offset: S,
        color: "",
        fontStyle: 0
      }]);
      continue;
    }
    let _, y, m;
    s.includeExplanation && (_ = e.tokenizeLine(p, c, a), y = _.tokens, m = 0);
    const b = e.tokenizeLine2(p, c, a), A = b.tokens.length / 2;
    for (let k = 0; k < A; k++) {
      const E = b.tokens[2 * k], G = k + 1 < A ? b.tokens[2 * k + 2] : p.length;
      if (E === G) continue;
      const Ye = b.tokens[2 * k + 1], on = B(r[U.getForeground(Ye)], o), ln = U.getFontStyle(Ye), Ce = {
        content: p.substring(E, G),
        offset: S + E,
        color: on,
        fontStyle: ln
      };
      if (s.includeExplanation) {
        const Xe = [];
        if (s.includeExplanation !== "scopeName") for (const M of n.settings) {
          let F;
          switch (typeof M.scope) {
            case "string":
              F = M.scope.split(/,/).map((we) => we.trim());
              break;
            case "object":
              F = M.scope;
              break;
            default:
              continue;
          }
          Xe.push({
            settings: M,
            selectors: F.map((we) => we.split(/ /))
          });
        }
        Ce.explanation = [];
        let Je = 0;
        for (; E + Je < G; ) {
          const M = y[m], F = p.substring(M.startIndex, M.endIndex);
          Je += F.length, Ce.explanation.push({
            content: F,
            scopes: s.includeExplanation === "scopeName" ? or(M.scopes) : lr(Xe, M.scopes)
          }), m += 1;
        }
      }
      u.push(Ce);
    }
    h.push(u), u = [], c = b.ruleStack;
  }
  return {
    tokens: h,
    stateStack: c
  };
}
function or(t) {
  return t.map((e) => ({ scopeName: e }));
}
function lr(t, e) {
  const n = [];
  for (let r = 0, s = e.length; r < s; r++) {
    const o = e[r];
    n[r] = {
      scopeName: o,
      themeMatches: ar(t, o, e.slice(0, r))
    };
  }
  return n;
}
function ct(t, e) {
  return t === e || e.substring(0, t.length) === t && e[t.length] === ".";
}
function ir(t, e, n) {
  if (!ct(t[t.length - 1], e)) return !1;
  let r = t.length - 2, s = n.length - 1;
  for (; r >= 0 && s >= 0; )
    ct(t[r], n[s]) && (r -= 1), s -= 1;
  return r === -1;
}
function ar(t, e, n) {
  const r = [];
  for (const { selectors: s, settings: o } of t) for (const l of s) if (ir(l, e, n)) {
    r.push(o);
    break;
  }
  return r;
}
function Wt(t, e, n) {
  const r = Object.entries(n.themes).filter((i) => i[1]).map((i) => ({
    color: i[0],
    theme: i[1]
  })), s = r.map((i) => {
    const c = Ft(t, e, {
      ...n,
      theme: i.theme
    });
    return {
      tokens: c,
      state: Q(c),
      theme: typeof i.theme == "string" ? i.theme : i.theme.name
    };
  }), o = cr(...s.map((i) => i.tokens)), l = o[0].map((i, c) => i.map((u, h) => {
    const f = {
      content: u.content,
      variants: {},
      offset: u.offset
    };
    return "includeExplanation" in n && n.includeExplanation && (f.explanation = u.explanation), o.forEach((g, p) => {
      const { content: S, explanation: _, offset: y, ...m } = g[c][h];
      f.variants[r[p].color] = m;
    }), f;
  })), a = s[0].state ? new Se(Object.fromEntries(s.map((i) => [i.theme, i.state?.getInternalStack(i.theme)])), s[0].state.lang) : void 0;
  return a && be(l, a), l;
}
function cr(...t) {
  const e = t.map(() => []), n = t.length;
  for (let r = 0; r < t[0].length; r++) {
    const s = t.map((i) => i[r]), o = e.map(() => []);
    e.forEach((i, c) => i.push(o[c]));
    const l = s.map(() => 0), a = s.map((i) => i[0]);
    for (; a.every((i) => i); ) {
      const i = Math.min(...a.map((c) => c.content.length));
      for (let c = 0; c < n; c++) {
        const u = a[c];
        u.content.length === i ? (o[c].push(u), l[c] += 1, a[c] = s[c][l[c]]) : (o[c].push({
          ...u,
          content: u.content.slice(0, i)
        }), a[c] = {
          ...u,
          content: u.content.slice(i),
          offset: u.offset + i
        });
      }
    }
  }
  return e;
}
const ur = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
class ee {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(e, n, r) {
    this.normal = n, this.property = e, r && (this.space = r);
  }
}
ee.prototype.normal = {};
ee.prototype.property = {};
ee.prototype.space = void 0;
function zt(t, e) {
  const n = {}, r = {};
  for (const s of t)
    Object.assign(n, s.property), Object.assign(r, s.normal);
  return new ee(n, r, e);
}
function Ge(t) {
  return t.toLowerCase();
}
class P {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(e, n) {
    this.attribute = n, this.property = e;
  }
}
P.prototype.attribute = "";
P.prototype.booleanish = !1;
P.prototype.boolean = !1;
P.prototype.commaOrSpaceSeparated = !1;
P.prototype.commaSeparated = !1;
P.prototype.defined = !1;
P.prototype.mustUseProperty = !1;
P.prototype.number = !1;
P.prototype.overloadedBoolean = !1;
P.prototype.property = "";
P.prototype.spaceSeparated = !1;
P.prototype.space = void 0;
let hr = 0;
const C = j(), R = j(), De = j(), d = j(), w = j(), W = j(), I = j();
function j() {
  return 2 ** ++hr;
}
const $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: C,
  booleanish: R,
  commaOrSpaceSeparated: I,
  commaSeparated: W,
  number: d,
  overloadedBoolean: De,
  spaceSeparated: w
}, Symbol.toStringTag, { value: "Module" })), xe = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys($e)
);
class qe extends P {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(e, n, r, s) {
    let o = -1;
    if (super(e, n), ut(this, "space", s), typeof r == "number")
      for (; ++o < xe.length; ) {
        const l = xe[o];
        ut(this, xe[o], (r & $e[l]) === $e[l]);
      }
  }
}
qe.prototype.defined = !0;
function ut(t, e, n) {
  n && (t[e] = n);
}
function q(t) {
  const e = {}, n = {};
  for (const [r, s] of Object.entries(t.properties)) {
    const o = new qe(
      r,
      t.transform(t.attributes || {}, r),
      s,
      t.space
    );
    t.mustUseProperty && t.mustUseProperty.includes(r) && (o.mustUseProperty = !0), e[r] = o, n[Ge(r)] = r, n[Ge(o.attribute)] = r;
  }
  return new ee(e, n, t.space);
}
const Ut = q({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: R,
    ariaAutoComplete: null,
    ariaBusy: R,
    ariaChecked: R,
    ariaColCount: d,
    ariaColIndex: d,
    ariaColSpan: d,
    ariaControls: w,
    ariaCurrent: null,
    ariaDescribedBy: w,
    ariaDetails: null,
    ariaDisabled: R,
    ariaDropEffect: w,
    ariaErrorMessage: null,
    ariaExpanded: R,
    ariaFlowTo: w,
    ariaGrabbed: R,
    ariaHasPopup: null,
    ariaHidden: R,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: w,
    ariaLevel: d,
    ariaLive: null,
    ariaModal: R,
    ariaMultiLine: R,
    ariaMultiSelectable: R,
    ariaOrientation: null,
    ariaOwns: w,
    ariaPlaceholder: null,
    ariaPosInSet: d,
    ariaPressed: R,
    ariaReadOnly: R,
    ariaRelevant: null,
    ariaRequired: R,
    ariaRoleDescription: w,
    ariaRowCount: d,
    ariaRowIndex: d,
    ariaRowSpan: d,
    ariaSelected: R,
    ariaSetSize: d,
    ariaSort: null,
    ariaValueMax: d,
    ariaValueMin: d,
    ariaValueNow: d,
    ariaValueText: null,
    role: null
  },
  transform(t, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function qt(t, e) {
  return e in t ? t[e] : e;
}
function Ht(t, e) {
  return qt(t, e.toLowerCase());
}
const dr = q({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: W,
    acceptCharset: w,
    accessKey: w,
    action: null,
    allow: null,
    allowFullScreen: C,
    allowPaymentRequest: C,
    allowUserMedia: C,
    alt: null,
    as: null,
    async: C,
    autoCapitalize: null,
    autoComplete: w,
    autoFocus: C,
    autoPlay: C,
    blocking: w,
    capture: null,
    charSet: null,
    checked: C,
    cite: null,
    className: w,
    cols: d,
    colSpan: null,
    content: null,
    contentEditable: R,
    controls: C,
    controlsList: w,
    coords: d | W,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: C,
    defer: C,
    dir: null,
    dirName: null,
    disabled: C,
    download: De,
    draggable: R,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: C,
    formTarget: null,
    headers: w,
    height: d,
    hidden: De,
    high: d,
    href: null,
    hrefLang: null,
    htmlFor: w,
    httpEquiv: w,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: C,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: C,
    itemId: null,
    itemProp: w,
    itemRef: w,
    itemScope: C,
    itemType: w,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: C,
    low: d,
    manifest: null,
    max: null,
    maxLength: d,
    media: null,
    method: null,
    min: null,
    minLength: d,
    multiple: C,
    muted: C,
    name: null,
    nonce: null,
    noModule: C,
    noValidate: C,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: C,
    optimum: d,
    pattern: null,
    ping: w,
    placeholder: null,
    playsInline: C,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: C,
    referrerPolicy: null,
    rel: w,
    required: C,
    reversed: C,
    rows: d,
    rowSpan: d,
    sandbox: w,
    scope: null,
    scoped: C,
    seamless: C,
    selected: C,
    shadowRootClonable: C,
    shadowRootDelegatesFocus: C,
    shadowRootMode: null,
    shape: null,
    size: d,
    sizes: null,
    slot: null,
    span: d,
    spellCheck: R,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: d,
    step: null,
    style: null,
    tabIndex: d,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: C,
    useMap: null,
    value: R,
    width: d,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: w,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: d,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: d,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: C,
    // Lists. Use CSS to reduce space between items instead
    declare: C,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: d,
    // `<img>` and `<object>`
    leftMargin: d,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: d,
    // `<body>`
    marginWidth: d,
    // `<body>`
    noResize: C,
    // `<frame>`
    noHref: C,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: C,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: C,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: d,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: R,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: d,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: d,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: C,
    disableRemotePlayback: C,
    prefix: null,
    property: null,
    results: d,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ht
}), fr = q({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: I,
    accentHeight: d,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: d,
    amplitude: d,
    arabicForm: null,
    ascent: d,
    attributeName: null,
    attributeType: null,
    azimuth: d,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: d,
    by: null,
    calcMode: null,
    capHeight: d,
    className: w,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: d,
    diffuseConstant: d,
    direction: null,
    display: null,
    dur: null,
    divisor: d,
    dominantBaseline: null,
    download: C,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: d,
    enableBackground: null,
    end: null,
    event: null,
    exponent: d,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: d,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: W,
    g2: W,
    glyphName: W,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: d,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: d,
    horizOriginX: d,
    horizOriginY: d,
    id: null,
    ideographic: d,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: d,
    k: d,
    k1: d,
    k2: d,
    k3: d,
    k4: d,
    kernelMatrix: I,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: d,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: d,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: d,
    overlineThickness: d,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: d,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: w,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: d,
    pointsAtY: d,
    pointsAtZ: d,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: I,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: I,
    rev: I,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: I,
    requiredFeatures: I,
    requiredFonts: I,
    requiredFormats: I,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: d,
    specularExponent: d,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: d,
    strikethroughThickness: d,
    string: null,
    stroke: null,
    strokeDashArray: I,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: d,
    strokeOpacity: d,
    strokeWidth: null,
    style: null,
    surfaceScale: d,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: I,
    tabIndex: d,
    tableValues: null,
    target: null,
    targetX: d,
    targetY: d,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: I,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: d,
    underlineThickness: d,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: d,
    values: null,
    vAlphabetic: d,
    vMathematical: d,
    vectorEffect: null,
    vHanging: d,
    vIdeographic: d,
    version: null,
    vertAdvY: d,
    vertOriginX: d,
    vertOriginY: d,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: d,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: qt
}), Kt = q({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(t, e) {
    return "xlink:" + e.slice(5).toLowerCase();
  }
}), Vt = q({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ht
}), Yt = q({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(t, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), pr = /[A-Z]/g, ht = /-[a-z]/g, gr = /^data[-\w.:]+$/i;
function mr(t, e) {
  const n = Ge(e);
  let r = e, s = P;
  if (n in t.normal)
    return t.property[t.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && gr.test(e)) {
    if (e.charAt(4) === "-") {
      const o = e.slice(5).replace(ht, _r);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = e.slice(4);
      if (!ht.test(o)) {
        let l = o.replace(pr, yr);
        l.charAt(0) !== "-" && (l = "-" + l), e = "data" + l;
      }
    }
    s = qe;
  }
  return new s(r, e);
}
function yr(t) {
  return "-" + t.toLowerCase();
}
function _r(t) {
  return t.charAt(1).toUpperCase();
}
const br = zt([Ut, dr, Kt, Vt, Yt], "html"), Xt = zt([Ut, fr, Kt, Vt, Yt], "svg"), dt = {}.hasOwnProperty;
function Sr(t, e) {
  const n = e || {};
  function r(s, ...o) {
    let l = r.invalid;
    const a = r.handlers;
    if (s && dt.call(s, t)) {
      const i = String(s[t]);
      l = dt.call(a, i) ? a[i] : r.unknown;
    }
    if (l)
      return l.call(this, s, ...o);
  }
  return r.handlers = n.handlers || {}, r.invalid = n.invalid, r.unknown = n.unknown, r;
}
const Cr = /["&'<>`]/g, wr = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, vr = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
), kr = /[|\\{}()[\]^$+*?.]/g, ft = /* @__PURE__ */ new WeakMap();
function Rr(t, e) {
  if (t = t.replace(
    e.subset ? xr(e.subset) : Cr,
    r
  ), e.subset || e.escapeOnly)
    return t;
  return t.replace(wr, n).replace(vr, r);
  function n(s, o, l) {
    return e.format(
      (s.charCodeAt(0) - 55296) * 1024 + s.charCodeAt(1) - 56320 + 65536,
      l.charCodeAt(o + 2),
      e
    );
  }
  function r(s, o, l) {
    return e.format(
      s.charCodeAt(0),
      l.charCodeAt(o + 1),
      e
    );
  }
}
function xr(t) {
  let e = ft.get(t);
  return e || (e = Ar(t), ft.set(t, e)), e;
}
function Ar(t) {
  const e = [];
  let n = -1;
  for (; ++n < t.length; )
    e.push(t[n].replace(kr, "\\$&"));
  return new RegExp("(?:" + e.join("|") + ")", "g");
}
const Nr = /[\dA-Fa-f]/;
function Tr(t, e, n) {
  const r = "&#x" + t.toString(16).toUpperCase();
  return n && e && !Nr.test(String.fromCharCode(e)) ? r : r + ";";
}
const Pr = /\d/;
function Ir(t, e, n) {
  const r = "&#" + String(t);
  return n && e && !Pr.test(String.fromCharCode(e)) ? r : r + ";";
}
const Lr = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], Ae = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
}, Er = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], Jt = {}.hasOwnProperty, je = {};
let ne;
for (ne in Ae)
  Jt.call(Ae, ne) && (je[Ae[ne]] = ne);
const Or = /[^\dA-Za-z]/;
function Mr(t, e, n, r) {
  const s = String.fromCharCode(t);
  if (Jt.call(je, s)) {
    const o = je[s], l = "&" + o;
    return n && Lr.includes(o) && !Er.includes(o) && (!r || e && e !== 61 && Or.test(String.fromCharCode(e))) ? l : l + ";";
  }
  return "";
}
function Br(t, e, n) {
  let r = Tr(t, e, n.omitOptionalSemicolons), s;
  if ((n.useNamedReferences || n.useShortestReferences) && (s = Mr(
    t,
    e,
    n.omitOptionalSemicolons,
    n.attribute
  )), (n.useShortestReferences || !s) && n.useShortestReferences) {
    const o = Ir(t, e, n.omitOptionalSemicolons);
    o.length < r.length && (r = o);
  }
  return s && (!n.useShortestReferences || s.length < r.length) ? s : r;
}
function z(t, e) {
  return Rr(t, Object.assign({ format: Br }, e));
}
const Gr = /^>|^->|<!--|-->|--!>|<!-$/g, Dr = [">"], $r = ["<", ">"];
function jr(t, e, n, r) {
  return r.settings.bogusComments ? "<?" + z(
    t.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: Dr
    })
  ) + ">" : "<!--" + t.value.replace(Gr, s) + "-->";
  function s(o) {
    return z(
      o,
      Object.assign({}, r.settings.characterReferences, {
        subset: $r
      })
    );
  }
}
function Fr(t, e, n, r) {
  return "<!" + (r.settings.upperDoctype ? "DOCTYPE" : "doctype") + (r.settings.tightDoctype ? "" : " ") + "html>";
}
function pt(t, e) {
  const n = String(t);
  if (typeof e != "string")
    throw new TypeError("Expected character");
  let r = 0, s = n.indexOf(e);
  for (; s !== -1; )
    r++, s = n.indexOf(e, s + e.length);
  return r;
}
function Wr(t, e) {
  const n = e || {};
  return (t[t.length - 1] === "" ? [...t, ""] : t).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
function zr(t) {
  return t.join(" ").trim();
}
const Ur = /[ \t\n\f\r]/g;
function He(t) {
  return typeof t == "object" ? t.type === "text" ? gt(t.value) : !1 : gt(t);
}
function gt(t) {
  return t.replace(Ur, "") === "";
}
const x = Zt(1), Qt = Zt(-1), qr = [];
function Zt(t) {
  return e;
  function e(n, r, s) {
    const o = n ? n.children : qr;
    let l = (r || 0) + t, a = o[l];
    if (!s)
      for (; a && He(a); )
        l += t, a = o[l];
    return a;
  }
}
const Hr = {}.hasOwnProperty;
function en(t) {
  return e;
  function e(n, r, s) {
    return Hr.call(t, n.tagName) && t[n.tagName](n, r, s);
  }
}
const Ke = en({
  body: Vr,
  caption: Ne,
  colgroup: Ne,
  dd: Qr,
  dt: Jr,
  head: Ne,
  html: Kr,
  li: Xr,
  optgroup: Zr,
  option: es,
  p: Yr,
  rp: mt,
  rt: mt,
  tbody: ns,
  td: yt,
  tfoot: rs,
  th: yt,
  thead: ts,
  tr: ss
});
function Ne(t, e, n) {
  const r = x(n, e, !0);
  return !r || r.type !== "comment" && !(r.type === "text" && He(r.value.charAt(0)));
}
function Kr(t, e, n) {
  const r = x(n, e);
  return !r || r.type !== "comment";
}
function Vr(t, e, n) {
  const r = x(n, e);
  return !r || r.type !== "comment";
}
function Yr(t, e, n) {
  const r = x(n, e);
  return r ? r.type === "element" && (r.tagName === "address" || r.tagName === "article" || r.tagName === "aside" || r.tagName === "blockquote" || r.tagName === "details" || r.tagName === "div" || r.tagName === "dl" || r.tagName === "fieldset" || r.tagName === "figcaption" || r.tagName === "figure" || r.tagName === "footer" || r.tagName === "form" || r.tagName === "h1" || r.tagName === "h2" || r.tagName === "h3" || r.tagName === "h4" || r.tagName === "h5" || r.tagName === "h6" || r.tagName === "header" || r.tagName === "hgroup" || r.tagName === "hr" || r.tagName === "main" || r.tagName === "menu" || r.tagName === "nav" || r.tagName === "ol" || r.tagName === "p" || r.tagName === "pre" || r.tagName === "section" || r.tagName === "table" || r.tagName === "ul") : !n || // Confusing parent.
  !(n.type === "element" && (n.tagName === "a" || n.tagName === "audio" || n.tagName === "del" || n.tagName === "ins" || n.tagName === "map" || n.tagName === "noscript" || n.tagName === "video"));
}
function Xr(t, e, n) {
  const r = x(n, e);
  return !r || r.type === "element" && r.tagName === "li";
}
function Jr(t, e, n) {
  const r = x(n, e);
  return !!(r && r.type === "element" && (r.tagName === "dt" || r.tagName === "dd"));
}
function Qr(t, e, n) {
  const r = x(n, e);
  return !r || r.type === "element" && (r.tagName === "dt" || r.tagName === "dd");
}
function mt(t, e, n) {
  const r = x(n, e);
  return !r || r.type === "element" && (r.tagName === "rp" || r.tagName === "rt");
}
function Zr(t, e, n) {
  const r = x(n, e);
  return !r || r.type === "element" && r.tagName === "optgroup";
}
function es(t, e, n) {
  const r = x(n, e);
  return !r || r.type === "element" && (r.tagName === "option" || r.tagName === "optgroup");
}
function ts(t, e, n) {
  const r = x(n, e);
  return !!(r && r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot"));
}
function ns(t, e, n) {
  const r = x(n, e);
  return !r || r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot");
}
function rs(t, e, n) {
  return !x(n, e);
}
function ss(t, e, n) {
  const r = x(n, e);
  return !r || r.type === "element" && r.tagName === "tr";
}
function yt(t, e, n) {
  const r = x(n, e);
  return !r || r.type === "element" && (r.tagName === "td" || r.tagName === "th");
}
const os = en({
  body: as,
  colgroup: cs,
  head: is,
  html: ls,
  tbody: us
});
function ls(t) {
  const e = x(t, -1);
  return !e || e.type !== "comment";
}
function is(t) {
  const e = /* @__PURE__ */ new Set();
  for (const r of t.children)
    if (r.type === "element" && (r.tagName === "base" || r.tagName === "title")) {
      if (e.has(r.tagName)) return !1;
      e.add(r.tagName);
    }
  const n = t.children[0];
  return !n || n.type === "element";
}
function as(t) {
  const e = x(t, -1, !0);
  return !e || e.type !== "comment" && !(e.type === "text" && He(e.value.charAt(0))) && !(e.type === "element" && (e.tagName === "meta" || e.tagName === "link" || e.tagName === "script" || e.tagName === "style" || e.tagName === "template"));
}
function cs(t, e, n) {
  const r = Qt(n, e), s = x(t, -1, !0);
  return n && r && r.type === "element" && r.tagName === "colgroup" && Ke(r, n.children.indexOf(r), n) ? !1 : !!(s && s.type === "element" && s.tagName === "col");
}
function us(t, e, n) {
  const r = Qt(n, e), s = x(t, -1);
  return n && r && r.type === "element" && (r.tagName === "thead" || r.tagName === "tbody") && Ke(r, n.children.indexOf(r), n) ? !1 : !!(s && s.type === "element" && s.tagName === "tr");
}
const re = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
    [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function hs(t, e, n, r) {
  const s = r.schema, o = s.space === "svg" ? !1 : r.settings.omitOptionalTags;
  let l = s.space === "svg" ? r.settings.closeEmptyElements : r.settings.voids.includes(t.tagName.toLowerCase());
  const a = [];
  let i;
  s.space === "html" && t.tagName === "svg" && (r.schema = Xt);
  const c = ds(r, t.properties), u = r.all(
    s.space === "html" && t.tagName === "template" ? t.content : t
  );
  return r.schema = s, u && (l = !1), (c || !o || !os(t, e, n)) && (a.push("<", t.tagName, c ? " " + c : ""), l && (s.space === "svg" || r.settings.closeSelfClosing) && (i = c.charAt(c.length - 1), (!r.settings.tightSelfClosing || i === "/" || i && i !== '"' && i !== "'") && a.push(" "), a.push("/")), a.push(">")), a.push(u), !l && (!o || !Ke(t, e, n)) && a.push("</" + t.tagName + ">"), a.join("");
}
function ds(t, e) {
  const n = [];
  let r = -1, s;
  if (e) {
    for (s in e)
      if (e[s] !== null && e[s] !== void 0) {
        const o = fs(t, s, e[s]);
        o && n.push(o);
      }
  }
  for (; ++r < n.length; ) {
    const o = t.settings.tightAttributes ? n[r].charAt(n[r].length - 1) : void 0;
    r !== n.length - 1 && o !== '"' && o !== "'" && (n[r] += " ");
  }
  return n.join("");
}
function fs(t, e, n) {
  const r = mr(t.schema, e), s = t.settings.allowParseErrors && t.schema.space === "html" ? 0 : 1, o = t.settings.allowDangerousCharacters ? 0 : 1;
  let l = t.quote, a;
  if (r.overloadedBoolean && (n === r.attribute || n === "") ? n = !0 : (r.boolean || r.overloadedBoolean) && (typeof n != "string" || n === r.attribute || n === "") && (n = !!n), n == null || n === !1 || typeof n == "number" && Number.isNaN(n))
    return "";
  const i = z(
    r.attribute,
    Object.assign({}, t.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: re.name[s][o]
    })
  );
  return n === !0 || (n = Array.isArray(n) ? (r.commaSeparated ? Wr : zr)(n, {
    padLeft: !t.settings.tightCommaSeparatedLists
  }) : String(n), t.settings.collapseEmptyAttributes && !n) ? i : (t.settings.preferUnquoted && (a = z(
    n,
    Object.assign({}, t.settings.characterReferences, {
      attribute: !0,
      subset: re.unquoted[s][o]
    })
  )), a !== n && (t.settings.quoteSmart && pt(n, l) > pt(n, t.alternative) && (l = t.alternative), a = l + z(
    n,
    Object.assign({}, t.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: (l === "'" ? re.single : re.double)[s][o],
      attribute: !0
    })
  ) + l), i + (a && "=" + a));
}
const ps = ["<", "&"];
function tn(t, e, n, r) {
  return n && n.type === "element" && (n.tagName === "script" || n.tagName === "style") ? t.value : z(
    t.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: ps
    })
  );
}
function gs(t, e, n, r) {
  return r.settings.allowDangerousHtml ? t.value : tn(t, e, n, r);
}
function ms(t, e, n, r) {
  return r.all(t);
}
const ys = Sr("type", {
  invalid: _s,
  unknown: bs,
  handlers: { comment: jr, doctype: Fr, element: hs, raw: gs, root: ms, text: tn }
});
function _s(t) {
  throw new Error("Expected node, not `" + t + "`");
}
function bs(t) {
  const e = (
    /** @type {Nodes} */
    t
  );
  throw new Error("Cannot compile unknown node `" + e.type + "`");
}
const Ss = {}, Cs = {}, ws = [];
function vs(t, e) {
  const n = e || Ss, r = n.quote || '"', s = r === '"' ? "'" : '"';
  if (r !== '"' && r !== "'")
    throw new Error("Invalid quote `" + r + "`, expected `'` or `\"`");
  return {
    one: ks,
    all: Rs,
    settings: {
      omitOptionalTags: n.omitOptionalTags || !1,
      allowParseErrors: n.allowParseErrors || !1,
      allowDangerousCharacters: n.allowDangerousCharacters || !1,
      quoteSmart: n.quoteSmart || !1,
      preferUnquoted: n.preferUnquoted || !1,
      tightAttributes: n.tightAttributes || !1,
      upperDoctype: n.upperDoctype || !1,
      tightDoctype: n.tightDoctype || !1,
      bogusComments: n.bogusComments || !1,
      tightCommaSeparatedLists: n.tightCommaSeparatedLists || !1,
      tightSelfClosing: n.tightSelfClosing || !1,
      collapseEmptyAttributes: n.collapseEmptyAttributes || !1,
      allowDangerousHtml: n.allowDangerousHtml || !1,
      voids: n.voids || ur,
      characterReferences: n.characterReferences || Cs,
      closeSelfClosing: n.closeSelfClosing || !1,
      closeEmptyElements: n.closeEmptyElements || !1
    },
    schema: n.space === "svg" ? Xt : br,
    quote: r,
    alternative: s
  }.one(
    Array.isArray(t) ? { type: "root", children: t } : t,
    void 0,
    void 0
  );
}
function ks(t, e, n) {
  return ys(t, e, n, this);
}
function Rs(t) {
  const e = [], n = t && t.children || ws;
  let r = -1;
  for (; ++r < n.length; )
    e[r] = this.one(n[r], r, t);
  return e.join("");
}
function nn(t, e) {
  if (!e) return t;
  t.properties ||= {}, t.properties.class ||= [], typeof t.properties.class == "string" && (t.properties.class = t.properties.class.split(/\s+/g)), Array.isArray(t.properties.class) || (t.properties.class = []);
  const n = Array.isArray(e) ? e : e.split(/\s+/g);
  for (const r of n) r && !t.properties.class.includes(r) && t.properties.class.push(r);
  return t;
}
function xs(t) {
  const e = _e(t, !0).map(([s]) => s);
  function n(s) {
    if (s === t.length) return {
      line: e.length - 1,
      character: e[e.length - 1].length
    };
    let o = s, l = 0;
    for (const a of e) {
      if (o < a.length) break;
      o -= a.length, l++;
    }
    return {
      line: l,
      character: o
    };
  }
  function r(s, o) {
    let l = 0;
    for (let a = 0; a < s; a++) l += e[a].length;
    return l += o, l;
  }
  return {
    lines: e,
    indexToPos: n,
    posToIndex: r
  };
}
const Ve = "light-dark()", As = ["color", "background-color"];
function Ns(t, e) {
  let n = 0;
  const r = [];
  for (const s of e)
    s > n && r.push({
      ...t,
      content: t.content.slice(n, s),
      offset: t.offset + n
    }), n = s;
  return n < t.content.length && r.push({
    ...t,
    content: t.content.slice(n),
    offset: t.offset + n
  }), r;
}
function Ts(t, e) {
  const n = Array.from(e instanceof Set ? e : new Set(e)).sort((r, s) => r - s);
  return n.length ? t.map((r) => r.flatMap((s) => {
    const o = n.filter((l) => s.offset < l && l < s.offset + s.content.length).map((l) => l - s.offset).sort((l, a) => l - a);
    return o.length ? Ns(s, o) : s;
  })) : t;
}
function Ps(t, e, n, r, s = "css-vars") {
  const o = {
    content: t.content,
    explanation: t.explanation,
    offset: t.offset
  }, l = e.map((u) => de(t.variants[u])), a = new Set(l.flatMap((u) => Object.keys(u))), i = {}, c = (u, h) => {
    const f = h === "color" ? "" : h === "background-color" ? "-bg" : `-${h}`;
    return n + e[u] + (h === "color" ? "" : f);
  };
  return l.forEach((u, h) => {
    for (const f of a) {
      const g = u[f] || "inherit";
      if (h === 0 && r && As.includes(f)) if (r === Ve && l.length > 1) {
        const p = e.findIndex((_) => _ === "light"), S = e.findIndex((_) => _ === "dark");
        if (p === -1 || S === -1) throw new v('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
        i[f] = `light-dark(${l[p][f] || "inherit"}, ${l[S][f] || "inherit"})`, s === "css-vars" && (i[c(h, f)] = g);
      } else i[f] = g;
      else s === "css-vars" && (i[c(h, f)] = g);
    }
  }), o.htmlStyle = i, o;
}
function de(t) {
  const e = {};
  if (t.color && (e.color = t.color), t.bgColor && (e["background-color"] = t.bgColor), t.fontStyle) {
    t.fontStyle & T.Italic && (e["font-style"] = "italic"), t.fontStyle & T.Bold && (e["font-weight"] = "bold");
    const n = [];
    t.fontStyle & T.Underline && n.push("underline"), t.fontStyle & T.Strikethrough && n.push("line-through"), n.length && (e["text-decoration"] = n.join(" "));
  }
  return e;
}
function Fe(t) {
  return typeof t == "string" ? t : Object.entries(t).map(([e, n]) => `${e}:${n}`).join(";");
}
function Is() {
  const t = /* @__PURE__ */ new WeakMap();
  function e(n) {
    if (!t.has(n.meta)) {
      let s = function(l) {
        if (typeof l == "number") {
          if (l < 0 || l > n.source.length) throw new v(`Invalid decoration offset: ${l}. Code length: ${n.source.length}`);
          return {
            ...r.indexToPos(l),
            offset: l
          };
        } else {
          const a = r.lines[l.line];
          if (a === void 0) throw new v(`Invalid decoration position ${JSON.stringify(l)}. Lines length: ${r.lines.length}`);
          let i = l.character;
          if (i < 0 && (i = a.length + i), i < 0 || i > a.length) throw new v(`Invalid decoration position ${JSON.stringify(l)}. Line ${l.line} length: ${a.length}`);
          return {
            ...l,
            character: i,
            offset: r.posToIndex(l.line, i)
          };
        }
      };
      const r = xs(n.source), o = (n.options.decorations || []).map((l) => ({
        ...l,
        start: s(l.start),
        end: s(l.end)
      }));
      Ls(o), t.set(n.meta, {
        decorations: o,
        converter: r,
        source: n.source
      });
    }
    return t.get(n.meta);
  }
  return {
    name: "shiki:decorations",
    tokens(n) {
      if (this.options.decorations?.length)
        return Ts(n, e(this).decorations.flatMap((r) => [r.start.offset, r.end.offset]));
    },
    code(n) {
      if (!this.options.decorations?.length) return;
      const r = e(this), s = Array.from(n.children).filter((u) => u.type === "element" && u.tagName === "span");
      if (s.length !== r.converter.lines.length) throw new v(`Number of lines in code element (${s.length}) does not match the number of lines in the source (${r.converter.lines.length}). Failed to apply decorations.`);
      function o(u, h, f, g) {
        const p = s[u];
        let S = "", _ = -1, y = -1;
        if (h === 0 && (_ = 0), f === 0 && (y = 0), f === Number.POSITIVE_INFINITY && (y = p.children.length), _ === -1 || y === -1) for (let b = 0; b < p.children.length; b++)
          S += rn(p.children[b]), _ === -1 && S.length === h && (_ = b + 1), y === -1 && S.length === f && (y = b + 1);
        if (_ === -1) throw new v(`Failed to find start index for decoration ${JSON.stringify(g.start)}`);
        if (y === -1) throw new v(`Failed to find end index for decoration ${JSON.stringify(g.end)}`);
        const m = p.children.slice(_, y);
        if (!g.alwaysWrap && m.length === p.children.length) a(p, g, "line");
        else if (!g.alwaysWrap && m.length === 1 && m[0].type === "element") a(m[0], g, "token");
        else {
          const b = {
            type: "element",
            tagName: "span",
            properties: {},
            children: m
          };
          a(b, g, "wrapper"), p.children.splice(_, m.length, b);
        }
      }
      function l(u, h) {
        s[u] = a(s[u], h, "line");
      }
      function a(u, h, f) {
        const g = h.properties || {}, p = h.transform || ((S) => S);
        return u.tagName = h.tagName || "span", u.properties = {
          ...u.properties,
          ...g,
          class: u.properties.class
        }, h.properties?.class && nn(u, h.properties.class), u = p(u, f) || u, u;
      }
      const i = [], c = r.decorations.sort((u, h) => h.start.offset - u.start.offset || u.end.offset - h.end.offset);
      for (const u of c) {
        const { start: h, end: f } = u;
        if (h.line === f.line) o(h.line, h.character, f.character, u);
        else if (h.line < f.line) {
          o(h.line, h.character, Number.POSITIVE_INFINITY, u);
          for (let g = h.line + 1; g < f.line; g++) i.unshift(() => l(g, u));
          o(f.line, 0, f.character, u);
        }
      }
      i.forEach((u) => u());
    }
  };
}
function Ls(t) {
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (n.start.offset > n.end.offset) throw new v(`Invalid decoration range: ${JSON.stringify(n.start)} - ${JSON.stringify(n.end)}`);
    for (let r = e + 1; r < t.length; r++) {
      const s = t[r], o = n.start.offset <= s.start.offset && s.start.offset < n.end.offset, l = n.start.offset < s.end.offset && s.end.offset <= n.end.offset, a = s.start.offset <= n.start.offset && n.start.offset < s.end.offset, i = s.start.offset < n.end.offset && n.end.offset <= s.end.offset;
      if (o || l || a || i) {
        if (o && l || a && i || a && n.start.offset === n.end.offset || l && s.start.offset === s.end.offset) continue;
        throw new v(`Decorations ${JSON.stringify(n.start)} and ${JSON.stringify(s.start)} intersect.`);
      }
    }
  }
}
function rn(t) {
  return t.type === "text" ? t.value : t.type === "element" ? t.children.map(rn).join("") : "";
}
const Es = [/* @__PURE__ */ Is()];
function fe(t) {
  const e = Os(t.transformers || []);
  return [
    ...e.pre,
    ...e.normal,
    ...e.post,
    ...Es
  ];
}
function Os(t) {
  const e = [], n = [], r = [];
  for (const s of t) switch (s.enforce) {
    case "pre":
      e.push(s);
      break;
    case "post":
      n.push(s);
      break;
    default:
      r.push(s);
  }
  return {
    pre: e,
    post: n,
    normal: r
  };
}
var $ = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
], Te = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  8: "hidden",
  9: "strikethrough"
};
function Ms(t, e) {
  const n = t.indexOf("\x1B", e);
  if (n !== -1 && t[n + 1] === "[") {
    const r = t.indexOf("m", n);
    if (r !== -1) return {
      sequence: t.substring(n + 2, r).split(";"),
      startPosition: n,
      position: r + 1
    };
  }
  return { position: t.length };
}
function _t(t) {
  const e = t.shift();
  if (e === "2") {
    const n = t.splice(0, 3).map((r) => Number.parseInt(r));
    return n.length !== 3 || n.some((r) => Number.isNaN(r)) ? void 0 : {
      type: "rgb",
      rgb: n
    };
  } else if (e === "5") {
    const n = t.shift();
    if (n) return {
      type: "table",
      index: Number(n)
    };
  }
}
function Bs(t) {
  const e = [];
  for (; t.length > 0; ) {
    const n = t.shift();
    if (!n) continue;
    const r = Number.parseInt(n);
    if (!Number.isNaN(r))
      if (r === 0) e.push({ type: "resetAll" });
      else if (r <= 9)
        Te[r] && e.push({
          type: "setDecoration",
          value: Te[r]
        });
      else if (r <= 29) {
        const s = Te[r - 20];
        s && (e.push({
          type: "resetDecoration",
          value: s
        }), s === "dim" && e.push({
          type: "resetDecoration",
          value: "bold"
        }));
      } else if (r <= 37) e.push({
        type: "setForegroundColor",
        value: {
          type: "named",
          name: $[r - 30]
        }
      });
      else if (r === 38) {
        const s = _t(t);
        s && e.push({
          type: "setForegroundColor",
          value: s
        });
      } else if (r === 39) e.push({ type: "resetForegroundColor" });
      else if (r <= 47) e.push({
        type: "setBackgroundColor",
        value: {
          type: "named",
          name: $[r - 40]
        }
      });
      else if (r === 48) {
        const s = _t(t);
        s && e.push({
          type: "setBackgroundColor",
          value: s
        });
      } else r === 49 ? e.push({ type: "resetBackgroundColor" }) : r === 53 ? e.push({
        type: "setDecoration",
        value: "overline"
      }) : r === 55 ? e.push({
        type: "resetDecoration",
        value: "overline"
      }) : r >= 90 && r <= 97 ? e.push({
        type: "setForegroundColor",
        value: {
          type: "named",
          name: $[r - 90 + 8]
        }
      }) : r >= 100 && r <= 107 && e.push({
        type: "setBackgroundColor",
        value: {
          type: "named",
          name: $[r - 100 + 8]
        }
      });
  }
  return e;
}
function Gs() {
  let t = null, e = null, n = /* @__PURE__ */ new Set();
  return { parse(r) {
    const s = [];
    let o = 0;
    do {
      const l = Ms(r, o), a = l.sequence ? r.substring(o, l.startPosition) : r.substring(o);
      if (a.length > 0 && s.push({
        value: a,
        foreground: t,
        background: e,
        decorations: new Set(n)
      }), l.sequence) {
        const i = Bs(l.sequence);
        for (const c of i) c.type === "resetAll" ? (t = null, e = null, n.clear()) : c.type === "resetForegroundColor" ? t = null : c.type === "resetBackgroundColor" ? e = null : c.type === "resetDecoration" && n.delete(c.value);
        for (const c of i) c.type === "setForegroundColor" ? t = c.value : c.type === "setBackgroundColor" ? e = c.value : c.type === "setDecoration" && n.add(c.value);
      }
      o = l.position;
    } while (o < r.length);
    return s;
  } };
}
var Ds = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function $s(t = Ds) {
  function e(a) {
    return t[a];
  }
  function n(a) {
    return `#${a.map((i) => Math.max(0, Math.min(i, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let r;
  function s() {
    if (r) return r;
    r = [];
    for (let c = 0; c < $.length; c++) r.push(e($[c]));
    let a = [
      0,
      95,
      135,
      175,
      215,
      255
    ];
    for (let c = 0; c < 6; c++) for (let u = 0; u < 6; u++) for (let h = 0; h < 6; h++) r.push(n([
      a[c],
      a[u],
      a[h]
    ]));
    let i = 8;
    for (let c = 0; c < 24; c++, i += 10) r.push(n([
      i,
      i,
      i
    ]));
    return r;
  }
  function o(a) {
    return s()[a];
  }
  function l(a) {
    switch (a.type) {
      case "named":
        return e(a.name);
      case "rgb":
        return n(a.rgb);
      case "table":
        return o(a.index);
    }
  }
  return { value: l };
}
const js = {
  black: "#000000",
  red: "#cd3131",
  green: "#0DBC79",
  yellow: "#E5E510",
  blue: "#2472C8",
  magenta: "#BC3FBC",
  cyan: "#11A8CD",
  white: "#E5E5E5",
  brightBlack: "#666666",
  brightRed: "#F14C4C",
  brightGreen: "#23D18B",
  brightYellow: "#F5F543",
  brightBlue: "#3B8EEA",
  brightMagenta: "#D670D6",
  brightCyan: "#29B8DB",
  brightWhite: "#FFFFFF"
};
function Fs(t, e, n) {
  const r = he(t, n), s = _e(e), o = $s(Object.fromEntries($.map((a) => {
    const i = `terminal.ansi${a[0].toUpperCase()}${a.substring(1)}`;
    return [a, t.colors?.[i] || js[a]];
  }))), l = Gs();
  return s.map((a) => l.parse(a[0]).map((i) => {
    let c, u;
    i.decorations.has("reverse") ? (c = i.background ? o.value(i.background) : t.bg, u = i.foreground ? o.value(i.foreground) : t.fg) : (c = i.foreground ? o.value(i.foreground) : t.fg, u = i.background ? o.value(i.background) : void 0), c = B(c, r), u = B(u, r), i.decorations.has("dim") && (c = Ws(c));
    let h = T.None;
    return i.decorations.has("bold") && (h |= T.Bold), i.decorations.has("italic") && (h |= T.Italic), i.decorations.has("underline") && (h |= T.Underline), i.decorations.has("strikethrough") && (h |= T.Strikethrough), {
      content: i.value,
      offset: a[1],
      color: c,
      bgColor: u,
      fontStyle: h
    };
  }));
}
function Ws(t) {
  const e = t.match(/#([0-9a-f]{3,8})/i);
  if (e) {
    const r = e[1];
    if (r.length === 8) {
      const s = Math.round(Number.parseInt(r.slice(6, 8), 16) / 2).toString(16).padStart(2, "0");
      return `#${r.slice(0, 6)}${s}`;
    } else {
      if (r.length === 6) return `#${r}80`;
      if (r.length === 4) {
        const s = r[0], o = r[1], l = r[2], a = r[3];
        return `#${s}${s}${o}${o}${l}${l}${Math.round(Number.parseInt(`${a}${a}`, 16) / 2).toString(16).padStart(2, "0")}`;
      } else if (r.length === 3) {
        const s = r[0], o = r[1], l = r[2];
        return `#${s}${s}${o}${o}${l}${l}80`;
      }
    }
  }
  const n = t.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  return n ? `var(${n[1]}-dim)` : t;
}
function sn(t, e, n = {}) {
  const r = t.resolveLangAlias(n.lang || "text"), { theme: s = t.getLoadedThemes()[0] } = n;
  if (!me(r) && !ye(s) && r === "ansi") {
    const { theme: o } = t.setTheme(s);
    return Fs(o, e, n);
  }
  return Ft(t, e, n);
}
function pe(t, e, n) {
  let r, s, o, l, a, i;
  if ("themes" in n) {
    const { defaultColor: c = "light", cssVariablePrefix: u = "--shiki-", colorsRendering: h = "css-vars" } = n, f = Object.entries(n.themes).filter((y) => y[1]).map((y) => ({
      color: y[0],
      theme: y[1]
    })).sort((y, m) => y.color === c ? -1 : m.color === c ? 1 : 0);
    if (f.length === 0) throw new v("`themes` option must not be empty");
    const g = Wt(t, e, n);
    if (i = Q(g), c && Ve !== c && !f.find((y) => y.color === c)) throw new v(`\`themes\` option must contain the defaultColor key \`${c}\``);
    const p = f.map((y) => t.getTheme(y.theme)), S = f.map((y) => y.color);
    o = g.map((y) => y.map((m) => Ps(m, S, u, c, h))), i && be(o, i);
    const _ = f.map((y) => he(y.theme, n));
    s = bt(f, p, _, u, c, "fg", h), r = bt(f, p, _, u, c, "bg", h), l = `shiki-themes ${p.map((y) => y.name).join(" ")}`, a = c ? void 0 : [s, r].join(";");
  } else if ("theme" in n) {
    const c = he(n.theme, n);
    o = sn(t, e, n);
    const u = t.getTheme(n.theme);
    r = B(u.bg, c), s = B(u.fg, c), l = u.name, i = Q(o);
  } else throw new v("Invalid options, either `theme` or `themes` must be provided");
  return {
    tokens: o,
    fg: s,
    bg: r,
    themeName: l,
    rootStyle: a,
    grammarState: i
  };
}
function bt(t, e, n, r, s, o, l) {
  return t.map((a, i) => {
    const c = B(e[i][o], n[i]) || "inherit", u = `${r + a.color}${o === "bg" ? "-bg" : ""}:${c}`;
    if (i === 0 && s) {
      if (s === Ve && t.length > 1) {
        const h = t.findIndex((g) => g.color === "light"), f = t.findIndex((g) => g.color === "dark");
        if (h === -1 || f === -1) throw new v('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
        return `light-dark(${B(e[h][o], n[h]) || "inherit"}, ${B(e[f][o], n[f]) || "inherit"});${u}`;
      }
      return c;
    }
    return l === "css-vars" ? u : null;
  }).filter((a) => !!a).join(";");
}
function ge(t, e, n, r = {
  meta: {},
  options: n,
  codeToHast: (s, o) => ge(t, s, o),
  codeToTokens: (s, o) => pe(t, s, o)
}) {
  let s = e;
  for (const p of fe(n)) s = p.preprocess?.call(r, s, n) || s;
  let { tokens: o, fg: l, bg: a, themeName: i, rootStyle: c, grammarState: u } = pe(t, s, n);
  const { mergeWhitespaces: h = !0, mergeSameStyleTokens: f = !1 } = n;
  h === !0 ? o = Us(o) : h === "never" && (o = qs(o)), f && (o = Hs(o));
  const g = {
    ...r,
    get source() {
      return s;
    }
  };
  for (const p of fe(n)) o = p.tokens?.call(g, o) || o;
  return zs(o, {
    ...n,
    fg: l,
    bg: a,
    themeName: i,
    rootStyle: n.rootStyle === !1 ? !1 : n.rootStyle ?? c
  }, g, u);
}
function zs(t, e, n, r = Q(t)) {
  const s = fe(e), o = [], l = {
    type: "root",
    children: []
  }, { structure: a = "classic", tabindex: i = "0" } = e, c = { class: `shiki ${e.themeName || ""}` };
  e.rootStyle !== !1 && (e.rootStyle != null ? c.style = e.rootStyle : c.style = `background-color:${e.bg};color:${e.fg}`), i !== !1 && i != null && (c.tabindex = i.toString());
  for (const [S, _] of Object.entries(e.meta || {})) S.startsWith("_") || (c[S] = _);
  let u = {
    type: "element",
    tagName: "pre",
    properties: c,
    children: [],
    data: e.data
  }, h = {
    type: "element",
    tagName: "code",
    properties: {},
    children: o
  };
  const f = [], g = {
    ...n,
    structure: a,
    addClassToHast: nn,
    get source() {
      return n.source;
    },
    get tokens() {
      return t;
    },
    get options() {
      return e;
    },
    get root() {
      return l;
    },
    get pre() {
      return u;
    },
    get code() {
      return h;
    },
    get lines() {
      return f;
    }
  };
  if (t.forEach((S, _) => {
    _ && (a === "inline" ? l.children.push({
      type: "element",
      tagName: "br",
      properties: {},
      children: []
    }) : a === "classic" && o.push({
      type: "text",
      value: `
`
    }));
    let y = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    }, m = 0;
    for (const b of S) {
      let A = {
        type: "element",
        tagName: "span",
        properties: { ...b.htmlAttrs },
        children: [{
          type: "text",
          value: b.content
        }]
      };
      const k = Fe(b.htmlStyle || de(b));
      k && (A.properties.style = k);
      for (const E of s) A = E?.span?.call(g, A, _ + 1, m, y, b) || A;
      a === "inline" ? l.children.push(A) : a === "classic" && y.children.push(A), m += b.content.length;
    }
    if (a === "classic") {
      for (const b of s) y = b?.line?.call(g, y, _ + 1) || y;
      f.push(y), o.push(y);
    } else a === "inline" && f.push(y);
  }), a === "classic") {
    for (const S of s) h = S?.code?.call(g, h) || h;
    u.children.push(h);
    for (const S of s) u = S?.pre?.call(g, u) || u;
    l.children.push(u);
  } else if (a === "inline") {
    const S = [];
    let _ = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    };
    for (const m of l.children) m.type === "element" && m.tagName === "br" ? (S.push(_), _ = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    }) : (m.type === "element" || m.type === "text") && _.children.push(m);
    S.push(_);
    let y = {
      type: "element",
      tagName: "code",
      properties: {},
      children: S
    };
    for (const m of s) y = m?.code?.call(g, y) || y;
    l.children = [];
    for (let m = 0; m < y.children.length; m++) {
      m > 0 && l.children.push({
        type: "element",
        tagName: "br",
        properties: {},
        children: []
      });
      const b = y.children[m];
      b.type === "element" && l.children.push(...b.children);
    }
  }
  let p = l;
  for (const S of s) p = S?.root?.call(g, p) || p;
  return r && be(p, r), p;
}
function Us(t) {
  return t.map((e) => {
    const n = [];
    let r = "", s;
    return e.forEach((o, l) => {
      const a = !(o.fontStyle && (o.fontStyle & T.Underline || o.fontStyle & T.Strikethrough));
      a && o.content.match(/^\s+$/) && e[l + 1] ? (s === void 0 && (s = o.offset), r += o.content) : r ? (a ? n.push({
        ...o,
        offset: s,
        content: r + o.content
      }) : n.push({
        content: r,
        offset: s
      }, o), s = void 0, r = "") : n.push(o);
    }), n;
  });
}
function qs(t) {
  return t.map((e) => e.flatMap((n) => {
    if (n.content.match(/^\s+$/)) return n;
    const r = n.content.match(/^(\s*)(.*?)(\s*)$/);
    if (!r) return n;
    const [, s, o, l] = r;
    if (!s && !l) return n;
    const a = [{
      ...n,
      offset: n.offset + s.length,
      content: o
    }];
    return s && a.unshift({
      content: s,
      offset: n.offset
    }), l && a.push({
      content: l,
      offset: n.offset + s.length + o.length
    }), a;
  }));
}
function Hs(t) {
  return t.map((e) => {
    const n = [];
    for (const r of e) {
      if (n.length === 0) {
        n.push({ ...r });
        continue;
      }
      const s = n[n.length - 1], o = Fe(s.htmlStyle || de(s)), l = Fe(r.htmlStyle || de(r)), a = s.fontStyle && (s.fontStyle & T.Underline || s.fontStyle & T.Strikethrough), i = r.fontStyle && (r.fontStyle & T.Underline || r.fontStyle & T.Strikethrough);
      !a && !i && o === l ? s.content += r.content : n.push({ ...r });
    }
    return n;
  });
}
const Ks = vs;
function Vs(t, e, n) {
  const r = {
    meta: {},
    options: n,
    codeToHast: (o, l) => ge(t, o, l),
    codeToTokens: (o, l) => pe(t, o, l)
  };
  let s = Ks(ge(t, e, n, r));
  for (const o of fe(n)) s = o.postprocess?.call(r, s, n) || s;
  return s;
}
async function Xs(t) {
  const e = await er(t);
  return {
    getLastGrammarState: (...n) => rr(e, ...n),
    codeToTokensBase: (n, r) => sn(e, n, r),
    codeToTokensWithThemes: (n, r) => Wt(e, n, r),
    codeToTokens: (n, r) => pe(e, n, r),
    codeToHast: (n, r) => ge(e, n, r),
    codeToHtml: (n, r) => Vs(e, n, r),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...e,
    getInternalContext: () => e
  };
}
export {
  v as ShikiError,
  nn as addClassToHast,
  B as applyColorReplacements,
  ge as codeToHast,
  Vs as codeToHtml,
  pe as codeToTokens,
  sn as codeToTokensBase,
  Wt as codeToTokensWithThemes,
  Xs as createHighlighterCore,
  xs as createPositionConverter,
  Zn as createShikiPrimitive,
  er as createShikiPrimitiveAsync,
  Ps as flatTokenVariants,
  rr as getLastGrammarState,
  de as getTokenStyleObject,
  Ks as hastToHtml,
  ye as isNoneTheme,
  me as isPlainLang,
  Yn as isSpecialLang,
  Xn as isSpecialTheme,
  Mt as normalizeGetter,
  ze as normalizeTheme,
  he as resolveColorReplacements,
  _e as splitLines,
  Ns as splitToken,
  Ts as splitTokens,
  Fe as stringifyTokenStyle,
  Vn as toArray,
  Fs as tokenizeAnsiWithTheme,
  sr as tokenizeWithTheme,
  zs as tokensToHast,
  Is as transformerDecorations
};
//# sourceMappingURL=core-dyku7qctyc40nnhh.js.map
