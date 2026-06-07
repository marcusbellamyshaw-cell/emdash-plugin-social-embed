"use client";
import { jsxs as M, jsx as i } from "react/jsx-runtime";
import { CaretLeftIcon as L, CaretRightIcon as K, GlobeHemisphereWestIcon as P } from "@phosphor-icons/react";
import { useState as C, useCallback as p } from "react";
import { c as b } from "./cn-ct4n7r74mh8y0f48.js";
const _ = {
  size: {
    sm: {
      classes: "p-3 gap-2",
      cellHeight: "h-[22px]",
      cellWidth: "w-6",
      calendarWidth: "w-[168px]",
      textSize: "text-xs",
      iconSize: 14,
      description: "Compact calendar for tight spaces"
    },
    base: {
      classes: "p-4 gap-2.5",
      cellHeight: "h-[26px]",
      cellWidth: "w-7",
      calendarWidth: "w-[196px]",
      textSize: "text-sm",
      iconSize: 16,
      description: "Default calendar size"
    },
    lg: {
      classes: "p-5 gap-3",
      cellHeight: "h-[32px]",
      cellWidth: "w-9",
      calendarWidth: "w-[252px]",
      textSize: "text-base",
      iconSize: 18,
      description: "Large calendar for prominent date selection"
    }
  },
  variant: {
    default: {
      classes: "bg-kumo-overlay",
      description: "Default calendar appearance"
    },
    subtle: {
      classes: "bg-kumo-base",
      description: "Subtle calendar with minimal background"
    }
  }
}, k = {
  size: "base",
  variant: "default"
};
function U({
  size: c = k.size,
  variant: u = k.variant
} = {}) {
  return b(
    // Base styles
    "flex w-fit flex-col rounded-xl select-none",
    // Apply variant and size styles
    _.variant[u].classes,
    _.size[c].classes
  );
}
function y(c) {
  return _.size[c];
}
const V = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function J({
  onStartDateChange: c,
  onEndDateChange: u,
  size: g = k.size,
  variant: D = k.variant,
  timezone: d = "New York, NY, USA (GMT-4)",
  className: h
}) {
  const [r, x] = C(null), [s, A] = C(null), [n, E] = C(/* @__PURE__ */ new Date()), [v, w] = C(null), z = y(g), R = (a) => {
    x(a), c(a);
  }, W = (a) => {
    A(a), u(a);
  }, T = p((a, e) => {
    const t = new Date(a);
    return t.setMonth(t.getMonth() + (e || 0)), t.toLocaleString("default", { month: "long" });
  }, []), H = p((a, e) => {
    const t = new Date(a);
    return t.setMonth(t.getMonth() + (e || 0)), t.getFullYear();
  }, []), m = p(
    (a, e) => {
      const t = new Date(a);
      return t.setDate(1), t.setMonth(t.getMonth() + (e || 0)), t.getDay();
    },
    []
  ), f = p(
    (a, e) => {
      const t = new Date(a);
      return t.setDate(1), t.setMonth(t.getMonth() + (e || 0)), t.setMonth(t.getMonth() + 1), t.setDate(0), t.getDate();
    },
    []
  ), I = p((a) => {
    E((e) => {
      const t = new Date(e);
      return t.setMonth(t.getMonth() + a), t;
    });
  }, []), o = p(
    (a, e, t) => {
      const S = m(a, e);
      if (t < S) {
        const l = new Date(a);
        return l.setMonth(l.getMonth() + e), l.setDate(1), l.setDate(l.getDate() - (S - t)), l;
      } else if (t > f(a, e) + S - 1) {
        const l = new Date(a);
        return l.setMonth(l.getMonth() + e), l.setMonth(l.getMonth() + 1), l.setDate(
          t - f(a, e) - S + 1
        ), l;
      } else {
        const l = new Date(a);
        return l.setMonth(l.getMonth() + e), l.setDate(t - S + 1), l;
      }
    },
    [m, f]
  ), N = p((a, e) => !a || !e ? !1 : a.toDateString() === e.toDateString(), []);
  return /* @__PURE__ */ M("div", { className: b(U({ size: g, variant: D }), h), children: [
    /* @__PURE__ */ M("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ M("div", { className: b("relative", z.calendarWidth), children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": "Previous month",
            className: "absolute top-0 left-0 cursor-pointer rounded bg-kumo-interact/85 p-1.5 hover:bg-kumo-interact",
            onClick: () => I(-1),
            children: /* @__PURE__ */ i(L, { size: z.iconSize })
          }
        ),
        /* @__PURE__ */ i(
          $,
          {
            month: T(n),
            year: H(n),
            size: g,
            updateCurrentMonth: (a) => {
              E(new Date(a));
            }
          }
        ),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-7 gap-0 gap-y-0.5", children: Array.from({ length: 42 }).map((a, e) => /* @__PURE__ */ i(
          F,
          {
            date: o(n, 0, e),
            size: g,
            mode: (
              // After current month range
              r && s && o(n, 0, e) >= r && o(n, 0, e) <= s && e > f(n, 0) + m(n, 0) - 1 || // Before current month range
              r && s && o(n, 0, e) >= r && o(n, 0, e) <= s && e < m(n, 0) ? 5 : (
                // Before current month range
                e < m(n, 0) || // After current month range
                e > f(n, 0) + m(n, 0) - 1 ? 0 : (
                  // Selected start date
                  N(
                    o(n, 0, e),
                    r
                  ) ? 2 : (
                    // Selected end date
                    N(
                      o(n, 0, e),
                      s
                    ) ? 3 : (
                      // Selected date range
                      r && o(n, 0, e) >= r && s && o(n, 0, e) <= s || // Hovering past a starting date and no end date selected
                      r && !s && v && v > r && o(n, 0, e) <= v && o(n, 0, e) > r ? 4 : (
                        // Default to enabled date
                        1
                      )
                    )
                  )
                )
              )
            ),
            onClick: (t) => {
              !r || t < r ? (R(t), w(t)) : W(t);
            },
            isHoveringDate: (t) => {
              r && !s && t > r && w(t);
            }
          },
          e
        )) })
      ] }),
      /* @__PURE__ */ M("div", { className: b("relative", z.calendarWidth), children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": "Next month",
            className: "absolute top-0 right-0 cursor-pointer rounded bg-kumo-interact/85 p-1.5 hover:bg-kumo-interact",
            onClick: () => I(1),
            children: /* @__PURE__ */ i(K, { size: z.iconSize })
          }
        ),
        /* @__PURE__ */ i(
          $,
          {
            month: T(n, 1),
            year: H(n, 1),
            size: g,
            updateCurrentMonth: (a) => {
              const e = new Date(a);
              e.setMonth(e.getMonth() - 1), E(e);
            }
          }
        ),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-7 gap-0 gap-y-0.5", children: Array.from({ length: 42 }).map((a, e) => /* @__PURE__ */ i(
          F,
          {
            date: o(n, 1, e),
            size: g,
            mode: (
              // After current month range
              r && s && o(n, 1, e) >= r && o(n, 1, e) <= s && e > f(n, 1) + m(n, 1) - 1 || // Before current month range
              r && s && o(n, 1, e) >= r && o(n, 1, e) <= s && e < m(n, 1) ? 5 : (
                // Before current month range
                e < m(n, 1) || // After current month range
                e > f(n, 1) + m(n, 1) - 1 ? 0 : (
                  // Selected start date
                  N(
                    o(n, 1, e),
                    r
                  ) ? 2 : (
                    // Selected end date
                    N(
                      o(n, 1, e),
                      s
                    ) ? 3 : (
                      // Selected date range
                      r && o(n, 1, e) >= r && s && o(n, 1, e) <= s || // Hovering past a starting date and no end date selected
                      r && !s && v && v > r && o(n, 1, e) <= v && o(n, 1, e) > r ? 4 : (
                        // Default to enabled date
                        1
                      )
                    )
                  )
                )
              )
            ),
            onClick: (t) => {
              !r || t < r ? (R(t), w(t)) : W(t);
            },
            isHoveringDate: (t) => {
              r && !s && t > r && w(t);
            }
          },
          e
        )) })
      ] })
    ] }),
    /* @__PURE__ */ i(
      Y,
      {
        timezone: d,
        size: g,
        reset: () => {
          R(null), W(null);
        }
      }
    )
  ] });
}
function F({
  date: c,
  mode: u,
  size: g = k.size,
  onClick: D,
  isHoveringDate: d
}) {
  const h = y(g), r = p((n) => n.getDate(), []), x = p(() => {
    switch (u) {
      case 0:
        return "bg-transparent";
      case 1:
        return "bg-transparent";
      case 2:
        return "!bg-kumo-contrast rounded-tl-[5px] rounded-bl-[5px]";
      case 3:
        return "!bg-kumo-contrast rounded-tr-[5px] rounded-br-[5px]";
      case 4:
        return "bg-kumo-interact";
      case 5:
        return "bg-kumo-fill";
    }
  }, [u]), s = p(() => {
    switch (u) {
      case 0:
      case 5:
        return "!text-kumo-subtle";
      case 2:
      case 3:
        return "!text-kumo-inverse";
      default:
        return "text-kumo-default";
    }
  }, [u]), A = p(() => {
    const n = c.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    switch (u) {
      case 2:
        return `${n}, selected as start date`;
      case 3:
        return `${n}, selected as end date`;
      case 4:
        return `${n}, within selected range`;
      default:
        return n;
    }
  }, [c, u]);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      "aria-label": A(),
      id: c.toDateString(),
      className: b(
        h.cellHeight,
        h.cellWidth,
        h.textSize,
        "cursor-pointer text-center text-kumo-default transition-all duration-[50]",
        `leading-[${h.cellHeight.replace("h-[", "").replace("]", "")}]`,
        u !== 0 && u !== 5 ? "hover:bg-kumo-interact" : "",
        x(),
        s()
      ),
      onClick: () => D?.(c),
      onMouseOver: () => d?.(c),
      onFocus: () => d?.(c),
      children: r(c)
    }
  );
}
function $({
  month: c,
  year: u,
  size: g = k.size,
  updateCurrentMonth: D
}) {
  const d = y(g);
  return /* @__PURE__ */ M("div", { children: [
    /* @__PURE__ */ i("div", { className: "mb-3 text-center", children: /* @__PURE__ */ i(
      "input",
      {
        "aria-label": "Edit month and year",
        defaultValue: `${c} ${u}`,
        className: b(
          "w-full rounded-md border-none bg-transparent py-1.5 text-center font-semibold text-kumo-default transition-all duration-200 focus:outline-none focus:ring-kumo-focus/50 focus:ring-[1.5px]",
          d.textSize
        ),
        onBlur: (h) => {
          h.currentTarget.value.length !== 0 && D?.(h.currentTarget.value);
        }
      },
      `${c}-${u}`
    ) }),
    /* @__PURE__ */ i("div", { className: "mt-2 grid grid-cols-7 gap-1", children: V.map((h) => /* @__PURE__ */ i(
      "div",
      {
        className: b(
          "h-[22px] text-center text-kumo-subtle",
          d.cellWidth,
          d.textSize
        ),
        children: h
      },
      h
    )) })
  ] });
}
function Y({
  timezone: c,
  size: u = k.size,
  reset: g
}) {
  const D = y(u);
  return /* @__PURE__ */ M(
    "div",
    {
      className: b("flex items-center gap-2 text-kumo-subtle", D.textSize),
      children: [
        /* @__PURE__ */ i(P, { size: D.iconSize }),
        /* @__PURE__ */ M("span", { className: "flex-1", children: [
          "Timezone: ",
          c
        ] }),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: g,
            className: "cursor-pointer font-semibold text-kumo-default underline underline-offset-2",
            children: "Reset Dates"
          }
        )
      ]
    }
  );
}
export {
  J as D
};
//# sourceMappingURL=date-range-picker-o8uyril1kogvhoei.js.map
