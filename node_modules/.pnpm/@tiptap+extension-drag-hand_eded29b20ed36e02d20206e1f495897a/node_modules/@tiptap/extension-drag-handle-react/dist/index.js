// src/DragHandle.tsx
import {
  defaultComputePositionConfig,
  DragHandlePlugin,
  dragHandlePluginDefaultKey,
  normalizeNestedOptions
} from "@tiptap/extension-drag-handle";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
var DragHandle = (props) => {
  const {
    className = "drag-handle",
    children,
    editor,
    pluginKey = dragHandlePluginDefaultKey,
    onNodeChange,
    onElementDragStart,
    onElementDragEnd,
    getReferencedVirtualElement,
    computePositionConfig = defaultComputePositionConfig,
    nested = false
  } = props;
  const [element] = useState(() => {
    if (typeof document === "undefined") {
      return null;
    }
    return document.createElement("div");
  });
  const nestedOptions = useMemo(() => normalizeNestedOptions(nested), [JSON.stringify(nested)]);
  useEffect(() => {
    if (!element) {
      return;
    }
    element.className = className;
    element.style.visibility = "hidden";
    element.style.position = "absolute";
    element.dataset.dragging = "false";
  }, [className, element]);
  useEffect(() => {
    if (!element) {
      return;
    }
    if (editor.isDestroyed) {
      return;
    }
    const { plugin, unbind } = DragHandlePlugin({
      editor,
      element,
      pluginKey,
      computePositionConfig: {
        ...defaultComputePositionConfig,
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
  return createPortal(children, element);
};

// src/index.ts
var index_default = DragHandle;
export {
  DragHandle,
  index_default as default
};
//# sourceMappingURL=index.js.map