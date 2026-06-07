// src/header/table-header.ts
import { mergeAttributes, Node } from "@tiptap/core";

// src/utilities/parseAlign.ts
function normalizeTableCellAlign(value) {
  if (value === "left" /* Left */ || value === "right" /* Right */ || value === "center" /* Center */) {
    return value;
  }
  return null;
}
function parseAlign(element) {
  const styleAlign = (element.style.textAlign || "").trim().toLowerCase();
  const attrAlign = (element.getAttribute("align") || "").trim().toLowerCase();
  const align = styleAlign || attrAlign;
  return normalizeTableCellAlign(align);
}
function createAlignAttribute() {
  return {
    default: null,
    parseHTML: (element) => parseAlign(element),
    renderHTML: (attributes) => {
      if (!attributes.align) {
        return {};
      }
      return {
        style: `text-align: ${attributes.align}`
      };
    }
  };
}

// src/header/table-header.ts
var TableHeader = Node.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? colwidth.split(",").map((width) => parseInt(width, 10)) : null;
          return value;
        }
      },
      align: createAlignAttribute()
    };
  },
  tableRole: "header_cell",
  isolating: true,
  parseHTML() {
    return [{ tag: "th" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["th", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});
export {
  TableHeader
};
//# sourceMappingURL=index.js.map