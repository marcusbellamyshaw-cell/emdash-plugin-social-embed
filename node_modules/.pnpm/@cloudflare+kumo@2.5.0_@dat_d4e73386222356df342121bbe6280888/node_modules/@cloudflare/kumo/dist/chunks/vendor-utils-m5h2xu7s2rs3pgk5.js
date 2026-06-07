"use client";
import D from "react";
var V = { exports: {} }, w = {};
var I;
function W() {
  if (I) return w;
  I = 1;
  var c = D;
  function d(n, u) {
    return n === u && (n !== 0 || 1 / n === 1 / u) || n !== n && u !== u;
  }
  var v = typeof Object.is == "function" ? Object.is : d, L = c.useState, l = c.useEffect, m = c.useLayoutEffect, h = c.useDebugValue;
  function y(n, u) {
    var e = u(), r = L({ inst: { value: e, getSnapshot: u } }), t = r[0].inst, a = r[1];
    return m(
      function() {
        t.value = e, t.getSnapshot = u, O(t) && a({ inst: t });
      },
      [n, e, u]
    ), l(
      function() {
        return O(t) && a({ inst: t }), n(function() {
          O(t) && a({ inst: t });
        });
      },
      [n]
    ), h(e), e;
  }
  function O(n) {
    var u = n.getSnapshot;
    n = n.value;
    try {
      var e = u();
      return !v(n, e);
    } catch {
      return !0;
    }
  }
  function i(n, u) {
    return u();
  }
  var o = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? i : y;
  return w.useSyncExternalStore = c.useSyncExternalStore !== void 0 ? c.useSyncExternalStore : o, w;
}
var b = {};
var M;
function N() {
  return M || (M = 1, process.env.NODE_ENV !== "production" && (function() {
    function c(e, r) {
      return e === r && (e !== 0 || 1 / e === 1 / r) || e !== e && r !== r;
    }
    function d(e, r) {
      o || l.startTransition === void 0 || (o = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var t = r();
      if (!n) {
        var a = r();
        m(t, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), n = !0);
      }
      a = h({
        inst: { value: t, getSnapshot: r }
      });
      var s = a[0].inst, S = a[1];
      return O(
        function() {
          s.value = t, s.getSnapshot = r, v(s) && S({ inst: s });
        },
        [e, t, r]
      ), y(
        function() {
          return v(s) && S({ inst: s }), e(function() {
            v(s) && S({ inst: s });
          });
        },
        [e]
      ), i(t), t;
    }
    function v(e) {
      var r = e.getSnapshot;
      e = e.value;
      try {
        var t = r();
        return !m(e, t);
      } catch {
        return !0;
      }
    }
    function L(e, r) {
      return r();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var l = D, m = typeof Object.is == "function" ? Object.is : c, h = l.useState, y = l.useEffect, O = l.useLayoutEffect, i = l.useDebugValue, o = !1, n = !1, u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? L : d;
    b.useSyncExternalStore = l.useSyncExternalStore !== void 0 ? l.useSyncExternalStore : u, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), b;
}
var j;
function C() {
  return j || (j = 1, process.env.NODE_ENV === "production" ? V.exports = W() : V.exports = N()), V.exports;
}
var $ = C(), A = { exports: {} }, G = {};
var B;
function U() {
  if (B) return G;
  B = 1;
  var c = D, d = C();
  function v(i, o) {
    return i === o && (i !== 0 || 1 / i === 1 / o) || i !== i && o !== o;
  }
  var L = typeof Object.is == "function" ? Object.is : v, l = d.useSyncExternalStore, m = c.useRef, h = c.useEffect, y = c.useMemo, O = c.useDebugValue;
  return G.useSyncExternalStoreWithSelector = function(i, o, n, u, e) {
    var r = m(null);
    if (r.current === null) {
      var t = { hasValue: !1, value: null };
      r.current = t;
    } else t = r.current;
    r = y(
      function() {
        function s(f) {
          if (!S) {
            if (S = !0, E = f, f = u(f), e !== void 0 && t.hasValue) {
              var _ = t.value;
              if (e(_, f))
                return p = _;
            }
            return p = f;
          }
          if (_ = p, L(E, f)) return _;
          var T = u(f);
          return e !== void 0 && e(_, T) ? (E = f, _) : (E = f, p = T);
        }
        var S = !1, E, p, R = n === void 0 ? null : n;
        return [
          function() {
            return s(o());
          },
          R === null ? void 0 : function() {
            return s(R());
          }
        ];
      },
      [o, n, u, e]
    );
    var a = l(i, r[0], r[1]);
    return h(
      function() {
        t.hasValue = !0, t.value = a;
      },
      [a]
    ), O(a), a;
  }, G;
}
var g = {};
var H;
function x() {
  return H || (H = 1, process.env.NODE_ENV !== "production" && (function() {
    function c(i, o) {
      return i === o && (i !== 0 || 1 / i === 1 / o) || i !== i && o !== o;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var d = D, v = C(), L = typeof Object.is == "function" ? Object.is : c, l = v.useSyncExternalStore, m = d.useRef, h = d.useEffect, y = d.useMemo, O = d.useDebugValue;
    g.useSyncExternalStoreWithSelector = function(i, o, n, u, e) {
      var r = m(null);
      if (r.current === null) {
        var t = { hasValue: !1, value: null };
        r.current = t;
      } else t = r.current;
      r = y(
        function() {
          function s(f) {
            if (!S) {
              if (S = !0, E = f, f = u(f), e !== void 0 && t.hasValue) {
                var _ = t.value;
                if (e(_, f))
                  return p = _;
              }
              return p = f;
            }
            if (_ = p, L(E, f))
              return _;
            var T = u(f);
            return e !== void 0 && e(_, T) ? (E = f, _) : (E = f, p = T);
          }
          var S = !1, E, p, R = n === void 0 ? null : n;
          return [
            function() {
              return s(o());
            },
            R === null ? void 0 : function() {
              return s(R());
            }
          ];
        },
        [o, n, u, e]
      );
      var a = l(i, r[0], r[1]);
      return h(
        function() {
          t.hasValue = !0, t.value = a;
        },
        [a]
      ), O(a), a;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), g;
}
var K;
function z() {
  return K || (K = 1, process.env.NODE_ENV === "production" ? A.exports = U() : A.exports = x()), A.exports;
}
var k = z();
export {
  $ as s,
  k as w
};
//# sourceMappingURL=vendor-utils-m5h2xu7s2rs3pgk5.js.map
