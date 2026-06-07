"use client";
import { t as r, c as s } from "./vendor-styling-gobnkhsy0rva4qd3.js";
function a(...e) {
  return r(s(e));
}
const c = (e) => e.toString(16).padStart(2, "0");
function l() {
  const t = (typeof globalThis < "u" ? globalThis : {}).crypto;
  if (t && typeof t.randomUUID == "function")
    return t.randomUUID();
  if (t && typeof t.getRandomValues == "function") {
    const n = new Uint8Array(16);
    t.getRandomValues(n), n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128;
    const o = Array.from(n, c).join("");
    return `${o.slice(0, 8)}-${o.slice(8, 12)}-${o.slice(
      12,
      16
    )}-${o.slice(16, 20)}-${o.slice(20)}`;
  }
  return `r${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
export {
  a as c,
  l as s
};
//# sourceMappingURL=cn-ct4n7r74mh8y0f48.js.map
