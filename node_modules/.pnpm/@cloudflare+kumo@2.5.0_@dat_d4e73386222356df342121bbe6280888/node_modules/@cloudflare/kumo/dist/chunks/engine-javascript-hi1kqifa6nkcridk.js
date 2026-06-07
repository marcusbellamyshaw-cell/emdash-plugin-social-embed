"use client";
var We = class {
  regexps;
  constructor(e, r = {}) {
    this.patterns = e, this.options = r;
    const { forgiving: t = !1, cache: n, regexConstructor: a } = r;
    if (!a) throw new Error("Option `regexConstructor` is not provided");
    this.regexps = e.map((s) => {
      if (typeof s != "string") return s;
      const o = n?.get(s);
      if (o) {
        if (o instanceof RegExp) return o;
        if (t) return null;
        throw o;
      }
      try {
        const i = a(s);
        return n?.set(s, i), i;
      } catch (i) {
        if (n?.set(s, i), t) return null;
        throw i;
      }
    });
  }
  findNextMatchSync(e, r, t) {
    const n = typeof e == "string" ? e : e.content, a = [];
    function s(o, i, u = 0) {
      return {
        index: o,
        captureIndices: i.indices.map((c) => c == null ? {
          start: 4294967295,
          end: 4294967295,
          length: 0
        } : {
          start: c[0] + u,
          end: c[1] + u,
          length: c[1] - c[0]
        })
      };
    }
    for (let o = 0; o < this.regexps.length; o++) {
      const i = this.regexps[o];
      if (i)
        try {
          i.lastIndex = r;
          const u = i.exec(n);
          if (!u) continue;
          if (u.index === r) return s(o, u, 0);
          a.push([
            o,
            u,
            0
          ]);
        } catch (u) {
          if (this.options.forgiving) continue;
          throw u;
        }
    }
    if (a.length) {
      const o = Math.min(...a.map((i) => i[1].index));
      for (const [i, u, c] of a) if (u.index === o) return s(i, u, c);
    }
    return null;
  }
};
function H(e) {
  if ([...e].length !== 1) throw new Error(`Expected "${e}" to be a single code point`);
  return e.codePointAt(0);
}
function mr(e, r, t) {
  return e.has(r) || e.set(r, t), e.get(r);
}
const Ce = /* @__PURE__ */ new Set(["alnum", "alpha", "ascii", "blank", "cntrl", "digit", "graph", "lower", "print", "punct", "space", "upper", "word", "xdigit"]), x = String.raw;
function j(e, r) {
  if (e == null) throw new Error(r ?? "Value expected");
  return e;
}
const He = x`\[\^?`, je = `c.? | C(?:-.?)?|${x`[pP]\{(?:\^?[-\x20_]*[A-Za-z][-\x20\w]*\})?`}|${x`x[89A-Fa-f]\p{AHex}(?:\\x[89A-Fa-f]\p{AHex})*`}|${x`u(?:\p{AHex}{4})? | x\{[^\}]*\}? | x\p{AHex}{0,2}`}|${x`o\{[^\}]*\}?`}|${x`\d{1,3}`}`, be = /[?*+][?+]?|\{(?:\d+(?:,\d*)?|,\d+)\}\??/, K = new RegExp(x`
  \\ (?:
    ${je}
    | [gk]<[^>]*>?
    | [gk]'[^']*'?
    | .
  )
  | \( (?:
    \? (?:
      [:=!>({]
      | <[=!]
      | <[^>]*>
      | '[^']*'
      | ~\|?
      | #(?:[^)\\]|\\.?)*
      | [^:)]*[:)]
    )?
    | \*[^\)]*\)?
  )?
  | (?:${be.source})+
  | ${He}
  | .
`.replace(/\s+/g, ""), "gsu"), oe = new RegExp(x`
  \\ (?:
    ${je}
    | .
  )
  | \[:(?:\^?\p{Alpha}+|\^):\]
  | ${He}
  | &&
  | .
`.replace(/\s+/g, ""), "gsu");
function yr(e, r = {}) {
  const t = { flags: "", ...r, rules: { captureGroup: !1, singleline: !1, ...r.rules } };
  if (typeof e != "string") throw new Error("String expected as pattern");
  const n = Ur(t.flags), a = [n.extended], s = { captureGroup: t.rules.captureGroup, getCurrentModX() {
    return a.at(-1);
  }, numOpenGroups: 0, popModX() {
    a.pop();
  }, pushModX(l) {
    a.push(l);
  }, replaceCurrentModX(l) {
    a[a.length - 1] = l;
  }, singleline: t.rules.singleline };
  let o = [], i;
  for (K.lastIndex = 0; i = K.exec(e); ) {
    const l = Cr(s, e, i[0], K.lastIndex);
    l.tokens ? o.push(...l.tokens) : l.token && o.push(l.token), l.lastIndex !== void 0 && (K.lastIndex = l.lastIndex);
  }
  const u = [];
  let c = 0;
  o.filter((l) => l.type === "GroupOpen").forEach((l) => {
    l.kind === "capturing" ? l.number = ++c : l.raw === "(" && u.push(l);
  }), c || u.forEach((l, f) => {
    l.kind = "capturing", l.number = f + 1;
  });
  const p = c || u.length;
  return { tokens: o.map((l) => l.type === "EscapedNumber" ? Dr(l, p) : l).flat(), flags: n };
}
function Cr(e, r, t, n) {
  const [a, s] = t;
  if (t === "[" || t === "[^") {
    const o = br(r, t, n);
    return { tokens: o.tokens, lastIndex: o.lastIndex };
  }
  if (a === "\\") {
    if ("AbBGyYzZ".includes(s)) return { token: Ae(t, t) };
    if (/^\\g[<']/.test(t)) {
      if (!/^\\g(?:<[^>]+>|'[^']+')$/.test(t)) throw new Error(`Invalid group name "${t}"`);
      return { token: Mr(t) };
    }
    if (/^\\k[<']/.test(t)) {
      if (!/^\\k(?:<[^>]+>|'[^']+')$/.test(t)) throw new Error(`Invalid group name "${t}"`);
      return { token: Ze(t) };
    }
    if (s === "K") return { token: Qe("keep", t) };
    if (s === "N" || s === "R") return { token: U("newline", t, { negate: s === "N" }) };
    if (s === "O") return { token: U("any", t) };
    if (s === "X") return { token: U("text_segment", t) };
    const o = Xe(t, { inCharClass: !1 });
    return Array.isArray(o) ? { tokens: o } : { token: o };
  }
  if (a === "(") {
    if (s === "*") return { token: Gr(t) };
    if (t === "(?{") throw new Error(`Unsupported callout "${t}"`);
    if (t.startsWith("(?#")) {
      if (r[n] !== ")") throw new Error('Unclosed comment group "(?#"');
      return { lastIndex: n + 1 };
    }
    if (/^\(\?[-imx]+[:)]$/.test(t)) return { token: Fr(t, e) };
    if (e.pushModX(e.getCurrentModX()), e.numOpenGroups++, t === "(" && !e.captureGroup || t === "(?:") return { token: z("group", t) };
    if (t === "(?>") return { token: z("atomic", t) };
    if (t === "(?=" || t === "(?!" || t === "(?<=" || t === "(?<!") return { token: z(t[2] === "<" ? "lookbehind" : "lookahead", t, { negate: t.endsWith("!") }) };
    if (t === "(" && e.captureGroup || t.startsWith("(?<") && t.endsWith(">") || t.startsWith("(?'") && t.endsWith("'")) return { token: z("capturing", t, { ...t !== "(" && { name: t.slice(3, -1) } }) };
    if (t.startsWith("(?~")) {
      if (t === "(?~|") throw new Error(`Unsupported absence function kind "${t}"`);
      return { token: z("absence_repeater", t) };
    }
    throw t === "(?(" ? new Error(`Unsupported conditional "${t}"`) : new Error(`Invalid or unsupported group option "${t}"`);
  }
  if (t === ")") {
    if (e.popModX(), e.numOpenGroups--, e.numOpenGroups < 0) throw new Error('Unmatched ")"');
    return { token: Sr(t) };
  }
  if (e.getCurrentModX()) {
    if (t === "#") {
      const o = r.indexOf(`
`, n);
      return { lastIndex: o === -1 ? r.length : o };
    }
    if (/^\s$/.test(t)) {
      const o = /\s+/y;
      return o.lastIndex = n, { lastIndex: o.exec(r) ? o.lastIndex : n };
    }
  }
  if (t === ".") return { token: U("dot", t) };
  if (t === "^" || t === "$") {
    const o = e.singleline ? { "^": x`\A`, $: x`\Z` }[t] : t;
    return { token: Ae(o, t) };
  }
  return t === "|" ? { token: kr(t) } : be.test(t) ? { tokens: Br(t) } : { token: N(H(t), t) };
}
function br(e, r, t) {
  const n = [Ie(r[1] === "^", r)];
  let a = 1, s;
  for (oe.lastIndex = t; s = oe.exec(e); ) {
    const o = s[0];
    if (o[0] === "[" && o[1] !== ":") a++, n.push(Ie(o[1] === "^", o));
    else if (o === "]") {
      if (n.at(-1).type === "CharacterClassOpen") n.push(N(93, o));
      else if (a--, n.push(Er(o)), !a) break;
    } else {
      const i = xr(o);
      Array.isArray(i) ? n.push(...i) : n.push(i);
    }
  }
  return { tokens: n, lastIndex: oe.lastIndex || e.length };
}
function xr(e) {
  if (e[0] === "\\") return Xe(e, { inCharClass: !0 });
  if (e[0] === "[") {
    const r = /\[:(?<negate>\^?)(?<name>[a-z]+):\]/.exec(e);
    if (!r || !Ce.has(r.groups.name)) throw new Error(`Invalid POSIX class "${e}"`);
    return U("posix", e, { value: r.groups.name, negate: !!r.groups.negate });
  }
  return e === "-" ? $r(e) : e === "&&" ? Ar(e) : N(H(e), e);
}
function Xe(e, { inCharClass: r }) {
  const t = e[1];
  if (t === "c" || t === "C") return Lr(e);
  if ("dDhHsSwW".includes(t)) return Pr(e);
  if (e.startsWith(x`\o{`)) throw new Error(`Incomplete, invalid, or unsupported octal code point "${e}"`);
  if (/^\\[pP]\{/.test(e)) {
    if (e.length === 3) throw new Error(`Incomplete or invalid Unicode property "${e}"`);
    return Rr(e);
  }
  if (new RegExp("^\\\\x[89A-Fa-f]\\p{AHex}", "u").test(e)) try {
    const n = e.split(/\\x/).slice(1).map((o) => parseInt(o, 16)), a = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }).decode(new Uint8Array(n)), s = new TextEncoder();
    return [...a].map((o) => {
      const i = [...s.encode(o)].map((u) => `\\x${u.toString(16)}`).join("");
      return N(H(o), i);
    });
  } catch {
    throw new Error(`Multibyte code "${e}" incomplete or invalid in Oniguruma`);
  }
  if (t === "u" || t === "x") return N(Or(e), e);
  if (Se.has(t)) return N(Se.get(t), e);
  if (/\d/.test(t)) return Ir(r, e);
  if (e === "\\") throw new Error(x`Incomplete escape "\"`);
  if (t === "M") throw new Error(`Unsupported meta "${e}"`);
  if ([...e].length === 2) return N(e.codePointAt(1), e);
  throw new Error(`Unexpected escape "${e}"`);
}
function kr(e) {
  return { type: "Alternator", raw: e };
}
function Ae(e, r) {
  return { type: "Assertion", kind: e, raw: r };
}
function Ze(e) {
  return { type: "Backreference", raw: e };
}
function N(e, r) {
  return { type: "Character", value: e, raw: r };
}
function Er(e) {
  return { type: "CharacterClassClose", raw: e };
}
function $r(e) {
  return { type: "CharacterClassHyphen", raw: e };
}
function Ar(e) {
  return { type: "CharacterClassIntersector", raw: e };
}
function Ie(e, r) {
  return { type: "CharacterClassOpen", negate: e, raw: r };
}
function U(e, r, t = {}) {
  return { type: "CharacterSet", kind: e, ...t, raw: r };
}
function Qe(e, r, t = {}) {
  return e === "keep" ? { type: "Directive", kind: e, raw: r } : { type: "Directive", kind: e, flags: j(t.flags), raw: r };
}
function Ir(e, r) {
  return { type: "EscapedNumber", inCharClass: e, raw: r };
}
function Sr(e) {
  return { type: "GroupClose", raw: e };
}
function z(e, r, t = {}) {
  return { type: "GroupOpen", kind: e, ...t, raw: r };
}
function vr(e, r, t, n) {
  return { type: "NamedCallout", kind: e, tag: r, arguments: t, raw: n };
}
function _r(e, r, t, n) {
  return { type: "Quantifier", kind: e, min: r, max: t, raw: n };
}
function Mr(e) {
  return { type: "Subroutine", raw: e };
}
const Nr = /* @__PURE__ */ new Set(["COUNT", "CMP", "ERROR", "FAIL", "MAX", "MISMATCH", "SKIP", "TOTAL_COUNT"]), Se = /* @__PURE__ */ new Map([["a", 7], ["b", 8], ["e", 27], ["f", 12], ["n", 10], ["r", 13], ["t", 9], ["v", 11]]);
function Lr(e) {
  const r = e[1] === "c" ? e[2] : e[3];
  if (!r || !/[A-Za-z]/.test(r)) throw new Error(`Unsupported control character "${e}"`);
  return N(H(r.toUpperCase()) - 64, e);
}
function Fr(e, r) {
  let { on: t, off: n } = /^\(\?(?<on>[imx]*)(?:-(?<off>[-imx]*))?/.exec(e).groups;
  n ??= "";
  const a = (r.getCurrentModX() || t.includes("x")) && !n.includes("x"), s = _e(t), o = _e(n), i = {};
  if (s && (i.enable = s), o && (i.disable = o), e.endsWith(")")) return r.replaceCurrentModX(a), Qe("flags", e, { flags: i });
  if (e.endsWith(":")) return r.pushModX(a), r.numOpenGroups++, z("group", e, { ...(s || o) && { flags: i } });
  throw new Error(`Unexpected flag modifier "${e}"`);
}
function Gr(e) {
  const r = /\(\*(?<name>[A-Za-z_]\w*)?(?:\[(?<tag>(?:[A-Za-z_]\w*)?)\])?(?:\{(?<args>[^}]*)\})?\)/.exec(e);
  if (!r) throw new Error(`Incomplete or invalid named callout "${e}"`);
  const { name: t, tag: n, args: a } = r.groups;
  if (!t) throw new Error(`Invalid named callout "${e}"`);
  if (n === "") throw new Error(`Named callout tag with empty value not allowed "${e}"`);
  const s = a ? a.split(",").filter((p) => p !== "").map((p) => /^[+-]?\d+$/.test(p) ? +p : p) : [], [o, i, u] = s, c = Nr.has(t) ? t.toLowerCase() : "custom";
  switch (c) {
    case "fail":
    case "mismatch":
    case "skip":
      if (s.length > 0) throw new Error(`Named callout arguments not allowed "${s}"`);
      break;
    case "error":
      if (s.length > 1) throw new Error(`Named callout allows only one argument "${s}"`);
      if (typeof o == "string") throw new Error(`Named callout argument must be a number "${o}"`);
      break;
    case "max":
      if (!s.length || s.length > 2) throw new Error(`Named callout must have one or two arguments "${s}"`);
      if (typeof o == "string" && !/^[A-Za-z_]\w*$/.test(o)) throw new Error(`Named callout argument one must be a tag or number "${o}"`);
      if (s.length === 2 && (typeof i == "number" || !/^[<>X]$/.test(i))) throw new Error(`Named callout optional argument two must be '<', '>', or 'X' "${i}"`);
      break;
    case "count":
    case "total_count":
      if (s.length > 1) throw new Error(`Named callout allows only one argument "${s}"`);
      if (s.length === 1 && (typeof o == "number" || !/^[<>X]$/.test(o))) throw new Error(`Named callout optional argument must be '<', '>', or 'X' "${o}"`);
      break;
    case "cmp":
      if (s.length !== 3) throw new Error(`Named callout must have three arguments "${s}"`);
      if (typeof o == "string" && !/^[A-Za-z_]\w*$/.test(o)) throw new Error(`Named callout argument one must be a tag or number "${o}"`);
      if (typeof i == "number" || !/^(?:[<>!=]=|[<>])$/.test(i)) throw new Error(`Named callout argument two must be '==', '!=', '>', '<', '>=', or '<=' "${i}"`);
      if (typeof u == "string" && !/^[A-Za-z_]\w*$/.test(u)) throw new Error(`Named callout argument three must be a tag or number "${u}"`);
      break;
    case "custom":
      throw new Error(`Undefined callout name "${t}"`);
    default:
      throw new Error(`Unexpected named callout kind "${c}"`);
  }
  return vr(c, n ?? null, a?.split(",") ?? null, e);
}
function ve(e) {
  let r = null, t, n;
  if (e[0] === "{") {
    const { minStr: a, maxStr: s } = /^\{(?<minStr>\d*)(?:,(?<maxStr>\d*))?/.exec(e).groups, o = 1e5;
    if (+a > o || s && +s > o) throw new Error("Quantifier value unsupported in Oniguruma");
    if (t = +a, n = s === void 0 ? +a : s === "" ? 1 / 0 : +s, t > n && (r = "possessive", [t, n] = [n, t]), e.endsWith("?")) {
      if (r === "possessive") throw new Error('Unsupported possessive interval quantifier chain with "?"');
      r = "lazy";
    } else r || (r = "greedy");
  } else t = e[0] === "+" ? 1 : 0, n = e[0] === "?" ? 1 : 1 / 0, r = e[1] === "+" ? "possessive" : e[1] === "?" ? "lazy" : "greedy";
  return _r(r, t, n, e);
}
function Pr(e) {
  const r = e[1].toLowerCase();
  return U({ d: "digit", h: "hex", s: "space", w: "word" }[r], e, { negate: e[1] !== r });
}
function Rr(e) {
  const { p: r, neg: t, value: n } = /^\\(?<p>[pP])\{(?<neg>\^?)(?<value>[^}]+)/.exec(e).groups;
  return U("property", e, { value: n, negate: r === "P" && !t || r === "p" && !!t });
}
function _e(e) {
  const r = {};
  return e.includes("i") && (r.ignoreCase = !0), e.includes("m") && (r.dotAll = !0), e.includes("x") && (r.extended = !0), Object.keys(r).length ? r : null;
}
function Ur(e) {
  const r = { ignoreCase: !1, dotAll: !1, extended: !1, digitIsAscii: !1, posixIsAscii: !1, spaceIsAscii: !1, wordIsAscii: !1, textSegmentMode: null };
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!"imxDPSWy".includes(n)) throw new Error(`Invalid flag "${n}"`);
    if (n === "y") {
      if (!/^y{[gw]}/.test(e.slice(t))) throw new Error('Invalid or unspecified flag "y" mode');
      r.textSegmentMode = e[t + 2] === "g" ? "grapheme" : "word", t += 3;
      continue;
    }
    r[{ i: "ignoreCase", m: "dotAll", x: "extended", D: "digitIsAscii", P: "posixIsAscii", S: "spaceIsAscii", W: "wordIsAscii" }[n]] = !0;
  }
  return r;
}
function Or(e) {
  if (new RegExp("^(?:\\\\u(?!\\p{AHex}{4})|\\\\x(?!\\p{AHex}{1,2}|\\{\\p{AHex}{1,8}\\}))", "u").test(e)) throw new Error(`Incomplete or invalid escape "${e}"`);
  const r = e[2] === "{" ? new RegExp("^\\\\x\\{\\s*(?<hex>\\p{AHex}+)", "u").exec(e).groups.hex : e.slice(2);
  return parseInt(r, 16);
}
function Dr(e, r) {
  const { raw: t, inCharClass: n } = e, a = t.slice(1);
  if (!n && (a !== "0" && a.length === 1 || a[0] !== "0" && +a <= r)) return [Ze(t)];
  const s = [], o = a.match(/^[0-7]+|\d/g);
  for (let i = 0; i < o.length; i++) {
    const u = o[i];
    let c;
    if (i === 0 && u !== "8" && u !== "9") {
      if (c = parseInt(u, 8), c > 127) throw new Error(x`Octal encoded byte above 177 unsupported "${t}"`);
    } else c = H(u);
    s.push(N(c, (i === 0 ? "\\" : "") + u));
  }
  return s;
}
function Br(e) {
  const r = [], t = new RegExp(be, "gy");
  let n;
  for (; n = t.exec(e); ) {
    const a = n[0];
    if (a[0] === "{") {
      const s = /^\{(?<min>\d+),(?<max>\d+)\}\??$/.exec(a);
      if (s) {
        const { min: o, max: i } = s.groups;
        if (+o > +i && a.endsWith("?")) {
          t.lastIndex--, r.push(ve(a.slice(0, -1)));
          continue;
        }
      }
    }
    r.push(ve(a));
  }
  return r;
}
function qe(e, r) {
  if (!Array.isArray(e.body)) throw new Error("Expected node with body array");
  if (e.body.length !== 1) return !1;
  const t = e.body[0];
  return !r || Object.keys(r).every((n) => r[n] === t[n]);
}
function Tr(e) {
  return Vr.has(e.type);
}
const Vr = /* @__PURE__ */ new Set(["AbsenceFunction", "Backreference", "CapturingGroup", "Character", "CharacterClass", "CharacterSet", "Group", "Quantifier", "Subroutine"]);
function Je(e, r = {}) {
  const t = { flags: "", normalizeUnknownPropertyNames: !1, skipBackrefValidation: !1, skipLookbehindValidation: !1, skipPropertyNameValidation: !1, unicodePropertyMap: null, ...r, rules: { captureGroup: !1, singleline: !1, ...r.rules } }, n = yr(e, { flags: t.flags, rules: { captureGroup: t.rules.captureGroup, singleline: t.rules.singleline } }), a = (f, g) => {
    const d = n.tokens[s.nextIndex];
    switch (s.parent = f, s.nextIndex++, d.type) {
      case "Alternator":
        return O();
      case "Assertion":
        return zr(d);
      case "Backreference":
        return Wr(d, s);
      case "Character":
        return ne(d.value, { useLastValid: !!g.isCheckingRangeEnd });
      case "CharacterClassHyphen":
        return Hr(d, s, g);
      case "CharacterClassOpen":
        return jr(d, s, g);
      case "CharacterSet":
        return Xr(d, s);
      case "Directive":
        return Yr(d.kind, { flags: d.flags });
      case "GroupOpen":
        return Zr(d, s, g);
      case "NamedCallout":
        return rt(d.kind, d.tag, d.arguments);
      case "Quantifier":
        return Qr(d, s);
      case "Subroutine":
        return qr(d, s);
      default:
        throw new Error(`Unexpected token type "${d.type}"`);
    }
  }, s = { capturingGroups: [], hasNumberedRef: !1, namedGroupsByName: /* @__PURE__ */ new Map(), nextIndex: 0, normalizeUnknownPropertyNames: t.normalizeUnknownPropertyNames, parent: null, skipBackrefValidation: t.skipBackrefValidation, skipLookbehindValidation: t.skipLookbehindValidation, skipPropertyNameValidation: t.skipPropertyNameValidation, subroutines: [], tokens: n.tokens, unicodePropertyMap: t.unicodePropertyMap, walk: a }, o = nt(et(n.flags));
  let i = o.body[0];
  for (; s.nextIndex < n.tokens.length; ) {
    const f = a(i, {});
    f.type === "Alternative" ? (o.body.push(f), i = f) : i.body.push(f);
  }
  const { capturingGroups: u, hasNumberedRef: c, namedGroupsByName: p, subroutines: l } = s;
  if (c && p.size && !t.rules.captureGroup) throw new Error("Numbered backref/subroutine not allowed when using named capture");
  for (const { ref: f } of l) if (typeof f == "number") {
    if (f > u.length) throw new Error("Subroutine uses a group number that's not defined");
    f && (u[f - 1].isSubroutined = !0);
  } else if (p.has(f)) {
    if (p.get(f).length > 1) throw new Error(x`Subroutine uses a duplicate group name "\g<${f}>"`);
    p.get(f)[0].isSubroutined = !0;
  } else throw new Error(x`Subroutine uses a group name that's not defined "\g<${f}>"`);
  return o;
}
function zr({ kind: e }) {
  return de(j({ "^": "line_start", $: "line_end", "\\A": "string_start", "\\b": "word_boundary", "\\B": "word_boundary", "\\G": "search_start", "\\y": "text_segment_boundary", "\\Y": "text_segment_boundary", "\\z": "string_end", "\\Z": "string_end_newline" }[e], `Unexpected assertion kind "${e}"`), { negate: e === x`\B` || e === x`\Y` });
}
function Wr({ raw: e }, r) {
  const t = /^\\k[<']/.test(e), n = t ? e.slice(3, -1) : e.slice(1), a = (s, o = !1) => {
    const i = r.capturingGroups.length;
    let u = !1;
    if (s > i) if (r.skipBackrefValidation) u = !0;
    else throw new Error(`Not enough capturing groups defined to the left "${e}"`);
    return r.hasNumberedRef = !0, ge(o ? i + 1 - s : s, { orphan: u });
  };
  if (t) {
    const s = /^(?<sign>-?)0*(?<num>[1-9]\d*)$/.exec(n);
    if (s) return a(+s.groups.num, !!s.groups.sign);
    if (/[-+]/.test(n)) throw new Error(`Invalid backref name "${e}"`);
    if (!r.namedGroupsByName.has(n)) throw new Error(`Group name not defined to the left "${e}"`);
    return ge(n);
  }
  return a(+n);
}
function Hr(e, r, t) {
  const { tokens: n, walk: a } = r, s = r.parent, o = s.body.at(-1), i = n[r.nextIndex];
  if (!t.isCheckingRangeEnd && o && o.type !== "CharacterClass" && o.type !== "CharacterClassRange" && i && i.type !== "CharacterClassOpen" && i.type !== "CharacterClassClose" && i.type !== "CharacterClassIntersector") {
    const u = a(s, { ...t, isCheckingRangeEnd: !0 });
    if (o.type === "Character" && u.type === "Character") return s.body.pop(), Kr(o, u);
    throw new Error("Invalid character class range");
  }
  return ne(H("-"));
}
function jr({ negate: e }, r, t) {
  const { tokens: n, walk: a } = r, s = n[r.nextIndex], o = [re()];
  let i = Le(s);
  for (; i.type !== "CharacterClassClose"; ) {
    if (i.type === "CharacterClassIntersector") o.push(re()), r.nextIndex++;
    else {
      const c = o.at(-1);
      c.body.push(a(c, t));
    }
    i = Le(n[r.nextIndex], s);
  }
  const u = re({ negate: e });
  return o.length === 1 ? u.body = o[0].body : (u.kind = "intersection", u.body = o.map((c) => c.body.length === 1 ? c.body[0] : c)), r.nextIndex++, u;
}
function Xr({ kind: e, negate: r, value: t }, n) {
  const { normalizeUnknownPropertyNames: a, skipPropertyNameValidation: s, unicodePropertyMap: o } = n;
  if (e === "property") {
    const i = se(t);
    if (Ce.has(i) && !o?.has(i)) e = "posix", t = i;
    else return W(t, { negate: r, normalizeUnknownPropertyNames: a, skipPropertyNameValidation: s, unicodePropertyMap: o });
  }
  return e === "posix" ? tt(t, { negate: r }) : he(e, { negate: r });
}
function Zr(e, r, t) {
  const { tokens: n, capturingGroups: a, namedGroupsByName: s, skipLookbehindValidation: o, walk: i } = r, u = st(e), c = u.type === "AbsenceFunction", p = Ne(u), l = p && u.negate;
  if (u.type === "CapturingGroup" && (a.push(u), u.name && mr(s, u.name, []).push(u)), c && t.isInAbsenceFunction) throw new Error("Nested absence function not supported by Oniguruma");
  let f = Fe(n[r.nextIndex]);
  for (; f.type !== "GroupClose"; ) {
    if (f.type === "Alternator") u.body.push(O()), r.nextIndex++;
    else {
      const g = u.body.at(-1), d = i(g, { ...t, isInAbsenceFunction: t.isInAbsenceFunction || c, isInLookbehind: t.isInLookbehind || p, isInNegLookbehind: t.isInNegLookbehind || l });
      if (g.body.push(d), (p || t.isInLookbehind) && !o) {
        const w = "Lookbehind includes a pattern not allowed by Oniguruma";
        if (l || t.isInNegLookbehind) {
          if (Me(d) || d.type === "CapturingGroup") throw new Error(w);
        } else if (Me(d) || Ne(d) && d.negate) throw new Error(w);
      }
    }
    f = Fe(n[r.nextIndex]);
  }
  return r.nextIndex++, u;
}
function Qr({ kind: e, min: r, max: t }, n) {
  const a = n.parent, s = a.body.at(-1);
  if (!s || !Tr(s)) throw new Error("Quantifier requires a repeatable token");
  const o = Ye(e, r, t, s);
  return a.body.pop(), o;
}
function qr({ raw: e }, r) {
  const { capturingGroups: t, subroutines: n } = r;
  let a = e.slice(3, -1);
  const s = /^(?<sign>[-+]?)0*(?<num>[1-9]\d*)$/.exec(a);
  if (s) {
    const i = +s.groups.num, u = t.length;
    if (r.hasNumberedRef = !0, a = { "": i, "+": u + i, "-": u + 1 - i }[s.groups.sign], a < 1) throw new Error("Invalid subroutine number");
  } else a === "0" && (a = 0);
  const o = er(a);
  return n.push(o), o;
}
function Jr(e, r) {
  return { type: "AbsenceFunction", kind: e, body: q(r?.body) };
}
function O(e) {
  return { type: "Alternative", body: rr(e?.body) };
}
function de(e, r) {
  const t = { type: "Assertion", kind: e };
  return (e === "word_boundary" || e === "text_segment_boundary") && (t.negate = !!r?.negate), t;
}
function ge(e, r) {
  const t = !!r?.orphan;
  return { type: "Backreference", ref: e, ...t && { orphan: t } };
}
function Ke(e, r) {
  const t = { name: void 0, isSubroutined: !1, ...r };
  if (t.name !== void 0 && !at(t.name)) throw new Error(`Group name "${t.name}" invalid in Oniguruma`);
  return { type: "CapturingGroup", number: e, ...t.name && { name: t.name }, ...t.isSubroutined && { isSubroutined: t.isSubroutined }, body: q(r?.body) };
}
function ne(e, r) {
  const t = { useLastValid: !1, ...r };
  if (e > 1114111) {
    const n = e.toString(16);
    if (t.useLastValid) e = 1114111;
    else throw e > 1310719 ? new Error(`Invalid code point out of range "\\x{${n}}"`) : new Error(`Invalid code point out of range in JS "\\x{${n}}"`);
  }
  return { type: "Character", value: e };
}
function re(e) {
  const r = { kind: "union", negate: !1, ...e };
  return { type: "CharacterClass", kind: r.kind, negate: r.negate, body: rr(e?.body) };
}
function Kr(e, r) {
  if (r.value < e.value) throw new Error("Character class range out of order");
  return { type: "CharacterClassRange", min: e, max: r };
}
function he(e, r) {
  const t = !!r?.negate, n = { type: "CharacterSet", kind: e };
  return (e === "digit" || e === "hex" || e === "newline" || e === "space" || e === "word") && (n.negate = t), (e === "text_segment" || e === "newline" && !t) && (n.variableLength = !0), n;
}
function Yr(e, r = {}) {
  if (e === "keep") return { type: "Directive", kind: e };
  if (e === "flags") return { type: "Directive", kind: e, flags: j(r.flags) };
  throw new Error(`Unexpected directive kind "${e}"`);
}
function et(e) {
  return { type: "Flags", ...e };
}
function v(e) {
  const r = e?.atomic, t = e?.flags;
  if (r && t) throw new Error("Atomic group cannot have flags");
  return { type: "Group", ...r && { atomic: r }, ...t && { flags: t }, body: q(e?.body) };
}
function R(e) {
  const r = { behind: !1, negate: !1, ...e };
  return { type: "LookaroundAssertion", kind: r.behind ? "lookbehind" : "lookahead", negate: r.negate, body: q(e?.body) };
}
function rt(e, r, t) {
  return { type: "NamedCallout", kind: e, tag: r, arguments: t };
}
function tt(e, r) {
  const t = !!r?.negate;
  if (!Ce.has(e)) throw new Error(`Invalid POSIX class "${e}"`);
  return { type: "CharacterSet", kind: "posix", value: e, negate: t };
}
function Ye(e, r, t, n) {
  if (r > t) throw new Error("Invalid reversed quantifier range");
  return { type: "Quantifier", kind: e, min: r, max: t, body: n };
}
function nt(e, r) {
  return { type: "Regex", body: q(r?.body), flags: e };
}
function er(e) {
  return { type: "Subroutine", ref: e };
}
function W(e, r) {
  const t = { negate: !1, normalizeUnknownPropertyNames: !1, skipPropertyNameValidation: !1, unicodePropertyMap: null, ...r };
  let n = t.unicodePropertyMap?.get(se(e));
  if (!n) {
    if (t.normalizeUnknownPropertyNames) n = ot(e);
    else if (t.unicodePropertyMap && !t.skipPropertyNameValidation) throw new Error(x`Invalid Unicode property "\p{${e}}"`);
  }
  return { type: "CharacterSet", kind: "property", value: n ?? e, negate: t.negate };
}
function st({ flags: e, kind: r, name: t, negate: n, number: a }) {
  switch (r) {
    case "absence_repeater":
      return Jr("repeater");
    case "atomic":
      return v({ atomic: !0 });
    case "capturing":
      return Ke(a, { name: t });
    case "group":
      return v({ flags: e });
    case "lookahead":
    case "lookbehind":
      return R({ behind: r === "lookbehind", negate: n });
    default:
      throw new Error(`Unexpected group kind "${r}"`);
  }
}
function q(e) {
  if (e === void 0) e = [O()];
  else if (!Array.isArray(e) || !e.length || !e.every((r) => r.type === "Alternative")) throw new Error("Invalid body; expected array of one or more Alternative nodes");
  return e;
}
function rr(e) {
  if (e === void 0) e = [];
  else if (!Array.isArray(e) || !e.every((r) => !!r.type)) throw new Error("Invalid body; expected array of nodes");
  return e;
}
function Me(e) {
  return e.type === "LookaroundAssertion" && e.kind === "lookahead";
}
function Ne(e) {
  return e.type === "LookaroundAssertion" && e.kind === "lookbehind";
}
function at(e) {
  return /^[\p{Alpha}\p{Pc}][^)]*$/u.test(e);
}
function ot(e) {
  return e.trim().replace(/[- _]+/g, "_").replace(/[A-Z][a-z]+(?=[A-Z])/g, "$&_").replace(/[A-Za-z]+/g, (r) => r[0].toUpperCase() + r.slice(1).toLowerCase());
}
function se(e) {
  return e.replace(/[- _]+/g, "").toLowerCase();
}
function Le(e, r) {
  return j(e, `${r?.type === "Character" && r.value === 93 ? "Empty" : "Unclosed"} character class`);
}
function Fe(e) {
  return j(e, "Unclosed group");
}
function Z(e, r, t = null) {
  function n(s, o) {
    for (let i = 0; i < s.length; i++) {
      const u = a(s[i], o, i, s);
      i = Math.max(-1, i + u);
    }
  }
  function a(s, o = null, i = null, u = null) {
    let c = 0, p = !1;
    const l = { node: s, parent: o, key: i, container: u, root: e, remove() {
      Y(u).splice(Math.max(0, T(i) + c), 1), c--, p = !0;
    }, removeAllNextSiblings() {
      return Y(u).splice(T(i) + 1);
    }, removeAllPrevSiblings() {
      const y = T(i) + c;
      return c -= y, Y(u).splice(0, Math.max(0, y));
    }, replaceWith(y, E = {}) {
      const $ = !!E.traverse;
      u ? u[Math.max(0, T(i) + c)] = y : j(o, "Can't replace root node")[i] = y, $ && a(y, o, i, u), p = !0;
    }, replaceWithMultiple(y, E = {}) {
      const $ = !!E.traverse;
      if (Y(u).splice(Math.max(0, T(i) + c), 1, ...y), c += y.length - 1, $) {
        let k = 0;
        for (let A = 0; A < y.length; A++) k += a(y[A], o, T(i) + A + k, u);
      }
      p = !0;
    }, skip() {
      p = !0;
    } }, { type: f } = s, g = r["*"], d = r[f], w = typeof g == "function" ? g : g?.enter, m = typeof d == "function" ? d : d?.enter;
    if (w?.(l, t), m?.(l, t), !p) switch (f) {
      case "AbsenceFunction":
      case "CapturingGroup":
      case "Group":
        n(s.body, s);
        break;
      case "Alternative":
      case "CharacterClass":
        n(s.body, s);
        break;
      case "Assertion":
      case "Backreference":
      case "Character":
      case "CharacterSet":
      case "Directive":
      case "Flags":
      case "NamedCallout":
      case "Subroutine":
        break;
      case "CharacterClassRange":
        a(s.min, s, "min"), a(s.max, s, "max");
        break;
      case "LookaroundAssertion":
        n(s.body, s);
        break;
      case "Quantifier":
        a(s.body, s, "body");
        break;
      case "Regex":
        n(s.body, s), a(s.flags, s, "flags");
        break;
      default:
        throw new Error(`Unexpected node type "${f}"`);
    }
    return d?.exit?.(l, t), g?.exit?.(l, t), c;
  }
  return a(e), e;
}
function Y(e) {
  if (!Array.isArray(e)) throw new Error("Container expected");
  return e;
}
function T(e) {
  if (typeof e != "number") throw new Error("Numeric key expected");
  return e;
}
const it = String.raw`\(\?(?:[:=!>A-Za-z\-]|<[=!]|\(DEFINE\))`;
function ut(e, r) {
  for (let t = 0; t < e.length; t++)
    e[t] >= r && e[t]++;
}
function ct(e, r, t, n) {
  return e.slice(0, r) + n + e.slice(r + t.length);
}
const S = Object.freeze({
  DEFAULT: "DEFAULT",
  CHAR_CLASS: "CHAR_CLASS"
});
function xe(e, r, t, n) {
  const a = new RegExp(String.raw`${r}|(?<$skip>\[\^?|\\?.)`, "gsu"), s = [!1];
  let o = 0, i = "";
  for (const u of e.matchAll(a)) {
    const { 0: c, groups: { $skip: p } } = u;
    if (!p && (!n || n === S.DEFAULT == !o)) {
      t instanceof Function ? i += t(u, {
        context: o ? S.CHAR_CLASS : S.DEFAULT,
        negated: s[s.length - 1]
      }) : i += t;
      continue;
    }
    c[0] === "[" ? (o++, s.push(c[1] === "^")) : c === "]" && o && (o--, s.pop()), i += c;
  }
  return i;
}
function tr(e, r, t, n) {
  xe(e, r, t, n);
}
function lt(e, r, t = 0, n) {
  if (!new RegExp(r, "su").test(e))
    return null;
  const a = new RegExp(`${r}|(?<$skip>\\\\?.)`, "gsu");
  a.lastIndex = t;
  let s = 0, o;
  for (; o = a.exec(e); ) {
    const { 0: i, groups: { $skip: u } } = o;
    if (!u && (!n || n === S.DEFAULT == !s))
      return o;
    i === "[" ? s++ : i === "]" && s && s--, a.lastIndex == o.index && a.lastIndex++;
  }
  return null;
}
function ee(e, r, t) {
  return !!lt(e, r, 0, t);
}
function pt(e, r) {
  const t = /\\?./gsu;
  t.lastIndex = r;
  let n = e.length, a = 0, s = 1, o;
  for (; o = t.exec(e); ) {
    const [i] = o;
    if (i === "[")
      a++;
    else if (a)
      i === "]" && a--;
    else if (i === "(")
      s++;
    else if (i === ")" && (s--, !s)) {
      n = o.index;
      break;
    }
  }
  return e.slice(r, n);
}
const Ge = new RegExp(String.raw`(?<noncapturingStart>${it})|(?<capturingStart>\((?:\?<[^>]+>)?)|\\?.`, "gsu");
function ft(e, r) {
  const t = r?.hiddenCaptures ?? [];
  let n = r?.captureTransfers ?? /* @__PURE__ */ new Map();
  if (!/\(\?>/.test(e))
    return {
      pattern: e,
      captureTransfers: n,
      hiddenCaptures: t
    };
  const a = "(?>", s = "(?:(?=(", o = [0], i = [];
  let u = 0, c = 0, p = NaN, l;
  do {
    l = !1;
    let f = 0, g = 0, d = !1, w;
    for (Ge.lastIndex = Number.isNaN(p) ? 0 : p + s.length; w = Ge.exec(e); ) {
      const { 0: m, index: y, groups: { capturingStart: E, noncapturingStart: $ } } = w;
      if (m === "[")
        f++;
      else if (f)
        m === "]" && f--;
      else if (m === a && !d)
        p = y, d = !0;
      else if (d && $)
        g++;
      else if (E)
        d ? g++ : (u++, o.push(u + c));
      else if (m === ")" && d) {
        if (!g) {
          c++;
          const k = u + c;
          if (e = `${e.slice(0, p)}${s}${e.slice(p + a.length, y)}))<$$${k}>)${e.slice(y + 1)}`, l = !0, i.push(k), ut(t, k), n.size) {
            const A = /* @__PURE__ */ new Map();
            n.forEach((J, D) => {
              A.set(
                D >= k ? D + 1 : D,
                J.map((B) => B >= k ? B + 1 : B)
              );
            }), n = A;
          }
          break;
        }
        g--;
      }
    }
  } while (l);
  return t.push(...i), e = xe(
    e,
    String.raw`\\(?<backrefNum>[1-9]\d*)|<\$\$(?<wrappedBackrefNum>\d+)>`,
    ({ 0: f, groups: { backrefNum: g, wrappedBackrefNum: d } }) => {
      if (g) {
        const w = +g;
        if (w > o.length - 1)
          throw new Error(`Backref "${f}" greater than number of captures`);
        return `\\${o[w]}`;
      }
      return `\\${d}`;
    },
    S.DEFAULT
  ), {
    pattern: e,
    captureTransfers: n,
    hiddenCaptures: t
  };
}
const nr = String.raw`(?:[?*+]|\{\d+(?:,\d*)?\})`, ie = new RegExp(String.raw`
\\(?: \d+
  | c[A-Za-z]
  | [gk]<[^>]+>
  | [pPu]\{[^\}]+\}
  | u[A-Fa-f\d]{4}
  | x[A-Fa-f\d]{2}
  )
| \((?: \? (?: [:=!>]
  | <(?:[=!]|[^>]+>)
  | [A-Za-z\-]+:
  | \(DEFINE\)
  ))?
| (?<qBase>${nr})(?<qMod>[?+]?)(?<invalidQ>[?*+\{]?)
| \\?.
`.replace(/\s+/g, ""), "gsu");
function dt(e) {
  if (!new RegExp(`${nr}\\+`).test(e))
    return {
      pattern: e
    };
  const r = [];
  let t = null, n = null, a = "", s = 0, o;
  for (ie.lastIndex = 0; o = ie.exec(e); ) {
    const { 0: i, index: u, groups: { qBase: c, qMod: p, invalidQ: l } } = o;
    if (i === "[")
      s || (n = u), s++;
    else if (i === "]")
      s ? s-- : n = null;
    else if (!s)
      if (p === "+" && a && !a.startsWith("(")) {
        if (l)
          throw new Error(`Invalid quantifier "${i}"`);
        let f = -1;
        if (/^\{\d+\}$/.test(c))
          e = ct(e, u + c.length, p, "");
        else {
          if (a === ")" || a === "]") {
            const g = a === ")" ? t : n;
            if (g === null)
              throw new Error(`Invalid unmatched "${a}"`);
            e = `${e.slice(0, g)}(?>${e.slice(g, u)}${c})${e.slice(u + i.length)}`;
          } else
            e = `${e.slice(0, u - a.length)}(?>${a}${c})${e.slice(u + i.length)}`;
          f += 4;
        }
        ie.lastIndex += f;
      } else i[0] === "(" ? r.push(u) : i === ")" && (t = r.length ? r.pop() : null);
    a = i;
  }
  return {
    pattern: e
  };
}
const I = String.raw, gt = I`\\g<(?<gRNameOrNum>[^>&]+)&R=(?<gRDepth>[^>]+)>`, we = I`\(\?R=(?<rDepth>[^\)]+)\)|${gt}`, ae = I`\(\?<(?![=!])(?<captureName>[^>]+)>`, sr = I`${ae}|(?<unnamed>\()(?!\?)`, P = new RegExp(I`${ae}|${we}|\(\?|\\?.`, "gsu"), ue = "Cannot use multiple overlapping recursions";
function ht(e, r) {
  const { hiddenCaptures: t, mode: n } = {
    hiddenCaptures: [],
    mode: "plugin",
    ...r
  };
  let a = r?.captureTransfers ?? /* @__PURE__ */ new Map();
  if (!new RegExp(we, "su").test(e))
    return {
      pattern: e,
      captureTransfers: a,
      hiddenCaptures: t
    };
  if (n === "plugin" && ee(e, I`\(\?\(DEFINE\)`, S.DEFAULT))
    throw new Error("DEFINE groups cannot be used with recursion");
  const s = [], o = ee(e, I`\\[1-9]`, S.DEFAULT), i = /* @__PURE__ */ new Map(), u = [];
  let c = !1, p = 0, l = 0, f;
  for (P.lastIndex = 0; f = P.exec(e); ) {
    const { 0: g, groups: { captureName: d, rDepth: w, gRNameOrNum: m, gRDepth: y } } = f;
    if (g === "[")
      p++;
    else if (p)
      g === "]" && p--;
    else if (w) {
      if (Pe(w), c)
        throw new Error(ue);
      if (o)
        throw new Error(
          // When used in `external` mode by transpilers other than Regex+, backrefs might have
          // gone through conversion from named to numbered, so avoid a misleading error
          `${n === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with global recursion`
        );
      const E = e.slice(0, f.index), $ = e.slice(P.lastIndex);
      if (ee($, we, S.DEFAULT))
        throw new Error(ue);
      const k = +w - 1;
      e = Re(
        E,
        $,
        k,
        !1,
        t,
        s,
        l
      ), a = Oe(
        a,
        E,
        k,
        s.length,
        0,
        l
      );
      break;
    } else if (m) {
      Pe(y);
      let E = !1;
      for (const X of u)
        if (X.name === m || X.num === +m) {
          if (E = !0, X.hasRecursedWithin)
            throw new Error(ue);
          break;
        }
      if (!E)
        throw new Error(I`Recursive \g cannot be used outside the referenced group "${n === "external" ? m : I`\g<${m}&R=${y}>`}"`);
      const $ = i.get(m), k = pt(e, $);
      if (o && ee(k, I`${ae}|\((?!\?)`, S.DEFAULT))
        throw new Error(
          // When used in `external` mode by transpilers other than Regex+, backrefs might have
          // gone through conversion from named to numbered, so avoid a misleading error
          `${n === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with recursion of capturing groups`
        );
      const A = e.slice($, f.index), J = k.slice(A.length + g.length), D = s.length, B = +y - 1, $e = Re(
        A,
        J,
        B,
        !0,
        t,
        s,
        l
      );
      a = Oe(
        a,
        A,
        B,
        s.length - D,
        D,
        l
      );
      const hr = e.slice(0, $), wr = e.slice($ + k.length);
      e = `${hr}${$e}${wr}`, P.lastIndex += $e.length - g.length - A.length - J.length, u.forEach((X) => X.hasRecursedWithin = !0), c = !0;
    } else if (d)
      l++, i.set(String(l), P.lastIndex), i.set(d, P.lastIndex), u.push({
        num: l,
        name: d
      });
    else if (g[0] === "(") {
      const E = g === "(";
      E && (l++, i.set(String(l), P.lastIndex)), u.push(E ? { num: l } : {});
    } else g === ")" && u.pop();
  }
  return t.push(...s), {
    pattern: e,
    captureTransfers: a,
    hiddenCaptures: t
  };
}
function Pe(e) {
  const r = `Max depth must be integer between 2 and 100; used ${e}`;
  if (!/^[1-9]\d*$/.test(e))
    throw new Error(r);
  if (e = +e, e < 2 || e > 100)
    throw new Error(r);
}
function Re(e, r, t, n, a, s, o) {
  const i = /* @__PURE__ */ new Set();
  n && tr(e + r, ae, ({ groups: { captureName: c } }) => {
    i.add(c);
  }, S.DEFAULT);
  const u = [
    t,
    n ? i : null,
    a,
    s,
    o
  ];
  return `${e}${Ue(`(?:${e}`, "forward", ...u)}(?:)${Ue(`${r})`, "backward", ...u)}${r}`;
}
function Ue(e, r, t, n, a, s, o) {
  const u = (p) => r === "forward" ? p + 2 : t - p + 2 - 1;
  let c = "";
  for (let p = 0; p < t; p++) {
    const l = u(p);
    c += xe(
      e,
      I`${sr}|\\k<(?<backref>[^>]+)>`,
      ({ 0: f, groups: { captureName: g, unnamed: d, backref: w } }) => {
        if (w && n && !n.has(w))
          return f;
        const m = `_$${l}`;
        if (d || g) {
          const y = o + s.length + 1;
          return s.push(y), wt(a, y), d ? f : `(?<${g}${m}>`;
        }
        return I`\k<${w}${m}>`;
      },
      S.DEFAULT
    );
  }
  return c;
}
function wt(e, r) {
  for (let t = 0; t < e.length; t++)
    e[t] >= r && e[t]++;
}
function Oe(e, r, t, n, a, s) {
  if (e.size && n) {
    let o = 0;
    tr(r, sr, () => o++, S.DEFAULT);
    const i = s - o + a, u = /* @__PURE__ */ new Map();
    return e.forEach((c, p) => {
      const l = (n - o * t) / t, f = o * t, g = p > i + o ? p + n : p, d = [];
      for (const w of c)
        if (w <= i)
          d.push(w);
        else if (w > i + o + l)
          d.push(w + n);
        else if (w <= i + o)
          for (let m = 0; m <= t; m++)
            d.push(w + o * m);
        else
          for (let m = 0; m <= t; m++)
            d.push(w + f + l * m);
      u.set(g, d);
    }), u;
  }
  return e;
}
var b = String.fromCodePoint, h = String.raw, L = {
  flagGroups: (() => {
    try {
      new RegExp("(?i:)");
    } catch {
      return !1;
    }
    return !0;
  })(),
  unicodeSets: (() => {
    try {
      new RegExp("[[]]", "v");
    } catch {
      return !1;
    }
    return !0;
  })()
};
L.bugFlagVLiteralHyphenIsRange = L.unicodeSets ? (() => {
  try {
    new RegExp(h`[\d\-a]`, "v");
  } catch {
    return !0;
  }
  return !1;
})() : !1;
L.bugNestedClassIgnoresNegation = L.unicodeSets && new RegExp("[[^a]]", "v").test("a");
function te(e, { enable: r, disable: t }) {
  return {
    dotAll: !t?.dotAll && !!(r?.dotAll || e.dotAll),
    ignoreCase: !t?.ignoreCase && !!(r?.ignoreCase || e.ignoreCase)
  };
}
function Q(e, r, t) {
  return e.has(r) || e.set(r, t), e.get(r);
}
function me(e, r) {
  return De[e] >= De[r];
}
function mt(e, r) {
  if (e == null)
    throw new Error(r ?? "Value expected");
  return e;
}
var De = {
  ES2025: 2025,
  ES2024: 2024,
  ES2018: 2018
}, yt = (
  /** @type {const} */
  {
    auto: "auto",
    ES2025: "ES2025",
    ES2024: "ES2024",
    ES2018: "ES2018"
  }
);
function ar(e = {}) {
  if ({}.toString.call(e) !== "[object Object]")
    throw new Error("Unexpected options");
  if (e.target !== void 0 && !yt[e.target])
    throw new Error(`Unexpected target "${e.target}"`);
  const r = {
    // Sets the level of emulation rigor/strictness.
    accuracy: "default",
    // Disables advanced emulation that relies on returning a `RegExp` subclass, resulting in
    // certain patterns not being emulatable.
    avoidSubclass: !1,
    // Oniguruma flags; a string with `i`, `m`, `x`, `D`, `S`, `W`, `y{g}` in any order (all
    // optional). Oniguruma's `m` is equivalent to JavaScript's `s` (`dotAll`).
    flags: "",
    // Include JavaScript flag `g` (`global`) in the result.
    global: !1,
    // Include JavaScript flag `d` (`hasIndices`) in the result.
    hasIndices: !1,
    // Delay regex construction until first use if the transpiled pattern is at least this length.
    lazyCompileLength: 1 / 0,
    // JavaScript version used for generated regexes. Using `auto` detects the best value based on
    // your environment. Later targets allow faster processing, simpler generated source, and
    // support for additional features.
    target: "auto",
    // Disables minifications that simplify the pattern without changing the meaning.
    verbose: !1,
    ...e,
    // Advanced options that override standard behavior, error checking, and flags when enabled.
    rules: {
      // Useful with TextMate grammars that merge backreferences across patterns.
      allowOrphanBackrefs: !1,
      // Use ASCII `\b` and `\B`, which increases search performance of generated regexes.
      asciiWordBoundaries: !1,
      // Allow unnamed captures and numbered calls (backreferences and subroutines) when using
      // named capture. This is Oniguruma option `ONIG_OPTION_CAPTURE_GROUP`; on by default in
      // `vscode-oniguruma`.
      captureGroup: !1,
      // Change the recursion depth limit from Oniguruma's `20` to an integer `2`–`20`.
      recursionLimit: 20,
      // `^` as `\A`; `$` as`\Z`. Improves search performance of generated regexes without changing
      // the meaning if searching line by line. This is Oniguruma option `ONIG_OPTION_SINGLELINE`.
      singleline: !1,
      ...e.rules
    }
  };
  return r.target === "auto" && (r.target = L.flagGroups ? "ES2025" : L.unicodeSets ? "ES2024" : "ES2018"), r;
}
var Ct = "[	-\r ]", bt = /* @__PURE__ */ new Set([
  b(304),
  // İ
  b(305)
  // ı
]), _ = h`[\p{L}\p{M}\p{N}\p{Pc}]`;
function or(e) {
  if (bt.has(e))
    return [e];
  const r = /* @__PURE__ */ new Set(), t = e.toLowerCase(), n = t.toUpperCase(), a = Et.get(t), s = xt.get(t), o = kt.get(t);
  return [...n].length === 1 && r.add(n), o && r.add(o), a && r.add(a), r.add(t), s && r.add(s), [...r];
}
var ke = /* @__PURE__ */ new Map(
  `C Other
Cc Control cntrl
Cf Format
Cn Unassigned
Co Private_Use
Cs Surrogate
L Letter
LC Cased_Letter
Ll Lowercase_Letter
Lm Modifier_Letter
Lo Other_Letter
Lt Titlecase_Letter
Lu Uppercase_Letter
M Mark Combining_Mark
Mc Spacing_Mark
Me Enclosing_Mark
Mn Nonspacing_Mark
N Number
Nd Decimal_Number digit
Nl Letter_Number
No Other_Number
P Punctuation punct
Pc Connector_Punctuation
Pd Dash_Punctuation
Pe Close_Punctuation
Pf Final_Punctuation
Pi Initial_Punctuation
Po Other_Punctuation
Ps Open_Punctuation
S Symbol
Sc Currency_Symbol
Sk Modifier_Symbol
Sm Math_Symbol
So Other_Symbol
Z Separator
Zl Line_Separator
Zp Paragraph_Separator
Zs Space_Separator
ASCII
ASCII_Hex_Digit AHex
Alphabetic Alpha
Any
Assigned
Bidi_Control Bidi_C
Bidi_Mirrored Bidi_M
Case_Ignorable CI
Cased
Changes_When_Casefolded CWCF
Changes_When_Casemapped CWCM
Changes_When_Lowercased CWL
Changes_When_NFKC_Casefolded CWKCF
Changes_When_Titlecased CWT
Changes_When_Uppercased CWU
Dash
Default_Ignorable_Code_Point DI
Deprecated Dep
Diacritic Dia
Emoji
Emoji_Component EComp
Emoji_Modifier EMod
Emoji_Modifier_Base EBase
Emoji_Presentation EPres
Extended_Pictographic ExtPict
Extender Ext
Grapheme_Base Gr_Base
Grapheme_Extend Gr_Ext
Hex_Digit Hex
IDS_Binary_Operator IDSB
IDS_Trinary_Operator IDST
ID_Continue IDC
ID_Start IDS
Ideographic Ideo
Join_Control Join_C
Logical_Order_Exception LOE
Lowercase Lower
Math
Noncharacter_Code_Point NChar
Pattern_Syntax Pat_Syn
Pattern_White_Space Pat_WS
Quotation_Mark QMark
Radical
Regional_Indicator RI
Sentence_Terminal STerm
Soft_Dotted SD
Terminal_Punctuation Term
Unified_Ideograph UIdeo
Uppercase Upper
Variation_Selector VS
White_Space space
XID_Continue XIDC
XID_Start XIDS`.split(/\s/).map((e) => [se(e), e])
), xt = /* @__PURE__ */ new Map([
  ["s", b(383)],
  // s, ſ
  [b(383), "s"]
  // ſ, s
]), kt = /* @__PURE__ */ new Map([
  [b(223), b(7838)],
  // ß, ẞ
  [b(107), b(8490)],
  // k, K (Kelvin)
  [b(229), b(8491)],
  // å, Å (Angstrom)
  [b(969), b(8486)]
  // ω, Ω (Ohm)
]), Et = new Map([
  F(453),
  F(456),
  F(459),
  F(498),
  ...ce(8072, 8079),
  ...ce(8088, 8095),
  ...ce(8104, 8111),
  F(8124),
  F(8140),
  F(8188)
]), $t = /* @__PURE__ */ new Map([
  ["alnum", h`[\p{Alpha}\p{Nd}]`],
  ["alpha", h`\p{Alpha}`],
  ["ascii", h`\p{ASCII}`],
  ["blank", h`[\p{Zs}\t]`],
  ["cntrl", h`\p{Cc}`],
  ["digit", h`\p{Nd}`],
  ["graph", h`[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]`],
  ["lower", h`\p{Lower}`],
  ["print", h`[[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]\p{Zs}]`],
  ["punct", h`[\p{P}\p{S}]`],
  // Updated value from Onig 6.9.9; changed from Unicode `\p{punct}`
  ["space", h`\p{space}`],
  ["upper", h`\p{Upper}`],
  ["word", h`[\p{Alpha}\p{M}\p{Nd}\p{Pc}]`],
  ["xdigit", h`\p{AHex}`]
]);
function At(e, r) {
  const t = [];
  for (let n = e; n <= r; n++)
    t.push(n);
  return t;
}
function F(e) {
  const r = b(e);
  return [r.toLowerCase(), r];
}
function ce(e, r) {
  return At(e, r).map((t) => F(t));
}
var ir = /* @__PURE__ */ new Set([
  "Lower",
  "Lowercase",
  "Upper",
  "Uppercase",
  "Ll",
  "Lowercase_Letter",
  "Lt",
  "Titlecase_Letter",
  "Lu",
  "Uppercase_Letter"
  // The `Changes_When_*` properties (and their aliases) could be included, but they're very rare.
  // Some other properties include a handful of chars with specific cases only, but these chars are
  // generally extreme edge cases and using such properties case insensitively generally produces
  // undesired behavior anyway
]);
function It(e, r) {
  const t = {
    // A couple edge cases exist where options `accuracy` and `bestEffortTarget` are used:
    // - `CharacterSet` kind `text_segment` (`\X`): An exact representation would require heavy
    //   Unicode data; a best-effort approximation requires knowing the target.
    // - `CharacterSet` kind `posix` with values `graph` and `print`: Their complex Unicode
    //   representations would be hard to change to ASCII versions after the fact in the generator
    //   based on `target`/`accuracy`, so produce the appropriate structure here.
    accuracy: "default",
    asciiWordBoundaries: !1,
    avoidSubclass: !1,
    bestEffortTarget: "ES2025",
    ...r
  };
  ur(e);
  const n = {
    accuracy: t.accuracy,
    asciiWordBoundaries: t.asciiWordBoundaries,
    avoidSubclass: t.avoidSubclass,
    flagDirectivesByAlt: /* @__PURE__ */ new Map(),
    jsGroupNameMap: /* @__PURE__ */ new Map(),
    minTargetEs2024: me(t.bestEffortTarget, "ES2024"),
    passedLookbehind: !1,
    strategy: null,
    // Subroutines can appear before the groups they ref, so collect reffed nodes for a second pass 
    subroutineRefMap: /* @__PURE__ */ new Map(),
    supportedGNodes: /* @__PURE__ */ new Set(),
    digitIsAscii: e.flags.digitIsAscii,
    spaceIsAscii: e.flags.spaceIsAscii,
    wordIsAscii: e.flags.wordIsAscii
  };
  Z(e, St, n);
  const a = {
    dotAll: e.flags.dotAll,
    ignoreCase: e.flags.ignoreCase
  }, s = {
    currentFlags: a,
    prevFlags: null,
    globalFlags: a,
    groupOriginByCopy: /* @__PURE__ */ new Map(),
    groupsByName: /* @__PURE__ */ new Map(),
    multiplexCapturesToLeftByRef: /* @__PURE__ */ new Map(),
    openRefs: /* @__PURE__ */ new Map(),
    reffedNodesByReferencer: /* @__PURE__ */ new Map(),
    subroutineRefMap: n.subroutineRefMap
  };
  Z(e, vt, s);
  const o = {
    groupsByName: s.groupsByName,
    highestOrphanBackref: 0,
    numCapturesToLeft: 0,
    reffedNodesByReferencer: s.reffedNodesByReferencer
  };
  return Z(e, _t, o), e._originMap = s.groupOriginByCopy, e._strategy = n.strategy, e;
}
var St = {
  AbsenceFunction({ node: e, parent: r, replaceWith: t }) {
    const { body: n, kind: a } = e;
    if (a === "repeater") {
      const s = v();
      s.body[0].body.push(
        // Insert own alts as `body`
        R({ negate: !0, body: n }),
        W("Any")
      );
      const o = v();
      o.body[0].body.push(
        Ye("greedy", 0, 1 / 0, s)
      ), t(C(o, r), { traverse: !0 });
    } else
      throw new Error('Unsupported absence function "(?~|"');
  },
  Alternative: {
    enter({ node: e, parent: r, key: t }, { flagDirectivesByAlt: n }) {
      const a = e.body.filter((s) => s.kind === "flags");
      for (let s = t + 1; s < r.body.length; s++) {
        const o = r.body[s];
        Q(n, o, []).push(...a);
      }
    },
    exit({ node: e }, { flagDirectivesByAlt: r }) {
      if (r.get(e)?.length) {
        const t = lr(r.get(e));
        if (t) {
          const n = v({ flags: t });
          n.body[0].body = e.body, e.body = [C(n, e)];
        }
      }
    }
  },
  Assertion({ node: e, parent: r, key: t, container: n, root: a, remove: s, replaceWith: o }, i) {
    const { kind: u, negate: c } = e, { asciiWordBoundaries: p, avoidSubclass: l, supportedGNodes: f, wordIsAscii: g } = i;
    if (u === "text_segment_boundary")
      throw new Error(`Unsupported text segment boundary "\\${c ? "Y" : "y"}"`);
    if (u === "line_end")
      o(C(R({ body: [
        O({ body: [de("string_end")] }),
        O({ body: [ne(10)] })
        // `\n`
      ] }), r));
    else if (u === "line_start")
      o(C(M(h`(?<=\A|\n(?!\z))`, { skipLookbehindValidation: !0 }), r));
    else if (u === "search_start")
      if (f.has(e))
        a.flags.sticky = !0, s();
      else {
        const d = n[t - 1];
        if (d && Pt(d))
          o(C(R({ negate: !0 }), r));
        else {
          if (l)
            throw new Error(h`Uses "\G" in a way that requires a subclass`);
          o(G(de("string_start"), r)), i.strategy = "clip_search";
        }
      }
    else if (!(u === "string_end" || u === "string_start")) if (u === "string_end_newline")
      o(C(M(h`(?=\n?\z)`), r));
    else if (u === "word_boundary") {
      if (!g && !p) {
        const d = `(?:(?<=${_})(?!${_})|(?<!${_})(?=${_}))`, w = `(?:(?<=${_})(?=${_})|(?<!${_})(?!${_}))`;
        o(C(M(c ? w : d), r));
      }
    } else
      throw new Error(`Unexpected assertion kind "${u}"`);
  },
  Backreference({ node: e }, { jsGroupNameMap: r }) {
    let { ref: t } = e;
    typeof t == "string" && !pe(t) && (t = le(t, r), e.ref = t);
  },
  CapturingGroup({ node: e }, { jsGroupNameMap: r, subroutineRefMap: t }) {
    let { name: n } = e;
    n && !pe(n) && (n = le(n, r), e.name = n), t.set(e.number, e), n && t.set(n, e);
  },
  CharacterClassRange({ node: e, parent: r, replaceWith: t }) {
    if (r.kind === "intersection") {
      const n = re({ body: [e] });
      t(C(n, r), { traverse: !0 });
    }
  },
  CharacterSet({ node: e, parent: r, replaceWith: t }, { accuracy: n, minTargetEs2024: a, digitIsAscii: s, spaceIsAscii: o, wordIsAscii: i }) {
    const { kind: u, negate: c, value: p } = e;
    if (s && (u === "digit" || p === "digit")) {
      t(G(he("digit", { negate: c }), r));
      return;
    }
    if (o && (u === "space" || p === "space")) {
      t(C(fe(M(Ct), c), r));
      return;
    }
    if (i && (u === "word" || p === "word")) {
      t(G(he("word", { negate: c }), r));
      return;
    }
    if (u === "any")
      t(G(W("Any"), r));
    else if (u === "digit")
      t(G(W("Nd", { negate: c }), r));
    else if (u !== "dot") if (u === "text_segment") {
      if (n === "strict")
        throw new Error(h`Use of "\X" requires non-strict accuracy`);
      const l = "\\p{Emoji}(?:\\p{EMod}|\\uFE0F\\u20E3?|[\\x{E0020}-\\x{E007E}]+\\x{E007F})?", f = h`\p{RI}{2}|${l}(?:\u200D${l})*`;
      t(C(M(
        // Close approximation of an extended grapheme cluster; see <unicode.org/reports/tr29/>
        h`(?>\r\n|${a ? h`\p{RGI_Emoji}` : f}|\P{M}\p{M}*)`,
        // Allow JS property `RGI_Emoji` through
        { skipPropertyNameValidation: !0 }
      ), r));
    } else if (u === "hex")
      t(G(W("AHex", { negate: c }), r));
    else if (u === "newline")
      t(C(M(c ? `[^
]` : `(?>\r
?|[
\v\f\u2028\u2029])`), r));
    else if (u === "posix")
      if (!a && (p === "graph" || p === "print")) {
        if (n === "strict")
          throw new Error(`POSIX class "${p}" requires min target ES2024 or non-strict accuracy`);
        let l = {
          graph: "!-~",
          print: " -~"
        }[p];
        c && (l = `\0-${b(l.codePointAt(0) - 1)}${b(l.codePointAt(2) + 1)}-􏿿`), t(C(M(`[${l}]`), r));
      } else
        t(C(fe(M($t.get(p)), c), r));
    else if (u === "property")
      ke.has(se(p)) || (e.key = "sc");
    else if (u === "space")
      t(G(W("space", { negate: c }), r));
    else if (u === "word")
      t(C(fe(M(_), c), r));
    else
      throw new Error(`Unexpected character set kind "${u}"`);
  },
  Directive({ node: e, parent: r, root: t, remove: n, replaceWith: a, removeAllPrevSiblings: s, removeAllNextSiblings: o }) {
    const { kind: i, flags: u } = e;
    if (i === "flags")
      if (!u.enable && !u.disable)
        n();
      else {
        const c = v({ flags: u });
        c.body[0].body = o(), a(C(c, r), { traverse: !0 });
      }
    else if (i === "keep") {
      const c = t.body[0], l = t.body.length === 1 && // Not emulatable if within a `CapturingGroup`
      qe(c, { type: "Group" }) && c.body[0].body.length === 1 ? c.body[0] : t;
      if (r.parent !== l || l.body.length > 1)
        throw new Error(h`Uses "\K" in a way that's unsupported`);
      const f = R({ behind: !0 });
      f.body[0].body = s(), a(C(f, r));
    } else
      throw new Error(`Unexpected directive kind "${i}"`);
  },
  Flags({ node: e, parent: r }) {
    if (e.posixIsAscii)
      throw new Error('Unsupported flag "P"');
    if (e.textSegmentMode === "word")
      throw new Error('Unsupported flag "y{w}"');
    [
      "digitIsAscii",
      // Flag D
      "extended",
      // Flag x
      "posixIsAscii",
      // Flag P
      "spaceIsAscii",
      // Flag S
      "wordIsAscii",
      // Flag W
      "textSegmentMode"
      // Flag y{g} or y{w}
    ].forEach((t) => delete e[t]), Object.assign(e, {
      // JS flag g; no Onig equiv
      global: !1,
      // JS flag d; no Onig equiv
      hasIndices: !1,
      // JS flag m; no Onig equiv but its behavior is always on in Onig. Onig's only line break
      // char is line feed, unlike JS, so this flag isn't used since it would produce inaccurate
      // results (also allows `^` and `$` to be used in the generator for string start and end)
      multiline: !1,
      // JS flag y; no Onig equiv, but used for `\G` emulation
      sticky: e.sticky ?? !1
      // Note: Regex+ doesn't allow explicitly adding flags it handles implicitly, so leave out
      // properties `unicode` (JS flag u) and `unicodeSets` (JS flag v). Keep the existing values
      // for `ignoreCase` (flag i) and `dotAll` (JS flag s, but Onig flag m)
    }), r.options = {
      disable: {
        // Onig uses different rules for flag x than Regex+, so disable the implicit flag
        x: !0,
        // Onig has no flag to control "named capture only" mode but contextually applies its
        // behavior when named capturing is used, so disable Regex+'s implicit flag for it
        n: !0
      },
      force: {
        // Always add flag v because we're generating an AST that relies on it (it enables JS
        // support for Onig features nested classes, intersection, Unicode properties, etc.).
        // However, the generator might disable flag v based on its `target` option
        v: !0
      }
    };
  },
  Group({ node: e }) {
    if (!e.flags)
      return;
    const { enable: r, disable: t } = e.flags;
    r?.extended && delete r.extended, t?.extended && delete t.extended, r?.dotAll && t?.dotAll && delete r.dotAll, r?.ignoreCase && t?.ignoreCase && delete r.ignoreCase, r && !Object.keys(r).length && delete e.flags.enable, t && !Object.keys(t).length && delete e.flags.disable, !e.flags.enable && !e.flags.disable && delete e.flags;
  },
  LookaroundAssertion({ node: e }, r) {
    const { kind: t } = e;
    t === "lookbehind" && (r.passedLookbehind = !0);
  },
  NamedCallout({ node: e, parent: r, replaceWith: t }) {
    const { kind: n } = e;
    if (n === "fail")
      t(C(R({ negate: !0 }), r));
    else
      throw new Error(`Unsupported named callout "(*${n.toUpperCase()}"`);
  },
  Quantifier({ node: e }) {
    if (e.body.type === "Quantifier") {
      const r = v();
      r.body[0].body.push(e.body), e.body = C(r, e);
    }
  },
  Regex: {
    enter({ node: e }, { supportedGNodes: r }) {
      const t = [];
      let n = !1, a = !1;
      for (const s of e.body)
        if (s.body.length === 1 && s.body[0].kind === "search_start")
          s.body.pop();
        else {
          const o = fr(s.body);
          o ? (n = !0, Array.isArray(o) ? t.push(...o) : t.push(o)) : a = !0;
        }
      n && !a && t.forEach((s) => r.add(s));
    },
    exit(e, { accuracy: r, passedLookbehind: t, strategy: n }) {
      if (r === "strict" && t && n)
        throw new Error(h`Uses "\G" in a way that requires non-strict accuracy`);
    }
  },
  Subroutine({ node: e }, { jsGroupNameMap: r }) {
    let { ref: t } = e;
    typeof t == "string" && !pe(t) && (t = le(t, r), e.ref = t);
  }
}, vt = {
  Backreference({ node: e }, { multiplexCapturesToLeftByRef: r, reffedNodesByReferencer: t }) {
    const { orphan: n, ref: a } = e;
    n || t.set(e, [...r.get(a).map(({ node: s }) => s)]);
  },
  CapturingGroup: {
    enter({
      node: e,
      parent: r,
      replaceWith: t,
      skip: n
    }, {
      groupOriginByCopy: a,
      groupsByName: s,
      multiplexCapturesToLeftByRef: o,
      openRefs: i,
      reffedNodesByReferencer: u
    }) {
      const c = a.get(e);
      if (c && i.has(e.number)) {
        const l = G(Be(e.number), r);
        u.set(l, i.get(e.number)), t(l);
        return;
      }
      i.set(e.number, e), o.set(e.number, []), e.name && Q(o, e.name, []);
      const p = o.get(e.name ?? e.number);
      for (let l = 0; l < p.length; l++) {
        const f = p[l];
        if (
          // This group is from subroutine expansion, and there's a multiplex value from either the
          // origin node or a prior subroutine expansion group with the same origin
          c === f.node || c && c === f.origin || // This group is not from subroutine expansion, and it comes after a subroutine expansion
          // group that refers to this group
          e === f.origin
        ) {
          p.splice(l, 1);
          break;
        }
      }
      if (o.get(e.number).push({ node: e, origin: c }), e.name && o.get(e.name).push({ node: e, origin: c }), e.name) {
        const l = Q(s, e.name, /* @__PURE__ */ new Map());
        let f = !1;
        if (c)
          f = !0;
        else
          for (const g of l.values())
            if (!g.hasDuplicateNameToRemove) {
              f = !0;
              break;
            }
        s.get(e.name).set(e, { node: e, hasDuplicateNameToRemove: f });
      }
    },
    exit({ node: e }, { openRefs: r }) {
      r.delete(e.number);
    }
  },
  Group: {
    enter({ node: e }, r) {
      r.prevFlags = r.currentFlags, e.flags && (r.currentFlags = te(r.currentFlags, e.flags));
    },
    exit(e, r) {
      r.currentFlags = r.prevFlags;
    }
  },
  Subroutine({ node: e, parent: r, replaceWith: t }, n) {
    const { isRecursive: a, ref: s } = e;
    if (a) {
      let p = r;
      for (; (p = p.parent) && !(p.type === "CapturingGroup" && (p.name === s || p.number === s)); )
        ;
      n.reffedNodesByReferencer.set(e, p);
      return;
    }
    const o = n.subroutineRefMap.get(s), i = s === 0, u = i ? Be(0) : (
      // The reffed group might itself contain subroutines, which are expanded during sub-traversal
      cr(o, n.groupOriginByCopy, null)
    );
    let c = u;
    if (!i) {
      const p = lr(Lt(
        o,
        (f) => f.type === "Group" && !!f.flags
      )), l = p ? te(n.globalFlags, p) : n.globalFlags;
      Mt(l, n.currentFlags) || (c = v({
        flags: Ft(l)
      }), c.body[0].body.push(u));
    }
    t(C(c, r), { traverse: !i });
  }
}, _t = {
  Backreference({ node: e, parent: r, replaceWith: t }, n) {
    if (e.orphan) {
      n.highestOrphanBackref = Math.max(n.highestOrphanBackref, e.ref);
      return;
    }
    const s = n.reffedNodesByReferencer.get(e).filter((o) => Nt(o, e));
    if (!s.length)
      t(C(R({ negate: !0 }), r));
    else if (s.length > 1) {
      const o = v({
        atomic: !0,
        body: s.reverse().map((i) => O({
          body: [ge(i.number)]
        }))
      });
      t(C(o, r));
    } else
      e.ref = s[0].number;
  },
  CapturingGroup({ node: e }, r) {
    e.number = ++r.numCapturesToLeft, e.name && r.groupsByName.get(e.name).get(e).hasDuplicateNameToRemove && delete e.name;
  },
  Regex: {
    exit({ node: e }, r) {
      const t = Math.max(r.highestOrphanBackref - r.numCapturesToLeft, 0);
      for (let n = 0; n < t; n++) {
        const a = Ke();
        e.body.at(-1).body.push(a);
      }
    }
  },
  Subroutine({ node: e }, r) {
    !e.isRecursive || e.ref === 0 || (e.ref = r.reffedNodesByReferencer.get(e).number);
  }
};
function ur(e) {
  Z(e, {
    "*"({ node: r, parent: t }) {
      r.parent = t;
    }
  });
}
function Mt(e, r) {
  return e.dotAll === r.dotAll && e.ignoreCase === r.ignoreCase;
}
function Nt(e, r) {
  let t = r;
  do {
    if (t.type === "Regex")
      return !1;
    if (t.type === "Alternative")
      continue;
    if (t === e)
      return !1;
    const n = pr(t.parent);
    for (const a of n) {
      if (a === t)
        break;
      if (a === e || dr(a, e))
        return !0;
    }
  } while (t = t.parent);
  throw new Error("Unexpected path");
}
function cr(e, r, t, n) {
  const a = Array.isArray(e) ? [] : {};
  for (const [s, o] of Object.entries(e))
    s === "parent" ? a.parent = Array.isArray(t) ? n : t : o && typeof o == "object" ? a[s] = cr(o, r, a, t) : (s === "type" && o === "CapturingGroup" && r.set(a, r.get(e) ?? e), a[s] = o);
  return a;
}
function Be(e) {
  const r = er(e);
  return r.isRecursive = !0, r;
}
function Lt(e, r) {
  const t = [];
  for (; e = e.parent; )
    (!r || r(e)) && t.push(e);
  return t;
}
function le(e, r) {
  if (r.has(e))
    return r.get(e);
  const t = `$${r.size}_${e.replace(/^[^$_\p{IDS}]|[^$\u200C\u200D\p{IDC}]/ug, "_")}`;
  return r.set(e, t), t;
}
function lr(e) {
  const r = ["dotAll", "ignoreCase"], t = { enable: {}, disable: {} };
  return e.forEach(({ flags: n }) => {
    r.forEach((a) => {
      n.enable?.[a] && (delete t.disable[a], t.enable[a] = !0), n.disable?.[a] && (t.disable[a] = !0);
    });
  }), Object.keys(t.enable).length || delete t.enable, Object.keys(t.disable).length || delete t.disable, t.enable || t.disable ? t : null;
}
function Ft({ dotAll: e, ignoreCase: r }) {
  const t = {};
  return (e || r) && (t.enable = {}, e && (t.enable.dotAll = !0), r && (t.enable.ignoreCase = !0)), (!e || !r) && (t.disable = {}, !e && (t.disable.dotAll = !0), !r && (t.disable.ignoreCase = !0)), t;
}
function pr(e) {
  if (!e)
    throw new Error("Node expected");
  const { body: r } = e;
  return Array.isArray(r) ? r : r ? [r] : null;
}
function fr(e) {
  const r = e.find((t) => t.kind === "search_start" || Rt(t, { negate: !1 }) || !Gt(t));
  if (!r)
    return null;
  if (r.kind === "search_start")
    return r;
  if (r.type === "LookaroundAssertion")
    return r.body[0].body[0];
  if (r.type === "CapturingGroup" || r.type === "Group") {
    const t = [];
    for (const n of r.body) {
      const a = fr(n.body);
      if (!a)
        return null;
      Array.isArray(a) ? t.push(...a) : t.push(a);
    }
    return t;
  }
  return null;
}
function dr(e, r) {
  const t = pr(e) ?? [];
  for (const n of t)
    if (n === r || dr(n, r))
      return !0;
  return !1;
}
function Gt({ type: e }) {
  return e === "Assertion" || e === "Directive" || e === "LookaroundAssertion";
}
function Pt(e) {
  const r = [
    "Character",
    "CharacterClass",
    "CharacterSet"
  ];
  return r.includes(e.type) || e.type === "Quantifier" && e.min && r.includes(e.body.type);
}
function Rt(e, r) {
  const t = {
    negate: null,
    ...r
  };
  return e.type === "LookaroundAssertion" && (t.negate === null || e.negate === t.negate) && e.body.length === 1 && qe(e.body[0], {
    type: "Assertion",
    kind: "search_start"
  });
}
function pe(e) {
  return /^[$_\p{IDS}][$\u200C\u200D\p{IDC}]*$/u.test(e);
}
function M(e, r) {
  const n = Je(e, {
    ...r,
    // Providing a custom set of Unicode property names avoids converting some JS Unicode
    // properties (ex: `\p{Alpha}`) to Onig POSIX classes
    unicodePropertyMap: ke
  }).body;
  return n.length > 1 || n[0].body.length > 1 ? v({ body: n }) : n[0].body[0];
}
function fe(e, r) {
  return e.negate = r, e;
}
function G(e, r) {
  return e.parent = r, e;
}
function C(e, r) {
  return ur(e), e.parent = r, e;
}
function Ut(e, r) {
  const t = ar(r), n = me(t.target, "ES2024"), a = me(t.target, "ES2025"), s = t.rules.recursionLimit;
  if (!Number.isInteger(s) || s < 2 || s > 20)
    throw new Error("Invalid recursionLimit; use 2-20");
  let o = null, i = null;
  if (!a) {
    const g = [e.flags.ignoreCase];
    Z(e, Ot, {
      getCurrentModI: () => g.at(-1),
      popModI() {
        g.pop();
      },
      pushModI(d) {
        g.push(d);
      },
      setHasCasedChar() {
        g.at(-1) ? o = !0 : i = !0;
      }
    });
  }
  const u = {
    dotAll: e.flags.dotAll,
    // - Turn global flag i on if a case insensitive node was used and no case sensitive nodes were
    //   used (to avoid unnecessary node expansion).
    // - Turn global flag i off if a case sensitive node was used (since case sensitivity can't be
    //   forced without the use of ES2025 flag groups)
    ignoreCase: !!((e.flags.ignoreCase || o) && !i)
  };
  let c = e;
  const p = {
    accuracy: t.accuracy,
    appliedGlobalFlags: u,
    captureMap: /* @__PURE__ */ new Map(),
    currentFlags: {
      dotAll: e.flags.dotAll,
      ignoreCase: e.flags.ignoreCase
    },
    inCharClass: !1,
    lastNode: c,
    originMap: e._originMap,
    recursionLimit: s,
    useAppliedIgnoreCase: !!(!a && o && i),
    useFlagMods: a,
    useFlagV: n,
    verbose: t.verbose
  };
  function l(g) {
    return p.lastNode = c, c = g, mt(Dt[g.type], `Unexpected node type "${g.type}"`)(g, p, l);
  }
  const f = {
    pattern: e.body.map(l).join("|"),
    // Could reset `lastNode` at this point via `lastNode = ast`, but it isn't needed by flags
    flags: l(e.flags),
    options: { ...e.options }
  };
  return n || (delete f.options.force.v, f.options.disable.v = !0, f.options.unicodeSetsPlugin = null), f._captureTransfers = /* @__PURE__ */ new Map(), f._hiddenCaptures = [], p.captureMap.forEach((g, d) => {
    g.hidden && f._hiddenCaptures.push(d), g.transferTo && Q(f._captureTransfers, g.transferTo, []).push(d);
  }), f;
}
var Ot = {
  "*": {
    enter({ node: e }, r) {
      if (Ve(e)) {
        const t = r.getCurrentModI();
        r.pushModI(
          e.flags ? te({ ignoreCase: t }, e.flags).ignoreCase : t
        );
      }
    },
    exit({ node: e }, r) {
      Ve(e) && r.popModI();
    }
  },
  Backreference(e, r) {
    r.setHasCasedChar();
  },
  Character({ node: e }, r) {
    Ee(b(e.value)) && r.setHasCasedChar();
  },
  CharacterClassRange({ node: e, skip: r }, t) {
    r(), gr(e, { firstOnly: !0 }).length && t.setHasCasedChar();
  },
  CharacterSet({ node: e }, r) {
    e.kind === "property" && ir.has(e.value) && r.setHasCasedChar();
  }
}, Dt = {
  /**
  @param {AlternativeNode} node
  */
  Alternative({ body: e }, r, t) {
    return e.map(t).join("");
  },
  /**
  @param {AssertionNode} node
  */
  Assertion({ kind: e, negate: r }) {
    if (e === "string_end")
      return "$";
    if (e === "string_start")
      return "^";
    if (e === "word_boundary")
      return r ? h`\B` : h`\b`;
    throw new Error(`Unexpected assertion kind "${e}"`);
  },
  /**
  @param {BackreferenceNode} node
  */
  Backreference({ ref: e }, r) {
    if (typeof e != "number")
      throw new Error("Unexpected named backref in transformed AST");
    if (!r.useFlagMods && r.accuracy === "strict" && r.currentFlags.ignoreCase && !r.captureMap.get(e).ignoreCase)
      throw new Error("Use of case-insensitive backref to case-sensitive group requires target ES2025 or non-strict accuracy");
    return "\\" + e;
  },
  /**
  @param {CapturingGroupNode} node
  */
  CapturingGroup(e, r, t) {
    const { body: n, name: a, number: s } = e, o = { ignoreCase: r.currentFlags.ignoreCase }, i = r.originMap.get(e);
    return i && (o.hidden = !0, s > i.number && (o.transferTo = i.number)), r.captureMap.set(s, o), `(${a ? `?<${a}>` : ""}${n.map(t).join("|")})`;
  },
  /**
  @param {CharacterNode} node
  */
  Character({ value: e }, r) {
    const t = b(e), n = V(e, {
      escDigit: r.lastNode.type === "Backreference",
      inCharClass: r.inCharClass,
      useFlagV: r.useFlagV
    });
    if (n !== t)
      return n;
    if (r.useAppliedIgnoreCase && r.currentFlags.ignoreCase && Ee(t)) {
      const a = or(t);
      return r.inCharClass ? a.join("") : a.length > 1 ? `[${a.join("")}]` : a[0];
    }
    return t;
  },
  /**
  @param {CharacterClassNode} node
  */
  CharacterClass(e, r, t) {
    const { kind: n, negate: a, parent: s } = e;
    let { body: o } = e;
    if (n === "intersection" && !r.useFlagV)
      throw new Error("Use of character class intersection requires min target ES2024");
    L.bugFlagVLiteralHyphenIsRange && r.useFlagV && o.some(ze) && (o = [ne(45), ...o.filter((c) => !ze(c))]);
    const i = () => `[${a ? "^" : ""}${o.map(t).join(n === "intersection" ? "&&" : "")}]`;
    if (!r.inCharClass) {
      if (
        // Already established `kind !== 'intersection'` if `!state.useFlagV`; don't check again
        (!r.useFlagV || L.bugNestedClassIgnoresNegation) && !a
      ) {
        const p = o.filter(
          (l) => l.type === "CharacterClass" && l.kind === "union" && l.negate
        );
        if (p.length) {
          const l = v(), f = l.body[0];
          return l.parent = s, f.parent = l, o = o.filter((g) => !p.includes(g)), e.body = o, o.length ? (e.parent = f, f.body.push(e)) : l.body.pop(), p.forEach((g) => {
            const d = O({ body: [g] });
            g.parent = d, d.parent = l, l.body.push(d);
          }), t(l);
        }
      }
      r.inCharClass = !0;
      const c = i();
      return r.inCharClass = !1, c;
    }
    const u = o[0];
    if (
      // Already established that the parent is a char class via `inCharClass`; don't check again
      n === "union" && !a && u && // Allows many nested classes to work with `target` ES2018 which doesn't support nesting
      ((!r.useFlagV || !r.verbose) && s.kind === "union" && !(L.bugFlagVLiteralHyphenIsRange && r.useFlagV) || !r.verbose && s.kind === "intersection" && // JS doesn't allow intersection with union or ranges
      o.length === 1 && u.type !== "CharacterClassRange")
    )
      return o.map(t).join("");
    if (!r.useFlagV && s.type === "CharacterClass")
      throw new Error("Uses nested character class in a way that requires min target ES2024");
    return i();
  },
  /**
  @param {CharacterClassRangeNode} node
  */
  CharacterClassRange(e, r) {
    const t = e.min.value, n = e.max.value, a = {
      escDigit: !1,
      inCharClass: !0,
      useFlagV: r.useFlagV
    }, s = V(t, a), o = V(n, a), i = /* @__PURE__ */ new Set();
    if (r.useAppliedIgnoreCase && r.currentFlags.ignoreCase) {
      const u = gr(e);
      Wt(u).forEach((p) => {
        i.add(
          Array.isArray(p) ? `${V(p[0], a)}-${V(p[1], a)}` : V(p, a)
        );
      });
    }
    return `${s}-${o}${[...i].join("")}`;
  },
  /**
  @param {CharacterSetNode} node
  */
  CharacterSet({ kind: e, negate: r, value: t, key: n }, a) {
    if (e === "dot")
      return a.currentFlags.dotAll ? a.appliedGlobalFlags.dotAll || a.useFlagMods ? "." : "[^]" : (
        // Onig's only line break char is line feed, unlike JS
        h`[^\n]`
      );
    if (e === "digit")
      return r ? h`\D` : h`\d`;
    if (e === "property") {
      if (a.useAppliedIgnoreCase && a.currentFlags.ignoreCase && ir.has(t))
        throw new Error(`Unicode property "${t}" can't be case-insensitive when other chars have specific case`);
      return `${r ? h`\P` : h`\p`}{${n ? `${n}=` : ""}${t}}`;
    }
    if (e === "word")
      return r ? h`\W` : h`\w`;
    throw new Error(`Unexpected character set kind "${e}"`);
  },
  /**
  @param {FlagsNode} node
  */
  Flags(e, r) {
    return (
      // The transformer should never turn on the properties for flags d, g, m since Onig doesn't
      // have equivs. Flag m is never used since Onig uses different line break chars than JS
      // (node.hasIndices ? 'd' : '') +
      // (node.global ? 'g' : '') +
      // (node.multiline ? 'm' : '') +
      (r.appliedGlobalFlags.ignoreCase ? "i" : "") + (e.dotAll ? "s" : "") + (e.sticky ? "y" : "")
    );
  },
  /**
  @param {GroupNode} node
  */
  Group({ atomic: e, body: r, flags: t, parent: n }, a, s) {
    const o = a.currentFlags;
    t && (a.currentFlags = te(o, t));
    const i = r.map(s).join("|"), u = !a.verbose && r.length === 1 && // Single alt
    n.type !== "Quantifier" && !e && (!a.useFlagMods || !t) ? i : `(?${Ht(e, t, a.useFlagMods)}${i})`;
    return a.currentFlags = o, u;
  },
  /**
  @param {LookaroundAssertionNode} node
  */
  LookaroundAssertion({ body: e, kind: r, negate: t }, n, a) {
    return `(?${`${r === "lookahead" ? "" : "<"}${t ? "!" : "="}`}${e.map(a).join("|")})`;
  },
  /**
  @param {QuantifierNode} node
  */
  Quantifier(e, r, t) {
    return t(e.body) + jt(e);
  },
  /**
  @param {SubroutineNode & {isRecursive: true}} node
  */
  Subroutine({ isRecursive: e, ref: r }, t) {
    if (!e)
      throw new Error("Unexpected non-recursive subroutine in transformed AST");
    const n = t.recursionLimit;
    return r === 0 ? `(?R=${n})` : h`\g<${r}&R=${n}>`;
  }
}, Bt = /* @__PURE__ */ new Set([
  "$",
  "(",
  ")",
  "*",
  "+",
  ".",
  "?",
  "[",
  "\\",
  "]",
  "^",
  "{",
  "|",
  "}"
]), Tt = /* @__PURE__ */ new Set([
  "-",
  "\\",
  "]",
  "^",
  // Literal `[` doesn't require escaping with flag u, but this can help work around regex source
  // linters and regex syntax processors that expect unescaped `[` to create a nested class
  "["
]), Vt = /* @__PURE__ */ new Set([
  "(",
  ")",
  "-",
  "/",
  "[",
  "\\",
  "]",
  "^",
  "{",
  "|",
  "}",
  // Double punctuators; also includes already-listed `-` and `^`
  "!",
  "#",
  "$",
  "%",
  "&",
  "*",
  "+",
  ",",
  ".",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "`",
  "~"
]), Te = /* @__PURE__ */ new Map([
  [9, h`\t`],
  // horizontal tab
  [10, h`\n`],
  // line feed
  [11, h`\v`],
  // vertical tab
  [12, h`\f`],
  // form feed
  [13, h`\r`],
  // carriage return
  [8232, h`\u2028`],
  // line separator
  [8233, h`\u2029`],
  // paragraph separator
  [65279, h`\uFEFF`]
  // ZWNBSP/BOM
]), zt = new RegExp("^\\p{Cased}$", "u");
function Ee(e) {
  return zt.test(e);
}
function gr(e, r) {
  const t = !!r?.firstOnly, n = e.min.value, a = e.max.value, s = [];
  if (n < 65 && (a === 65535 || a >= 131071) || n === 65536 && a >= 131071)
    return s;
  for (let o = n; o <= a; o++) {
    const i = b(o);
    if (!Ee(i))
      continue;
    const u = or(i).filter((c) => {
      const p = c.codePointAt(0);
      return p < n || p > a;
    });
    if (u.length && (s.push(...u), t))
      break;
  }
  return s;
}
function V(e, { escDigit: r, inCharClass: t, useFlagV: n }) {
  if (Te.has(e))
    return Te.get(e);
  if (
    // Control chars, etc.; condition modeled on the Chrome developer console's display for strings
    e < 32 || e > 126 && e < 160 || // Unicode planes 4-16; unassigned, special purpose, and private use area
    e > 262143 || // Avoid corrupting a preceding backref by immediately following it with a literal digit
    r && Xt(e)
  )
    return e > 255 ? `\\u{${e.toString(16).toUpperCase()}}` : `\\x${e.toString(16).toUpperCase().padStart(2, "0")}`;
  const a = t ? n ? Vt : Tt : Bt, s = b(e);
  return (a.has(s) ? "\\" : "") + s;
}
function Wt(e) {
  const r = e.map((a) => a.codePointAt(0)).sort((a, s) => a - s), t = [];
  let n = null;
  for (let a = 0; a < r.length; a++)
    r[a + 1] === r[a] + 1 ? n ??= r[a] : n === null ? t.push(r[a]) : (t.push([n, r[a]]), n = null);
  return t;
}
function Ht(e, r, t) {
  if (e)
    return ">";
  let n = "";
  if (r && t) {
    const { enable: a, disable: s } = r;
    n = (a?.ignoreCase ? "i" : "") + (a?.dotAll ? "s" : "") + (s ? "-" : "") + (s?.ignoreCase ? "i" : "") + (s?.dotAll ? "s" : "");
  }
  return `${n}:`;
}
function jt({ kind: e, max: r, min: t }) {
  let n;
  return !t && r === 1 ? n = "?" : !t && r === 1 / 0 ? n = "*" : t === 1 && r === 1 / 0 ? n = "+" : t === r ? n = `{${t}}` : n = `{${t},${r === 1 / 0 ? "" : r}}`, n + {
    greedy: "",
    lazy: "?",
    possessive: "+"
  }[e];
}
function Ve({ type: e }) {
  return e === "CapturingGroup" || e === "Group" || e === "LookaroundAssertion";
}
function Xt(e) {
  return e > 47 && e < 58;
}
function ze({ type: e, value: r }) {
  return e === "Character" && r === 45;
}
var Zt = class ye extends RegExp {
  /**
  @type {Map<number, {
    hidden?: true;
    transferTo?: number;
  }>}
  */
  #r = /* @__PURE__ */ new Map();
  /**
  @type {RegExp | EmulatedRegExp | null}
  */
  #e = null;
  /**
  @type {string}
  */
  #n;
  /**
  @type {Map<number, string>?}
  */
  #t = null;
  /**
  @type {string?}
  */
  #s = null;
  /**
  Can be used to serialize the instance.
  @type {EmulatedRegExpOptions}
  */
  rawOptions = {};
  // Override the getter with one that works with lazy-compiled regexes
  get source() {
    return this.#n || "(?:)";
  }
  /**
  @overload
  @param {string} pattern
  @param {string} [flags]
  @param {EmulatedRegExpOptions} [options]
  */
  /**
  @overload
  @param {EmulatedRegExp} pattern
  @param {string} [flags]
  */
  constructor(r, t, n) {
    const a = !!n?.lazyCompile;
    if (r instanceof RegExp) {
      if (n)
        throw new Error("Cannot provide options when copying a regexp");
      const s = r;
      super(s, t), this.#n = s.source, s instanceof ye && (this.#r = s.#r, this.#t = s.#t, this.#s = s.#s, this.rawOptions = s.rawOptions);
    } else {
      const s = {
        hiddenCaptures: [],
        strategy: null,
        transfers: [],
        ...n
      };
      super(a ? "" : r, t), this.#n = r, this.#r = qt(s.hiddenCaptures, s.transfers), this.#s = s.strategy, this.rawOptions = n ?? {};
    }
    a || (this.#e = this);
  }
  /**
  Called internally by all String/RegExp methods that use regexes.
  @override
  @param {string} str
  @returns {RegExpExecArray?}
  */
  exec(r) {
    if (!this.#e) {
      const { lazyCompile: a, ...s } = this.rawOptions;
      this.#e = new ye(this.#n, this.flags, s);
    }
    const t = this.global || this.sticky, n = this.lastIndex;
    if (this.#s === "clip_search" && t && n) {
      this.lastIndex = 0;
      const a = this.#a(r.slice(n));
      return a && (Qt(a, n, r, this.hasIndices), this.lastIndex += n), a;
    }
    return this.#a(r);
  }
  /**
  Adds support for hidden and transfer captures.
  @param {string} str
  @returns
  */
  #a(r) {
    this.#e.lastIndex = this.lastIndex;
    const t = super.exec.call(this.#e, r);
    if (this.lastIndex = this.#e.lastIndex, !t || !this.#r.size)
      return t;
    const n = [...t];
    t.length = 1;
    let a;
    this.hasIndices && (a = [...t.indices], t.indices.length = 1);
    const s = [0];
    for (let o = 1; o < n.length; o++) {
      const { hidden: i, transferTo: u } = this.#r.get(o) ?? {};
      if (i ? s.push(null) : (s.push(t.length), t.push(n[o]), this.hasIndices && t.indices.push(a[o])), u && n[o] !== void 0) {
        const c = s[u];
        if (!c)
          throw new Error(`Invalid capture transfer to "${c}"`);
        if (t[c] = n[o], this.hasIndices && (t.indices[c] = a[o]), t.groups) {
          this.#t || (this.#t = Jt(this.source));
          const p = this.#t.get(u);
          p && (t.groups[p] = n[o], this.hasIndices && (t.indices.groups[p] = a[o]));
        }
      }
    }
    return t;
  }
};
function Qt(e, r, t, n) {
  if (e.index += r, e.input = t, n) {
    const a = e.indices;
    for (let o = 0; o < a.length; o++) {
      const i = a[o];
      i && (a[o] = [i[0] + r, i[1] + r]);
    }
    const s = a.groups;
    s && Object.keys(s).forEach((o) => {
      const i = s[o];
      i && (s[o] = [i[0] + r, i[1] + r]);
    });
  }
}
function qt(e, r) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n, {
      hidden: !0
    });
  for (const [n, a] of r)
    for (const s of a)
      Q(t, s, {}).transferTo = n;
  return t;
}
function Jt(e) {
  const r = /(?<capture>\((?:\?<(?![=!])(?<name>[^>]+)>|(?!\?)))|\\?./gsu, t = /* @__PURE__ */ new Map();
  let n = 0, a = 0, s;
  for (; s = r.exec(e); ) {
    const { 0: o, groups: { capture: i, name: u } } = s;
    o === "[" ? n++ : n ? o === "]" && n-- : i && (a++, u && t.set(a, u));
  }
  return t;
}
function Kt(e, r) {
  const t = Yt(e, r);
  return t.options ? new Zt(t.pattern, t.flags, t.options) : new RegExp(t.pattern, t.flags);
}
function Yt(e, r) {
  const t = ar(r), n = Je(e, {
    flags: t.flags,
    normalizeUnknownPropertyNames: !0,
    rules: {
      captureGroup: t.rules.captureGroup,
      singleline: t.rules.singleline
    },
    skipBackrefValidation: t.rules.allowOrphanBackrefs,
    unicodePropertyMap: ke
  }), a = It(n, {
    accuracy: t.accuracy,
    asciiWordBoundaries: t.rules.asciiWordBoundaries,
    avoidSubclass: t.avoidSubclass,
    bestEffortTarget: t.target
  }), s = Ut(a, t), o = ht(s.pattern, {
    captureTransfers: s._captureTransfers,
    hiddenCaptures: s._hiddenCaptures,
    mode: "external"
  }), i = dt(o.pattern), u = ft(i.pattern, {
    captureTransfers: o.captureTransfers,
    hiddenCaptures: o.hiddenCaptures
  }), c = {
    pattern: u.pattern,
    flags: `${t.hasIndices ? "d" : ""}${t.global ? "g" : ""}${s.flags}${s.options.disable.v ? "u" : "v"}`
  };
  if (t.avoidSubclass) {
    if (t.lazyCompileLength !== 1 / 0)
      throw new Error("Lazy compilation requires subclass");
  } else {
    const p = u.hiddenCaptures.sort((d, w) => d - w), l = Array.from(u.captureTransfers), f = a._strategy, g = c.pattern.length >= t.lazyCompileLength;
    (p.length || l.length || f || g) && (c.options = {
      ...p.length && { hiddenCaptures: p },
      ...l.length && { transfers: l },
      ...f && { strategy: f },
      ...g && { lazyCompile: g }
    });
  }
  return c;
}
function en(e, r) {
  return Kt(e, {
    global: !0,
    hasIndices: !0,
    lazyCompileLength: 3e3,
    rules: {
      allowOrphanBackrefs: !0,
      asciiWordBoundaries: !0,
      captureGroup: !0,
      recursionLimit: 5,
      singleline: !0
    },
    ...r
  });
}
function rn(e = {}) {
  const r = Object.assign({
    target: "auto",
    cache: /* @__PURE__ */ new Map()
  }, e);
  return r.regexConstructor ||= (t) => en(t, { target: r.target }), {
    createScanner(t) {
      return new We(t, r);
    },
    createString(t) {
      return { content: t };
    }
  };
}
function tn() {
  const e = {
    cache: /* @__PURE__ */ new Map(),
    regexConstructor: () => {
      throw new Error("JavaScriptRawEngine: only support precompiled grammar");
    }
  };
  return {
    createScanner(r) {
      return new We(r, e);
    },
    createString(r) {
      return { content: r };
    }
  };
}
export {
  We as JavaScriptScanner,
  tn as createJavaScriptRawEngine,
  rn as createJavaScriptRegexEngine,
  en as defaultJavaScriptRegexConstructor
};
//# sourceMappingURL=engine-javascript-hi1kqifa6nkcridk.js.map
