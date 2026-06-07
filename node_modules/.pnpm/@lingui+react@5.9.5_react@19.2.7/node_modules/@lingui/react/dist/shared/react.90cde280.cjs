'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');

const tagRe = /<([a-zA-Z0-9]+)>([\s\S]*?)<\/\1>|<([a-zA-Z0-9]+)\/>/;
const voidElementTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  menuitem: true
};
function formatElements(value, elements = {}) {
  const parts = value.split(tagRe);
  if (parts.length === 1)
    return value;
  const uniqueId = makeCounter(0, "$lingui$");
  const tree = [];
  const before = parts.shift();
  if (before)
    tree.push(before);
  for (const [index, children, after] of getElements(parts)) {
    let element = typeof index !== "undefined" ? elements[index] : void 0;
    if (!element || voidElementTags[element.type] && children) {
      if (!element) {
        console.error(
          `Can't use element at index '${index}' as it is not declared in the original translation`
        );
      } else {
        console.error(
          `${element.type} is a void element tag therefore it must have no children`
        );
      }
      element = /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    if (Array.isArray(element)) {
      element = /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: element });
    }
    tree.push(
      React.cloneElement(
        element,
        { key: uniqueId() },
        // format children for pair tags
        // unpaired tags might have children if it's a component passed as a variable
        children ? formatElements(children, elements) : element.props.children
      )
    );
    if (after)
      tree.push(after);
  }
  return tree.length === 1 ? tree[0] : tree;
}
function getElements(parts) {
  if (!parts.length)
    return [];
  const [paired, children, unpaired, after] = parts.slice(0, 4);
  const triple = [paired || unpaired, children || "", after];
  return [triple].concat(getElements(parts.slice(4, parts.length)));
}
const makeCounter = (count = 0, prefix = "") => () => `${prefix}_${count++}`;

function TransNoContext(props) {
  const {
    render,
    component,
    id,
    message,
    formats,
    lingui: { i18n, defaultComponent }
  } = props;
  const { values, components } = getInterpolationValuesAndComponents(props);
  const _translation = i18n && typeof i18n._ === "function" ? i18n._(id, values, { message, formats }) : id;
  const translation = _translation ? formatElements(_translation, components) : null;
  if (render === null || component === null) {
    return translation;
  }
  const FallbackComponent = defaultComponent || RenderChildren;
  const i18nProps = {
    id,
    message,
    translation,
    children: translation
    // for type-compatibility with `component` prop
  };
  if (render && component) {
    console.error(
      "You can't use both `component` and `render` prop at the same time. `component` is ignored."
    );
  } else if (render && typeof render !== "function") {
    console.error(
      `Invalid value supplied to prop \`render\`. It must be a function, provided ${render}`
    );
  } else if (component && typeof component !== "function") {
    console.error(
      `Invalid value supplied to prop \`component\`. It must be a React component, provided ${component}`
    );
    return /* @__PURE__ */ jsxRuntime.jsx(FallbackComponent, { ...i18nProps, children: translation });
  }
  if (typeof render === "function") {
    return render(i18nProps);
  }
  const Component = component || FallbackComponent;
  return /* @__PURE__ */ jsxRuntime.jsx(Component, { ...i18nProps, children: translation });
}
const RenderChildren = ({ children }) => {
  return children;
};
const getInterpolationValuesAndComponents = (props) => {
  if (!props.values) {
    return {
      values: void 0,
      components: props.components
    };
  }
  const values = { ...props.values };
  const components = { ...props.components };
  Object.entries(props.values).forEach(([key, valueForKey]) => {
    if (typeof valueForKey === "string" || typeof valueForKey === "number") {
      return;
    }
    const index = Object.keys(components).length;
    components[index] = /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: valueForKey });
    values[key] = `<${index}/>`;
  });
  return { values, components };
};

exports.TransNoContext = TransNoContext;
