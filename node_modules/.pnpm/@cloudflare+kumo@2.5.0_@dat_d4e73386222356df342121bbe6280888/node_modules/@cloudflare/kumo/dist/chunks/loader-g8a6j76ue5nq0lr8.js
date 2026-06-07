"use client";
import { jsxs as a, jsx as t } from "react/jsx-runtime";
import { r as n } from "./resolve-variant-gw6eh7fa4st8ej7m.js";
const l = {
  size: {
    sm: {
      value: 16,
      description: "Small loader for inline use"
    },
    base: {
      value: 24,
      description: "Default loader size"
    },
    lg: {
      value: 32,
      description: "Large loader for prominent loading states"
    }
  }
}, r = {
  size: "base"
};
function u({
  size: e = r.size
} = {}) {
  return typeof e == "number" ? e : n(l.size, e, r.size).value;
}
const m = ({
  className: e,
  size: s = r.size,
  "aria-label": o = "Loading"
}) => {
  const i = u({ size: s });
  return /* @__PURE__ */ a(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      stroke: "currentColor",
      className: e,
      style: { height: i, width: i },
      role: "status",
      "aria-label": o,
      children: [
        /* @__PURE__ */ a(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "9.5",
            fill: "none",
            strokeWidth: "2",
            strokeLinecap: "round",
            children: [
              /* @__PURE__ */ t(
                "animateTransform",
                {
                  attributeName: "transform",
                  type: "rotate",
                  from: "0 12 12",
                  to: "360 12 12",
                  dur: "2s",
                  repeatCount: "indefinite"
                }
              ),
              /* @__PURE__ */ t(
                "animate",
                {
                  attributeName: "stroke-dasharray",
                  values: "0 150;42 150;42 150",
                  keyTimes: "0;0.5;1",
                  dur: "1.5s",
                  repeatCount: "indefinite"
                }
              ),
              /* @__PURE__ */ t(
                "animate",
                {
                  attributeName: "stroke-dashoffset",
                  values: "0;-16;-59",
                  keyTimes: "0;0.5;1",
                  dur: "1.5s",
                  repeatCount: "indefinite"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ t(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "9.5",
            fill: "none",
            opacity: 0.1,
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
};
export {
  m as L
};
//# sourceMappingURL=loader-g8a6j76ue5nq0lr8.js.map
