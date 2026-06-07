"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Typography: () => Typography,
  closeDoubleQuote: () => closeDoubleQuote,
  closeSingleQuote: () => closeSingleQuote,
  copyright: () => copyright,
  default: () => index_default,
  ellipsis: () => ellipsis,
  emDash: () => emDash,
  laquo: () => laquo,
  leftArrow: () => leftArrow,
  multiplication: () => multiplication,
  notEqual: () => notEqual,
  oneHalf: () => oneHalf,
  oneQuarter: () => oneQuarter,
  openDoubleQuote: () => openDoubleQuote,
  openSingleQuote: () => openSingleQuote,
  plusMinus: () => plusMinus,
  raquo: () => raquo,
  registeredTrademark: () => registeredTrademark,
  rightArrow: () => rightArrow,
  servicemark: () => servicemark,
  superscriptThree: () => superscriptThree,
  superscriptTwo: () => superscriptTwo,
  threeQuarters: () => threeQuarters,
  trademark: () => trademark
});
module.exports = __toCommonJS(index_exports);

// src/typography.ts
var import_core = require("@tiptap/core");
var emDash = (override) => (0, import_core.textInputRule)({
  find: /--$/,
  replace: override != null ? override : "\u2014"
});
var ellipsis = (override) => (0, import_core.textInputRule)({
  find: /\.\.\.$/,
  replace: override != null ? override : "\u2026"
});
var openDoubleQuote = (override) => (0, import_core.textInputRule)({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/,
  replace: override != null ? override : "\u201C"
});
var closeDoubleQuote = (override) => (0, import_core.textInputRule)({
  find: /"$/,
  replace: override != null ? override : "\u201D"
});
var openSingleQuote = (override) => (0, import_core.textInputRule)({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/,
  replace: override != null ? override : "\u2018"
});
var closeSingleQuote = (override) => (0, import_core.textInputRule)({
  find: /'$/,
  replace: override != null ? override : "\u2019"
});
var leftArrow = (override) => (0, import_core.textInputRule)({
  find: /<-$/,
  replace: override != null ? override : "\u2190"
});
var rightArrow = (override) => (0, import_core.textInputRule)({
  find: /->$/,
  replace: override != null ? override : "\u2192"
});
var copyright = (override) => (0, import_core.textInputRule)({
  find: /\(c\)$/,
  replace: override != null ? override : "\xA9"
});
var trademark = (override) => (0, import_core.textInputRule)({
  find: /\(tm\)$/,
  replace: override != null ? override : "\u2122"
});
var servicemark = (override) => (0, import_core.textInputRule)({
  find: /\(sm\)$/,
  replace: override != null ? override : "\u2120"
});
var registeredTrademark = (override) => (0, import_core.textInputRule)({
  find: /\(r\)$/,
  replace: override != null ? override : "\xAE"
});
var oneHalf = (override) => (0, import_core.textInputRule)({
  find: /(?:^|\s)(1\/2)\s$/,
  replace: override != null ? override : "\xBD"
});
var plusMinus = (override) => (0, import_core.textInputRule)({
  find: /\+\/-$/,
  replace: override != null ? override : "\xB1"
});
var notEqual = (override) => (0, import_core.textInputRule)({
  find: /!=$/,
  replace: override != null ? override : "\u2260"
});
var laquo = (override) => (0, import_core.textInputRule)({
  find: /<<$/,
  replace: override != null ? override : "\xAB"
});
var raquo = (override) => (0, import_core.textInputRule)({
  find: />>$/,
  replace: override != null ? override : "\xBB"
});
var multiplication = (override) => (0, import_core.textInputRule)({
  find: /\d+\s?([*x])\s?\d+$/,
  replace: override != null ? override : "\xD7"
});
var superscriptTwo = (override) => (0, import_core.textInputRule)({
  find: /\^2$/,
  replace: override != null ? override : "\xB2"
});
var superscriptThree = (override) => (0, import_core.textInputRule)({
  find: /\^3$/,
  replace: override != null ? override : "\xB3"
});
var oneQuarter = (override) => (0, import_core.textInputRule)({
  find: /(?:^|\s)(1\/4)\s$/,
  replace: override != null ? override : "\xBC"
});
var threeQuarters = (override) => (0, import_core.textInputRule)({
  find: /(?:^|\s)(3\/4)\s$/,
  replace: override != null ? override : "\xBE"
});
var Typography = import_core.Extension.create({
  name: "typography",
  addOptions() {
    return {
      closeDoubleQuote: "\u201D",
      closeSingleQuote: "\u2019",
      copyright: "\xA9",
      ellipsis: "\u2026",
      emDash: "\u2014",
      laquo: "\xAB",
      leftArrow: "\u2190",
      multiplication: "\xD7",
      notEqual: "\u2260",
      oneHalf: "\xBD",
      oneQuarter: "\xBC",
      openDoubleQuote: "\u201C",
      openSingleQuote: "\u2018",
      plusMinus: "\xB1",
      raquo: "\xBB",
      registeredTrademark: "\xAE",
      rightArrow: "\u2192",
      servicemark: "\u2120",
      superscriptThree: "\xB3",
      superscriptTwo: "\xB2",
      threeQuarters: "\xBE",
      trademark: "\u2122"
    };
  },
  addInputRules() {
    var _a, _b;
    const rules = [];
    if (this.options.emDash !== false) {
      rules.push(emDash(this.options.emDash));
    }
    if (this.options.ellipsis !== false) {
      rules.push(ellipsis(this.options.ellipsis));
    }
    const isRTL = this.editor.options.textDirection === "rtl";
    if ((_a = this.options.doubleQuotes) == null ? void 0 : _a.rtl) {
      const { open, close } = this.options.doubleQuotes.rtl;
      rules.push(openDoubleQuote(open));
      rules.push(closeDoubleQuote(close));
    } else if (isRTL) {
      rules.push(openDoubleQuote("\u201D"));
      rules.push(closeDoubleQuote("\u201C"));
    } else {
      if (this.options.openDoubleQuote !== false) {
        rules.push(openDoubleQuote(this.options.openDoubleQuote));
      }
      if (this.options.closeDoubleQuote !== false) {
        rules.push(closeDoubleQuote(this.options.closeDoubleQuote));
      }
    }
    if ((_b = this.options.singleQuotes) == null ? void 0 : _b.rtl) {
      const { open, close } = this.options.singleQuotes.rtl;
      rules.push(openSingleQuote(open));
      rules.push(closeSingleQuote(close));
    } else if (isRTL) {
      rules.push(openSingleQuote("\u2019"));
      rules.push(closeSingleQuote("\u2018"));
    } else {
      if (this.options.openSingleQuote !== false) {
        rules.push(openSingleQuote(this.options.openSingleQuote));
      }
      if (this.options.closeSingleQuote !== false) {
        rules.push(closeSingleQuote(this.options.closeSingleQuote));
      }
    }
    if (this.options.leftArrow !== false) {
      rules.push(leftArrow(this.options.leftArrow));
    }
    if (this.options.rightArrow !== false) {
      rules.push(rightArrow(this.options.rightArrow));
    }
    if (this.options.copyright !== false) {
      rules.push(copyright(this.options.copyright));
    }
    if (this.options.trademark !== false) {
      rules.push(trademark(this.options.trademark));
    }
    if (this.options.servicemark !== false) {
      rules.push(servicemark(this.options.servicemark));
    }
    if (this.options.registeredTrademark !== false) {
      rules.push(registeredTrademark(this.options.registeredTrademark));
    }
    if (this.options.oneHalf !== false) {
      rules.push(oneHalf(this.options.oneHalf));
    }
    if (this.options.plusMinus !== false) {
      rules.push(plusMinus(this.options.plusMinus));
    }
    if (this.options.notEqual !== false) {
      rules.push(notEqual(this.options.notEqual));
    }
    if (this.options.laquo !== false) {
      rules.push(laquo(this.options.laquo));
    }
    if (this.options.raquo !== false) {
      rules.push(raquo(this.options.raquo));
    }
    if (this.options.multiplication !== false) {
      rules.push(multiplication(this.options.multiplication));
    }
    if (this.options.superscriptTwo !== false) {
      rules.push(superscriptTwo(this.options.superscriptTwo));
    }
    if (this.options.superscriptThree !== false) {
      rules.push(superscriptThree(this.options.superscriptThree));
    }
    if (this.options.oneQuarter !== false) {
      rules.push(oneQuarter(this.options.oneQuarter));
    }
    if (this.options.threeQuarters !== false) {
      rules.push(threeQuarters(this.options.threeQuarters));
    }
    return rules;
  }
});

// src/index.ts
var index_default = Typography;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Typography,
  closeDoubleQuote,
  closeSingleQuote,
  copyright,
  ellipsis,
  emDash,
  laquo,
  leftArrow,
  multiplication,
  notEqual,
  oneHalf,
  oneQuarter,
  openDoubleQuote,
  openSingleQuote,
  plusMinus,
  raquo,
  registeredTrademark,
  rightArrow,
  servicemark,
  superscriptThree,
  superscriptTwo,
  threeQuarters,
  trademark
});
//# sourceMappingURL=index.cjs.map