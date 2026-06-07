#!/usr/bin/env node

// src/command-line/commands/doc.ts
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
function getRegistryPath() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return join(__dirname, "..", "..", "ai", "component-registry.json");
}
function loadRegistry() {
  const registryPath = getRegistryPath();
  const content = readFileSync(registryPath, "utf-8");
  return JSON.parse(content);
}
function findComponent(registry, name) {
  const lowerName = name.toLowerCase();
  for (const [key, component] of Object.entries(registry.components)) {
    if (key.toLowerCase() === lowerName) {
      return component;
    }
  }
  return null;
}
function findSimilar(registry, name) {
  const lowerName = name.toLowerCase();
  const componentNames = Object.keys(registry.components);
  return componentNames.filter(
    (n) => n.toLowerCase().includes(lowerName) || lowerName.includes(n.toLowerCase())
  ).slice(0, 5);
}
function formatProp(name, prop) {
  const parts = [];
  let typeStr = prop.type;
  if (prop.values && prop.values.length > 0) {
    typeStr = prop.values.map((v) => `"${v}"`).join(" | ");
  }
  const required = prop.required === true || prop.optional === false;
  const requiredStr = required ? "(required)" : "";
  const defaultStr = prop.default ? `[default: ${prop.default}]` : "";
  parts.push(`  ${name}: ${typeStr} ${requiredStr} ${defaultStr}`.trim());
  if (prop.description) {
    parts.push(`    ${prop.description}`);
  }
  if (prop.descriptions && Object.keys(prop.descriptions).length > 0) {
    for (const [value, desc] of Object.entries(prop.descriptions)) {
      parts.push(`    - "${value}": ${desc}`);
    }
  }
  return parts.join("\n");
}
function formatComponentDoc(component) {
  const lines = [];
  lines.push(`# ${component.name}
`);
  lines.push(`${component.description}
`);
  lines.push(
    `**Import:** \`import { ${component.name} } from "${component.importPath}";\`
`
  );
  lines.push(`**Category:** ${component.category}
`);
  const propEntries = Object.entries(component.props);
  if (propEntries.length > 0) {
    lines.push("## Props\n");
    for (const [propName, propInfo] of propEntries) {
      lines.push(formatProp(propName, propInfo));
      lines.push("");
    }
  }
  if (component.subComponents) {
    lines.push("## Sub-Components\n");
    for (const [subName, subInfo] of Object.entries(component.subComponents)) {
      lines.push(`### ${component.name}.${subName}`);
      if (subInfo.description) {
        lines.push(subInfo.description);
      }
      if (subInfo.renderElement) {
        lines.push(`Renders: ${subInfo.renderElement}`);
      }
      if (subInfo.props) {
        lines.push("Props:");
        for (const [propName, propInfo] of Object.entries(subInfo.props)) {
          const required = propInfo.required ? "(required)" : "";
          lines.push(`  - ${propName}: ${propInfo.type} ${required}`);
        }
      }
      lines.push("");
    }
  }
  if (component.examples && component.examples.length > 0) {
    lines.push("## Examples\n");
    for (const example of component.examples.slice(0, 3)) {
      lines.push("```tsx");
      lines.push(example);
      lines.push("```\n");
    }
    if (component.examples.length > 3) {
      lines.push(
        `(${component.examples.length - 3} more examples available in Storybook)`
      );
    }
  }
  if (component.colors && component.colors.length > 0) {
    lines.push("\n## Semantic Tokens Used\n");
    lines.push(component.colors.join(", "));
  }
  return lines.join("\n");
}
function docs() {
  try {
    const registry = loadRegistry();
    const components = Object.values(registry.components);
    console.log(`# Kumo Component Documentation
`);
    console.log(`${components.length} components available
`);
    console.log("---\n");
    for (const component of components) {
      console.log(formatComponentDoc(component));
      console.log("\n---\n");
    }
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.error(
        "Error: Component registry not found. Run `pnpm codegen:registry` first."
      );
      process.exit(1);
    }
    throw error;
  }
}
function doc(componentName) {
  if (!componentName) {
    docs();
    return;
  }
  try {
    const registry = loadRegistry();
    const component = findComponent(registry, componentName);
    if (!component) {
      const similar = findSimilar(registry, componentName);
      console.error(`Component "${componentName}" not found.`);
      if (similar.length > 0) {
        console.error(`
Did you mean: ${similar.join(", ")}?`);
      }
      console.error(`
Run "kumo ls" to see all available components.`);
      process.exit(1);
    }
    console.log(formatComponentDoc(component));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.error(
        "Error: Component registry not found. Run `pnpm codegen:registry` first."
      );
      process.exit(1);
    }
    throw error;
  }
}
export {
  doc,
  docs
};
