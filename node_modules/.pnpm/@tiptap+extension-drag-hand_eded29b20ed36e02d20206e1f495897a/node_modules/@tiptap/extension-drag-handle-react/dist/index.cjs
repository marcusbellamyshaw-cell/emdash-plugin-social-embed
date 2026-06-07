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
  DragHandle: () => DragHandle,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/DragHandle.tsx
var import_extension_drag_handle = require("@tiptap/extension-drag-handle");
var import_react = require("react");
var import_react_dom = require("react-dom");
var DragHandle = (props) => {
  const {
    className = "drag-handle",
    children,
    editor,
    pluginKey = import_extension_drag_handle.dragHandlePluginDefaultKey,
    onNodeChange,
    onElementDragStart,
    onElementDragEnd,
    getReferencedVirtualElement,
    computePositionConfig = import_extension_drag_handle.defaultComputePositionConfig,
    nested = false
  } = props;
  const [element] = (0, import_react.useState)(() => {
    if (typeof document === "undefined") {
      return null;
    }
    return document.createElement("div");
  });
  const nestedOptions = (0, import_react.useMemo)(() => (0, import_extension_drag_handle.normalizeNestedOptions)(nested), [JSON.stringify(nested)]);
  (0, import_react.useEffect)(() => {
    if (!element) {
      return;
    }
    element.className = className;
    element.style.visibility = "hidden";
    element.style.position = "absolute";
    element.dataset.dragging = "false";
  }, [className, element]);
  (0, import_react.useEffect)(() => {
    if (!element) {
      return;
    }
    if (editor.isDestroyed) {
      return;
    }
    const { plugin, unbind } = (0, import_extension_drag_handle.DragHandlePlugin)({
      editor,
      element,
      pluginKey,
      computePositionConfig: {
        ...import_extension_drag_handle.defaultComputePositionConfig,
        ...computePositionConfig
      },
      onElementDragStart,
      onElementDragEnd,
      onNodeChange,
      getReferencedVirtualElement,
      nestedOptions
    });
    editor.registerPlugin(plugin);
    return () => {
      if (!editor.isDestroyed) {
        editor.unregisterPlugin(pluginKey);
      }
      unbind();
    };
  }, [
    element,
    editor,
    onNodeChange,
    getReferencedVirtualElement,
    pluginKey,
    computePositionConfig,
    onElementDragStart,
    onElementDragEnd,
    nestedOptions
  ]);
  if (!element) {
    return null;
  }
  return (0, import_react_dom.createPortal)(children, element);
};

// src/index.ts
var index_default = DragHandle;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DragHandle
});
//# sourceMappingURL=index.cjs.map